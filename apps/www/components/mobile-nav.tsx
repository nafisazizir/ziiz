"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { siteConfig, type NavItem } from "@/lib/config"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function MobileNav({ className }: { className?: string }) {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()

  return (
    <>
      <Button
        variant="ghost"
        onClick={() => setOpen((open) => !open)}
        className={cn(
          "extend-touch-target h-8 touch-manipulation items-center justify-start gap-2.5 p-0! text-label-18 text-gray-1000 hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 active:bg-transparent dark:hover:bg-transparent",
          className
        )}
      >
        <div className="relative flex h-8 w-4 items-center justify-center">
          <div className="relative size-4">
            <span
              className={cn(
                "absolute left-0 block h-0.5 w-4 bg-gray-1000 transition-all duration-100",
                open ? "top-[0.4rem] -rotate-45" : "top-1"
              )}
            />
            <span
              className={cn(
                "absolute left-0 block h-0.5 w-4 bg-gray-1000 transition-all duration-100",
                open ? "top-[0.4rem] rotate-45" : "top-2.5"
              )}
            />
          </div>
          <span className="sr-only">Toggle Menu</span>
        </div>
      </Button>
      {open && (
        <div className="fixed inset-x-0 top-(--header-height) bottom-0 z-50 scrollbar-none overflow-y-auto bg-background-100">
          {/* The same groups the sidebar renders, in the same order — below lg
              this is the only navigation, so it carries every page. */}
          <div className="flex flex-col gap-12 overflow-auto px-6 py-6">
            {siteConfig.navGroups.map((group) => (
              <div key={group.label} className="flex flex-col gap-4">
                {/* The rail's ranking, at mobile sizes: the heading holds the
                    top of the ramp, its items sit a step below. */}
                <div className="text-heading-16 text-gray-1000">
                  {group.label}
                </div>
                <ul className="flex flex-col gap-3">
                  {group.items.map((item) => (
                    <MobileItem
                      key={item.href}
                      item={item}
                      pathname={pathname}
                      onOpenChange={setOpen}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

function MobileItem({
  item,
  pathname,
  onOpenChange,
}: {
  item: NavItem
  pathname: string
  onOpenChange: (open: boolean) => void
}) {
  // Same rule as the sidebar: a blog post keeps its group's entry marked.
  const isActive =
    pathname === item.href ||
    (item.href !== "/" && pathname.startsWith(`${item.href}/`))

  return (
    <li>
      {/* The sidebar item, one type role louder — the ghost button carries the
          focus ring and the hover ramp so both rails share one signature. */}
      <Button
        variant="ghost"
        nativeButton={false}
        render={
          <Link
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            onClick={() => onOpenChange(false)}
          />
        }
        className="h-auto w-full justify-start p-0 text-heading-24 text-gray-900 hover:bg-transparent active:scale-100 active:bg-transparent aria-[current=page]:text-gray-1000"
      >
        {item.name}
      </Button>
    </li>
  )
}
