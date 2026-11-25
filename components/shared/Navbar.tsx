"use client"

import Link from "next/link"
import { ChevronDown, GraduationCap, LayoutDashboard, LogOut, Menu, UserRound } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"
import { authClient } from "@/lib/auth-client"
import Image from "next/image"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { useRouter } from "next/navigation"

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Browse Tuitions", href: "/tuitions" },
  { name: "Pricing", href: "/pricing" },
  { name: "How It Works", href: "/about" },
]

export default function Navbar() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const router = useRouter()
  const handleSignOut = async () => {
   const {error}= await authClient.signOut();
   if(!error){
    router.push("/sign-in")
    router.refresh()
   }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <GraduationCap className="h-6 w-6" />
          </div>

          <span className="text-2xl font-bold tracking-tight">
            Mentor<span className="text-primary">Lagbe</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Authentication */}
        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <div className="flex items-center gap-3">
              <Image
                src={session.user.image || "/default-avatar.png"}
                alt="Profile"
                width={48}
                height={48}
                unoptimized
                className="rounded-full"
              />
             
              <DropdownMenu>
                <DropdownMenuTrigger className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm">
                  {user.name}
                  <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-52">
                  <div className="px-2 py-2">
                    <p className="text-sm font-semibold">{user.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {user.role}
                    </p>
                  </div>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem>
                    <Link href={`/dashboard/${user.role}`}>
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem >
                    <Link href="/profile">
                      <UserRound className="mr-2 h-4 w-4" />
                      Update Profile
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={handleSignOut}
                    className="text-destructive focus:text-destructive"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                Sign In
              </Link>

              <Link
                href="/sign-up"
                className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger
              render={
                <Button variant="outline" size="icon" aria-label="Open menu" />
              }
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>

            <SheetContent side="right" className="w-[300px] sm:w-[350px]">
              <SheetHeader>
                <SheetTitle>
                  Mentor<span className="text-primary">Lagbe</span>
                </SheetTitle>
              </SheetHeader>

              <div className="mt-8 flex flex-col gap-3">
                {navLinks.map((link) => (
                  <SheetClose
                    key={link.href}
                    render={<Link href={link.href} />}
                  >
                    <span className="block rounded-lg px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground">
                      {link.name}
                    </span>
                  </SheetClose>
                ))}

                {/* Mobile Authentication */}
                <div className="mt-5 flex flex-col gap-3 border-t pt-5">
                  <SheetClose render={<Link href="/sign-in" />}>
                    <span className="flex h-10 w-full items-center justify-center rounded-md border text-sm font-medium hover:bg-accent">
                      Sign In
                    </span>
                  </SheetClose>

                  <SheetClose render={<Link href="/sign-up" />}>
                    <span className="flex h-10 w-full items-center justify-center rounded-md bg-primary text-sm font-medium text-primary-foreground hover:bg-primary/90">
                      Sign Up
                    </span>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}
