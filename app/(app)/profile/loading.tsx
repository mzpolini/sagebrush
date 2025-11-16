export default function ProfileLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="animate-pulse">
        {/* Navigation skeleton */}
        <nav className="flex gap-4 py-4">
          <div className="h-8 w-24 bg-gray-200 rounded"></div>
          <div className="h-8 w-20 bg-gray-200 rounded"></div>
          <div className="h-8 w-24 bg-gray-200 rounded"></div>
          <div className="h-8 w-24 bg-gray-200 rounded"></div>
        </nav>

        {/* Content skeleton */}
        <div className="mt-8 space-y-6">
          <div className="h-8 w-48 bg-gray-200 rounded"></div>
          <div className="h-4 w-full bg-gray-200 rounded"></div>
          <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
          <div className="h-64 w-full bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
}
