import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Search,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const trustItems = [
  { icon: Users, value: "500+", label: "Expert Tutors" },
  { icon: BookOpen, value: "1000+", label: "Active Tuitions" },
  { icon: GraduationCap, value: "2000+", label: "Happy Students" },
]

const BannerSection = () => {
  return (
    <section className="relative overflow-hidden border-b bg-gradient-to-b from-muted/60 via-background to-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8 lg:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-12">
          {/* Left Content */}
          <div className="space-y-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground shadow-sm">
              <GraduationCap className="size-4 text-primary" />
              Your Learning Journey Starts Here
            </div>

            <div className="space-y-5">
              <h1 className="max-w-2xl text-4xl leading-tight font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
                Find Your Ideal{" "}
                <span className="text-primary underline decoration-primary/30 decoration-4 underline-offset-8">
                  Tutor
                </span>{" "}
                or Mentorship Batch Today
              </h1>

              <p className="max-w-xl text-base leading-8 text-muted-foreground md:text-lg">
                Connect with experienced tutors and discover the perfect
                learning opportunity. Achieve your academic goals with
                personalized guidance.
              </p>
            </div>

            {/* Search Bar */}
            <div className="flex max-w-xl flex-col gap-3 rounded-2xl border border-border bg-card p-2 shadow-lg shadow-foreground/5 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Search className="absolute top-1/2 left-3 size-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by subject or tuition..."
                  className="h-12 border-0 bg-transparent pl-11 shadow-none focus-visible:ring-0 dark:bg-transparent"
                />
              </div>

              <Button
                nativeButton={false}
                render={<Link href="/tuitions" />}
                className="h-12 px-6"
              >
                Browse Tuitions
                <ArrowRight />
              </Button>
            </div>

            {/* CTA */}
            <div className="flex flex-wrap items-center gap-4">
              <Button
                nativeButton={false}
                render={<Link href="/tuitions" />}
                size="lg"
                className="h-11 px-7"
              >
                Explore Tuitions
                <ArrowRight />
              </Button>

              <Button
                nativeButton={false}
                render={<Link href="/sign-up" />}
                variant="outline"
                size="lg"
                className="h-11 px-7"
              >
                Become a Tutor
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 border-t border-border pt-6">
              {trustItems.map(({ icon: Icon, value, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <Icon className="size-5 text-primary" />
                  <div>
                    <p className="font-bold text-foreground">{value}</p>
                    <p className="text-xs text-muted-foreground">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Illustration */}
          <div className="relative mx-auto w-full max-w-xl sm:max-w-2xl lg:max-w-none">
            <div
              aria-hidden
              className="absolute top-10 -left-6 size-40 rounded-full bg-primary/5 blur-3xl"
            />
            <div
              aria-hidden
              className="absolute right-0 -bottom-8 size-48 rounded-full bg-primary/5 blur-3xl"
            />

            <div className="relative overflow-hidden rounded-3xl border border-border shadow-2xl shadow-foreground/10">
              <Image
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=85"
                alt="Students learning and studying together"
                width={900}
                height={700}
                priority
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="h-[360px] w-full object-cover md:h-[520px]"
              />
            </div>

            {/* Floating Card */}
            <div className="absolute bottom-4 left-4 z-10 rounded-2xl border border-border bg-card p-4 shadow-xl sm:-bottom-6 sm:left-6">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-primary/10 p-3">
                  <GraduationCap className="size-7 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-card-foreground">
                    Learn From Experts
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Personalized learning
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute top-4 right-4 z-10 rounded-xl border border-border bg-card px-4 py-3 shadow-lg sm:top-8 sm:-right-4">
              <p className="text-sm font-bold text-primary">✨ Learn Better</p>
              <p className="text-xs text-muted-foreground">Grow Faster</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BannerSection
