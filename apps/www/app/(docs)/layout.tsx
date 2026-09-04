import { DocsSidebar } from "@/components/docs-sidebar"
import { SiteHeader } from "@/components/site-header"

export default function DocsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-h-svh bg-background">
      <SiteHeader />
      <div className="flex w-full items-start px-6">
        <DocsSidebar />
        <main className="min-w-0 flex-1">
          <div className="mx-auto w-full max-w-2xl px-1 py-10 lg:px-8">
            {children}
          </div>
        </main>
        <div className="hidden w-60 shrink-0 lg:block" />
      </div>
    </div>
  )
}
