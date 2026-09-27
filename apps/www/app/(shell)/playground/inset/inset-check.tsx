"use client"

import * as React from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { Add01Icon, Search01Icon } from "@hugeicons/core-free-icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ButtonGroup, ButtonGroupText } from "@/components/ui/button-group"
import {
  Combobox,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import { DirectionProvider } from "@/components/ui/direction"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"
import {
  Menubar,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

type Dir = "ltr" | "rtl"
type Reading = { text: number | null; popup: number | null }
type Spec = {
  label: string
  expect: number
  tolerance?: number
  note?: string
  render: () => React.ReactNode
}
// A null spec keeps the grid's rows aligned where a size has no specimen.
type Group = {
  title: string
  lede: string
  specs: (Spec | null)[]
  tall?: boolean
}

const POPUPS =
  '[data-slot="dropdown-menu-content"],[data-slot="select-content"],[data-slot="combobox-content"],[data-slot="menubar-content"]'
const ITEMS =
  '[role="menuitem"],[role="menuitemcheckbox"],[role="menuitemradio"],[role="option"]'

function edge(el: Element, dir: Dir) {
  const r = el.getBoundingClientRect()
  return dir === "rtl" ? r.right : r.left
}

// The start edge of an element's text: the padding edge for form controls,
// the first text node otherwise, the box itself when there is no text.
function textEdge(el: Element, dir: Dir) {
  if (/^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName)) {
    const cs = getComputedStyle(el)
    const r = el.getBoundingClientRect()
    return dir === "rtl"
      ? r.right - parseFloat(cs.borderRightWidth) - parseFloat(cs.paddingRight)
      : r.left + parseFloat(cs.borderLeftWidth) + parseFloat(cs.paddingLeft)
  }
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, {
    acceptNode: (n) =>
      n.textContent?.trim()
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_REJECT,
  })
  const node = walker.nextNode()
  if (!node) return edge(el, dir)
  const range = document.createRange()
  range.selectNodeContents(node)
  const r = range.getBoundingClientRect()
  return dir === "rtl" ? r.right : r.left
}

function read(probe: HTMLElement, dir: Dir): Reading {
  const box =
    probe.querySelector("[data-box]") ?? probe.firstElementChild ?? probe
  const text = probe.querySelector("[data-text]") ?? box
  const origin = edge(box, dir)
  const br = box.getBoundingClientRect()
  let popup: number | null = null
  let best = Infinity
  for (const p of document.querySelectorAll(POPUPS)) {
    const pr = p.getBoundingClientRect()
    const dx = Math.abs(edge(p, dir) - origin)
    const dy = Math.min(
      Math.abs(pr.top - br.bottom),
      Math.abs(pr.bottom - br.top)
    )
    const item = p.querySelector(ITEMS)
    if (!pr.width || !item || dx > 2 || dy > 24 || dx + dy >= best) continue
    best = dx + dy
    popup = Math.abs(textEdge(item, dir) - origin)
  }
  return { text: Math.abs(textEdge(text, dir) - origin), popup }
}

const Ctx = React.createContext<Dir>("ltr")

// `above` is for specimens that hold a popup open: the readout goes before
// the control so the popup cannot cover it, and the control mounts only once
// scrolled into view so the popup is positioned with its trigger on screen.
function Probe({
  label,
  expect,
  tolerance = 0,
  note,
  render,
  above = false,
}: Spec & { above?: boolean }) {
  const dir = React.useContext(Ctx)
  const ref = React.useRef<HTMLDivElement>(null)
  const [r, setR] = React.useState<Reading>({ text: null, popup: null })
  const [shown, setShown] = React.useState(!above)
  React.useEffect(() => {
    const el = ref.current
    if (!el || shown) return
    const io = new IntersectionObserver(([e]) => {
      if (e?.isIntersecting) setShown(true)
    })
    io.observe(el)
    return () => io.disconnect()
  }, [shown])
  React.useEffect(() => {
    const el = ref.current
    if (!el || !shown) return
    const run = () => setR(read(el, dir))
    const ids = [60, 400, 1200].map((ms) => window.setTimeout(run, ms))
    window.addEventListener("resize", run)
    return () => {
      ids.forEach(clearTimeout)
      window.removeEventListener("resize", run)
    }
  }, [dir, shown])
  const tone = (n: number | null) => {
    if (n === null) return "text-gray-900"
    const d = Math.abs(n - expect)
    return d <= 0.5
      ? "text-green-900"
      : d <= tolerance + 0.5
        ? "text-amber-900"
        : "text-red-900"
  }
  const num = (n: number | null) => (n === null ? "–" : `${Math.round(n)}`)
  const readout = (
    <>
      <div className="flex gap-3 text-label-12-mono tabular-nums">
        <span className={tone(r.text)}>{`${num(r.text)} / ${expect}`}</span>
        {r.popup !== null && (
          <span className={tone(r.popup)}>{`menu ${num(r.popup)}`}</span>
        )}
      </div>
      {note && <div className="text-copy-13 text-gray-900">{note}</div>}
    </>
  )
  return (
    <div className="flex min-w-0 flex-col gap-2">
      <div className="text-label-12 text-gray-900">{label}</div>
      {above && readout}
      <div ref={ref} className="flex min-h-9 items-start">
        {shown && render()}
      </div>
      {!above && readout}
    </div>
  )
}

