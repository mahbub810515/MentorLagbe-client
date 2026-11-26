import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  GraduationCap,
  Mail,
  MapPin,
  Monitor,
  UserRound,
  Wallet,
  type LucideIcon,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { TuitionDetail } from "@/lib/tuitions"

const feeFormatter = new Intl.NumberFormat("en-US")
const dateFormatter = new Intl.DateTimeFormat("en-US", { dateStyle: "medium" })

function formatDate(value?: string) {
  if (!value) return null
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? null : dateFormatter.format(date)
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("")
}

export default function TuitionDetails({
  tuition,
}: {
  tuition: TuitionDetail
}) {
  const isOnline = tuition.mode === "Online"
  const postedAt = formatDate(tuition.createdAt)

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/tuitions"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to Tuitions
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-8">
          {/* Banner */}
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border bg-muted">
            {tuition.bannerImage ? (
              <Image
                src={tuition.bannerImage}
                alt={tuition.title}
                fill
                priority
                sizes="(min-width: 1024px) 66vw, 100vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <GraduationCap className="size-16 text-muted-foreground" />
              </div>
            )}
          </div>

          {/* Title & meta */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="gap-1">
                <BookOpen />
                {tuition.subject}
              </Badge>
              <Badge variant="outline" className="gap-1">
                <GraduationCap />
                {tuition.classLevel}
              </Badge>
              <Badge variant="outline" className="gap-1">
                {isOnline ? <Monitor /> : <MapPin />}
                {tuition.mode}
              </Badge>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {tuition.title}
            </h1>

            <p className="text-sm text-muted-foreground">
              Posted by {tuition.tutorName}
              {postedAt ? ` · ${postedAt}` : ""}
            </p>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">
              Description
            </h2>
            <p className="leading-7 whitespace-pre-line text-muted-foreground">
              {tuition.description}
            </p>
          </div>

          {/* Details */}
          <div className="grid gap-4 sm:grid-cols-2">
            <InfoCard
              icon={CalendarDays}
              label="Schedule"
              value={`${tuition.daysPerWeek} days / week`}
            />
            <InfoCard
              icon={isOnline ? Monitor : MapPin}
              label="Mode"
              value={tuition.mode}
            />
            <InfoCard icon={MapPin} label="Location" value={tuition.location} />
            <InfoCard
              icon={Wallet}
              label="Monthly Fee"
              value={`৳${feeFormatter.format(tuition.monthlyFee)}`}
            />
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <Card>
            <CardHeader>
              <CardTitle>Tutor Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                {tuition.tutor.image ? (
                  <Image
                    src={tuition.tutor.image}
                    alt={tuition.tutor.name}
                    width={56}
                    height={56}
                    className="size-14 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-lg font-semibold text-primary">
                    {getInitials(tuition.tutor.name)}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="truncate font-semibold text-foreground">
                    {tuition.tutor.name}
                  </p>
                  <p className="truncate text-sm text-muted-foreground">
                    {tuition.tutor.email}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="gap-1">
                  <UserRound />
                  Tutor
                </Badge>
                {tuition.tutor.plan ? (
                  <Badge variant="secondary" className="capitalize">
                    {tuition.tutor.plan}
                  </Badge>
                ) : null}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-1">
              <p className="text-sm text-muted-foreground">Monthly Fee</p>
              <p className="text-3xl font-bold text-foreground">
                ৳{feeFormatter.format(tuition.monthlyFee)}
                <span className="ml-1 text-sm font-medium text-muted-foreground">
                  / month
                </span>
              </p>
              <p className="pt-1 text-sm text-muted-foreground">
                {tuition.daysPerWeek} classes per week · {tuition.mode}
              </p>
            </CardContent>
            <CardFooter>
              <Button
                nativeButton={false}
                className="w-full"
                render={<a href={`mailto:${tuition.tutorEmail}`} />}
              >
                <Mail />
                Contact Tutor
              </Button>
            </CardFooter>
          </Card>
        </aside>
      </div>
    </div>
  )
}

function InfoCard({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon
  label: string
  value: string
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
      <div className="rounded-lg bg-primary/10 p-2 text-primary">
        <Icon className="size-5" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-medium text-foreground">{value}</p>
      </div>
    </div>
  )
}
