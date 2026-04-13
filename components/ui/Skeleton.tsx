/**
 * Reusable skeleton loading components for better UX during data fetching.
 */

export function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div className={`card-styled p-8 border-white/5 animate-pulse ${className}`}>
      <div className="h-48 bg-[#1E293B] rounded-xl mb-4"></div>
      <div className="h-6 bg-[#1E293B] rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-[#1E293B] rounded w-1/2 mb-4"></div>
      <div className="flex gap-2">
        <div className="h-5 bg-[#1E293B] rounded-full w-16"></div>
        <div className="h-5 bg-[#1E293B] rounded-full w-20"></div>
        <div className="h-5 bg-[#1E293B] rounded-full w-14"></div>
      </div>
    </div>
  );
}

export function SkeletonText({ lines = 3, className = "" }: { lines?: number; className?: string }) {
  return (
    <div className={`space-y-2 animate-pulse ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 bg-[#1E293B] rounded"
          style={{ width: `${100 - (i * 15)}%` }}
        ></div>
      ))}
    </div>
  );
}

export function SkeletonCircle({ size = "md", className = "" }: { size?: "sm" | "md" | "lg"; className?: string }) {
  const sizes = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  return (
    <div className={`${sizes[size]} rounded-full bg-[#1E293B] animate-pulse ${className}`}></div>
  );
}

export function ProjectsSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export function TestimonialsSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="card-styled p-8 border-white/5 animate-pulse">
          <div className="flex gap-1 mb-4">
            {Array.from({ length: 5 }).map((_, j) => (
              <div key={j} className="w-4 h-4 bg-[#1E293B] rounded"></div>
            ))}
          </div>
          <div className="space-y-2 mb-6">
            <div className="h-4 bg-[#1E293B] rounded w-full"></div>
            <div className="h-4 bg-[#1E293B] rounded w-5/6"></div>
            <div className="h-4 bg-[#1E293B] rounded w-4/6"></div>
          </div>
          <div className="border-t border-white/5 pt-6 flex items-center gap-4">
            <SkeletonCircle size="md" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-[#1E293B] rounded w-1/2"></div>
              <div className="h-3 bg-[#1E293B] rounded w-2/3"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
