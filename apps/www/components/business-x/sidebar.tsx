"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { HugeiconsIcon } from "@hugeicons/react"
import { Book02Icon, Dollar01Icon } from "@hugeicons/core-free-icons"

import { ChevronsUpDown } from "@/components/icons"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import {
  Nav,
  NavCollapsible,
  NavCollapsibleContent,
  NavCollapsibleTrigger,
  NavContent,
  NavFooter,
  NavHeader,
  NavItem,
  NavLink,
  NavList,
  NavSub,
  NavSubItem,
} from "@/components/ui/nav"
import { Separator } from "@/components/ui/separator"
import { XLogo } from "@/components/business-x/x-logo"

// The rail on business.x.com, verbatim: three sections expand, the rest are
// plain links. Every href is a stub; this is a look-and-feel clone.
const sites = [
  { name: "Business", domain: "business.x.com", icon: XLogo },
  { name: "Money", domain: "money.x.com", icon: MoneyIcon },
  { name: "Help Center", domain: "help.x.com", icon: HelpIcon },
]

const nav: { title: string; items?: string[] }[] = [
  { title: "Introduction" },
  {
    title: "Basics",
    items: ["Overview", "Why X", "Get your business started with X"],
  },
  {
    title: "Advertising",
    items: [
      "Overview",
      "Get started",
      "Best practices",
      "Measurement",
      "Success Stories",
    ],
  },
  {
    title: "Products",
    items: [
      "Overview",
      "Vertical Video Ads",
      "X Spaces",
      "Amplify Sponsorships",
      "X Shopping",
      "Timeline Takeovers",
      "Spotlight Takeovers",
    ],
  },
  { title: "Resources" },
  { title: "Help Center" },
  { title: "Blog" },
  { title: "Premium Business" },
]

// x.com's rail is the first column of a centred frame, not pinned to the
// viewport edge: a sticky, full-height column the width of --rail-width.
export function BusinessRail() {
  return (
    <Nav
      aria-label="Primary"
      className="sticky top-0 hidden h-svh w-(--rail-width) shrink-0 gap-6 px-5 py-6 md:flex"
    >
      <NavHeader>
        <SiteSwitcher />
      </NavHeader>
      <NavContent>
        <RailLinks />
      </NavContent>
      <NavFooter>
        <Button shape="rounded" variant="outline" size="sm" className="w-fit">
          Sign In
        </Button>
      </NavFooter>
    </Nav>
  )
}

// Below md the rail is gone; a bar opens the same links full screen, one type
// role louder, the docs site's own mobile pattern.
export function BusinessMobileNav() {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <header className="sticky top-0 z-50 flex h-14 items-center gap-2 bg-background-100 px-6 md:hidden">
        <XLogo className="size-4" />
        <Separator
          orientation="vertical"
          className="h-3 data-vertical:self-center"
        />
        <span className="text-label-14">Business</span>
        <Button
          variant="ghost"
          size="sm"
          shape="rounded"
          aria-expanded={open}
          onClick={() => setOpen((open) => !open)}
          className="ml-auto"
        >
          {open ? "Close" : "Menu"}
        </Button>
      </header>
      {open && (
        <div className="fixed inset-x-0 top-14 bottom-0 z-50 overflow-y-auto bg-background-100 md:hidden">
          <Nav size="lg" aria-label="Primary" className="px-6 py-6">
            <RailLinks onNavigate={() => setOpen(false)} />
            <Button shape="rounded" variant="outline" className="w-fit">
              Sign In
            </Button>
          </Nav>
        </div>
      )}
    </>
  )
}

// Where the clone's plain links go. Anything not listed is a stub.
const routes: Record<string, string> = {
  Introduction: "/business-x",
  Blog: "/business-x/blog",
}

// One section open at a time: opening another closes the one before.
function RailLinks({ onNavigate }: { onNavigate?: () => void }) {
  const [openSection, setOpenSection] = React.useState<string | null>(null)
  const pathname = usePathname()
  const isActive = (title: string) => {
    const route = routes[title]
    if (!route) return false
    return route === "/business-x"
      ? pathname === route
      : pathname === route || pathname.startsWith(`${route}/`)
  }

  return (
    <NavList>
      {nav.map((item) =>
        item.items ? (
          <NavCollapsible
            key={item.title}
            open={openSection === item.title}
            onOpenChange={(open) => setOpenSection(open ? item.title : null)}
          >
            <NavCollapsibleTrigger>{item.title}</NavCollapsibleTrigger>
            <NavCollapsibleContent>
              <NavSub>
                {item.items.map((sub) => (
                  <NavSubItem key={sub}>
                    <NavLink render={<Link href="#" onClick={onNavigate} />}>
                      {sub}
                    </NavLink>
                  </NavSubItem>
                ))}
              </NavSub>
            </NavCollapsibleContent>
          </NavCollapsible>
        ) : (
          <NavItem key={item.title}>
            <NavLink
              active={isActive(item.title)}
              render={
                <Link href={routes[item.title] ?? "#"} onClick={onNavigate} />
              }
            >
              {item.title}
            </NavLink>
          </NavItem>
        )
      )}
    </NavList>
  )
}

// "X | Business" with a chevron pair: on x.com it switches between the
// company's sites, each named with its domain and the current one ticked.
function SiteSwitcher() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="sm"
            shape="rounded"
            className="w-full justify-start aria-expanded:bg-transparent"
          />
        }
      >
        <XLogo className="size-4" />
        <Separator
          orientation="vertical"
          className="h-3 data-vertical:self-center"
        />
        Business
        <ChevronsUpDown className="ml-auto text-gray-900" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        side="bottom"
        className="w-auto min-w-(--anchor-width)"
      >
        <DropdownMenuRadioGroup defaultValue="Business">
          {sites.map((site) => (
            <DropdownMenuRadioItem key={site.name} value={site.name}>
              <Item size="xs">
                <ItemMedia className="m-auto">
                  <site.icon className="size-5" />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>{site.name}</ItemTitle>
                  <ItemDescription>{site.domain}</ItemDescription>
                </ItemContent>
              </Item>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function MoneyIcon({ className }: { className?: string }) {
  return <HugeiconsIcon icon={Dollar01Icon} className={className} />
}

function HelpIcon({ className }: { className?: string }) {
  return <HugeiconsIcon icon={Book02Icon} className={className} />
}
