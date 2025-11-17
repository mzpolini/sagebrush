"use client";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4 bg-white rounded-lg shadow-md p-8">
        <div className="text-center">
          <svg
            className="mx-auto h-16 w-16 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2 className="mt-4 text-2xl font-bold text-gray-900">
            Dashboard Error
          </h2>
          <p className="mt-2 text-gray-600">
            {error.message || "Failed to load dashboard data"}
          </p>
          <p className="mt-1 text-sm text-gray-500">
            This might be a temporary issue. Please try again.
          </p>
        </div>
        <button
          onClick={reset}
          className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium"
        >
          Reload Dashboard
        </button>
      </div>
    </div>
  );
}
