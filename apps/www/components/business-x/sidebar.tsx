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

type NavEntry = { title: string; href: string }
const nav: (NavEntry & { items?: NavEntry[] })[] = [
  { title: "Introduction", href: "/business-x" },
  {
    title: "Basics",
    href: "/business-x/basics",
    items: [
      { title: "Overview", href: "/business-x/basics" },
      { title: "Why X", href: "/business-x/basics/intro-x-for-business" },
      {
        title: "Get your business started with X",
        href: "/business-x/basics/get-your-business-started-with-x",
      },
    ],
  },
  {
    title: "Advertising",
    href: "/business-x/advertising",
    items: [
      { title: "Overview", href: "/business-x/advertising" },
      {
        title: "Get started",
        href: "/business-x/advertising/get-started-with-twitter-ads",
      },
      {
        title: "Best practices",
        href: "/business-x/advertising/creative-best-practices",
      },
      { title: "Measurement", href: "/business-x/advertising/measurement" },
      { title: "Success Stories", href: "/business-x/success-stories" },
    ],
  },
  {
    title: "Products",
    href: "/business-x/products",
    items: [
      { title: "Overview", href: "/business-x/products" },
      {
        title: "Vertical Video Ads",
        href: "/business-x/products/vertical-video-ads",
      },
      { title: "X Spaces", href: "/business-x/products/x-spaces" },
      {
        title: "Amplify Sponsorships",
        href: "/business-x/products/amplify-sponsorships",
      },
      { title: "X Shopping", href: "/business-x/products/shopping" },
      {
        title: "Timeline Takeovers",
        href: "/business-x/products/timeline-takeovers",
      },
      {
        title: "Spotlight Takeovers",
        href: "/business-x/products/spotlight-takeovers",
      },
    ],
  },
  { title: "Resources", href: "/business-x/resources" },
  { title: "Help Center", href: "/business-x/help" },
  { title: "Blog", href: "/business-x/blog" },
  { title: "Premium Business", href: "https://x.com/i/premium_business" },
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
        <React.Suspense fallback={null}>
          <RailLinks />
        </React.Suspense>
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

// One section open at a time: opening another closes the one before, and
// the section holding the current page starts open.
function RailLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()
  const current = (href: string) =>
    href === "/business-x"
      ? pathname === href
      : pathname === href || pathname.startsWith(`${href}/`)
  const within = (item: (typeof nav)[number]) =>
    item.items?.some((sub) => current(sub.href)) ?? false
  const [openSection, setOpenSection] = React.useState<string | null>(
    () => nav.find(within)?.title ?? null
  )

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
                  <NavSubItem key={sub.title}>
                    <NavLink
                      active={current(sub.href)}
                      render={<Link href={sub.href} onClick={onNavigate} />}
                    >
                      {sub.title}
                    </NavLink>
                  </NavSubItem>
                ))}
              </NavSub>
            </NavCollapsibleContent>
          </NavCollapsible>
        ) : (
          <NavItem key={item.title}>
            <NavLink
              active={current(item.href)}
              render={<Link href={item.href} onClick={onNavigate} />}
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
