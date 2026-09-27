"use client"

import {
  IconAdjustmentsHorizontal,
  IconBrandApple,
  IconBrandGoogle,
  IconCalendar,
  IconChartBar,
  IconMail,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { Browser } from "@/components/business-x/mocks/browser"
import { XLogo } from "@/components/business-x/x-logo"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChartContainer, type ChartConfig } from "@/components/ui/chart"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Nav,
  NavGroup,
  NavGroupLabel,
  NavItem,
  NavLink,
  NavList,
} from "@/components/ui/nav"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

// Ads Manager in a browser window, the way x.com mocks its campaign setup:
// the sign-in screen first, then the campaign form with its side menu.
export function AdsManager({
  step,
  className,
}: {
  step: "signin" | "campaign" | "adgroup" | "ad" | "review" | "results"
  className?: string
}) {
  return (
    <Browser className={className}>
      {step === "signin" ? <SignIn /> : <Workspace step={step} />}
    </Browser>
  )
}

function SignIn() {
  return (
    <div className="relative flex h-full flex-col justify-center overflow-hidden bg-gray-100 px-16 py-10">
      <XLogo className="absolute top-1/2 right-[6%] size-[70%] -translate-y-1/2 text-gray-200" />
      <h3 className="relative text-heading-32 text-gray-1000">
        Happening
        <br />
        now.
      </h3>
      <div className="relative mt-6 flex w-44 flex-col gap-2">
        {[
          { icon: IconBrandGoogle, label: "Continue with Google" },
          { icon: IconBrandApple, label: "Continue with Apple" },
          { icon: IconMail, label: "Continue with your Mail" },
        ].map((item) => (
          <Button
            key={item.label}
            shape="rounded"
            variant="secondary"
            size="xs"
          >
            <item.icon data-icon="inline-start" />
            {item.label}
          </Button>
        ))}
        <span className="my-1 flex items-center gap-2 text-label-12 text-gray-700 before:h-px before:flex-1 before:bg-gray-alpha-400 after:h-px after:flex-1 after:bg-gray-alpha-400">
          or
        </span>
        <Button shape="rounded" size="xs">
          Continue with phone
        </Button>
      </div>
    </div>
  )
}

const menu = [
  { label: "Campaigns", items: ["Analytics", "Campaign form"] },
  { label: "Creatives", items: ["Composer", "Posts"] },
  {
    label: "Tools",
    items: [
      "Bulk editor",
      "Audiences",
      "App manager",
      "Events manager",
      "Conversion Diagnostics",
      "Shopping Manager",
    ],
  },
]

function Workspace({ step }: { step: Exclude<AdsManagerStep, "signin"> }) {
  return (
    <div className="flex h-full gap-3 bg-gray-100 p-3 pr-0 pb-0">
      <Nav className="w-32 shrink-0 gap-4 rounded-t-lg bg-background-100 px-3 py-3 text-label-12">
        <div className="flex items-center gap-2 text-label-13 text-gray-1000">
          <XLogo className="size-4" />
          Ads Manager
        </div>
        <NavList className="gap-3">
          {menu.map((group) => (
            <NavGroup key={group.label} className="gap-1 pb-0">
              <NavGroupLabel>{group.label}</NavGroupLabel>
              {group.items.map((item) => (
                <NavItem key={item}>
                  <NavLink
                    active={
                      step === "results"
                        ? item === "Analytics"
                        : item === "Campaign form"
                    }
                    render={<span />}
                  >
                    {item}
                  </NavLink>
                </NavItem>
              ))}
            </NavGroup>
          ))}
        </NavList>
      </Nav>
      <div className="flex min-w-0 flex-1 flex-col gap-3 overflow-hidden">
        {step === "results" ? <Results /> : <CampaignForm step={step} />}
      </div>
    </div>
  )
}

type AdsManagerStep = React.ComponentProps<typeof AdsManager>["step"]

const objectives = [
  { name: "Reach", copy: "Maximize your ad's reach." },
  {
    name: "Video views",
    copy: "Get people to watch your video.",
    recommended: true,
  },
  { name: "Website traffic", copy: "Drive traffic to your website." },
  { name: "App installs", copy: "Get people to install your app." },
]

