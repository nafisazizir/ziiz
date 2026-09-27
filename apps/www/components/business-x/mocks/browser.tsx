import { cn } from "@/lib/utils"

// A desktop window inset into a panel, its top left corner showing and the
// rest bleeding off the bottom right, the way x.com frames Ads Manager.
// Three dots stand for the window controls.
export function Browser({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "absolute top-6 right-0 bottom-0 left-6 flex flex-col overflow-hidden bg-background-100 lg:top-15 lg:left-17",
        className
      )}
    >
      <div className="flex h-8 shrink-0 items-center gap-1.5 px-3">
        <span className="size-2 bg-gray-200" />
        <span className="size-2 bg-gray-200" />
        <span className="size-2 bg-gray-200" />
      </div>
      <div className="relative min-h-0 flex-1 overflow-hidden pl-3">
        {children}
      </div>
    </div>
  )
}
