import { forwardRef } from "react"
import { type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/cn"
import { inputVariants } from "./input.variants"

interface InputProps
  extends
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "className">,
    VariantProps<typeof inputVariants> {}

/** @experimental */
const Input = forwardRef<HTMLInputElement, InputProps>(({ size, status, ...props }, ref) => {
  return <input ref={ref} className={cn(inputVariants({ size, status }))} {...props} />
})

Input.displayName = "Input"

export { Input, type InputProps }
