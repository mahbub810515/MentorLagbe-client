"use client"

import Link from "next/link"

import {
  useState,
  type ComponentProps,
  type FormEvent,
  type ReactNode,
} from "react"
import { Eye, EyeOff, GraduationCap, Lock, Mail } from "lucide-react"

import { GoogleButton } from "@/components/auth/google-button"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { toast } from "../ui/toast"
import { title } from "process"

type FormValues = {
  email: string
  password: string
  remember: boolean
}

type FormErrors = Partial<Record<keyof FormValues, string>>

type InputFieldProps = {
  id: string
  label: string
  icon: ReactNode
  error?: string
  trailing?: ReactNode
} & Omit<ComponentProps<"input">, "id">

const initialValues: FormValues = {
  email: "",
  password: "",
  remember: false,
}

const validate = (values: FormValues): FormErrors => {
  const errors: FormErrors = {}

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Enter a valid email address"
  }

  if (values.password.length < 8) {
    errors.password = "Password must be at least 8 characters"
  }

  return errors
}

function InputField({
  id,
  label,
  icon,
  error,
  trailing,
  className,
  ...inputProps
}: InputFieldProps) {
  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <FieldContent>
        <div className="relative">
          <span className="pointer-events-none absolute top-1/2 left-2.5 -translate-y-1/2 text-muted-foreground">
            {icon}
          </span>

          <Input
            id={id}
            className={cn("h-9 pl-8", trailing && "pr-9", className)}
            aria-invalid={error ? true : undefined}
            {...inputProps}
          />

          {trailing && (
            <div className="absolute top-1/2 right-0.5 -translate-y-1/2">
              {trailing}
            </div>
          )}
        </div>

        <FieldError>{error}</FieldError>
      </FieldContent>
    </Field>
  )
}

function PasswordToggle({
  show,
  onToggle,
}: {
  show: boolean
  onToggle: () => void
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      className="text-muted-foreground hover:text-foreground"
      aria-label={show ? "Hide password" : "Show password"}
      onClick={onToggle}
    >
      {show ? <EyeOff /> : <Eye />}
    </Button>
  )
}

export function SignInForm() {
  const [values, setValues] = useState<FormValues>(initialValues)
  const [errors, setErrors] = useState<FormErrors>({})
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const router = useRouter()

  const updateField = <K extends keyof FormValues>(
    key: K,
    value: FormValues[K]
  ) => {
    setValues((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setSubmitError("")

    const nextErrors = validate(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    setIsSubmitting(true)

    try {
      // TODO: wire up Better Auth sign-in here  
      const { data, error } = await authClient.signIn.email({
        email: values.email.trim().toLowerCase() as string, // required, The email address of the user.
        password: values.password as string, // required, The password of the user. It should be at least 8 characters long and max 128 by default.
        rememberMe: values.remember, // If false, the user will be signed out when the browser is closed. (optional) (default: true)
        callbackURL: "/", // An optional URL to redirect to after the user signs in. (optional)
      });
      console.log("sign-in submitted:", data)
      toast.add({ title: `hello,${values.email}`, description: "sign-in successfull" })
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Sign-in error:", error)

      setSubmitError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="mx-auto w-full max-w-md rounded-2xl bg-card/90 shadow-xl ring-1 shadow-black/5 ring-foreground/10 backdrop-blur sm:max-w-lg">
      <CardHeader className="gap-2 text-center">
        <span className="mx-auto mb-1 flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground lg:hidden">
          <GraduationCap className="size-6" />
        </span>
        <CardTitle className="text-xl">Welcome back</CardTitle>
        <CardDescription>Sign in to continue to MentorLagbe</CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col gap-5"
        >
          <GoogleButton />

          <FieldSeparator>or</FieldSeparator>

          <FieldGroup className="gap-5">
            <InputField
              id="email"
              label="Email address"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              icon={<Mail className="size-4" />}
              error={errors.email}
              value={values.email}
              onChange={(event) => updateField("email", event.target.value)}
            />

            <InputField
              id="password"
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Minimum 8 characters"
              autoComplete="current-password"
              icon={<Lock className="size-4" />}
              error={errors.password}
              value={values.password}
              onChange={(event) => updateField("password", event.target.value)}
              trailing={
                <PasswordToggle
                  show={showPassword}
                  onToggle={togglePasswordVisibility}
                />
              }
            />

            <div className="flex items-center justify-between gap-2">
              <FieldLabel className="w-full flex-1 items-start gap-2.5 leading-relaxed text-muted-foreground">
                <Checkbox
                  checked={values.remember}
                  onCheckedChange={(checked) =>
                    updateField("remember", checked)
                  }
                />
                Remember me
              </FieldLabel>

              <Link
                href="/forgot-password"
                className="text-sm font-medium text-foreground underline underline-offset-4 hover:text-primary"
              >
                Forgot password?
              </Link>
            </div>
          </FieldGroup>

          {submitError && (
            <p role="alert" className="text-sm text-destructive">
              {submitError}
            </p>
          )}

          <Button type="submit" size="lg" className="w-full">
            {isSubmitting && <Spinner />}
            Sign in
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="font-medium text-foreground underline underline-offset-4 hover:text-primary"
          >
            Sign up
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}
