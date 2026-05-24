import { forwardRef } from "react"
import { type LucideIcon, type LucideProps } from "lucide-react"

export function createIcon(Icon: LucideIcon): LucideIcon {
  const WrappedIcon = forwardRef<SVGSVGElement, LucideProps>(({ size = 16, ...props }, ref) => (
    <Icon ref={ref} size={size} {...props} />
  ))

  WrappedIcon.displayName = Icon.displayName ?? Icon.name

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  return WrappedIcon as unknown as LucideIcon
}
