"use client"

import Link from "next/link"

import {
  useState,
  type ComponentProps,
  type FormEvent,
  type ReactNode,
} from "react"
import { Eye, EyeOff, GraduationCap, Lock, Mail, User } from "lucide-react"

import { GoogleButton } from "@/components/auth/google-button"
import { ProfileImageField } from "@/components/auth/profile-image-field"
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
  FieldTitle,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"
import { authClient } from "@/lib/auth-client"
import { toast } from "../ui/toast"
import { useRouter } from "next/navigation"

type Role = "student" | "tutor"
type Plan = "free" | "pro"

type FormValues = {
  name: string
  email: string
  password: string
  confirmPassword: string
  image: File | null
  role: Role | ""
  plan: Plan
  agreed: boolean
}

type FormErrors = Partial<Record<keyof FormValues, string>>

type InputFieldProps = {
  id: string
  label: string
  icon: ReactNode
  error?: string
  trailing?: ReactNode
} & Omit<ComponentProps<"input">, "id">

type OptionCardProps = {
  control: ReactNode
  title: string
  description: string
  badge?: string
  selected: boolean
}

const initialValues: FormValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  image: null,
  role: "",
  plan: "free",
  agreed: false,
}

const roleOptions: Array<{
  value: Role
  label: string
  description: string
}> = [
  {
    value: "student",
    label: "Student",
    description: "Find mentors and book sessions",
  },
  {
    value: "tutor",
    label: "Tutor",
    description: "Teach learners and get paid",
  },
]

const planOptions: Array<{
  value: Plan
  label: string
  description: string
  badge?: string
}> = [
  {
    value: "free",
    label: "Free",
    description: "Standard matching, pay per session",
  },
  {
    value: "pro",
    label: "Pro",
    description: "Priority matching and member perks",
    badge: "Popular",
  },
]

const isRole = (value: unknown): value is Role =>
  typeof value === "string" &&
  roleOptions.some((option) => option.value === value)

