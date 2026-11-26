import { ObjectId, type Filter } from "mongodb"
import { cache } from "react"
import { connection } from "next/server"

import clientPromise from "@/lib/mongodb"

const DB_NAME = "mentorlagbe"
const TUITION_COLLECTION = "tuition"
const USER_COLLECTION = "user"

const collator = new Intl.Collator("en", { numeric: true, sensitivity: "base" })

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

export interface TuitionQuery {
  query?: string
  subject?: string
  classLevel?: string
  mode?: TuitionMode
}

export interface TuitionFilterOptions {
  subjects: string[]
  classLevels: string[]
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

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

function toFeaturedTuition(doc: TuitionDocument): FeaturedTuition {
  return {
    id: String(doc._id),
    title: doc.title,
    subject: doc.subject,
    classLevel: doc.classLevel,
    mode: doc.mode,
    monthlyFee: doc.monthlyFee,
    tutorName: doc.tutorName,
  }
}

export async function getApprovedTuitions(
  query: TuitionQuery = {},
  limit?: number
): Promise<FeaturedTuition[]> {
  await connection()

  try {
    const client = await clientPromise
    const collection = client
      .db(DB_NAME)
      .collection<TuitionDocument>(TUITION_COLLECTION)

    const filter: Filter<TuitionDocument> = {
      approvalStatus: "approved",
      isActive: true,
    }

    if (query.query) {
      const pattern = new RegExp(escapeRegExp(query.query), "i")
      filter.$or = [{ title: pattern }, { subject: pattern }]
    }
    if (query.subject) {
      filter.subject = query.subject
    }
    if (query.classLevel) {
      filter.classLevel = query.classLevel
    }
    if (query.mode) {
      filter.mode = query.mode
    }

    const cursor = collection.find(filter).sort({ createdAt: -1 })
    if (limit) {
      cursor.limit(limit)
    }
    const documents = await cursor.toArray()

    return documents.map(toFeaturedTuition)
  } catch (error) {
    console.error("Failed to load tuitions:", error)
    return []
  }
}

export function getFeaturedTuitions(limit = 6): Promise<FeaturedTuition[]> {
  return getApprovedTuitions({}, limit)
}

export async function getTuitionFilterOptions(): Promise<TuitionFilterOptions> {
  await connection()

  try {
    const client = await clientPromise
    const collection = client
      .db(DB_NAME)
      .collection<TuitionDocument>(TUITION_COLLECTION)

    const base: Filter<TuitionDocument> = {
      approvalStatus: "approved",
      isActive: true,
    }

    const [subjects, classLevels] = await Promise.all([
      collection.distinct("subject", base),
      collection.distinct("classLevel", base),
    ])

    return {
      subjects: subjects.map(String).sort(collator.compare),
      classLevels: classLevels.map(String).sort(collator.compare),
    }
  } catch (error) {
    console.error("Failed to load tuition filter options:", error)
    return { subjects: [], classLevels: [] }
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
