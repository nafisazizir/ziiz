"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { IconAsterisk, IconGhost2 } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { HomeComposer } from "./composer"
import { ARTIFACTS, BASE, USER } from "./data"
import { PageHeader } from "./page-header"
import { useShell } from "./shell"

const noop = () => () => {}

function greetingNow() {
  const h = new Date().getHours()
  return h < 5
    ? "Evening"
    : h < 12
      ? "Morning"
      : h < 18
        ? "Afternoon"
        : "Evening"
}

/** The time of day, read on the client; the server renders "Hello". */
function useGreeting() {
  return React.useSyncExternalStore(noop, greetingNow, () => "Hello")
}

export function Home() {
  const router = useRouter()
  const { setPrompt } = useShell()
  const greeting = useGreeting()
  const [draft, setDraft] = React.useState("")

  return (
    <div className="flex h-full min-h-0 flex-col overflow-y-auto">
      <PageHeader>
        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="Use incognito"
                className="ms-auto"
              />
            }
          >
            <IconGhost2 />
          </TooltipTrigger>
          <TooltipContent>Use incognito</TooltipContent>
        </Tooltip>
      </PageHeader>
      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center px-4 pb-16">
        <h1 className="flex items-center justify-center gap-2 text-heading-32 text-gray-1000">
          <IconAsterisk className="size-8 shrink-0" />
          {greeting}, {USER.name}
        </h1>
        <div className="mt-5">
          <HomeComposer
            value={draft}
            onValueChange={setDraft}
            autoFocus
            onSubmit={(text) => {
              setPrompt(text)
              router.push(`${BASE}/chat/new`)
            }}
          />
        </div>
        <section className="mt-10 flex flex-col gap-1">
          <div className="flex items-center justify-between ps-3">
            <h2 className="text-label-14 text-gray-900">Recent artifacts</h2>
            <Button
              variant="ghost"
              size="sm"
              nativeButton={false}
              render={<Link href={`${BASE}/artifacts`} />}
              className="text-gray-900"
            >
              View all
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {ARTIFACTS.slice(0, 3).map((a) => (
              <Link
                key={a.id}
                href={`${BASE}/artifacts`}
                className="flex flex-col overflow-hidden rounded-xl border border-gray-alpha-400 transition-colors outline-none hover:border-gray-alpha-500 focus-visible:border-gray-600 focus-visible:ring-3 focus-visible:ring-gray-600/50"
              >
                <span className="flex h-24 items-end justify-center bg-background-200 px-6">
                  <span className="flex h-18 w-full flex-col gap-1.5 rounded-t-lg border border-b-0 border-gray-alpha-400 bg-background-100 p-3">
                    <span className="h-1.5 w-1/2 rounded-full bg-gray-alpha-400" />
                    <span className="h-1 w-full rounded-full bg-gray-alpha-200" />
                    <span className="h-1 w-4/5 rounded-full bg-gray-alpha-200" />
                  </span>
                </span>
                <span className="flex items-center gap-2 border-t border-gray-alpha-400 px-3 py-2.5">
                  <span className="min-w-0 flex-1 truncate text-label-14 text-gray-1000">
                    {a.title}
                  </span>
                  <span className="shrink-0 text-label-13 text-gray-900">
                    {a.when}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
