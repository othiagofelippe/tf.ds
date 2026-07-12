import { forwardRef } from "react"
import { type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/cn"
import { gridVariants, resolveGridCols, type GridCols } from "./grid.variants"

type GridElement =
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

interface GridProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof gridVariants> {
  as?: GridElement
  cols?: GridCols
}

/** @experimental */
const Grid = forwardRef<HTMLElement, GridProps>(
  ({ as: Tag = "div", gap, cols, className, children, ...props }, ref) => {
    return (
      <Tag
        ref={ref as React.RefCallback<HTMLElement>}
        className={cn(gridVariants({ gap }), resolveGridCols(cols), className)}
        {...props}
      >
        {children}
      </Tag>
    )
  },
)

Grid.displayName = "Grid"

export { Grid, type GridProps }
