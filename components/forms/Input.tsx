"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
  helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, label, helperText, id, required, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || `input-${generatedId}`;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

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
            htmlFor={inputId}
            className="block text-sm/6 font-medium text-foreground-secondary mb-2"
          >
            {label}
            {required && <span className="text-error ml-1" aria-label="required">*</span>}
          </label>
        )}
        <div className="relative">
          <input
            id={inputId}
            type={type}
            className={cn(
              "font-sans text-base text-foreground",
              "block w-full rounded-md bg-background-secondary px-3 py-1.5",
              "outline outline-1 -outline-offset-1 outline-border",
              "placeholder:text-foreground-muted",
              "focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "sm:text-sm/6",
              error && "outline-error pr-10",
              className
            )}
            aria-invalid={!!error}
            aria-required={required}
            aria-describedby={describedBy || undefined}
            ref={ref}
            {...props}
          />
          {error && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <ExclamationCircleIcon
                className="size-5 text-error"
                aria-hidden="true"
              />
            </div>
          )}
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

Input.displayName = "Input";

export { Input };