const fruits = ["Apple", "Banana", "Cherry", "Durian", "Elderberry"] as const

function MenuItems() {
  return (
    <>
      <DropdownMenuGroup>
        <DropdownMenuLabel>Fruit</DropdownMenuLabel>
        <DropdownMenuItem>
          Apple <DropdownMenuShortcut>⌘A</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <HugeiconsIcon icon={Add01Icon} strokeWidth={2} />
          Add fruit
        </DropdownMenuItem>
        <DropdownMenuItem inset>Inset item</DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuCheckboxItem checked>Ripe only</DropdownMenuCheckboxItem>
    </>
  )
}

function OpenMenu({ trigger }: { trigger: React.ReactElement }) {
  return (
    <DropdownMenu open modal={false} onOpenChange={() => {}}>
      <DropdownMenuTrigger render={trigger} />
      <DropdownMenuContent className="min-w-48">
        <MenuItems />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function OpenSelect({ children }: { children: React.ReactNode }) {
  return (
    <Select open modal={false} onOpenChange={() => {}}>
      <SelectTrigger className="w-full" data-box>
        <SelectValue placeholder="Select a country" />
      </SelectTrigger>
      <SelectContent alignItemWithTrigger={false} align="start">
        {children}
      </SelectContent>
    </Select>
  )
}

const sizes = [
  { size: "xs", inset: 11, icon: 9 },
  { size: "sm", inset: 13, icon: 11 },
  { size: "default", inset: 13, icon: 11 },
  { size: "lg", inset: 15, icon: 13 },
] as const

const groups: Group[] = [
  {
    title: "Sizes",
    lede: "Square and pill share one padding per size, 10, 12, 12 and 14; the icon side sits a half step in.",
    specs: sizes.flatMap(({ size, inset, icon }) => [
      {
        label: `${size} · square`,
        expect: inset,
        render: () => <Button size={size}>Label</Button>,
      },
      {
        label: `${size} · pill`,
        expect: inset,
        render: () => (
          <Button size={size} shape="rounded" variant="outline">
            Label
          </Button>
        ),
      },
      {
        label: `${size} · icon`,
        expect: icon,
        render: () => (
          <Button size={size} variant="secondary">
            <HugeiconsIcon
              icon={Add01Icon}
              data-icon="inline-start"
              data-text
            />
            Label
          </Button>
        ),
      },
      size === "xs"
        ? null
        : {
            label: `${size} · toggle`,
            expect: inset,
            render: () => (
              <Toggle size={size} variant="outline">
                Label
              </Toggle>
            ),
          },
    ]),
  },
  {
    title: "Fields",
    lede: "Inside an input group an icon starts at the inset and the text 6px after it.",
    specs: [
      {
        label: "Input",
        expect: 13,
        render: () => <Input placeholder="Jane" />,
      },
      {
        label: "Textarea",
        expect: 13,
        render: () => <Textarea placeholder="Looking for help with ads" />,
      },
      {
        label: "Native select",
        expect: 13,
        render: () => (
          <NativeSelect className="w-full" data-box data-text defaultValue="">
            <NativeSelectOption value="">Select a country</NativeSelectOption>
            <NativeSelectOption value="au">Australia</NativeSelectOption>
          </NativeSelect>
        ),
      },
      {
        label: "Select · sm",
        expect: 13,
        render: () => (
          <Select>
            <SelectTrigger size="sm" className="w-full">
              <SelectValue placeholder="Select a country" />
            </SelectTrigger>
          </Select>
        ),
      },
      {
        label: "Input group · icon",
        expect: 13 + 16 + 6,
        render: () => (
          <InputGroup>
            <InputGroupAddon>
              <HugeiconsIcon icon={Search01Icon} />
            </InputGroupAddon>
            <InputGroupInput data-text placeholder="Search" />
          </InputGroup>
        ),
      },
      {
        label: "Input group · text",
        expect: 13,
        render: () => (
          <InputGroup>
            <InputGroupAddon>
              <InputGroupText data-text>USD</InputGroupText>
            </InputGroupAddon>
            <InputGroupInput placeholder="0.00" />
          </InputGroup>
        ),
      },
      {
        label: "Input group · button",
        expect: 13,
        render: () => (
          <InputGroup>
            <InputGroupAddon>
              <InputGroupButton data-text>Copy</InputGroupButton>
            </InputGroupAddon>
            <InputGroupInput placeholder="https://" />
          </InputGroup>
        ),
      },
      {
        label: "Input group · icon button",
        expect: 13,
        render: () => (
          <InputGroup>
            <InputGroupAddon>
              <InputGroupButton size="icon-xs" aria-label="Search">
                <HugeiconsIcon icon={Search01Icon} data-text />
              </InputGroupButton>
            </InputGroupAddon>
            <InputGroupInput placeholder="Search" />
          </InputGroup>
        ),
      },
      {
        label: "Button group · text",
        expect: 13,
        render: () => (
          <ButtonGroup className="w-full">
            <ButtonGroupText data-text>https://</ButtonGroupText>
            <Input placeholder="site.com" />
          </ButtonGroup>
        ),
      },
      {
        label: "Button group · input",
        expect: 13,
        render: () => (
          <ButtonGroup className="w-full">
            <Input data-text placeholder="Email" />
            <Button variant="outline">Send</Button>
          </ButtonGroup>
        ),
      },
      {
        label: "Combobox chips",
        expect: 13,
        render: () => (
          <Combobox items={fruits} multiple>
            <ComboboxChips className="w-full">
              <ComboboxChipsInput data-text placeholder="Add fruit" />
            </ComboboxChips>
          </Combobox>
        ),
      },
      {
        label: "Tabs",
        expect: 13,
        render: () => (
          <Tabs defaultValue="a">
            <TabsList data-box>
              <TabsTrigger data-text value="a">
                Overview
              </TabsTrigger>
              <TabsTrigger value="b">Activity</TabsTrigger>
            </TabsList>
          </Tabs>
        ),
      },
    ],
  },
  {
    title: "Popups",
    lede: "Held open. The second number is the first item's text against the control that opened it.",
    tall: true,
    specs: [
      {
        label: "Menu · outline",
        expect: 13,
        render: () => (
          <OpenMenu
            trigger={
              <Button variant="outline" data-box>
                Options
              </Button>
            }
          />
        ),
      },
      {
        label: "Menu · pill",
        expect: 13,
        render: () => (
          <OpenMenu
            trigger={
              <Button shape="rounded" data-box>
                Options
              </Button>
            }
          />
        ),
      },
      {
        label: "Menu · ghost",
        expect: 13,
        render: () => (
          <OpenMenu
            trigger={
              <Button variant="ghost" data-box>
                Options
              </Button>
            }
          />
        ),
      },
      {
        label: "Menu · sm",
        expect: 13,
        render: () => (
          <OpenMenu
            trigger={
              <Button size="sm" variant="outline" data-box>
                Options
              </Button>
            }
          />
        ),
      },
      {
        label: "Select · grouped",
        expect: 13,
        render: () => (
          <OpenSelect>
            <SelectGroup>
              <SelectLabel>Oceania</SelectLabel>
              <SelectItem value="au">Australia</SelectItem>
              <SelectItem value="nz">New Zealand</SelectItem>
            </SelectGroup>
          </OpenSelect>
        ),
      },
      {
        label: "Select · flat",
        expect: 13,
        render: () => (
          <OpenSelect>
            {fruits.map((f) => (
              <SelectItem key={f} value={f}>
                {f}
              </SelectItem>
            ))}
          </OpenSelect>
        ),
      },
      {
        label: "Combobox",
        expect: 13,
        render: () => (
          <Combobox items={fruits} open modal={false} onOpenChange={() => {}}>
            <ComboboxInput data-text placeholder="Select a fruit" />
            <ComboboxContent>
              <ComboboxEmpty>No items found.</ComboboxEmpty>
              <ComboboxList>
                {(item) => (
                  <ComboboxItem key={item} value={item}>
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        ),
      },
      {
        label: "Menubar",
        expect: 13,
        render: () => (
          <Menubar data-box modal={false}>
            <MenubarMenu open onOpenChange={() => {}}>
              <MenubarTrigger data-text>File</MenubarTrigger>
              <MenubarContent>
                <MenubarGroup>
                  <MenubarItem>New tab</MenubarItem>
                  <MenubarItem>New window</MenubarItem>
                </MenubarGroup>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Edit</MenubarTrigger>
            </MenubarMenu>
          </Menubar>
        ),
      },
    ],
  },
]

const countries = ["Australia", "Brazil", "Germany", "Japan", "United States"]

function SampleForm() {
  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-heading-20 text-gray-1000">In a form</h2>
      <div className="grid gap-x-6 gap-y-8 lg:grid-cols-2">
        <Field>
          <FieldLabel htmlFor="inset-first">First name</FieldLabel>
          <Input id="inset-first" placeholder="Jane" />
        </Field>
        <Field>
          <FieldLabel htmlFor="inset-last">Last name</FieldLabel>
          <Input id="inset-last" placeholder="Doe" />
        </Field>
        <Field>
          <FieldLabel htmlFor="inset-email">Business email</FieldLabel>
          <Input id="inset-email" type="email" placeholder="jane@example.com" />
        </Field>
        <Field>
          <FieldLabel>Country</FieldLabel>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a country" />
            </SelectTrigger>
            <SelectContent alignItemWithTrigger={false}>
              {countries.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field className="lg:col-span-2">
          <FieldLabel htmlFor="inset-help">How can we help?</FieldLabel>
          <Textarea id="inset-help" placeholder="Looking for help with ads" />
        </Field>
        <div className="flex justify-end lg:col-span-2">
          <Button shape="rounded" size="sm">
            Submit
          </Button>
        </div>
      </div>
    </section>
  )
}

export function InsetCheck() {
  const [dir, setDir] = React.useState<Dir>("ltr")
  React.useEffect(() => {
    document.documentElement.dir = dir
    return () => document.documentElement.removeAttribute("dir")
  }, [dir])
  return (
    <Ctx.Provider value={dir}>
      <DirectionProvider direction={dir}>
        <div key={dir} className="flex flex-col gap-20 py-10 lg:py-16">
          <div className="flex flex-wrap items-center gap-4" dir="ltr">
            <ToggleGroup
              value={[dir]}
              onValueChange={(v) => v[0] && setDir(v[0] as Dir)}
              variant="outline"
              spacing={0}
            >
              <ToggleGroupItem value="ltr">LTR</ToggleGroupItem>
              <ToggleGroupItem value="rtl">RTL</ToggleGroupItem>
            </ToggleGroup>
            <p className="text-copy-13 text-gray-900">
              {`Measured px from the box edge to its text, border included, over the expected value.`}
            </p>
          </div>
          {groups.map(({ title, lede, specs, tall }) => (
            <section key={title} className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <h2 className="text-heading-20 text-gray-1000">{title}</h2>
                <p className="max-w-prose text-copy-14 text-gray-900">{lede}</p>
              </div>
              <div
                className={cn(
                  "grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4",
                  tall && "gap-y-56 pb-40"
                )}
              >
                {specs.map((spec, i) =>
                  spec ? (
                    <Probe key={spec.label} above={tall} {...spec} />
                  ) : (
                    <div key={i} />
                  )
                )}
              </div>
            </section>
          ))}
          <SampleForm />
        </div>
      </DirectionProvider>
    </Ctx.Provider>
  )
}
