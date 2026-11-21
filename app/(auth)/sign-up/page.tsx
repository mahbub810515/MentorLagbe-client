import { AuthShell } from "@/components/auth/auth-shell"
import { SignUpAside } from "@/components/auth/sign-up-aside"
import { SignUpForm } from "@/components/auth/sign-up-form"

export default function SignUpPage() {
  return (
    <AuthShell>
      <SignUpAside />
      <SignUpForm />
    </AuthShell>
  )
}
