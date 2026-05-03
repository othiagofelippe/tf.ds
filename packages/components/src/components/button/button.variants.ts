import { cva } from "class-variance-authority"

export const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "font-sans font-medium whitespace-nowrap",
    "rounded-md border border-transparent",
    "transition-colors duration-fast ease-default",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-interactive-focus",
    "disabled:pointer-events-none disabled:opacity-disabled",
    "aria-busy:pointer-events-none aria-busy:opacity-loading",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-action-primary text-text-on-brand",
          "hover:bg-action-primary-hover",
          "active:bg-action-primary-hover",
        ],
        secondary: [
          "bg-bg-subtle text-text-primary border-border-default",
          "hover:bg-bg-muted",
          "active:bg-bg-muted",
        ],
        outline: [
          "bg-transparent text-text-primary border-border-default",
          "hover:bg-bg-subtle",
          "active:bg-bg-subtle",
        ],
        ghost: [
          "bg-transparent text-text-primary",
          "hover:bg-bg-subtle",
          "active:bg-bg-subtle",
        ],
        destructive: [
          "bg-feedback-error text-text-on-brand",
          "hover:opacity-90",
          "active:opacity-90",
        ],
        link: [
          "bg-transparent text-action-primary underline-offset-4",
          "hover:underline",
          "p-0 h-auto",
        ],
      },
      size: {
        sm: "h-8 px-3 text-sm [&_svg]:size-4",
        md: "h-10 px-4 text-sm [&_svg]:size-4",
        lg: "h-12 px-6 text-base [&_svg]:size-5",
        icon: "size-10 [&_svg]:size-4",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
)
