import { forwardRef } from "react"
import { type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/cn"
import { typographyVariants } from "./typography.variants"

type TypographyElement =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span"
  | "label"
  | "legend"
  | "strong"
  | "em"
  | "blockquote"
  | "figcaption"
  | "caption"
  | "code"
  | "pre"
  | "kbd"

interface TypographyProps
  extends
    Omit<React.HTMLAttributes<HTMLElement>, "color">,
    VariantProps<typeof typographyVariants> {
  as?: TypographyElement
}

/** @experimental */
const Typography = forwardRef<HTMLElement, TypographyProps>(
  ({ as: Tag = "p", variant, color, align, truncate, className, children, ...props }, ref) => {
    return (
      <Tag
        ref={ref as React.RefCallback<HTMLElement>}
        className={cn(typographyVariants({ variant, color, align, truncate }), className)}
        {...props}
      >
        {children}
      </Tag>
    )
  },
)

Typography.displayName = "Typography"

export { Typography, type TypographyProps }
