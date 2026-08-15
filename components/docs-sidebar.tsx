"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { siteConfig } from "@/lib/config"
import { Button } from "@/components/ui/button"

export function DocsSidebar() {
  const pathname = usePathname()

  return (
    <aside className="sticky top-(--header-height) hidden h-[calc(100svh-var(--header-height))] w-60 shrink-0 lg:block">
      <nav className="h-full scrollbar-none overflow-y-auto py-10">
        <SidebarGroup label="Foundation">
          {siteConfig.foundationItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === item.href
                : pathname.startsWith(item.href)

            return (
              <li key={item.href}>
                <Button
                  variant="ghost"
                  size="sm"
                  nativeButton={false}
                  render={
                    <Link
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                    />
                  }
                  className="text-label-14 text-gray-900 hover:text-gray-1000 aria-[current=page]:bg-gray-100 aria-[current=page]:text-gray-1000"
                >
                  {item.name}
                </Button>
              </li>
            )
          })}
        </SidebarGroup>
      </nav>
    </aside>
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
      <div className="text-label-13 flex h-8 items-center px-2 text-gray-900">
        {label}
      </div>
      <ul className="flex flex-col gap-0.5">{children}</ul>
    </div>
  )
}
