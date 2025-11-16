import { cva } from "class-variance-authority";

export const headingVariants = cva("font-semibold", {
  variants: {
    intent: {
      primary: "text-white",
      secondary: "text-gray-200",
      muted: "text-gray-400",
    },
    size: {
      sm: "text-sm/6",
      base: "text-base/7",
      lg: "text-lg/8",
    },
  },
  defaultVariants: {
    intent: "primary",
    size: "base",
  },
});
