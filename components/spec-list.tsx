import { cn } from "@/lib/utils"

/** Vertical list of specimen rows, as used by the foundations docs pages. */
export function SpecList({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("mt-4 flex flex-col", className)} {...props} />
}

export function SpecRow({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("border-b py-5 last:border-b-0", className)}
      {...props}
    />
  )
}

/** The prose note describing when to reach for a specimen. */
export function SpecUsage({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      className={cn("mt-2 text-copy-13 text-gray-900", className)}
      {...props}
    />
  )
}

/** The token or utility class a specimen resolves to. */
export function SpecToken({
  className,
  ...props
}: React.ComponentProps<"code">) {
  return (
    <code
      className={cn("text-label-13-mono text-gray-900", className)}
      {...props}
    />
  )
}
