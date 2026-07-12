import { forwardRef } from "react"
import { type VariantProps } from "class-variance-authority"
import { useAnalytics } from "@tfds/analytics"
import { cn } from "../../lib/cn"
import { inputVariants } from "./input.variants"

interface InputProps
  extends
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "className">,
    VariantProps<typeof inputVariants> {
  analyticsEnabled?: boolean
  analyticsCustomParams?: Record<string, unknown>
  screenName?: string
}

/** @experimental */
const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size,
      status,
      analyticsEnabled = true,
      analyticsCustomParams,
      screenName,
      onChange,
      ...props
    },
    ref,
  ) => {
    const { emit } = useAnalytics(
      screenName !== undefined
        ? { componentName: "input", screenName }
        : { componentName: "input" },
    )

    function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
      if (analyticsEnabled) {
        emit("component_change", analyticsCustomParams)
      }
      onChange?.(event)
    }

    return (
      <input
        ref={ref}
        className={cn(inputVariants({ size, status }))}
        onChange={handleChange}
        {...props}
      />
    )
  },
)

Input.displayName = "Input"

export { Input, type InputProps }
