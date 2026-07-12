import { cva } from "class-variance-authority"

export const cardVariants = cva(["rounded-lg border bg-surface-default border-border-default"], {
  variants: {
    shadow: {
      none: [],
      sm: ["shadow-sm"],
      md: ["shadow-md"],
    },
    padding: {
      none: ["p-0"],
      sm: ["p-4"],
      md: ["p-6"],
      lg: ["p-8"],
    },
  },
  defaultVariants: {
    shadow: "sm",
    padding: "md",
  },
})
