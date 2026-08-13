"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"

const FOUNDATION = [{ name: "Introduction", href: "/" }]

export function DocsSidebar() {
  const pathname = usePathname()

  return (
    <aside className="sticky top-(--header-height) hidden h-[calc(100svh-var(--header-height))] w-60 shrink-0 lg:block">
      <nav className="h-full scrollbar-none overflow-y-auto py-10">
        <SidebarGroup label="Foundation">
          {FOUNDATION.map((item) => {
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
                  className="text-foreground/80 aria-[current=page]:bg-accent aria-[current=page]:text-accent-foreground"
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
      <div className="flex h-8 items-center px-2 text-xs font-medium text-muted-foreground">
        {label}
      </div>
      <ul className="flex flex-col gap-0.5">{children}</ul>
    </div>
  )
}
