import { forwardRef } from "react"
import { type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/cn"
import { badgeVariants } from "./badge.variants"

interface BadgeProps
  extends
    Omit<React.HTMLAttributes<HTMLSpanElement>, "className">,
    VariantProps<typeof badgeVariants> {}

/** @experimental */
const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant, size, children, ...props }, ref) => {
    return (
      // eslint-disable-next-line tfds/no-native-tag -- inline surface, not running text (Typography)
      <span ref={ref} className={cn(badgeVariants({ variant, size }))} {...props}>
        {children}
      </span>
    )
  },
)

Badge.displayName = "Badge"

export { Badge, type BadgeProps }
