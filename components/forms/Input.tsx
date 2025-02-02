import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "font-sans text-base text-foreground",
        "block w-full rounded-md bg-background-secondary px-3 py-1.5",
        "outline outline-1 -outline-offset-1 outline-border",
        "placeholder:text-foreground-muted",
        "focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = "Input";

export { Input };
