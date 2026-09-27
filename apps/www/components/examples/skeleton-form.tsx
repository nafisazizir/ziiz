import { Skeleton } from "@/components/ui/skeleton"

function SkeletonForm() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-7">
      {["w-20", "w-24"].map((width, index) => (
        <div key={index} className="flex flex-col gap-3">
          <div className="flex h-[1lh] items-center text-label-14">
            <Skeleton className={`h-[0.75em] ${width}`} />
          </div>
          <Skeleton className="h-9 w-full" />
        </div>
      ))}
      <Skeleton className="h-9 w-20" />
    </div>
  )
}

export default SkeletonForm
