import { Skeleton } from "@/components/ui/skeleton"

function SkeletonAvatar() {
  return (
    <div className="flex items-center gap-4">
      <Skeleton className="size-6 rounded-full" />
      <Skeleton className="size-8 rounded-full" />
      <Skeleton className="size-10 rounded-full" />
    </div>
  )
}

export default SkeletonAvatar
