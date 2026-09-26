"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { siteConfig, isActiveHref } from "@/lib/config"
import {
  Nav,
  NavGroup,
  NavGroupLabel,
  NavItem,
  NavLink,
  NavList,
} from "@/components/ui/nav"

export function SiteSidebar() {
  const pathname = usePathname()

  return (
    <aside className="sticky top-(--header-height) hidden h-[calc(100svh-var(--header-height))] w-60 shrink-0 lg:block">
      <Nav className="-mx-2 h-full scrollbar-none overflow-y-auto px-2 pt-(--content-top) pb-10">
        {siteConfig.navGroups.map((group) => (
          <NavGroup key={group.label}>
            <NavGroupLabel>{group.label}</NavGroupLabel>
            <NavList>
              {group.items.map((item) => (
                <NavItem key={item.href}>
                  <NavLink
                    active={isActiveHref(pathname, item.href)}
                    render={<Link href={item.href} />}
                  >
                    {item.name}
                  </NavLink>
                </NavItem>
              ))}
            </NavList>
          </NavGroup>
        ))}
      </Nav>
    </aside>
  )
}
