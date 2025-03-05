import { cva } from "class-variance-authority";

export const message_aligment = cva([], {
  variants: {
    type: {
      user: "",
      assistant: "",
    },
    align: {
      sequential: "",
      extreme: "self-end",
    },
  },
  compoundVariants: [
    {
      type: "user",
      align: "sequential",
      className: "w-full",
    },
    {
      type: "user",
      align: "extreme",
      className: "self-end flex flex-row-reverse w-fit max-w-3/4",
    },
    {
      type: "assistant",
      align: "sequential",
      className: "w-full",
    },
    {
      type: "assistant",
      align: "extreme",
      className: "self-start w-fit max-w-3/4",
    },
  ],
  defaultVariants: {
    align: "sequential",
  },
});
