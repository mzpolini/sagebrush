import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
  label?: string;
  helperText?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, label, helperText, id, required, children, ...props }, ref) => {
    const generatedId = React.useId();
    const selectId = id || `select-${generatedId}`;
    const errorId = `${selectId}-error`;
    const helperId = `${selectId}-helper`;

    const describedBy = [
      error ? errorId : null,
      helperText ? helperId : null,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div>
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm/6 font-medium text-foreground-secondary mb-2"
          >
            {label}
            {required && <span className="text-error ml-1" aria-label="required">*</span>}
          </label>
        )}
        <div className="relative">
          <div className="grid grid-cols-1">
            <select
              id={selectId}
              ref={ref}
              className={cn(
                "col-start-1 row-start-1 w-full appearance-none rounded-md bg-background-secondary py-1.5 pl-3 pr-8",
                "text-base text-foreground outline outline-1 -outline-offset-1 outline-border",
                "focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary",
                "disabled:cursor-not-allowed disabled:opacity-50",
                "sm:text-sm/6",
                error && "outline-error",
                className
              )}
              aria-invalid={!!error}
              aria-required={required}
              aria-describedby={describedBy || undefined}
              {...props}
            >
              {children}
            </select>
            <ChevronDownIcon
              aria-hidden="true"
              className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-foreground-muted sm:size-4"
            />
            {error && (
              <div className="absolute inset-y-0 right-8 flex items-center pointer-events-none">
                <ExclamationCircleIcon
                  className="size-5 text-error"
                  aria-hidden="true"
                />
              </div>
            )}
          </div>
        </div>
        {error && (
          <p id={errorId} className="mt-2 text-sm text-error" role="alert">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p id={helperId} className="mt-2 text-sm text-foreground-muted">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export { Select };
