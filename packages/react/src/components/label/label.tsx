import { forwardRef } from "react"
import { type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/cn"
import { labelVariants } from "./label.variants"

interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>, VariantProps<typeof labelVariants> {}

/** @experimental */
const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ size, disabled, className, children, ...props }, ref) => {
    return (
      <label ref={ref} className={cn(labelVariants({ size, disabled }), className)} {...props}>
        {children}
      </label>
    )
  },
)

Label.displayName = "Label"

export { Label, type LabelProps }
