import { forwardRef } from "react"
import { type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/cn"
import { hstackVariants } from "./hstack.variants"

type HStackElement =
  | "div"
  | "section"
  | "article"
  | "aside"
  | "nav"
  | "header"
  | "footer"
  | "main"
  | "ul"
  | "ol"

interface HStackProps
  extends
    Omit<React.HTMLAttributes<HTMLElement>, "className">,
    VariantProps<typeof hstackVariants> {
  as?: HStackElement
}

/** @experimental */
const HStack = forwardRef<HTMLElement, HStackProps>(
  ({ as: Tag = "div", gap, align, justify, wrap, children, ...props }, ref) => {
    return (
      <Tag
        ref={ref as React.RefCallback<HTMLElement>}
        className={cn(hstackVariants({ gap, align, justify, wrap }))}
        {...props}
      >
        {children}
      </Tag>
    )
  },
)

HStack.displayName = "HStack"

export { HStack, type HStackProps }
