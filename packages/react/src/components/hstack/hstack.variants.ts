import { cva } from "class-variance-authority"
import { stackSharedVariants, stackSharedDefaultVariants } from "../stack-shared.variants"

export const hstackVariants = cva(["flex", "flex-row"], {
  variants: {
    ...stackSharedVariants,
    wrap: {
      true: "flex-wrap",
      false: "",
    },
  },
  defaultVariants: {
    ...stackSharedDefaultVariants,
    wrap: false,
  },
})
