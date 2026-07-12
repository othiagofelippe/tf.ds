import { cva } from "class-variance-authority"

export const inputVariants = cva(
  [
    "w-full rounded-md border bg-surface-default",
    "[font-family:var(--tfds-font-family-sans)]",
    "[font-weight:var(--tfds-font-weight-regular)]",
    "[color:var(--tfds-color-text-primary)]",
    "placeholder:[color:var(--tfds-color-text-disabled)]",
    "outline-none transition-colors duration-fast",
    "focus-visible:ring-2 focus-visible:ring-interactive-focus focus-visible:ring-offset-1",
    "disabled:cursor-not-allowed disabled:opacity-disabled",
  ],
  {
    variants: {
      size: {
        sm: ["h-8 px-3 [font-size:var(--tfds-font-size-sm)]"],
        md: ["h-10 px-3 [font-size:var(--tfds-font-size-sm)]"],
        lg: ["h-12 px-4 [font-size:var(--tfds-font-size-md)]"],
      },
      status: {
        default: ["border-border-default", "hover:border-border-strong"],
        error: [
          "border-feedback-error",
          "[color:var(--tfds-color-text-error)]",
          "focus-visible:ring-feedback-error",
        ],
        success: ["border-feedback-success", "focus-visible:ring-feedback-success"],
      },
    },
    defaultVariants: {
      size: "md",
      status: "default",
    },
  },
)
