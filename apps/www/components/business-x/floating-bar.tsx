import Link from "next/link"

import { Button } from "@/components/ui/button"

// The pill business.x.com floats over the bottom of every page: two 36px
// actions in an 8px surface, centred on the article column (the rail's width
// is skipped from 768px) and 24px off the bottom edge.
export function FloatingBar() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40">
      <div className="mx-auto flex w-full max-w-360">
        <div className="hidden w-(--rail-width) shrink-0 md:block" />
        <div className="flex flex-1 justify-center pb-6">
          <div className="pointer-events-auto flex items-center gap-2 material-menu rounded-full p-2">
            <Button
              shape="rounded"
              nativeButton={false}
              render={<a href="https://ads.x.com" />}
            >
              Get started
            </Button>
            <Button
              shape="rounded"
              variant="secondary"
              nativeButton={false}
              render={<Link href="/business-x/advertising#contact" />}
            >
              Talk to an expert
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
