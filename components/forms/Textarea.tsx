import * as React from "react";
import { cn } from "@/lib/utils";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  label?: string;
  maxLength?: number;
  showCount?: boolean;
  helperText?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      error,
      label,
      maxLength,
      showCount = true,
      helperText,
      id,
      required,
      ...props
    },
    ref
  ) => {
    const [charCount, setCharCount] = React.useState(
      props.value?.toString().length || props.defaultValue?.toString().length || 0
    );
    const textareaId = id || `textarea-${React.useId()}`;
    const errorId = `${textareaId}-error`;
    const helperId = `${textareaId}-helper`;
    const countId = `${textareaId}-count`;

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length);
      if (props.onChange) {
        props.onChange(e);
      }
    };

    const describedBy = [
      error ? errorId : null,
      helperText ? helperId : null,
      showCount && maxLength ? countId : null,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className="relative">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm/6 font-medium text-foreground-secondary mb-2"
          >
            {label}
            {required && <span className="text-error ml-1" aria-label="required">*</span>}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          maxLength={maxLength}
          className={cn(
            "font-sans text-base text-foreground",
            "block w-full rounded-md bg-background-secondary px-3 py-1.5",
            "outline outline-1 -outline-offset-1 outline-border",
            "placeholder:text-foreground-muted",
            "focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "outline-error pr-10",
            className
          )}
          aria-invalid={!!error}
          aria-required={required}
          aria-describedby={describedBy || undefined}
          onChange={handleChange}
          {...props}
        />
        {error && (
          <div className="absolute top-2 right-2 pointer-events-none">
            <ExclamationCircleIcon
              className="size-5 text-error"
              aria-hidden="true"
            />
          </div>
        )}
        <div className="mt-2 flex justify-between gap-2">
          <div className="flex-1">
            {error && (
              <p id={errorId} className="text-sm text-error" role="alert">
                {error}
              </p>
            )}
            {!error && helperText && (
              <p id={helperId} className="text-sm text-foreground-muted">
                {helperText}
              </p>
            )}
          </div>
          {showCount && maxLength && (
            <p
              id={countId}
              className={cn(
                "text-sm tabular-nums",
                charCount > maxLength * 0.9
                  ? "text-error"
                  : "text-foreground-muted"
              )}
              aria-live="polite"
            >
              {charCount}/{maxLength}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
