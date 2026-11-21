"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  IconArchive,
  IconChevronDown,
  IconClock,
  IconDevices,
  IconDots,
  IconFilter2,
  IconFolder,
  IconHelpCircle,
  IconLanguage,
  IconLayoutGrid,
  IconLogout,
  IconMessageCircle,
  IconPalette,
  IconPencil,
  IconPin,
  IconPinnedOff,
  IconPlug,
  IconPlus,
  IconSearch,
  IconSettings,
  IconSparkles,
  IconStack2,
  IconTrash,
} from "@tabler/icons-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { BASE, CHATS, USER, type Chat } from "./data"
import { useShell } from "./shell"

/* Measured from claude.ai (2026-11-20): a 293px sidebar on its own surface.
 * Header: toggle and wordmark. Seven nav rows with
 * icons, then collapsible Pinned (rows with a chat icon) and Recents (text
 * only, ending in View all). Footer: a compact account button and an apps
 * button. */

const NAV = [
  { href: `${BASE}/projects`, label: "Projects", icon: IconStack2 },
  { href: `${BASE}/artifacts`, label: "Artifacts", icon: IconLayoutGrid },
  { href: `${BASE}/scheduled`, label: "Scheduled", icon: IconClock },
  { href: `${BASE}/design`, label: "Design", icon: IconPalette },
  { href: `${BASE}/plugins`, label: "Plugins", icon: IconPlug },
]

const RECENTS = 10

export function AppSidebar() {
  const pathname = usePathname()
  const { openSearch } = useShell()
  const pinned = CHATS.filter((c) => c.pinned)

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader className="flex-row items-center gap-1 px-3 pt-2">
        <SidebarTrigger />
        <Link href={BASE} className="text-heading-16 text-gray-1000">
          Claude
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="New chat"
                isActive={pathname === BASE}
                render={<Link href={BASE} />}
              >
                <IconPlus />
                <span>New</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Search" onClick={openSearch}>
                <IconSearch />
                <span>Search</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            {NAV.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  tooltip={item.label}
                  isActive={pathname.startsWith(item.href)}
                  render={<Link href={item.href} />}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
                {item.label === "Scheduled" ? (
                  <SidebarMenuAction showOnHover title="New task">
                    <IconPlus />
                  </SidebarMenuAction>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <Section label="Pinned">
          <ChatList chats={pinned} pathname={pathname} icon />
        </Section>

        <Section label="Recents" action={<RecentsFilter />}>
          <ChatList chats={CHATS.slice(0, RECENTS)} pathname={pathname} />
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                isActive={pathname === `${BASE}/recents`}
                render={<Link href={`${BASE}/recents`} />}
                className="text-gray-900"
              >
                <span>View all</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </Section>
      </SidebarContent>

      <SidebarFooter className="flex-row items-center justify-between border-t border-gray-alpha-400">
        <AccountMenu />
        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="Get apps and extensions"
              />
            }
          >
            <IconDevices />
          </TooltipTrigger>
          <TooltipContent>Get apps and extensions</TooltipContent>
        </Tooltip>
      </SidebarFooter>
    </Sidebar>
  )
}

function Section({
  label,
  action,
  children,
}: {
  label: string
  action?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <Collapsible defaultOpen className="group/section">
      <SidebarGroup>
        <SidebarMenu>
          <SidebarMenuItem>
            <CollapsibleTrigger
              render={
                <SidebarMenuButton className="text-label-12 text-gray-900 [&_svg]:size-3.5" />
              }
            >
              <span>{label}</span>
              <IconChevronDown className="-ms-1 -rotate-90 transition-transform duration-200 group-data-open/section:rotate-0" />
            </CollapsibleTrigger>
            {action}
          </SidebarMenuItem>
        </SidebarMenu>
        <CollapsibleContent>
          <SidebarGroupContent>{children}</SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  )
}

function RecentsFilter() {
  const [group, setGroup] = React.useState("date")
  const [show, setShow] = React.useState("all")
  return (
    <DropdownMenu size="sm">
      <Tooltip>
        <TooltipTrigger
          render={
            <DropdownMenuTrigger
              render={
                <SidebarMenuAction aria-label="Filter and group recents" />
              }
            />
          }
        >
          <IconFilter2 />
        </TooltipTrigger>
        <TooltipContent>Filter and group recents</TooltipContent>
      </Tooltip>
      <DropdownMenuContent side="right" align="start" className="w-48">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Group by</DropdownMenuLabel>
          <DropdownMenuRadioGroup value={group} onValueChange={setGroup}>
            <DropdownMenuRadioItem value="date">Date</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="project">
              Project
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="none">None</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Show</DropdownMenuLabel>
          <DropdownMenuRadioGroup value={show} onValueChange={setShow}>
            <DropdownMenuRadioItem value="all">All chats</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="unpinned">
              Hide pinned
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function ChatList({
  chats,
  pathname,
  icon = false,
}: {
  chats: Chat[]
  pathname: string
  icon?: boolean
}) {
  return (
    <SidebarMenu>
      {chats.map((chat) => (
        <SidebarMenuItem key={chat.id}>
          <SidebarMenuButton
            isActive={pathname === `${BASE}/chat/${chat.id}`}
            render={<Link href={`${BASE}/chat/${chat.id}`} />}
          >
            {icon ? <IconMessageCircle /> : null}
            <span>{chat.title}</span>
          </SidebarMenuButton>
          <ChatMenu chat={chat} />
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}

function ChatMenu({ chat }: { chat: Chat }) {
  return (
    <DropdownMenu size="sm">
      <DropdownMenuTrigger
        render={
          <SidebarMenuAction
            showOnHover
            title={`More options for ${chat.title}`}
          />
        }
      >
        <IconDots />
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" align="start" className="w-48">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            {chat.pinned ? <IconPinnedOff /> : <IconPin />}
            {chat.pinned ? "Unpin" : "Pin"}
          </DropdownMenuItem>
          <DropdownMenuItem>
            <IconPencil />
            Rename
          </DropdownMenuItem>
          <DropdownMenuItem>
            <IconFolder />
            Add to project
          </DropdownMenuItem>
          <DropdownMenuItem>
            <IconArchive />
            Archive
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <IconTrash />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function AccountMenu() {
  const { openSettings } = useShell()
  const [language, setLanguage] = React.useState("en-US")

  return (
    <DropdownMenu size="sm">
      <DropdownMenuTrigger
        render={<Button variant="ghost" size="sm" className="ps-1.5 pe-2.5" />}
      >
        <Avatar size="sm">
          <AvatarFallback>{USER.name[0]}</AvatarFallback>
        </Avatar>
        <span>
          {USER.name}
          <span className="text-gray-900"> · {USER.plan}</span>
        </span>
        <IconChevronDown className="text-gray-900" />
      </DropdownMenuTrigger>
      <DropdownMenuContent side="top" align="start" className="w-60">
        <DropdownMenuGroup>
          <DropdownMenuLabel>{USER.email}</DropdownMenuLabel>
          <DropdownMenuItem onClick={openSettings}>
            <IconSettings />
            Settings
            <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <IconLanguage />
              Language
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup
                  value={language}
                  onValueChange={setLanguage}
                >
                  <DropdownMenuRadioItem value="en-US">
                    English (United States)
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="fr-FR">
                    Français (France)
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="ja-JP">
                    日本語
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="id-ID">
                    Bahasa Indonesia
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>
            <IconHelpCircle />
            Get help
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <IconSparkles />
            View all plans
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <IconLogout />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
