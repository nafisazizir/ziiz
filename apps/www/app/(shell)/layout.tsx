import { Toaster as SonnerToaster } from "@/components/ui/sonner"
import { Toaster } from "@/components/ui/toast"
import { SiteSidebar } from "@/components/site-sidebar"
import { SiteHeader } from "@/components/site-header"
import { EdgeFade } from "@/components/edge-fade"

// The shell every page shares: the sidebar is the site's navigation, so it
// frames the blog and the playground as much as the docs. The right rail is
// not here: only a docs page has a table of contents, and DocsPage renders
// its own.
//
// --content-top is where the sidebar's first row starts. The toc, a docs
// title and the blog hero's headline all hang off it, so their cap lines
// stay level with the sidebar's whatever the value.
export default function ShellLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-h-svh bg-background [--content-top:--spacing(10)]">
      <SiteHeader />
      <EdgeFade side="top" />
      <div className="flex w-full items-start px-6">
        <SiteSidebar />
        <main className="min-w-0 flex-1">{children}</main>
      </div>
      <EdgeFade side="bottom" />
      {/* Both live here so a toast example fires from any component page. */}
      <Toaster />
      <SonnerToaster />
    </div>
  )
}
