import type { Metadata } from "next"
import { notFound } from "next/navigation"

import TuitionDetails from "@/components/shared/TuitionDetails"
import { getTuitionById } from "@/lib/tuitions"

interface TuitionDetailsPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({
  params,
}: TuitionDetailsPageProps): Promise<Metadata> {
  const { id } = await params
  const tuition = await getTuitionById(id)

  if (!tuition) {
    return { title: "Tuition Not Found | MentorLagbe" }
  }

  return {
    title: `${tuition.title} | MentorLagbe`,
    description: tuition.description.slice(0, 160),
  }
}

export default async function TuitionDetailsPage({
  params,
}: TuitionDetailsPageProps) {
  const { id } = await params
  const tuition = await getTuitionById(id)

  if (!tuition) {
    notFound()
  }

  return <TuitionDetails tuition={tuition} />
}
