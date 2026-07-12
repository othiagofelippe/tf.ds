import { forwardRef } from "react"
import { type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/cn"
import { cardVariants } from "./card.variants"

interface CardProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "className">,
    VariantProps<typeof cardVariants> {}

/** @experimental */
const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ shadow, padding, children, ...props }, ref) => {
    return (
      // eslint-disable-next-line tfds/no-native-tag -- surface primitive, not a layout stack
      <div ref={ref} className={cn(cardVariants({ shadow, padding }))} {...props}>
        {children}
      </div>
    )
  },
)

Card.displayName = "Card"

export { Card, type CardProps }
