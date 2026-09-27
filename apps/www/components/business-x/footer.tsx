"use client"

import * as React from "react"
import { useTheme } from "next-themes"

import { XcomWordmark } from "@/components/art/sections/xcom-wordmark"
import { XText } from "@/components/business-x/runs"
import {
  IconChevronDown,
  IconDeviceDesktop,
  IconMoon,
  IconSun,
} from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

// business.x.com's footer, on every page under the article. Five link
// groups in a three-column grid from 1024px (two columns below), a 160px
// column beside them for the theme picker, the language button and the
// copyright, and the x.com wordmark drawn as line art under everything.
// Below 1024px the groups lead, the wordmark comes next, and the copyright,
// theme and language rows close the page.
const groups = [
  {
    title: ">x< Platform",
    links: [
      { label: ">x<.com", href: "https://x.com" },
      { label: "Status", href: "https://docs.x.com/status" },
      {
        label: "Accessibility",
        href: "https://help.x.com/resources/accessibility",
      },
      { label: "Embed a post", href: "https://publish.x.com" },
      { label: "Privacy center", href: "https://privacy.x.com" },
      { label: "Transparency center", href: "https://transparency.x.com" },
      { label: "Download the >x< app", href: "https://x.com/download" },
      { label: "Try Grok.com", href: "https://grok.com" },
    ],
  },
  {
    title: ">x< Corp",
    links: [
      { label: "About the company", href: "https://about.x.com" },
      { label: "Company news", href: "https://blog.x.com" },
      {
        label: "Brand toolkit",
        href: "https://about.x.com/en/who-we-are/brand-toolkit",
      },
      { label: "Jobs and internships", href: "https://careers.x.com" },
      { label: "Investors", href: "https://investor.x.com" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Help Center", href: "https://help.x.com" },
      { label: "Using >x<", href: "https://help.x.com/using-x" },
      {
        label: "Managing your account",
        href: "https://help.x.com/managing-your-account",
      },
      {
        label: "Rules and policies",
        href: "https://help.x.com/rules-and-policies",
      },
      { label: "Contact us", href: "https://help.x.com/forms" },
    ],
  },
  {
    title: "Developer resources",
    links: [
      { label: "Developer home", href: "https://developer.x.com" },
      { label: "Documentation", href: "https://docs.x.com" },
      { label: "Forums", href: "https://devcommunity.x.com" },
      { label: "Communities", href: "https://developer.x.com/en/community" },
      { label: "Engineering blog", href: "https://blog.x.com/engineering" },
      {
        label: "Developer terms",
        href: "https://developer.x.com/en/developer-terms",
      },
    ],
  },
  {
    title: "Business resources",
    links: [
      { label: "Advertise", href: "https://ads.x.com" },
      { label: ">x< for business", href: "/business-x" },
      { label: "Resources and guides", href: "/business-x/resources" },
    ],
  },
]

const languages = ["English", "日本語", "Español", "Português", "Français"]

export function Footer() {
  return (
    <footer className="border-t border-gray-alpha-400 px-4.5 pt-25 pb-4.5 lg:px-6 lg:pt-16 lg:pb-8">
      <div className="flex w-full flex-col gap-16 lg:gap-24">
        <div className="flex flex-col gap-20 lg:flex-row lg:gap-8">
          <div className="order-2 flex w-full flex-col gap-3 lg:order-1 lg:w-40 lg:shrink-0 lg:gap-4">
            <XcomWordmark className="w-full text-gray-1000 lg:hidden" />
            <p className="order-3 text-copy-13 text-gray-900 lg:order-4 lg:text-label-12 lg:text-gray-700">
              <XText>{"© 2026 >x< Corp."}</XText>
            </p>
            <div className="order-4 mt-5 flex w-full items-end justify-between lg:order-3 lg:-mt-1 lg:flex-1 lg:flex-col lg:items-start lg:gap-8">
              <ThemePicker />
              <LanguageMenu />
            </div>
          </div>
          <nav
            aria-label="Footer"
            className="order-1 grid w-full grid-cols-2 gap-x-8 gap-y-14 lg:order-2 lg:flex-1 lg:grid-cols-3 lg:gap-y-10"
          >
            {groups.map((group) => (
              <div key={group.title} className="flex flex-col gap-3 lg:gap-4">
                <h2 className="text-label-16 text-gray-1000 lg:text-label-13">
                  <XText>{group.title}</XText>
                </h2>
                <ul className="flex flex-col gap-1">
                  {group.links.map((link) => (
                    <li key={link.label} className="flex min-h-6 items-center">
                      <a
                        href={link.href}
                        className="text-copy-16 text-gray-900 transition-colors hover:text-gray-1000 lg:text-copy-13"
                      >
                        <XText>{link.label}</XText>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <XcomWordmark className="hidden w-full text-gray-1000 lg:block" />
      </div>
    </footer>
  )
}

const themes = [
  { value: "system", label: "System theme", Icon: IconDeviceDesktop },
  { value: "light", label: "Light theme", Icon: IconSun },
  { value: "dark", label: "Dark theme", Icon: IconMoon },
]

// The picker reads the theme after hydration; until then it shows System so
// the server and the client agree.
function ThemePicker() {
  const { theme, setTheme } = useTheme()
  const mounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )
  const value = mounted ? (theme ?? "system") : "system"

  return (
    <ToggleGroup
      aria-label="Theme"
      value={[value]}
      onValueChange={(next) => {
        const [choice] = next
        if (typeof choice === "string") setTheme(choice)
      }}
      size="sm"
      className="lg:gap-2"
    >
      {themes.map((item) => (
        <ToggleGroupItem
          key={item.value}
          value={item.value}
          aria-label={item.label}
          className="size-9 min-w-0 px-0 lg:size-8"
        >
          <item.Icon />
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}

function LanguageMenu() {
  const [language, setLanguage] = React.useState("English")
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="outline" shape="rounded" size="sm" />}
      >
        {language}
        <IconChevronDown data-icon="inline-end" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" side="top">
        <DropdownMenuRadioGroup
          value={language}
          onValueChange={(next) => setLanguage(next as string)}
        >
          {languages.map((item) => (
            <DropdownMenuRadioItem key={item} value={item}>
              {item}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
