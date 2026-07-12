import { cva } from "class-variance-authority"
import { stackSharedVariants, stackSharedDefaultVariants } from "../stack-shared.variants"

export const gridVariants = cva(["grid"], {
  variants: {
    gap: stackSharedVariants.gap,
  },
  defaultVariants: {
    gap: stackSharedDefaultVariants.gap,
  },
})

export interface GridColsResponsive {
  base?: number
  sm?: number
  md?: number
  lg?: number
}

export type GridCols = number | GridColsResponsive

const baseColsMap: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
  7: "grid-cols-7",
  8: "grid-cols-8",
  9: "grid-cols-9",
  10: "grid-cols-10",
  11: "grid-cols-11",
  12: "grid-cols-12",
}

const smColsMap: Record<number, string> = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4",
  5: "sm:grid-cols-5",
  6: "sm:grid-cols-6",
  7: "sm:grid-cols-7",
  8: "sm:grid-cols-8",
  9: "sm:grid-cols-9",
  10: "sm:grid-cols-10",
  11: "sm:grid-cols-11",
  12: "sm:grid-cols-12",
}

const mdColsMap: Record<number, string> = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
  5: "md:grid-cols-5",
  6: "md:grid-cols-6",
  7: "md:grid-cols-7",
  8: "md:grid-cols-8",
  9: "md:grid-cols-9",
  10: "md:grid-cols-10",
  11: "md:grid-cols-11",
  12: "md:grid-cols-12",
}

const lgColsMap: Record<number, string> = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
  6: "lg:grid-cols-6",
  7: "lg:grid-cols-7",
  8: "lg:grid-cols-8",
  9: "lg:grid-cols-9",
  10: "lg:grid-cols-10",
  11: "lg:grid-cols-11",
  12: "lg:grid-cols-12",
}

export function resolveGridCols(cols: GridCols | undefined): string[] {
  if (cols === undefined) return []
  if (typeof cols === "number") {
    const cls = baseColsMap[cols]
    return cls ? [cls] : []
  }
  const classes: string[] = []
  const base = cols.base !== undefined ? baseColsMap[cols.base] : undefined
  const sm = cols.sm !== undefined ? smColsMap[cols.sm] : undefined
  const md = cols.md !== undefined ? mdColsMap[cols.md] : undefined
  const lg = cols.lg !== undefined ? lgColsMap[cols.lg] : undefined
  if (base) classes.push(base)
  if (sm) classes.push(sm)
  if (md) classes.push(md)
  if (lg) classes.push(lg)
  return classes
}
