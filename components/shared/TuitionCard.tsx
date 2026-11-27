import Link from "next/link"
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
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

import { TuitionType } from "@/types/TutionType"

const feeFormatter = new Intl.NumberFormat("en-US")

export default function TuitionCard({ tuition }: { tuition: TuitionType }) {
  const isOnline = tuition.mode === "Online"

  return (
    <Card className="h-full transition-shadow hover:shadow-md">
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Badge variant="secondary" className="gap-1">
            <BookOpen />
            {tuition.subject}
          </Badge>
          <Badge variant="outline" className="gap-1">
            {isOnline ? <Monitor /> : <MapPin />}
            {tuition.mode}
          </Badge>
        </div>
        <CardTitle className="line-clamp-2 min-h-11 text-lg font-semibold">
          {tuition.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 space-y-3">
        <DetailRow
          icon={GraduationCap}
          label="Class Level"
          value={tuition.classLevel}
        />
        <DetailRow icon={UserRound} label="Tutor" value={tuition.tutorName} />
        <DetailRow
          icon={Wallet}
          label="Monthly Fee"
          value={`৳${feeFormatter.format(tuition.monthlyFee)} / month`}
        />
      </CardContent>

      <CardFooter>
        <Button
          nativeButton={false}
          className="w-full"
          render={<Link href={`/tuitions/${tuition._id}`} />}
        >
          View Details
          <ArrowRight />
        </Button>
      </CardFooter>
    </Card>
  )
}

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon
  label: string
  value: string
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="flex items-center gap-2 text-muted-foreground">
        <Icon className="size-4" />
        {label}
      </span>
      <span className="truncate text-right font-medium text-foreground">
        {value}
      </span>
    </div>
  )
}
