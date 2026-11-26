import Link from "next/link"
import { ArrowRight } from "lucide-react"

import TuitionCard from "@/components/shared/TuitionCard"
import { Button } from "@/components/ui/button"
import { getFeaturedTuitions } from "@/lib/tuitions"

const FeaturedTuitions = async () => {
  const tuitions = await getFeaturedTuitions()

  return (
    <section className="border-b bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-primary">Featured</p>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Latest Tuitions
            </h2>
            <p className="max-w-xl text-muted-foreground">
              Explore the newest approved and active tuitions from our verified
              tutors.
            </p>
          </div>

          <Button
            nativeButton={false}
            variant="outline"
            render={<Link href="/tuitions" />}
          >
            View All Tuitions
            <ArrowRight />
          </Button>
        </div>

        {tuitions.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-border bg-muted/30 px-6 py-16 text-center">
            <p className="font-medium text-foreground">
              No tuitions available yet
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              New approved tuitions will appear here as soon as they are posted.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tuitions.map((tuition) => (
              <TuitionCard key={tuition.id} tuition={tuition} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default FeaturedTuitions
