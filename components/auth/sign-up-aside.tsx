import Link from "next/link"
import { Check, GraduationCap } from "lucide-react"

const highlights = [
  "Verified mentors from top universities",
  "One-on-one sessions shaped around your syllabus",
  "Pay per session, no hidden subscriptions",
]

export function SignUpAside() {
  return (
    <div className="hidden lg:flex lg:w-full lg:max-w-md lg:flex-col lg:gap-8">
      <Link href="/" className="flex w-fit items-center gap-2.5">
        <span className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <GraduationCap className="size-6" />
        </span>
        <span className="text-2xl font-bold tracking-tight">
          Mentor<span className="text-primary">Lagbe</span>
        </span>
      </Link>

      <div className="space-y-4">
        <h1 className="text-4xl leading-tight font-semibold tracking-tight text-balance">
          Learn from mentors who have already been there.
        </h1>
        <p className="text-base leading-relaxed text-muted-foreground">
          Create your free account and get matched with a mentor that fits your
          subject, budget and schedule in minutes.
        </p>
      </div>

      <ul className="flex flex-col gap-3.5">
        {highlights.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Check className="size-3.5" />
            </span>
            <span className="text-sm leading-relaxed text-muted-foreground">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
