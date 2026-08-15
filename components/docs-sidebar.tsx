"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { siteConfig } from "@/lib/config"
import { Button } from "@/components/ui/button"

export function DocsSidebar() {
  const pathname = usePathname()

  return (
    <aside className="sticky top-(--header-height) hidden h-[calc(100svh-var(--header-height))] w-60 shrink-0 lg:block">
      <nav className="-mx-2 h-full scrollbar-none overflow-y-auto px-2 py-10">
        <SidebarGroup label="Foundation">
          {siteConfig.foundationItems.map((item) => (
            <SidebarItem key={item.href} item={item} pathname={pathname} />
          ))}
        </SidebarGroup>
        <SidebarGroup label="Components">
          {siteConfig.componentItems.map((item) => (
            <SidebarItem key={item.href} item={item} pathname={pathname} />
          ))}
        </SidebarGroup>
      </nav>
    </aside>
  )
}

function SidebarItem({
  item,
  pathname,
}: {
  item: { name: string; href: string }
  pathname: string
}) {
  const isActive =
    item.href === "/" ? pathname === item.href : pathname.startsWith(item.href)

  return (
    <li>
      <Button
        variant="ghost"
        size="sm"
        nativeButton={false}
        render={
          <Link href={item.href} aria-current={isActive ? "page" : undefined} />
        }
        className="text-label-14 text-gray-900 hover:text-gray-1000 aria-[current=page]:bg-gray-100 aria-[current=page]:text-gray-1000"
      >
        {item.name}
      </Button>
    </li>
  )
}

function SidebarGroup({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1 pb-6">
      <div className="flex h-8 items-center px-2 text-label-13 text-gray-900">
        {label}
      </div>
      <ul className="flex flex-col gap-0.5">{children}</ul>
    </div>
  )
}
