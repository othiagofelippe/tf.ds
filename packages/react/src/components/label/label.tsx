import { forwardRef } from "react"
import { type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/cn"
import { labelVariants } from "./label.variants"

interface LabelProps
  extends
    Omit<React.LabelHTMLAttributes<HTMLLabelElement>, "className">,
    VariantProps<typeof labelVariants> {}

/** @experimental */
const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ size, disabled, children, ...props }, ref) => {
    return (
      <label ref={ref} className={cn(labelVariants({ size, disabled }))} {...props}>
        {children}
      </label>
    )
  },
)

Label.displayName = "Label"

export { Label, type LabelProps }
