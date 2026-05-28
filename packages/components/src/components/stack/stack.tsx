import { forwardRef } from "react"
import { type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/cn"
import { stackVariants } from "./stack.variants"

type StackElement =
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

interface StackProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "className">, VariantProps<typeof stackVariants> {
  as?: StackElement
}

/** @experimental */
const Stack = forwardRef<HTMLElement, StackProps>(
  ({ as: Tag = "div", gap, align, justify, children, ...props }, ref) => {
    return (
      <Tag
        ref={ref as React.RefCallback<HTMLElement>}
        className={cn(stackVariants({ gap, align, justify }))}
        {...props}
      >
        {children}
      </Tag>
    )
  },
)

Stack.displayName = "Stack"

export { Stack, type StackProps }
