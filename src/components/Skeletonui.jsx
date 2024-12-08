import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonDemo({ count=10 }) {
  const skeletons = Array.from({ length: count });

  return (
    <div className="flex flex-wrap gap-6 mt-28 items-center justify-center">
      {skeletons.map((_, index) => (
        <div key={index} className="flex flex-col items-center space-y-4 mb-10 ">
          <Skeleton className="h-[125px] bg-slate-700 w-[250px] rounded-xl" />
          <Skeleton className="h-4 bg-slate-700 w-[250px]" />
          
        </div>
      ))}
    </div>
  );
}
