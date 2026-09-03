import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-16 w-full rounded-md border border-gray-alpha-400 bg-gray-alpha-400/30 px-2.5 py-2 text-copy-16 transition-[color,box-shadow] outline-none placeholder:text-gray-900 focus-visible:border-gray-600 focus-visible:ring-3 focus-visible:ring-gray-600/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-red-800 aria-invalid:bg-red-100 aria-invalid:ring-3 aria-invalid:ring-red-800/20 md:text-copy-14",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
