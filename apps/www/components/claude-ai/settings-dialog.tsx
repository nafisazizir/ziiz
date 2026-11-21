"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import {
  IconBell,
  IconBriefcase,
  IconChartBar,
  IconChevronDown,
  IconCode,
  IconCopy,
  IconCreditCard,
  IconDeviceDesktop,
  IconHeart,
  IconMoon,
  IconPalette,
  IconPlug,
  IconSearch,
  IconShieldLock,
  IconSparkles,
  IconSun,
  IconUser,
  IconX,
} from "@tabler/icons-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldSeparator,
  FieldTitle,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { cn } from "@/lib/utils"

import { USER } from "./data"

/* Measured from claude.ai (2026-11-20): a 1024px dialog the height of the
 * window, a hairlined 44px header, a 212px nav column with a filled search
 * and filled-when-current rows, then sections of 52px rows split by
 * hairlines. Every choice is a ghost dropdown showing its value; fields are
 * filled; buttons are secondary. */

const SECTIONS = [
  [
    { id: "account", label: "Account", icon: IconUser },
    { id: "billing", label: "Billing", icon: IconCreditCard },
    { id: "usage", label: "Usage", icon: IconChartBar },
  ],
  [
    { id: "appearance", label: "Appearance", icon: IconPalette },
    { id: "your-claude", label: "Your Claude", icon: IconSparkles },
    { id: "capabilities", label: "Capabilities", icon: IconBriefcase },
    { id: "notifications", label: "Notifications", icon: IconBell },
    { id: "privacy", label: "Privacy", icon: IconShieldLock },
    { id: "wellbeing", label: "Wellbeing", icon: IconHeart },
  ],
  [
    { id: "plugins", label: "Plugins", icon: IconPlug },
    { id: "code", label: "Code", icon: IconCode },
  ],
]

const PANELS: Record<string, () => React.ReactNode> = {
  account: Account,
  billing: Billing,
  usage: Usage,
  appearance: Appearance,
  "your-claude": YourClaude,
  capabilities: Capabilities,
  notifications: Notifications,
  privacy: Privacy,
  wellbeing: Wellbeing,
  plugins: Plugins,
  code: Code,
}

