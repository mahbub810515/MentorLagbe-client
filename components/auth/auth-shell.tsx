import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type AuthShellProps = {
  children: ReactNode
  className?: string
}

export function AuthShell({ children, className }: AuthShellProps) {
  return (
    <section
      className={cn(
        "relative flex min-h-[calc(100svh-4rem)] w-full items-center justify-center overflow-hidden px-4 py-12 sm:px-6 lg:px-8",
        className
      )}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-muted blur-3xl" />
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-10 lg:flex-row lg:gap-16">
        {children}
      </div>
    </section>
  )
}
