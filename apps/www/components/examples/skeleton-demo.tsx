import { Skeleton } from "@/components/ui/skeleton"

function SkeletonDemo() {
  return (
    <div className="flex items-center gap-3">
      <Skeleton className="size-8 shrink-0 rounded-full" />
      <div className="flex flex-col">
        <div className="flex h-[1lh] items-center text-label-14">
          <Skeleton className="h-[0.75em] w-32" />
        </div>
        <div className="flex h-[1lh] items-center text-label-13">
          <Skeleton className="h-[0.75em] w-20" />
        </div>
      </div>
    </div>
  )
}

export default SkeletonDemo
