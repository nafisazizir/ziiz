import { cn } from "@/lib/utils"

export function DocsPageHeader({
  title,
  description,
}: {
  title: string
  description: React.ReactNode
}) {
  return (
    <>
      <h1 className="scroll-m-24 text-heading-40 tracking-tighter">{title}</h1>
      <DocsParagraph className="mt-4">{description}</DocsParagraph>
    </>
  )
}

export function DocsHeading({
  className,
  ...props
}: React.ComponentProps<"h2">) {
  return (
    <h2
      className={cn("mt-12 scroll-m-24 text-heading-24", className)}
      {...props}
    />
  )
}

export function DocsSubheading({
  className,
  ...props
}: React.ComponentProps<"h3">) {
  return (
    <h3
      className={cn("mt-6 scroll-m-24 text-heading-16", className)}
      {...props}
    />
  )
}

export function DocsParagraph({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return <p className={cn("mt-3 text-gray-900", className)} {...props} />
}

export function DocsList({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      className={cn("mt-3 list-disc space-y-2 pl-5 text-gray-900", className)}
      {...props}
    />
  )
}

export function InlineCode({
  className,
  ...props
}: React.ComponentProps<"code">) {
  return (
    <code
      className={cn(
        "rounded-sm bg-gray-100 px-1 py-0.5 text-copy-13-mono",
        className
      )}
      {...props}
    />
  )
}
