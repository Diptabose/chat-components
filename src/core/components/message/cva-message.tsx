import { cva } from "class-variance-authority";

export const message = cva(
  [
    "flex",
    "items-center",
    "gap-2",
    "p-2",
    "cursor-pointer",
    "border",
    "border-slate-300",
    "shadow-md",
    "rounded-md",
    "w-fit",
    "max-w-3/4",
  ],
  {
    variants: {
      iconPlacement: {
        start: "flex",
        end: "flex flex-row-reverse",
      },
    },
    defaultVariants: {
      iconPlacement: "end",
    },
  }
);
