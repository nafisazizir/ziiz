import { MobileNav } from "@/components/mobile-nav"

// Only below lg. On a wide viewport the sidebar carries the whole navigation,
// so there is no bar to render.
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background lg:hidden">
      <div className="mx-auto w-full px-6">
        <div className="flex h-(--header-height) items-center">
          <MobileNav className="ml-auto" />
        </div>
      </div>
    </header>
  )
}
