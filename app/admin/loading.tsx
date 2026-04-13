export default function Loading() {
  return (
    <div className="container mx-auto px-6 py-24 max-w-7xl min-h-screen">
      {/* Header Skeleton */}
      <div className="mb-12">
        <div className="h-10 bg-[#1E293B] rounded w-64 mb-4 animate-pulse"></div>
        <div className="h-4 bg-[#1E293B] rounded w-96 animate-pulse"></div>
      </div>

      {/* Tabs Skeleton */}
      <div className="flex gap-4 mb-8 overflow-x-auto">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-10 w-32 bg-[#1E293B] rounded-lg flex-shrink-0 animate-pulse"></div>
        ))}
      </div>

      {/* Content Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="card-styled p-6 animate-pulse">
            <div className="h-4 bg-[#1E293B] rounded w-1/4 mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-[#1E293B] rounded w-full"></div>
              <div className="h-4 bg-[#1E293B] rounded w-3/4"></div>
              <div className="h-4 bg-[#1E293B] rounded w-1/2"></div>
            </div>
            <div className="flex gap-2 mt-4">
              <div className="h-8 bg-[#1E293B] rounded flex-1"></div>
              <div className="h-8 bg-[#1E293B] rounded flex-1"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
