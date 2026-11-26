import { ObjectId } from "mongodb"
import { cache } from "react"
import { connection } from "next/server"

import clientPromise from "@/lib/mongodb"

const DB_NAME = "mentorlagbe"
const TUITION_COLLECTION = "tuition"
const USER_COLLECTION = "user"

export type TuitionMode = "Online" | "Offline"

export interface TuitionDocument {
  _id: string | ObjectId
  title: string
  subject: string
  classLevel: string
  mode: TuitionMode
  location: string
  monthlyFee: number
  daysPerWeek: number
  bannerImage?: string
  description: string
  tutorName: string
  tutorEmail: string
  approvalStatus: "pending" | "approved" | "rejected"
  isActive: boolean
  createdAt?: string | Date
}

interface TutorUser {
  name?: string
  email?: string
  image?: string
  plan?: string
}

export interface FeaturedTuition {
  id: string
  title: string
  subject: string
  classLevel: string
  mode: TuitionMode
  monthlyFee: number
  tutorName: string
}

export interface TuitionDetail {
  id: string
  title: string
  subject: string
  classLevel: string
  mode: TuitionMode
  location: string
  monthlyFee: number
  daysPerWeek: number
  description: string
  bannerImage?: string
  tutorName: string
  tutorEmail: string
  createdAt?: string
  tutor: {
    name: string
    email: string
    image?: string
    plan?: string
  }
}

export async function getFeaturedTuitions(
  limit = 6
): Promise<FeaturedTuition[]> {
  await connection()

  try {
    const client = await clientPromise
    const documents = await client
      .db(DB_NAME)
      .collection<TuitionDocument>(TUITION_COLLECTION)
      .find({ approvalStatus: "approved", isActive: true })
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray()

    return documents.map((doc) => ({
      id: String(doc._id),
      title: doc.title,
      subject: doc.subject,
      classLevel: doc.classLevel,
      mode: doc.mode,
      monthlyFee: doc.monthlyFee,
      tutorName: doc.tutorName,
    }))
  } catch (error) {
    console.error("Failed to load featured tuitions:", error)
    return []
  }
}

export const getTuitionById = cache(
  async (id: string): Promise<TuitionDetail | null> => {
    await connection()

    try {
      const client = await clientPromise
      const db = client.db(DB_NAME)

      const idFilters: Array<{ _id: string } | { _id: ObjectId }> = [
        { _id: id },
      ]
      if (ObjectId.isValid(id)) {
        idFilters.push({ _id: new ObjectId(id) })
      }

      const doc = await db
        .collection<TuitionDocument>(TUITION_COLLECTION)
        .findOne({
          $or: idFilters,
          approvalStatus: "approved",
          isActive: true,
        })

      if (!doc) {
        return null
      }

      const tutorUser = doc.tutorEmail
        ? await db
            .collection<TutorUser>(USER_COLLECTION)
            .findOne(
              { email: doc.tutorEmail },
              { projection: { name: 1, email: 1, image: 1, plan: 1 } }
            )
        : null

      return {
        id: String(doc._id),
        title: doc.title,
        subject: doc.subject,
        classLevel: doc.classLevel,
        mode: doc.mode,
        location: doc.location,
        monthlyFee: doc.monthlyFee,
        daysPerWeek: doc.daysPerWeek,
        description: doc.description,
        bannerImage: doc.bannerImage,
        tutorName: doc.tutorName,
        tutorEmail: doc.tutorEmail,
        createdAt: doc.createdAt
          ? new Date(doc.createdAt).toISOString()
          : undefined,
        tutor: {
          name: tutorUser?.name ?? doc.tutorName,
          email: tutorUser?.email ?? doc.tutorEmail,
          image: tutorUser?.image,
          plan: tutorUser?.plan,
        },
      }
    } catch (error) {
      console.error(`Failed to load tuition ${id}:`, error)
      return null
    }
  }
)
