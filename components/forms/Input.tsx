import * as React from "react";
import { cn } from "@/lib/utils";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          type={type}
          className={cn(
            "font-sans text-base text-foreground",
            "block w-full rounded-md bg-background-secondary px-3 py-1.5",
            "outline outline-1 -outline-offset-1 outline-border",
            "placeholder:text-foreground-muted",
            "focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "outline-error",
            className
          )}
          aria-invalid={!!error}
          ref={ref}
          {...props}
        />
        {error && (
          <>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <ExclamationCircleIcon
                className="size-5 text-error"
                aria-hidden="true"
              />
            </div>
            <p className="mt-2 text-sm text-error">{error}</p>
          </>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
