"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { CheckCircleIcon, XCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";

export interface ToastProps {
  id: string;
  title?: string;
  description?: string;
  type?: "success" | "error" | "info";
  duration?: number;
  onClose?: () => void;
}

interface ToastContextType {
  toasts: ToastProps[];
  addToast: (toast: Omit<ToastProps, "id">) => void;
  removeToast: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(
  undefined
);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastProps[]>([]);

  const addToast = React.useCallback(
    (toast: Omit<ToastProps, "id">) => {
      const id = Math.random().toString(36).substring(7);
      const newToast = { ...toast, id };
      setToasts((prev) => [...prev, newToast]);

      // Auto remove after duration
      if (toast.duration !== 0) {
        setTimeout(() => {
          removeToast(id);
        }, toast.duration || 5000);
      }
    },
    []
  );

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}

function ToastContainer({
  toasts,
  onClose,
}: {
  toasts: ToastProps[];
  onClose: (id: string) => void;
}) {
  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="pointer-events-none fixed inset-0 z-50 flex flex-col items-end justify-end gap-2 p-4 sm:p-6"
    >
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onClose={() => onClose(toast.id)} />
      ))}
    </div>
  );
}

function Toast({ title, description, type = "info", onClose }: ToastProps) {
  return (
    <div
      role="alert"
      className={cn(
        "pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg shadow-lg ring-1",
        "bg-background",
        type === "success" && "ring-green-500/20",
        type === "error" && "ring-red-500/20",
        type === "info" && "ring-border"
      )}
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className="shrink-0">
            {type === "success" && (
              <CheckCircleIcon
                className="h-6 w-6 text-green-500"
                aria-hidden="true"
              />
            )}
            {type === "error" && (
              <XCircleIcon
                className="h-6 w-6 text-red-500"
                aria-hidden="true"
              />
            )}
          </div>
          <div className="ml-3 w-0 flex-1 pt-0.5">
            {title && (
              <p className="text-sm font-medium text-foreground">{title}</p>
            )}
            {description && (
              <p className="mt-1 text-sm text-foreground-muted">
                {description}
              </p>
            )}
          </div>
          <div className="ml-4 flex shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex rounded-md bg-background text-foreground-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <span className="sr-only">Close</span>
              <XMarkIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
