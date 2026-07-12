import { forwardRef } from "react"
import { type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/cn"
import { vstackVariants } from "./vstack.variants"

type VStackElement =
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

interface VStackProps
  extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof vstackVariants> {
  as?: VStackElement
}

/** @experimental */
const VStack = forwardRef<HTMLElement, VStackProps>(
  ({ as: Tag = "div", gap, align, justify, className, children, ...props }, ref) => {
    return (
      <Tag
        ref={ref as React.RefCallback<HTMLElement>}
        className={cn(vstackVariants({ gap, align, justify }), className)}
        {...props}
      >
        {children}
      </Tag>
    )
  },
)

VStack.displayName = "VStack"

export { VStack, type VStackProps }
