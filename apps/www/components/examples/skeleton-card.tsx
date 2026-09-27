import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

function SkeletonCard() {
  return (
    <Card className="w-full max-w-xs">
      <CardHeader>
        <CardTitle className="flex h-[1lh] items-center">
          <Skeleton className="h-[0.75em] w-2/3" />
        </CardTitle>
        <CardDescription className="flex h-[1lh] items-center">
          <Skeleton className="h-[0.75em] w-1/2" />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Skeleton className="aspect-video w-full" />
      </CardContent>
    </Card>
  )
}

export default SkeletonCard
