import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

const rows = [
  ["w-24", "w-16", "w-12"],
  ["w-20", "w-16", "w-14"],
  ["w-28", "w-16", "w-12"],
  ["w-24", "w-16", "w-10"],
]

function Line({ className }: { className: string }) {
  return (
    <div className="flex h-[1lh] items-center">
      <Skeleton className={cn("h-[0.75em]", className)} />
    </div>
  )
}

function SkeletonTable() {
  return (
    <div className="w-full max-w-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Line className="w-16" />
            </TableHead>
            <TableHead>
              <Line className="w-12" />
            </TableHead>
            <TableHead>
              <Line className="w-14" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((cells, index) => (
            <TableRow key={index}>
              {cells.map((width, cell) => (
                <TableCell key={cell}>
                  <Line className={width} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default SkeletonTable
