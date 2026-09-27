import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

function SkeletonText() {
  return (
    <div className="w-full max-w-xs text-copy-14">
      {["w-full", "w-full", "w-3/4"].map((width, index) => (
        <div key={index} className="flex h-[1lh] items-center">
          <Skeleton className={cn("h-[0.75em]", width)} />
        </div>
      ))}
    </div>
  )
}

export default SkeletonText
