import { cva } from "class-variance-authority"

export const labelVariants = cva(
  [
    "[font-family:var(--tfds-font-family-sans)]",
    "[font-weight:var(--tfds-font-weight-medium)]",
    "[color:var(--tfds-color-text-primary)]",
    "leading-none select-none",
  ],
  {
    variants: {
      size: {
        sm: [
          "[font-size:var(--tfds-font-size-xs)]",
          "[letter-spacing:var(--tfds-font-letter-spacing-wide)]",
        ],
        md: [
          "[font-size:var(--tfds-font-size-sm)]",
          "[letter-spacing:var(--tfds-font-letter-spacing-wide)]",
        ],
        lg: [
          "[font-size:var(--tfds-font-size-md)]",
          "[letter-spacing:var(--tfds-font-letter-spacing-wide)]",
        ],
      },
      disabled: {
        true: "opacity-disabled cursor-not-allowed",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      disabled: false,
    },
  },
)
