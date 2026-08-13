import { siteConfig } from "@/lib/config"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { ModeSwitcher } from "@/components/mode-switcher"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background">
      <div className="mx-auto w-full px-6">
        <div className="flex h-(--header-height) items-center">
          <MobileNav className="flex lg:hidden" />
          <MainNav items={siteConfig.navItems} className="hidden lg:flex" />
          <div className="ml-auto flex items-center gap-2 md:flex-1 md:justify-end">
            <ModeSwitcher />
          </div>
        </div>
      </div>
    </header>
  )
}