function CampaignForm({
  step,
}: {
  step: "campaign" | "adgroup" | "ad" | "review"
}) {
  const title = {
    campaign: "Details",
    adgroup: "Ad group",
    ad: "Create your ad",
    review: "Review and launch",
  }[step]
  return (
    <div className="flex flex-col gap-4 rounded-t-lg bg-background-100 p-4 text-label-12">
      <div className="flex flex-col gap-0.5">
        <p className="text-label-13 text-gray-1000">{title}</p>
        <p className="text-gray-900">
          {step === "review"
            ? "Check the details, then publish or save a draft."
            : "Give your campaign a name so you can find it later."}
        </p>
      </div>
      {step === "campaign" && (
        <>
          <Field>
            <FieldLabel htmlFor="ads-campaign-name">Name</FieldLabel>
            <Input
              id="ads-campaign-name"
              defaultValue="Campaign, Jun 17, 2:47 PM"
              readOnly
            />
          </Field>
          <p className="text-label-13 text-gray-1000">Objective</p>
          <ul className="flex flex-col divide-y divide-gray-alpha-400 rounded-lg border border-gray-alpha-400">
            {objectives.map((item) => (
              <li key={item.name} className="flex items-center gap-3 px-3 py-2">
                <span
                  className={cn(
                    "size-3 rounded-full border border-gray-alpha-500",
                    item.recommended && "border-4 border-gray-1000"
                  )}
                />
                <span className="flex flex-col">
                  <span className="text-gray-1000">{item.name}</span>
                  <span className="text-gray-900">{item.copy}</span>
                </span>
                {item.recommended && (
                  <Badge className="ml-auto">Recommended</Badge>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
      {step === "adgroup" && (
        <div className="grid grid-cols-2 gap-3">
          <Field>
            <FieldLabel htmlFor="ads-group-name">Ad group name</FieldLabel>
            <Input
              id="ads-group-name"
              defaultValue="Vertical video, June"
              readOnly
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="ads-budget">Daily budget</FieldLabel>
            <InputGroup>
              <InputGroupAddon align="inline-start">USD</InputGroupAddon>
              <InputGroupInput id="ads-budget" defaultValue="250.00" readOnly />
            </InputGroup>
          </Field>
          <Field>
            <FieldLabel htmlFor="ads-start">Start time</FieldLabel>
            <Input
              id="ads-start"
              defaultValue="Jun 18, 2026, 9:00 AM"
              readOnly
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="ads-placement">Placements</FieldLabel>
            <Input id="ads-placement" defaultValue="Media Viewer" readOnly />
          </Field>
        </div>
      )}
      {step === "ad" && (
        <div className="grid grid-cols-[1fr_auto] gap-3">
          <div className="flex flex-col gap-3">
            <Field>
              <FieldLabel htmlFor="ads-ad-name">Ad name</FieldLabel>
              <Input
                id="ads-ad-name"
                defaultValue="Coffee made fresh"
                readOnly
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="ads-copy">Post copy</FieldLabel>
              <Input
                id="ads-copy"
                defaultValue="Fresh from the roastery. Small batch, big flavour."
                readOnly
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="ads-cta">Call to action</FieldLabel>
              <Input id="ads-cta" defaultValue="Shop now" readOnly />
            </Field>
          </div>
          <div className="flex aspect-9/16 w-24 items-center justify-center rounded-lg bg-gray-200 text-gray-700">
            9:16
          </div>
        </div>
      )}
      {step === "review" && (
        <>
          <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2">
            {[
              ["Objective", "Video views"],
              ["Daily budget", "USD 250.00"],
              ["Placements", "Media Viewer"],
              ["Funding source", "Visa ending 4242"],
            ].map(([label, value]) => (
              <div key={label} className="contents">
                <dt className="text-gray-900">{label}</dt>
                <dd className="text-gray-1000">{value}</dd>
              </div>
            ))}
          </dl>
          <div className="flex gap-2">
            <Button size="xs" shape="rounded">
              Publish
            </Button>
            <Button size="xs" shape="rounded" variant="secondary">
              Save draft
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

const results = [
  { day: "Aug 21", views: 1.1 },
  { day: "Aug 22", views: 2.0 },
  { day: "Aug 23", views: 1.6 },
  { day: "Aug 24", views: 0.5 },
]

const config = {
  views: { label: "Views", color: "var(--ds-blue-700)" },
} satisfies ChartConfig

const metrics = [
  ["Impressions", "6,058,519"],
  ["Spend", "$6,000.00"],
  ["Link clicks", "4000"],
  ["Purchases", "1000"],
  ["Cost per purchase", "$6.00"],
]

function Results() {
  return (
    <>
      <div className="flex items-center gap-2 rounded-lg bg-background-100 p-2 text-label-12">
        <InputGroup className="max-w-48">
          <InputGroupAddon align="inline-start">
            <IconSearch />
          </InputGroupAddon>
          <InputGroupInput
            placeholder="Search by campaign name or ID"
            readOnly
          />
        </InputGroup>
        <Button size="xs" variant="outline">
          <IconAdjustmentsHorizontal data-icon="inline-start" />
          Filters
        </Button>
        <Button size="xs" variant="outline" className="ml-auto">
          <IconCalendar data-icon="inline-start" />
          Aug 21, 2026 to Aug 24, 2026
        </Button>
        <Button size="xs">Create Campaign</Button>
      </div>
      <div className="flex flex-1 flex-col gap-3 rounded-t-lg bg-background-100 p-3">
        <Tabs value="Impressions" className="gap-2">
          <TabsList variant="line" className="w-full justify-start gap-6 p-0">
            {metrics.map(([label, value]) => (
              <TabsTrigger
                key={label}
                value={label}
                className="h-auto flex-none flex-col items-start px-0 pb-2"
              >
                <span className="text-label-12 text-gray-900">{label}</span>
                <span className="text-label-13 text-gray-1000">{value}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <ChartContainer config={config} className="h-32 w-full">
          <BarChart data={results} margin={{ left: 0, right: 8, top: 8 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={6}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={36}
              tickFormatter={(value: number) => `${value.toFixed(1)}M`}
            />
            <Bar dataKey="views" fill="var(--color-views)" radius={0} />
          </BarChart>
        </ChartContainer>
        <div className="flex items-center gap-2 rounded-lg border border-gray-alpha-400 px-3 py-2 text-label-12 text-gray-1000">
          <IconUsers className="size-3.5" />
          Audience Insights
        </div>
        <Tabs value="Campaigns" className="gap-0">
          <TabsList variant="line" className="w-full justify-start gap-4 p-0">
            {["Funding instruments", "Campaigns", "Ad groups", "Ads"].map(
              (tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="h-auto flex-none px-0 pb-2"
                >
                  {tab}
                </TabsTrigger>
              )
            )}
          </TabsList>
        </Tabs>
      </div>
    </>
  )
}

export const adsManagerIcons = {
  Analytics01Icon: IconChartBar,
  Settings01Icon: IconSettings,
}
