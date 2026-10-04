"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

import {
  IconArrowUpRight,
  IconBook2,
  IconCurrencyDollar,
  IconSelector,
} from "@tabler/icons-react"

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
import { XText } from "@/components/business-x/runs"
import {
  siteKeys,
  sites,
  type NavEntry,
  type SiteKey,
} from "@/components/business-x/sites"
import { XLogo } from "@/components/business-x/x-logo"

const icons: Record<
  SiteKey,
  (props: { className?: string }) => React.ReactNode
> = {
  business: XLogo,
  money: IconCurrencyDollar,
  help: IconBook2,
}

// x.com's rail is the first column of a centred frame, not pinned to the
// viewport edge: a sticky, full-height column the width of --rail-width.
export function SiteRail({ site }: { site: SiteKey }) {
  return (
    <Nav
      aria-label="Primary"
      className="sticky top-0 hidden h-svh w-(--rail-width) shrink-0 gap-6 px-5 py-6 md:flex"
    >
      <NavHeader>
        <SiteSwitcher site={site} />
      </NavHeader>
      <NavContent>
        <React.Suspense fallback={null}>
          <RailLinks site={site} />
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
export function SiteMobileNav({ site }: { site: SiteKey }) {
  const [open, setOpen] = React.useState(false)
  const Icon = icons[site]

  return (
    <>
      <header className="sticky top-0 z-50 flex h-14 items-center gap-2 bg-background-100 px-6 md:hidden">
        <Icon className="size-4" />
        <Separator
          orientation="vertical"
          className="h-3 data-vertical:self-center"
        />
        <span className="text-label-14">{sites[site].name}</span>
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
            <RailLinks site={site} onNavigate={() => setOpen(false)} />
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
// the section holding the current page starts open. A site's first link is
// its landing, current only on that exact path; a link to a section of the
// landing (#features) or off the clone is never current.
function RailLinks({
  site,
  onNavigate,
}: {
  site: SiteKey
  onNavigate?: () => void
}) {
  const pathname = usePathname()
  const { href: home, nav } = sites[site]
  const current = (entry: NavEntry) =>
    entry.external || entry.href.includes("#")
      ? false
      : entry.href === home
        ? pathname === home
        : pathname === entry.href ||
          pathname.startsWith(`${entry.href}/`) ||
          (entry.match?.some((prefix) => pathname.startsWith(prefix)) ?? false)
  const within = (item: (typeof nav)[number]) =>
    item.items?.some((sub) => current(sub)) ?? false
  const [openSection, setOpenSection] = React.useState<string | null>(
    () => nav.find(within)?.title ?? null
  )
  const link = (entry: NavEntry) =>
    entry.external ? (
      <a
        href={entry.href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onNavigate}
      />
    ) : (
      <Link href={entry.href} onClick={onNavigate} />
    )
  const label = (entry: NavEntry) => (
    <>
      <XText>{entry.title}</XText>
      {entry.external && (
        <>
          <IconArrowUpRight aria-hidden className="size-3.5" />
          <span className="sr-only">(opens in new tab)</span>
        </>
      )}
    </>
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
                    <NavLink active={current(sub)} render={link(sub)}>
                      {label(sub)}
                    </NavLink>
                  </NavSubItem>
                ))}
              </NavSub>
            </NavCollapsibleContent>
          </NavCollapsible>
        ) : (
          <NavItem key={item.title}>
            <NavLink active={current(item)} render={link(item)}>
              {label(item)}
            </NavLink>
          </NavItem>
        )
      )}
    </NavList>
  )
}

// "X | Business" with a chevron pair: it switches between the company's
// sites, each named with its domain and the current one ticked.
function SiteSwitcher({ site }: { site: SiteKey }) {
  const router = useRouter()
  const Icon = icons[site]

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
        <Icon className="size-4" />
        <Separator
          orientation="vertical"
          className="h-3 data-vertical:self-center"
        />
        {sites[site].name}
        <IconSelector className="ml-auto text-gray-900" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        side="bottom"
        className="w-auto min-w-(--anchor-width)"
      >
        <DropdownMenuRadioGroup
          value={site}
          onValueChange={(next) => router.push(sites[next as SiteKey].href)}
        >
          {siteKeys.map((key) => {
            const SiteIcon = icons[key]
            return (
              <DropdownMenuRadioItem key={key} value={key}>
                <Item size="xs">
                  <ItemMedia className="m-auto">
                    <SiteIcon className="size-5" />
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>{sites[key].name}</ItemTitle>
                    <ItemDescription>{sites[key].domain}</ItemDescription>
                  </ItemContent>
                </Item>
              </DropdownMenuRadioItem>
            )
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
