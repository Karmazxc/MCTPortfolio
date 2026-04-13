import { ProjectsSkeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto px-6 py-24 max-w-6xl min-h-screen">
      <div className="text-center mb-16">
        <div className="h-10 bg-[#1E293B] rounded w-64 mx-auto mb-4 animate-pulse"></div>
        <div className="h-4 bg-[#1E293B] rounded w-96 mx-auto animate-pulse"></div>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-16">
        {["All", "Web", "Mobile", "Thesis Systems"].map((cat, i) => (
          <div key={i} className="h-12 w-24 bg-[#1E293B] rounded-xl animate-pulse"></div>
        ))}
      </div>

      <ProjectsSkeleton count={6} />
    </div>
  );
}
