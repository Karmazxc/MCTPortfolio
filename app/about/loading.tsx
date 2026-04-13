export default function Loading() {
  return (
    <div className="container mx-auto px-6 py-24 max-w-7xl min-h-screen">
      {/* Hero Section Skeleton */}
      <div className="text-center mb-16">
        <div className="h-12 bg-[#1E293B] rounded w-80 mx-auto mb-4 animate-pulse"></div>
        <div className="h-4 bg-[#1E293B] rounded w-96 mx-auto animate-pulse"></div>
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="card-styled p-6 text-center animate-pulse">
            <div className="h-8 bg-[#1E293B] rounded w-16 mx-auto mb-2"></div>
            <div className="h-3 bg-[#1E293B] rounded w-24 mx-auto"></div>
          </div>
        ))}
      </div>

      {/* Timeline Skeleton */}
      <div className="space-y-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex gap-6 animate-pulse">
            <div className="w-12 h-12 bg-[#1E293B] rounded-full flex-shrink-0"></div>
            <div className="flex-1 space-y-2">
              <div className="h-5 bg-[#1E293B] rounded w-48"></div>
              <div className="h-4 bg-[#1E293B] rounded w-full"></div>
              <div className="h-4 bg-[#1E293B] rounded w-2/3"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
