"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { Search, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"

interface TuitionFiltersProps {
  subjects: string[]
  classLevels: string[]
  q: string
  subject: string
  classLevel: string
  mode: string
}

export default function TuitionFilters({
  subjects,
  classLevels,
  q,
  subject,
  classLevel,
  mode,
}: TuitionFiltersProps) {
  const router = useRouter()
  const [query, setQuery] = useState(q)

  const hasFilters = Boolean(q || subject || classLevel || mode)

  function navigate(next: {
    q?: string
    subject?: string
    classLevel?: string
    mode?: string
  }) {
    const values = { q, subject, classLevel, mode, ...next }
    const params = new URLSearchParams()

    if (values.q.trim()) params.set("q", values.q.trim())
    if (values.subject) params.set("subject", values.subject)
    if (values.classLevel) params.set("classLevel", values.classLevel)
    if (values.mode) params.set("mode", values.mode)

    const search = params.toString()
    router.push(search ? `/tuitions?${search}` : "/tuitions")
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    navigate({ q: query })
  }

  function handleClear() {
    setQuery("")
    router.push("/tuitions")
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 lg:flex-row lg:items-center"
      >
        <div className="relative flex-1">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by title or subject..."
            aria-label="Search tuitions by title or subject"
            className="h-11 pl-9"
          />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <NativeSelect
            className="w-full [&>select]:h-11"
            aria-label="Filter by subject"
            value={subject}
            onChange={(event) => navigate({ subject: event.target.value })}
          >
            <NativeSelectOption value="">All Subjects</NativeSelectOption>
            {subjects.map((item) => (
              <NativeSelectOption key={item} value={item}>
                {item}
              </NativeSelectOption>
            ))}
          </NativeSelect>

          <NativeSelect
            className="w-full [&>select]:h-11"
            aria-label="Filter by class level"
            value={classLevel}
            onChange={(event) => navigate({ classLevel: event.target.value })}
          >
            <NativeSelectOption value="">All Classes</NativeSelectOption>
            {classLevels.map((item) => (
              <NativeSelectOption key={item} value={item}>
                {item}
              </NativeSelectOption>
            ))}
          </NativeSelect>

          <NativeSelect
            className="w-full [&>select]:h-11"
            aria-label="Filter by mode"
            value={mode}
            onChange={(event) => navigate({ mode: event.target.value })}
          >
            <NativeSelectOption value="">All Modes</NativeSelectOption>
            <NativeSelectOption value="Online">Online</NativeSelectOption>
            <NativeSelectOption value="Offline">Offline</NativeSelectOption>
          </NativeSelect>
        </div>

        <div className="flex gap-2">
          <Button type="submit" className="h-11 px-5">
            Search
          </Button>
          {hasFilters ? (
            <Button
              type="button"
              variant="ghost"
              className="h-11"
              onClick={handleClear}
            >
              <X />
              Clear
            </Button>
          ) : null}
        </div>
      </form>
    </div>
  )
}
