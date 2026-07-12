import { cva } from "class-variance-authority"

export const badgeVariants = cva(
  [
    "inline-flex items-center justify-center",
    "[font-family:var(--tfds-font-family-sans)]",
    "[font-weight:var(--tfds-font-weight-medium)]",
    "[letter-spacing:var(--tfds-font-letter-spacing-wide)]",
    "rounded-full border border-transparent whitespace-nowrap",
  ],
  {
    variants: {
      variant: {
        default: ["bg-bg-muted [color:var(--tfds-color-text-secondary)]", "border-border-subtle"],
        success: ["bg-feedback-success-subtle [color:var(--tfds-color-text-success)]"],
        warning: ["bg-feedback-warning-subtle [color:var(--tfds-color-text-warning)]"],
        error: ["bg-feedback-error-subtle [color:var(--tfds-color-text-error)]"],
        info: ["bg-action-primary-subtle [color:var(--tfds-color-action-primary)]"],
      },
      size: {
        sm: ["[font-size:var(--tfds-font-size-xs)]", "px-2 py-0.5"],
        md: ["[font-size:var(--tfds-font-size-sm)]", "px-2.5 py-0.5"],
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
)
