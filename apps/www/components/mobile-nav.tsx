"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { siteConfig, isActiveHref } from "@/lib/config"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Nav,
  NavGroup,
  NavGroupLabel,
  NavItem,
  NavLink,
  NavList,
} from "@/components/ui/nav"

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
          <Nav size="lg" className="overflow-auto px-6 py-6">
            {siteConfig.navGroups.map((group) => (
              <NavGroup key={group.label}>
                <NavGroupLabel>{group.label}</NavGroupLabel>
                <NavList>
                  {group.items.map((item) => (
                    <NavItem key={item.href}>
                      <NavLink
                        active={isActiveHref(pathname, item.href)}
                        render={
                          <Link
                            href={item.href}
                            onClick={() => setOpen(false)}
                          />
                        }
                      >
                        {item.name}
                      </NavLink>
                    </NavItem>
                  ))}
                </NavList>
              </NavGroup>
            ))}
          </Nav>
        </div>
      )}
    </>
  )
}
