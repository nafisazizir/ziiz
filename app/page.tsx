import { DocsSidebar } from "@/components/docs-sidebar"
import { SiteHeader } from "@/components/site-header"

export default function Page() {
  return (
    <div className="min-h-svh bg-background">
      <SiteHeader />
      <div className="flex w-full items-start px-6">
        <DocsSidebar />
        <main className="min-w-0 flex-1">
          <article className="mx-auto w-full max-w-2xl px-1 py-10 text-[15px] leading-7 lg:px-8">
            <h1 className="scroll-m-24 text-3xl font-semibold tracking-tight">
              Introduction
            </h1>
          </article>
        </main>
        <div className="hidden w-60 shrink-0 lg:block" />
      </div>
    </div>
  )
}
