"use client"

import Image from "next/image"
import { useEffect, useRef, useState, type ChangeEvent } from "react"
import { Trash, Upload, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldContent,
  FieldError,
  FieldTitle,
} from "@/components/ui/field"

type ProfileImageFieldProps = {
  error?: string
  onChange: (file: File | null) => void
}

export function ProfileImageField({ error, onChange }: ProfileImageFieldProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!preview) {
      return
    }

    return () => URL.revokeObjectURL(preview)
  }, [preview])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null

    setPreview(file ? URL.createObjectURL(file) : null)
    onChange(file)
  }

  const handleRemove = () => {
    setPreview(null)
    onChange(null)

    if (inputRef.current) {
      inputRef.current.value = ""
    }
  }

  return (
    <Field>
      <FieldTitle>
        Profile photo{" "}
        <span className="font-normal text-muted-foreground">(optional)</span>
      </FieldTitle>

      <FieldContent className="gap-2">
        <div className="flex items-center gap-4">
          <div className="relative size-16 shrink-0 overflow-hidden rounded-full bg-muted ring-1 ring-foreground/10">
            {preview ? (
              <Image
                src={preview}
                alt="Profile photo preview"
                width={64}
                height={64}
                unoptimized
                className="size-full object-cover"
              />
            ) : (
              <div className="flex size-full items-center justify-center text-muted-foreground">
                <User className="size-6" />
              </div>
            )}
          </div>

          <div className="flex flex-1 flex-col items-start gap-1.5">
            <div className="flex flex-wrap gap-2">
              <input
                ref={inputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
                tabIndex={-1}
                onChange={handleChange}
              />

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => inputRef.current?.click()}
              >
                <Upload />
                {preview ? "Change photo" : "Upload photo"}
              </Button>

              {preview && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleRemove}
                >
                  <Trash />
                  Remove
                </Button>
              )}
            </div>

            <p className="text-xs text-muted-foreground">
              JPG, PNG or WebP, up to 5 MB
            </p>
          </div>
        </div>

        <FieldError>{error}</FieldError>
      </FieldContent>
    </Field>
  )
}
