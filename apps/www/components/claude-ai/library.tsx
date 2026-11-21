"use client"

import * as React from "react"
import Link from "next/link"
import {
  IconChartDots3,
  IconCode,
  IconFileText,
  IconLayoutGrid,
  IconMessages,
  IconPlus,
  IconSearch,
} from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { ARTIFACTS, BASE, CHATS, PROJECTS, type Artifact } from "./data"
import { PageHeader } from "./page-header"

function Page({
  title,
  action,
  children,
}: {
  title: string
  action?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="flex h-full min-h-0 flex-col overflow-y-auto">
      <PageHeader />
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 pt-6 pb-16 md:px-8">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-heading-32 text-gray-1000">{title}</h1>
          {action}
        </div>
        {children}
      </div>
    </div>
  )
}

function Search({
  value,
  onChange,
  placeholder,
}: {
  value: string
  onChange: (value: string) => void
  placeholder: string
}) {
  return (
    <InputGroup size="lg">
      <InputGroupAddon>
        <IconSearch />
      </InputGroupAddon>
      <InputGroupInput
        aria-label={placeholder}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </InputGroup>
  )
}

const matches = (q: string, ...fields: string[]) =>
  fields.some((f) => f.toLowerCase().includes(q.trim().toLowerCase()))

function NoResults({ query }: { query: string }) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyTitle>No results</EmptyTitle>
        <EmptyDescription>
          Nothing matches “{query}”. Try a shorter search.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}

const SORTS = [
  { label: "Activity", value: "activity" },
  { label: "Name", value: "name" },
  { label: "Date created", value: "created" },
]

export function Projects() {
  const [query, setQuery] = React.useState("")
  const [sort, setSort] = React.useState("activity")
  const shown = PROJECTS.filter((p) => matches(query, p.name, p.description))
  if (sort === "name") shown.sort((a, b) => a.name.localeCompare(b.name))

  return (
    <Page
      title="Projects"
      action={
        <Button variant="secondary">
          <IconPlus data-icon="inline-start" />
          New project
        </Button>
      }
    >
      <Search
        value={query}
        onChange={setQuery}
        placeholder="Search projects…"
      />
      <div className="flex items-center justify-end gap-2">
        <span className="text-label-14 text-gray-900">Sort by</span>
        <Select
          items={SORTS}
          value={sort}
          onValueChange={(v) => v && setSort(v)}
        >
          <SelectTrigger size="sm" variant="ghost">
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="end">
            <SelectGroup>
              {SORTS.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {shown.length ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {shown.map((p) => (
            <Card key={p.id} size="sm">
              <CardHeader>
                <CardTitle>{p.name}</CardTitle>
                <CardDescription>{p.description}</CardDescription>
              </CardHeader>
              <CardFooter className="justify-between text-label-12 text-gray-900">
                <span>{p.updated}</span>
                <span className="flex items-center gap-1">
                  <IconMessages className="size-3.5" />
                  {p.chats}
                </span>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <NoResults query={query} />
      )}
    </Page>
  )
}

const KIND_ICON = {
  Code: IconCode,
  Document: IconFileText,
  Interactive: IconLayoutGrid,
  Diagram: IconChartDots3,
} satisfies Record<Artifact["kind"], unknown>

export function Artifacts() {
  const [tab, setTab] = React.useState("mine")
  return (
    <Page
      title="Artifacts"
      action={
        <Button variant="secondary">
          <IconPlus data-icon="inline-start" />
          New artifact
        </Button>
      }
    >
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="inspiration">Inspiration</TabsTrigger>
          <TabsTrigger value="mine">Your artifacts</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {(tab === "mine" ? ARTIFACTS : [...ARTIFACTS].reverse()).map((a) => {
          const Icon = KIND_ICON[a.kind]
          return (
            <Card key={a.id} size="sm" className="pt-0">
              <div className="flex aspect-[4/3] items-center justify-center bg-background-200 text-gray-700">
                <Icon className="size-8" stroke={1.25} />
              </div>
              <CardHeader>
                <CardTitle className="truncate">{a.title}</CardTitle>
                <CardDescription>{a.updated}</CardDescription>
              </CardHeader>
            </Card>
          )
        })}
      </div>
    </Page>
  )
}

export function Recents() {
  const [query, setQuery] = React.useState("")
  const shown = CHATS.filter((c) => matches(query, c.title))
  return (
    <Page
      title="Chats"
      action={
        <Button
          variant="secondary"
          nativeButton={false}
          render={<Link href={BASE} />}
        >
          <IconPlus data-icon="inline-start" />
          New chat
        </Button>
      }
    >
      <Search
        value={query}
        onChange={setQuery}
        placeholder="Search your chats…"
      />
      <p className="text-label-14 text-gray-900">
        You have {CHATS.length} previous chats with Claude.
      </p>
      {shown.length ? (
        <ItemGroup className="gap-0">
          {shown.map((chat, i) => (
            <React.Fragment key={chat.id}>
              {i > 0 ? <ItemSeparator /> : null}
              <Item render={<Link href={`${BASE}/chat/${chat.id}`} />}>
                <ItemContent>
                  <ItemTitle>{chat.title}</ItemTitle>
                  <ItemDescription>
                    Last message {chat.updated.toLowerCase()}
                  </ItemDescription>
                </ItemContent>
              </Item>
            </React.Fragment>
          ))}
        </ItemGroup>
      ) : (
        <NoResults query={query} />
      )}
    </Page>
  )
}

function Placeholder({
  title,
  heading,
  description,
  action,
}: {
  title: string
  heading: string
  description: string
  action: string
}) {
  return (
    <Page title={title}>
      <Empty className="border border-dashed border-gray-alpha-400">
        <EmptyHeader>
          <EmptyTitle>{heading}</EmptyTitle>
          <EmptyDescription>{description}</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button variant="secondary">
            <IconPlus data-icon="inline-start" />
            {action}
          </Button>
        </EmptyContent>
      </Empty>
    </Page>
  )
}

export function Scheduled() {
  return (
    <Placeholder
      title="Scheduled"
      heading="No scheduled tasks"
      description="Ask Claude to run something on a schedule, like a Monday summary of your inbox."
      action="New task"
    />
  )
}

export function Design() {
  return (
    <Placeholder
      title="Design"
      heading="No designs yet"
      description="Sketch screens, slides and graphics with Claude, then keep editing them here."
      action="New design"
    />
  )
}

export function Plugins() {
  return (
    <Placeholder
      title="Plugins"
      heading="No plugins installed"
      description="Plugins bundle skills, connectors and commands into one install."
      action="Browse plugins"
    />
  )
}
