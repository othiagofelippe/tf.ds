import { cva } from "class-variance-authority"

export const stackVariants = cva(["flex flex-col"], {
  variants: {
    gap: {
      "0": "gap-0",
      "0.5": "gap-0.5",
      "1": "gap-1",
      "1.5": "gap-1.5",
      "2": "gap-2",
      "2.5": "gap-2.5",
      "3": "gap-3",
      "3.5": "gap-3.5",
      "4": "gap-4",
      "5": "gap-5",
      "6": "gap-6",
      "7": "gap-7",
      "8": "gap-8",
      "9": "gap-9",
      "10": "gap-10",
      "12": "gap-12",
      "14": "gap-14",
      "16": "gap-16",
      "20": "gap-20",
      "24": "gap-24",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
    },
  },
  defaultVariants: {
    gap: "0",
    align: "stretch",
    justify: "start",
  },
})
