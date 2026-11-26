import type { ObjectId } from "mongodb"
import { connection } from "next/server"

import clientPromise from "@/lib/mongodb"

const DB_NAME = "mentorlagbe"
const TUITION_COLLECTION = "tuition"

export type TuitionMode = "Online" | "Offline"

export interface TuitionDocument {
  _id: string | ObjectId
  title: string
  subject: string
  classLevel: string
  mode: TuitionMode
  monthlyFee: number
  tutorName: string
  approvalStatus: "pending" | "approved" | "rejected"
  isActive: boolean
  createdAt?: string | Date
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
