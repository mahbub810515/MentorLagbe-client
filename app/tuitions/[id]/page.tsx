import { notFound } from "next/navigation"

import TuitionDetails from "@/components/shared/TuitionDetails"
import { getTuitionById } from "@/lib/api/tuitions"

interface TuitionDetailsPageProps {
  params: Promise<{ id: string }>
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
