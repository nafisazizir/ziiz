import { Toaster as SonnerToaster } from "@/components/ui/sonner"
import { Toaster } from "@/components/ui/toast"
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
        <main className="min-w-0 flex-1">{children}</main>
      </div>
      {/* Both live here so a toast example fires from any component page. */}
      <Toaster />
      <SonnerToaster />
    </div>
  )
}
