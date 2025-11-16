export default function DashboardLoading() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="animate-pulse space-y-6">
        {/* Title skeleton */}
        <div className="h-8 w-48 bg-gray-200 rounded"></div>

        {/* Cards skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Profile Completion Card */}
          <div className="bg-gray-50 rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="h-6 w-40 bg-gray-200 rounded mb-4"></div>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-4"></div>
            <div className="h-4 w-32 bg-gray-200 rounded mb-4"></div>
            <div className="space-y-3">
              <div className="h-6 bg-gray-200 rounded"></div>
              <div className="h-6 bg-gray-200 rounded"></div>
              <div className="h-6 bg-gray-200 rounded"></div>
            </div>
          </div>

          {/* Viability Score Card */}
          <div className="bg-gray-50 rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="h-6 w-40 bg-gray-200 rounded mb-4"></div>
            <div className="flex justify-center mb-6">
              <div className="w-40 h-40 bg-gray-200 rounded-full"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-200 rounded"></div>
              <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>

        {/* Recommendations Card */}
        <div className="bg-gray-50 rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="h-6 w-64 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
