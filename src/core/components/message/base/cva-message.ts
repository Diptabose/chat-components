import { cva } from "class-variance-authority";

export const message = cva(
  [
    "flex",
    "items-center",
    "gap-4",
    "p-2",
    "border",
    "border-slate-300",
    "shadow-md",
    "rounded-md",
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
