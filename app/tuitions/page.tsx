import type { Metadata } from "next"
import Link from "next/link"

import TuitionCard from "@/components/shared/TuitionCard"
import TuitionFilters from "@/components/shared/TuitionFilters"
import { Button } from "@/components/ui/button"
import { getTuitionData } from "@/lib/api/tuitions"
import type { TuitionType } from "@/types/TutionType"

export const metadata: Metadata = {
  title: "Browse Tuitions | MentorLagbe",
  description:
    "Search and filter approved tuition listings by subject, class level, and mode.",
}

interface TuitionsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

function first(value: string | string[] | undefined) {
  return typeof value === "string" ? value : undefined
}

const collator = new Intl.Collator("en", { numeric: true, sensitivity: "base" })

export default async function TuitionsPage({
  searchParams,
}: TuitionsPageProps) {
  const params = await searchParams

  const rawQuery = first(params.q)?.trim() || undefined
  const query = rawQuery?.toLowerCase()
  const subject = first(params.subject) || undefined
  const classLevel = first(params.classLevel) || undefined

  const rawMode = first(params.mode)
  const mode: TuitionType["mode"] | undefined =
    rawMode === "Online" || rawMode === "Offline" ? rawMode : undefined

  const allTuitions = (await getTuitionData()).filter(
    (tuition) => tuition.approvalStatus === "approved" && tuition.isActive
  )

  const tuitions = allTuitions.filter((tuition) => {
    if (query) {
      const haystack = `${tuition.title} ${tuition.subject}`.toLowerCase()
      if (!haystack.includes(query)) return false
    }
    if (subject && tuition.subject !== subject) return false
    if (classLevel && tuition.classLevel !== classLevel) return false
    if (mode && tuition.mode !== mode) return false
    return true
  })

  const options = {
    subjects: Array.from(new Set(allTuitions.map((item) => item.subject))).sort(
      collator.compare
    ),
    classLevels: Array.from(
      new Set(allTuitions.map((item) => item.classLevel))
    ).sort(collator.compare),
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Browse Tuitions
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          Find the right tuition for you. Search by title or subject, then
          narrow down by class level and mode.
        </p>
      </div>

      <div className="mt-6">
        <TuitionFilters
          subjects={options.subjects}
          classLevels={options.classLevels}
          q={rawQuery ?? ""}
          subject={subject ?? ""}
          classLevel={classLevel ?? ""}
          mode={mode ?? ""}
        />
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        {tuitions.length} {tuitions.length === 1 ? "tuition" : "tuitions"} found
      </p>

      {tuitions.length === 0 ? (
        <div className="mt-4 rounded-2xl border border-dashed border-border bg-muted/30 px-6 py-16 text-center">
          <p className="font-medium text-foreground">No tuitions found</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Try a different search term or clear the filters.
          </p>
          <Button
            nativeButton={false}
            variant="outline"
            className="mt-4"
            render={<Link href="/tuitions" />}
          >
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tuitions.map((tuition) => (
            <TuitionCard key={tuition._id} tuition={tuition} />
          ))}
        </div>
      )}
    </div>
  )
}