export function SettingsDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [query, setQuery] = React.useState("")
  const search = React.useRef<HTMLInputElement>(null)
  const q = query.trim().toLowerCase()
  const groups = SECTIONS.map((group) =>
    group.filter((s) => s.label.toLowerCase().includes(q))
  ).filter((group) => group.length)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        initialFocus={search}
        className="h-[calc(100svh-2rem)] max-h-[50rem] grid-rows-[auto_1fr] gap-0 overflow-hidden p-0 sm:max-w-5xl"
      >
        <header className="flex h-11 items-center justify-between border-b border-gray-alpha-400 ps-4 pe-2">
          <DialogTitle className="text-heading-16">Settings</DialogTitle>
          <DialogDescription className="sr-only">
            Account, appearance and capability settings
          </DialogDescription>
          <DialogClose
            render={
              <Button variant="ghost" size="icon-sm" aria-label="Close" />
            }
          >
            <IconX />
          </DialogClose>
        </header>
        <Tabs
          defaultValue="account"
          orientation="vertical"
          className="min-h-0 gap-0 max-sm:flex-col"
        >
          <div className="flex w-53 shrink-0 flex-col gap-3 overflow-y-auto border-e border-gray-alpha-400 p-4 max-sm:max-h-48 max-sm:w-full max-sm:border-e-0 max-sm:border-b">
            <InputGroup size="sm" variant="secondary">
              <InputGroupAddon>
                <IconSearch />
              </InputGroupAddon>
              <InputGroupInput
                ref={search}
                aria-label="Search settings"
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </InputGroup>
            <TabsList className="w-full border-transparent p-0">
              {groups.map((group, i) => (
                <React.Fragment key={group[0].id}>
                  {i > 0 ? <Separator className="my-2 w-auto" /> : null}
                  {group.map((s) => (
                    <TabsTrigger
                      key={s.id}
                      value={s.id}
                      className="h-8 flex-none"
                    >
                      <s.icon data-icon="inline-start" />
                      {s.label}
                    </TabsTrigger>
                  ))}
                </React.Fragment>
              ))}
            </TabsList>
          </div>
          {Object.entries(PANELS).map(([id, Panel]) => (
            <TabsContent
              key={id}
              value={id}
              className="min-h-0 overflow-y-auto px-4 pt-4 pb-10"
            >
              <div className="flex flex-col gap-10">
                <Panel />
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

function Section({
  title,
  action,
  children,
}: {
  title: string
  action?: React.ReactNode
  children: React.ReactNode
}) {
  const rows = React.Children.toArray(children)
  return (
    <section className="flex flex-col gap-3">
      <div className="flex min-h-8 items-center justify-between gap-4">
        <h3 className="text-heading-16 text-gray-1000">{title}</h3>
        {action}
      </div>
      <div className="flex flex-col gap-3">
        {rows.map((row, i) => (
          <React.Fragment key={i}>
            {i > 0 ? <FieldSeparator /> : null}
            {row}
          </React.Fragment>
        ))}
      </div>
    </section>
  )
}

/** A label and description on the left, its control on the right. */
function Row({
  id,
  label,
  description,
  inset = false,
  children,
}: {
  id?: string
  label: string
  description?: React.ReactNode
  inset?: boolean
  children?: React.ReactNode
}) {
  return (
    <Field
      orientation="horizontal"
      className={cn(
        "items-center justify-between has-[>[data-slot=field-content]]:items-center",
        inset && "ps-4"
      )}
    >
      <FieldContent>
        {id ? (
          <FieldLabel htmlFor={id}>{label}</FieldLabel>
        ) : (
          <FieldTitle>{label}</FieldTitle>
        )}
        {description ? (
          <FieldDescription>{description}</FieldDescription>
        ) : null}
      </FieldContent>
      {children}
    </Field>
  )
}

/** A choice that shows its value: a ghost button opening a small menu. */
function Choice({
  label,
  items,
  defaultValue,
}: {
  label: string
  items: { label: string; value: string }[]
  defaultValue?: string
}) {
  const [value, setValue] = React.useState(defaultValue ?? "")
  const current = items.find((item) => item.value === value)
  return (
    <DropdownMenu size="sm">
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="sm"
            aria-label={label}
            className={current ? "shrink-0" : "shrink-0 text-gray-900"}
          />
        }
      >
        {current?.label ?? "Select"}
        <IconChevronDown data-icon="inline-end" className="text-gray-900" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuGroup>
          <DropdownMenuRadioGroup value={value} onValueChange={setValue}>
            {items.map((item) => (
              <DropdownMenuRadioItem key={item.value} value={item.value}>
                {item.label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function Toggle({
  id,
  label,
  description,
  defaultChecked,
  inset,
}: {
  id: string
  label: string
  description: string
  defaultChecked?: boolean
  inset?: boolean
}) {
  return (
    <Row id={id} label={label} description={description} inset={inset}>
      <Switch id={id} defaultChecked={defaultChecked} />
    </Row>
  )
}

const WORK = [
  { label: "Software engineering", value: "engineering" },
  { label: "Design", value: "design" },
  { label: "Product management", value: "product" },
  { label: "Research", value: "research" },
  { label: "Other", value: "other" },
]

const DEVICES = [
  [
    "Chrome (macOS)",
    "Brisbane, QLD, AU",
    "Oct 29, 9:08 PM",
    "Nov 20, 5:22 PM",
    true,
  ],
  [
    "Claude Desktop (macOS)",
    "Brisbane, QLD, AU",
    "Oct 26, 5:47 PM",
    "Nov 20, 2:31 PM",
  ],
  ["Safari (iOS)", "Brisbane, QLD, AU", "Oct 25, 12:06 AM", "Nov 18, 8:40 AM"],
  ["Claude Code", "Unknown", "Unknown", "Nov 20, 2:48 PM"],
] as const

function Account() {
  return (
    <>
      <Section title="Profile">
        <Row label="Profile photo" description="PNG, JPEG or WebP, up to 10MB.">
          <Avatar size="lg">
            <AvatarFallback>{USER.name[0]}</AvatarFallback>
          </Avatar>
        </Row>
        <Row id="full-name" label="Full name">
          <Input
            id="full-name"
            size="sm"
            variant="secondary"
            defaultValue={USER.fullName}
            className="w-56 shrink-0"
          />
        </Row>
        <Row id="call-you" label="What should Claude call you?">
          <Input
            id="call-you"
            size="sm"
            variant="secondary"
            defaultValue={USER.name}
            className="w-56 shrink-0"
          />
        </Row>
        <Row label="What best describes your work?">
          <Choice label="What best describes your work?" items={WORK} />
        </Row>
        <Row label="Organization ID">
          <span className="flex min-w-0 items-center gap-1 text-label-14 text-gray-900">
            <span className="truncate">
              5f1c0e2a-7b3d-4c9e-a1f0-2d6e8b4c7a91
            </span>
            <Button
              variant="ghost"
              size="icon-xs"
              aria-label="Copy organization ID"
            >
              <IconCopy />
            </Button>
          </span>
        </Row>
      </Section>
      <Section
        title="Where you’re logged in"
        action={
          <Button variant="secondary" size="sm">
            Log out of all devices
          </Button>
        }
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Device</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Signed in</TableHead>
              <TableHead>Last active</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {DEVICES.map(([device, place, signedIn, active, current]) => (
              <TableRow key={device + signedIn}>
                <TableCell>
                  <span className="flex items-center gap-2">
                    {device}
                    {current ? (
                      <Badge variant="secondary">Current</Badge>
                    ) : null}
                  </span>
                </TableCell>
                <TableCell className="text-gray-900">{place}</TableCell>
                <TableCell className="text-gray-900">{signedIn}</TableCell>
                <TableCell className="text-gray-900">{active}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Section>
      <Section title="Delete account">
        <Row
          label="Delete your account"
          description="Permanently removes your chats, projects and settings."
        >
          <Button variant="secondary" size="sm">
            Delete account
          </Button>
        </Row>
      </Section>
    </>
  )
}

function Billing() {
  return (
    <Section title="Plan">
      <Row
        label={`${USER.plan} plan`}
        description="Renews on December 18, 2026."
      >
        <Button variant="secondary" size="sm">
          Adjust plan
        </Button>
      </Row>
      <Row label="Payment method" description="Visa ending in 4242.">
        <Button variant="secondary" size="sm">
          Update
        </Button>
      </Row>
      <Row label="Invoices" description="Download receipts for past payments.">
        <Button variant="secondary" size="sm">
          View
        </Button>
      </Row>
    </Section>
  )
}

function Meter({
  label,
  value,
  note,
}: {
  label: string
  value: number
  note: string
}) {
  return (
    <div className="flex flex-col gap-2">
      <Progress value={value}>
        <ProgressLabel>{label}</ProgressLabel>
        <ProgressValue />
      </Progress>
      <p className="text-label-13 text-gray-900">{note}</p>
    </div>
  )
}

function Usage() {
  return (
    <Section title="Plan usage">
      <Meter
        label="Current session"
        value={18}
        note="Resets in 3 hours 12 minutes"
      />
      <Meter
        label="Weekly, all models"
        value={42}
        note="Resets Monday at 9:00 AM"
      />
      <Meter label="Weekly, Fable" value={7} note="Resets Monday at 9:00 AM" />
    </Section>
  )
}

const THEMES = [
  { value: "system", label: "System", icon: IconDeviceDesktop },
  { value: "light", label: "Light", icon: IconSun },
  { value: "dark", label: "Dark", icon: IconMoon },
]

function Appearance() {
  const { theme, setTheme } = useTheme()
  return (
    <>
      <Section title="General">
        <Row label="Theme">
          <Tabs value={theme ?? "system"} onValueChange={setTheme}>
            <TabsList>
              {THEMES.map((t) => (
                <TabsTrigger key={t.value} value={t.value} aria-label={t.label}>
                  <t.icon />
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </Row>
        <Row label="Interface font">
          <Choice
            label="Interface font"
            defaultValue="default"
            items={[
              { label: "Default · Inter", value: "default" },
              { label: "System", value: "system" },
              { label: "Dyslexic friendly", value: "dyslexic" },
            ]}
          />
        </Row>
        <Row label="Response font">
          <Choice
            label="Response font"
            defaultValue="sans"
            items={[
              { label: "Sans", value: "sans" },
              { label: "Serif", value: "serif" },
              { label: "System", value: "system" },
            ]}
          />
        </Row>
        <Row label="Transcript width">
          <Choice
            label="Transcript width"
            defaultValue="narrow"
            items={[
              { label: "Narrow", value: "narrow" },
              { label: "Medium", value: "medium" },
              { label: "Wide", value: "wide" },
            ]}
          />
        </Row>
      </Section>
      <Section title="Accessibility">
        <Row
          label="Motion"
          description="Reduce motion in the app, or follow your system setting."
        >
          <Choice label="Motion" defaultValue="system" items={SYSTEM_CHOICES} />
        </Row>
        <Row
          label="Contrast"
          description="Increase colour contrast for text and UI, or follow your system setting."
        >
          <Choice
            label="Contrast"
            defaultValue="system"
            items={SYSTEM_CHOICES}
          />
        </Row>
        <Row
          label="Popups"
          description="Keep popups on screen until you close them. Otherwise they close on their own after a few seconds."
        >
          <Choice
            label="Popups"
            defaultValue="auto"
            items={[
              { label: "Auto-dismiss", value: "auto" },
              { label: "Keep open", value: "keep" },
            ]}
          />
        </Row>
        <Toggle
          id="virtualize"
          label="Dynamic conversations"
          description="Load and unload messages in long chats for speed. Screen readers cannot reach unloaded messages."
          defaultChecked
        />
      </Section>
    </>
  )
}

const SYSTEM_CHOICES = [
  { label: "System", value: "system" },
  { label: "On", value: "on" },
  { label: "Off", value: "off" },
]

function YourClaude() {
  return (
    <Section title="Personal preferences">
      <Row
        label="Instructions for Claude"
        description="What Claude should know about you and how you like answers."
      >
        <Button variant="secondary" size="sm">
          Edit
        </Button>
      </Row>
      <Row label="Writing style" description="The default tone of replies.">
        <Choice
          label="Writing style"
          defaultValue="normal"
          items={[
            { label: "Normal", value: "normal" },
            { label: "Concise", value: "concise" },
            { label: "Explanatory", value: "explanatory" },
            { label: "Formal", value: "formal" },
          ]}
        />
      </Row>
    </Section>
  )
}

function Capabilities() {
  return (
    <>
      <Section title="Capabilities">
        <Toggle
          id="artifacts"
          label="Artifacts"
          description="Let Claude open code, documents and designs in their own window next to your chat."
          defaultChecked
        />
        <Toggle
          id="charts"
          label="Charts and diagrams in chat"
          description="Let Claude draw interactive charts and diagrams right in your chat."
          defaultChecked
        />
        <Toggle
          id="files"
          label="Create and edit files"
          description="Let Claude make and edit files you can download: documents, spreadsheets, presentations and PDFs."
          defaultChecked
        />
        <Toggle
          id="files-internet"
          inset
          label="Use the internet while making files"
          description="Claude can download tools it doesn't have built in. Keep an eye on these chats."
          defaultChecked
        />
        <Row
          inset
          label="Allowed websites"
          description="Standard download sites only"
        >
          <Button variant="secondary" size="sm">
            Manage
          </Button>
        </Row>
      </Section>
      <Section title="Voice">
        <Row label="Spoken language">
          <Choice
            label="Spoken language"
            defaultValue="en"
            items={[
              { label: "English", value: "en" },
              { label: "Bahasa Indonesia", value: "id" },
              { label: "日本語", value: "ja" },
            ]}
          />
        </Row>
        <Row label="Style">
          <Choice
            label="Voice style"
            defaultValue="buttery"
            items={[
              { label: "Buttery", value: "buttery" },
              { label: "Airy", value: "airy" },
              { label: "Mellow", value: "mellow" },
            ]}
          />
        </Row>
      </Section>
    </>
  )
}

function Notifications() {
  return (
    <Section title="Notifications">
      <Toggle
        id="notify-done"
        label="Response completions"
        description="Get notified when Claude finishes a long response."
        defaultChecked
      />
      <Toggle
        id="notify-email"
        label="Emails from Claude"
        description="Product news and tips, at most once a month."
      />
    </Section>
  )
}

function Privacy() {
  return (
    <Section title="Privacy">
      <Toggle
        id="improve"
        label="Help improve Claude"
        description="Allow your chats to be used to train and improve models."
      />
      <Toggle
        id="location"
        label="Location metadata"
        description="Share your approximate location to improve answers."
        defaultChecked
      />
      <Row
        label="Export data"
        description="Download a copy of your chats and projects."
      >
        <Button variant="secondary" size="sm">
          Export
        </Button>
      </Row>
    </Section>
  )
}

function Wellbeing() {
  return (
    <Section title="Wellbeing">
      <Toggle
        id="breaks"
        label="Break reminders"
        description="A gentle nudge after a long session."
      />
      <Row label="Quiet hours" description="Hold notifications overnight.">
        <Choice
          label="Quiet hours"
          defaultValue="off"
          items={[
            { label: "Off", value: "off" },
            { label: "10 PM to 7 AM", value: "night" },
          ]}
        />
      </Row>
    </Section>
  )
}

function Plugins() {
  return (
    <Section title="Plugins">
      <Row label="Installed plugins" description="None yet.">
        <Button variant="secondary" size="sm">
          Browse
        </Button>
      </Row>
    </Section>
  )
}

function Code() {
  return (
    <Section title="Code">
      <Toggle
        id="code-review"
        label="Automatic review"
        description="Review pull requests Claude opens before they are marked ready."
        defaultChecked
      />
      <Row label="Default branch prefix">
        <Input
          aria-label="Default branch prefix"
          size="sm"
          variant="secondary"
          defaultValue="claude/"
          className="w-56 shrink-0"
        />
      </Row>
    </Section>
  )
}
