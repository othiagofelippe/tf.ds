import { forwardRef } from "react"
import { type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/cn"
import { badgeVariants } from "./badge.variants"

interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

/** @experimental */
const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant, size, className, children, ...props }, ref) => {
    return (
      <span ref={ref} className={cn(badgeVariants({ variant, size }), className)} {...props}>
        {children}
      </span>
    )
  },
)

Badge.displayName = "Badge"

export { Badge, type BadgeProps }
