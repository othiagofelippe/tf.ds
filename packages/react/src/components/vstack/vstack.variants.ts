import { cva } from "class-variance-authority"
import { stackSharedVariants, stackSharedDefaultVariants } from "../stack-shared.variants"

export const vstackVariants = cva(["flex", "flex-col"], {
  variants: stackSharedVariants,
  defaultVariants: stackSharedDefaultVariants,
})
