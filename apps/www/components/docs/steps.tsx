import { cn } from "@/lib/utils"

// A numbered procedure. Each Step is a heading that carries the counter in
// its margin; everything between two Steps belongs to the first. The
// heading takes Heading 16 and its own rhythm so the typeset's section gaps
// stay out of a procedure.
function Steps({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="steps"
      className={cn(
        "relative mt-(--typeset-flow,1.5rem) mb-12 ml-3 border-l border-gray-alpha-400 pl-8 [counter-reset:step]",
        className
      )}
      {...props}
    />
  )
}

function Step({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="step"
      className={cn(
        "mt-10 text-heading-16 text-gray-1000 [counter-increment:step] not-first:mt-10 first:mt-0",
        "before:absolute before:-left-4 before:inline-flex before:size-8 before:-translate-y-1 before:items-center before:justify-center before:rounded-full before:border before:border-gray-alpha-400 before:bg-background-100 before:text-label-13 before:text-gray-900 before:content-[counter(step)]",
        className
      )}
      {...props}
    />
  )
}

export { Steps, Step }