const validate = (values: FormValues): FormErrors => {
  const errors: FormErrors = {}

  if (values.name.trim().length < 2) {
    errors.name = "Please enter your full name"
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Enter a valid email address"
  }

  if (values.password.length < 8) {
    errors.password = "Password must be at least 8 characters"
  }

  if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Passwords do not match"
  }

  if (values.image && !values.image.type.startsWith("image/")) {
    errors.image = "Please select an image file"
  } else if (values.image && values.image.size > 5 * 1024 * 1024) {
    errors.image = "Image must be 5 MB or smaller"
  }

  if (!values.role) {
    errors.role = "Choose how you want to join"
  }

  if (!values.agreed) {
    errors.agreed = "Please accept the terms to continue"
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

function OptionCard({
  control,
  title,
  description,
  badge,
  selected,
}: OptionCardProps) {
  return (
    <FieldLabel
      className={cn(
        "w-full cursor-pointer items-start gap-2.5 rounded-xl border p-3 transition-colors hover:border-foreground/25 hover:bg-muted/40",
        selected && "border-primary bg-primary/5"
      )}
    >
      {control}

      <span className="flex flex-1 flex-col gap-0.5">
        <span className="flex items-center justify-between gap-2 text-sm font-medium">
          {title}

          {badge && (
            <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[0.65rem] font-semibold tracking-wide text-primary uppercase">
              {badge}
            </span>
          )}
        </span>

        <span className="text-xs leading-snug font-normal text-muted-foreground">
          {description}
        </span>
      </span>
    </FieldLabel>
  )
}

export function SignUpForm() {
  const router = useRouter()
  const [values, setValues] = useState<FormValues>(initialValues)
  const [errors, setErrors] = useState<FormErrors>({})
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")
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

    if (Object.keys(nextErrors).length > 0 || !isRole(values.role)) {
      return
    }

    setIsSubmitting(true)

    try {
      const { data, error } = await authClient.signUp.email({
        name: values.name.trim() as string,
        email: values.email.trim().toLowerCase() as string,
        password: values.password as string,
        callbackURL: "/",
      })

      if (error) {
        setSubmitError(error.message || "Unable to create your account.")
        return
      }

      if (!data) {
        setSubmitError("Signup failed. Please try again.")
        return
      }

      console.log("submited data:", data)
      toast.add({
        title: `hello,${values.name}`,
        description: "your account created successfully",
      })
      router.push("/")
      router.refresh()

      // Better Auth handles the signup response.
      // callbackURL controls the post-signup redirect.
    } catch (error) {
      console.error("Signup error:", error)

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
        <CardTitle className="text-xl">Create your account</CardTitle>
        <CardDescription>
          Join MentorLagbe as a student or a mentor
        </CardDescription>
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
              id="name"
              label="Full name"
              name="name"
              type="text"
              placeholder="e.g. Tanvir Ahmed"
              autoComplete="name"
              icon={<User className="size-4" />}
              error={errors.name}
              value={values.name}
              onChange={(event) => updateField("name", event.target.value)}
            />

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
              autoComplete="new-password"
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

            <InputField
              id="confirmPassword"
              label="Confirm password"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              placeholder="Re-enter your password"
              autoComplete="new-password"
              icon={<Lock className="size-4" />}
              error={errors.confirmPassword}
              value={values.confirmPassword}
              onChange={(event) =>
                updateField("confirmPassword", event.target.value)
              }
              trailing={
                <PasswordToggle
                  show={showPassword}
                  onToggle={togglePasswordVisibility}
                />
              }
            />
            <ProfileImageField
              error={errors.image}
              onChange={(file) => updateField("image", file)}
            />
            <Field>
              <FieldTitle>I want to join as</FieldTitle>
              <FieldContent className="gap-2">
                <RadioGroup
                  name="role"
                  value={values.role}
                  onValueChange={(value) => updateField("role", value)}
                  className="grid gap-2 sm:grid-cols-3"
                >
                  {roleOptions.map((option) => (
                    <OptionCard
                      key={option.value}
                      title={option.label}
                      description={option.description}
                      selected={values.role === option.value}
                      control={
                        <RadioGroupItem
                          value={option.value}
                          className="mt-0.5"
                        />
                      }
                    />
                  ))}
                </RadioGroup>
                <FieldError>{errors.role}</FieldError>
              </FieldContent>
            </Field>

            <Field>
              <FieldTitle>Choose your plan</FieldTitle>
              <FieldContent className="gap-2">
                <RadioGroup
                  name="plan"
                  value={values.plan}
                  onValueChange={(value) => updateField("plan", value)}
                  className="grid gap-2 sm:grid-cols-2"
                >
                  {planOptions.map((option) => (
                    <OptionCard
                      key={option.value}
                      title={option.label}
                      description={option.description}
                      badge={option.badge}
                      selected={values.plan === option.value}
                      control={
                        <RadioGroupItem
                          value={option.value}
                          className="mt-0.5"
                        />
                      }
                    />
                  ))}
                </RadioGroup>
              </FieldContent>
            </Field>

            <div className="flex flex-col gap-2">
              <FieldLabel className="w-full flex-1 items-start gap-2.5 leading-relaxed text-muted-foreground">
                <Checkbox
                  checked={values.agreed}
                  onCheckedChange={(checked) => updateField("agreed", checked)}
                />
                <span>
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="font-medium text-foreground underline underline-offset-4 hover:text-primary"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="font-medium text-foreground underline underline-offset-4 hover:text-primary"
                  >
                    Privacy Policy
                  </Link>
                </span>
              </FieldLabel>
              <FieldError>{errors.agreed}</FieldError>
            </div>
          </FieldGroup>

          <Button type="submit" size="lg" className="w-full">
            {isSubmitting && <Spinner />}
            Create account
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-medium text-foreground underline underline-offset-4 hover:text-primary"
          >
            Sign in
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}
