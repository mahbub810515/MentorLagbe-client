import type { TuitionType } from "@/types/TutionType"

const BASE_URL = process.env.BETTER_AUTH_API_BASE_URL

export const getTuitionData = async () => {
  const res = await fetch(`${BASE_URL}/tutor/tuitions`)
  const tuitions: TuitionType[] = await res.json()
  return tuitions
}

export const getTuitionById = async (
  id: string
): Promise<TuitionType | null> => {
  const res = await fetch(`${BASE_URL}/tutor/tuitions/${id}`)
  if (!res.ok) return null

  const result = await res.json()
  return result?.data ?? result
}
