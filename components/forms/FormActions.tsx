"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface FormActionsProps {
  onCancel?: () => void;
  submitText?: string;
  cancelText?: string;
  isSubmitting?: boolean;
  isSticky?: boolean;
  isDirty?: boolean;
}

export function FormActions({
  onCancel,
  submitText = "Save",
  cancelText = "Cancel",
  isSubmitting = false,
  isSticky = true,
  isDirty = false,
}: FormActionsProps) {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    if (!isSticky) return;

    const handleScroll = () => {
      // Show sticky bar when scrolled down more than 100px
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isSticky]);

  return (
    <>
      {/* Sticky top bar */}
      {isSticky && (
        <div
          className={cn(
            "fixed top-0 left-0 right-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-transform duration-200",
            isVisible ? "translate-y-0" : "-translate-y-full"
          )}
          role="region"
          aria-label="Form actions"
        >
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {isDirty && (
                  <span className="text-sm text-foreground-muted">
                    Unsaved changes
                  </span>
                )}
              </div>
              <div className="flex items-center gap-x-3">
                <button
                  type="button"
                  onClick={onCancel}
                  className="btn-secondary text-sm"
                  disabled={isSubmitting}
                >
                  {cancelText}
                </button>
                <button
                  type="submit"
                  className="btn-primary text-sm"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : submitText}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom actions */}
      <div className="mt-6 flex items-center justify-end gap-x-6 border-t border-border pt-6">
        <button
          type="button"
          onClick={onCancel}
          className="btn-secondary"
          disabled={isSubmitting}
        >
          {cancelText}
        </button>
        <button
          type="submit"
          className="btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : submitText}
        </button>
      </div>
    </>
  );
}
