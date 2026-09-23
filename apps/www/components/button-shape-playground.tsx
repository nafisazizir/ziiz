"use client"

import * as React from "react"

import {
  ArchiveIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  ChevronDownIcon,
  CopyIcon,
  FileCodeIcon,
  InfoIcon,
  MinusIcon,
  MoreHorizontalIcon,
  PaperclipIcon,
  PlusIcon,
  XIcon,
} from "@/components/icons"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment"
import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/ui/button-group"
import { Calendar } from "@/components/ui/calendar"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { Message, MessageContent } from "@/components/ui/message"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
  useMessageScroller,
} from "@/components/ui/message-scroller"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@/components/ui/questionnaire"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { toast } from "@/components/ui/toast"

type Shape = "default" | "rounded"

type Row = {
  label: string
  render: (shape: Shape) => React.ReactNode
}

// Every components/ui file that renders Button or buttonVariants, laid out
// shape="default" beside shape="rounded" so a change to button.tsx can be
// read across its dependents at once.
export function ButtonShapePlayground() {
  return (
    <div className="flex flex-col">
      <Section
        title="Button"
        note="The source. Rounded is a pill: rounded-full plus 12/14/16/18px side padding at xs/sm/default/lg."
        rows={buttonRows}
      />
      <Section
        title="ButtonGroup"
        note="Squares only the seams; each end keeps its child's radius, so rounded ends cap the group."
        rows={buttonGroupRows}
      />
      <Section
        title="InputGroupButton"
        note="Its own xs and icon-xs sizes restate the shape; sm and icon-sm fall through to Button."
        rows={inputGroupRows}
      />
      <Section
        title="Pagination"
        note="PaginationLink, Previous and Next take shape."
        rows={paginationRows}
      />
      <Section
        title="AlertDialog"
        note="Action and Cancel take shape. Open each to compare the footer."
        rows={alertDialogRows}
      />
      <Section
        title="Dialog · Sheet"
        note="Footer buttons are yours to shape; the corner close button is built in and stays square."
        rows={dialogRows}
      />
      <Section
        title="Carousel"
        note="Previous and Next default to rounded; shape='default' squares them."
        rows={carouselRows}
      />
      <Section
        title="Questionnaire"
        note="Previous, Skip, Next and Submit take shape through buttonVariants."
        rows={questionnaireRows}
      />
      <Section
        title="MessageScrollerButton"
        note="The floating scroll button takes shape. Opens at the top so it shows."
        rows={messageScrollerRows}
      />
      <Section
        title="Attachment · SidebarTrigger · Toast"
        note="Attachment actions and the sidebar trigger take every Button prop. The toast's own action and close are fixed by Toaster."
        rows={miscRows}
      />
      <FixedSection />
    </div>
  )
}

function Section({
  title,
  note,
  rows,
}: {
  title: string
  note: string
  rows: Row[]
}) {
  return (
    <section className="flex flex-col gap-5 border-t border-gray-alpha-400 py-10">
      <header className="flex flex-col gap-1">
        <h2 className="text-heading-20 text-gray-1000">{title}</h2>
        <p className="max-w-prose text-copy-14 text-gray-900">{note}</p>
      </header>
      <div className="grid grid-cols-1 gap-x-6 gap-y-3 md:grid-cols-[8rem_minmax(0,1fr)_minmax(0,1fr)]">
        <span className="hidden md:block" />
        <ShapeHeading shape="default" />
        <ShapeHeading shape="rounded" />
        {rows.map((row) => (
          <React.Fragment key={row.label}>
            <span className="pt-2 text-label-12 text-gray-900 md:pt-2.5">
              {row.label}
            </span>
            <Cell shape="default">{row.render("default")}</Cell>
            <Cell shape="rounded">{row.render("rounded")}</Cell>
          </React.Fragment>
        ))}
      </div>
    </section>
  )
}

function ShapeHeading({ shape }: { shape: Shape }) {
  return (
    <span className="hidden text-label-12-mono text-gray-900 md:block">
      {`shape="${shape}"`}
    </span>
  )
}

function Cell({
  shape,
  children,
}: {
  shape: Shape
  children: React.ReactNode
}) {
  return (
    <div
      data-shape={shape}
      className="flex min-h-14 min-w-0 flex-wrap items-center gap-3 rounded-md border border-gray-alpha-400 p-3"
    >
      <span className="w-full text-label-12-mono text-gray-900 md:hidden">
        {shape}
      </span>
      {children}
    </div>
  )
}

const buttonRows: Row[] = [
  {
    label: "variants",
    render: (shape) => (
      <>
        <Button shape={shape}>Default</Button>
        <Button shape={shape} variant="secondary">
          Secondary
        </Button>
        <Button shape={shape} variant="outline">
          Outline
        </Button>
        <Button shape={shape} variant="ghost">
          Ghost
        </Button>
        <Button shape={shape} variant="destructive">
          Destructive
        </Button>
        <Button shape={shape} variant="link">
          Link
        </Button>
      </>
    ),
  },
  {
    label: "sizes",
    render: (shape) => (
      <>
        <Button shape={shape} size="xs">
          Extra small
        </Button>
        <Button shape={shape} size="sm">
          Small
        </Button>
        <Button shape={shape}>Default</Button>
        <Button shape={shape} size="lg">
          Large
        </Button>
      </>
    ),
  },
  {
    label: "icon start",
    render: (shape) => (
      <>
        {(["xs", "sm", "default", "lg"] as const).map((size) => (
          <Button key={size} shape={shape} size={size} variant="outline">
            <PlusIcon data-icon="inline-start" />
            New
          </Button>
        ))}
      </>
    ),
  },
  {
    label: "icon end",
    render: (shape) => (
      <>
        {(["xs", "sm", "default", "lg"] as const).map((size) => (
          <Button key={size} shape={shape} size={size}>
            Next
            <ArrowRightIcon data-icon="inline-end" />
          </Button>
        ))}
      </>
    ),
  },
  {
    label: "icon only",
    render: (shape) => (
      <>
        {(["icon-xs", "icon-sm", "icon", "icon-lg"] as const).map((size) => (
          <Button
            key={size}
            shape={shape}
            size={size}
            variant="outline"
            aria-label="Add"
          >
            <PlusIcon />
          </Button>
        ))}
      </>
    ),
  },
  {
    label: "disabled",
    render: (shape) => (
      <>
        <Button shape={shape} disabled>
          Disabled
        </Button>
        <Button shape={shape} variant="outline" disabled>
          Disabled
        </Button>
      </>
    ),
  },
  {
    label: "link (buttonVariants)",
    render: (shape) => (
      <a
        href="/components/button"
        className={buttonVariants({ variant: "secondary", shape })}
      >
        Read the docs
      </a>
    ),
  },
]

const buttonGroupRows: Row[] = [
  {
    label: "pair",
    render: (shape) => (
      <ButtonGroup>
        <Button shape={shape} variant="outline">
          Archive
        </Button>
        <Button shape={shape} variant="outline">
          Report
        </Button>
      </ButtonGroup>
    ),
  },
  {
    label: "three",
    render: (shape) => (
      <ButtonGroup>
        <Button shape={shape} variant="outline">
          Day
        </Button>
        <Button shape={shape} variant="outline">
          Week
        </Button>
        <Button shape={shape} variant="outline">
          Month
        </Button>
      </ButtonGroup>
    ),
  },
  {
    label: "split",
    render: (shape) => (
      <ButtonGroup>
        <Button shape={shape} variant="secondary">
          Button
        </Button>
        <ButtonGroupSeparator />
        <Button shape={shape} size="icon" variant="secondary" aria-label="Add">
          <PlusIcon />
        </Button>
      </ButtonGroup>
    ),
  },
  {
    label: "split menu",
    render: (shape) => (
      <ButtonGroup>
        <Button shape={shape}>API Console</Button>
        <ButtonGroupSeparator />
        <DropdownMenu>
          <DropdownMenuTrigger
            render={<Button shape={shape} size="icon" aria-label="More" />}
          >
            <ChevronDownIcon />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuItem>Docs</DropdownMenuItem>
              <DropdownMenuItem>Status</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </ButtonGroup>
    ),
  },
  {
    label: "size sm",
    render: (shape) => (
      <ButtonGroup>
        <Button shape={shape} size="sm" variant="outline">
          Copy
        </Button>
        <Button shape={shape} size="sm" variant="outline">
          Paste
        </Button>
        <Button
          shape={shape}
          size="icon-sm"
          variant="outline"
          aria-label="More"
        >
          <MoreHorizontalIcon />
        </Button>
      </ButtonGroup>
    ),
  },
  {
    label: "nested",
    render: (shape) => (
      <ButtonGroup>
        <ButtonGroup>
          <Button shape={shape} size="icon" variant="outline" aria-label="Back">
            <ArrowLeftIcon />
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button shape={shape} variant="outline">
            <ArchiveIcon data-icon="inline-start" />
            Archive
          </Button>
          <Button shape={shape} variant="outline">
            Snooze
          </Button>
        </ButtonGroup>
      </ButtonGroup>
    ),
  },
  {
    label: "text + input",
    render: (shape) => (
      <ButtonGroup>
        <ButtonGroupText>https://</ButtonGroupText>
        <Input placeholder="ziiz.dev" className="w-32" />
        <Button shape={shape} variant="outline">
          Go
        </Button>
      </ButtonGroup>
    ),
  },
  {
    label: "vertical",
    render: (shape) => (
      <ButtonGroup orientation="vertical">
        <Button
          shape={shape}
          size="icon"
          variant="outline"
          aria-label="Increase"
        >
          <PlusIcon />
        </Button>
        <Button
          shape={shape}
          size="icon"
          variant="outline"
          aria-label="Decrease"
        >
          <MinusIcon />
        </Button>
      </ButtonGroup>
    ),
  },
  {
    label: "[--radius:9999px]",
    render: (shape) => (
      <ButtonGroup className="[--radius:9999px]">
        <Button shape={shape} variant="outline">
          Archive
        </Button>
        <Button shape={shape} variant="outline">
          Report
        </Button>
      </ButtonGroup>
    ),
  },
]

const inputGroupRows: Row[] = [
  {
    label: "icon-xs",
    render: (shape) => (
      <InputGroup>
        <InputGroupInput defaultValue="https://ziiz.dev" readOnly />
        <InputGroupAddon align="inline-end">
          <InputGroupButton shape={shape} size="icon-xs" aria-label="Copy">
            <CopyIcon />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    ),
  },
  {
    label: "xs",
    render: (shape) => (
      <InputGroup>
        <InputGroupInput placeholder="Invite by email" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton shape={shape} variant="secondary">
            Invite
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    ),
  },
  {
    label: "xs + icon",
    render: (shape) => (
      <InputGroup>
        <InputGroupInput placeholder="Message" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton shape={shape} variant="secondary">
            <PaperclipIcon data-icon="inline-start" />
            Attach
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    ),
  },
  {
    label: "sm",
    render: (shape) => (
      <InputGroup>
        <InputGroupInput placeholder="Type to search…" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton shape={shape} size="sm" variant="secondary">
            Search
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    ),
  },
  {
    label: "inline-start",
    render: (shape) => (
      <InputGroup>
        <InputGroupAddon>
          <InputGroupButton
            shape={shape}
            size="icon-xs"
            variant="secondary"
            aria-label="Info"
          >
            <InfoIcon />
          </InputGroupButton>
        </InputGroupAddon>
        <InputGroupInput placeholder="example.com" />
      </InputGroup>
    ),
  },
  {
    label: "block-end",
    render: (shape) => (
      <InputGroup>
        <InputGroupTextarea placeholder="Ask anything…" />
        <InputGroupAddon align="block-end">
          <InputGroupButton shape={shape} variant="outline">
            <PlusIcon data-icon="inline-start" />
            Add context
          </InputGroupButton>
          <InputGroupButton
            shape={shape}
            size="icon-sm"
            variant="default"
            className="ml-auto"
            aria-label="Send"
          >
            <ArrowUpIcon />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    ),
  },
  {
    label: "[--radius:9999px]",
    render: (shape) => (
      <InputGroup className="[--radius:9999px]">
        <InputGroupInput placeholder="Send a message…" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton shape={shape} size="icon-xs" aria-label="Send">
            <ArrowUpIcon />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    ),
  },
  {
    label: "in ButtonGroup",
    render: (shape) => (
      <ButtonGroup>
        <Button shape={shape} size="icon" variant="outline" aria-label="Add">
          <PlusIcon />
        </Button>
        <InputGroup>
          <InputGroupInput placeholder="Send a message…" />
          <InputGroupAddon align="inline-end">
            <InputGroupButton shape={shape} size="icon-xs" aria-label="Send">
              <ArrowUpIcon />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </ButtonGroup>
    ),
  },
]

const paginationRows: Row[] = [
  {
    label: "full",
    render: (shape) => (
      <Pagination className="justify-start">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious shape={shape} href="#pagination" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink shape={shape} href="#pagination">
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink shape={shape} href="#pagination" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink shape={shape} href="#pagination">
              3
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext shape={shape} href="#pagination" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    ),
  },
  {
    label: "size icon-sm",
    render: (shape) => (
      <Pagination className="justify-start">
        <PaginationContent>
          {[1, 2, 3, 4].map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                shape={shape}
                size="icon-sm"
                href="#pagination"
                isActive={page === 1}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
        </PaginationContent>
      </Pagination>
    ),
  },
]

function AlertDialogExample({
  shape,
  size,
}: {
  shape: Shape
  size: "default" | "sm"
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger render={<Button shape={shape} variant="outline" />}>
        {size === "sm" ? "Open small" : "Open"}
      </AlertDialogTrigger>
      <AlertDialogContent size={size}>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this project?</AlertDialogTitle>
          <AlertDialogDescription>
            This removes the project and its deployments. It cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel shape={shape}>Cancel</AlertDialogCancel>
          <AlertDialogAction shape={shape} variant="destructive">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

const alertDialogRows: Row[] = [
  {
    label: "footer",
    render: (shape) => (
      <>
        <AlertDialogExample shape={shape} size="default" />
        <AlertDialogExample shape={shape} size="sm" />
      </>
    ),
  },
  {
    label: "footer, inline",
    render: (shape) => (
      <div className="flex w-full flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button shape={shape} variant="outline">
          Cancel
        </Button>
        <Button shape={shape} variant="destructive">
          Delete
        </Button>
      </div>
    ),
  },
]

const dialogRows: Row[] = [
  {
    label: "dialog",
    render: (shape) => (
      <Dialog>
        <DialogTrigger render={<Button shape={shape} variant="outline" />}>
          Edit profile
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              The close button in the corner is built in.
            </DialogDescription>
          </DialogHeader>
          <Input defaultValue="Nafis" />
          <DialogFooter>
            <DialogClose render={<Button shape={shape} variant="outline" />}>
              Cancel
            </DialogClose>
            <Button shape={shape}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    ),
  },
  {
    label: "sheet",
    render: (shape) => (
      <Sheet>
        <SheetTrigger render={<Button shape={shape} variant="outline" />}>
          Open sheet
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
            <SheetDescription>
              The close button in the corner is built in.
            </SheetDescription>
          </SheetHeader>
          <SheetFooter>
            <Button shape={shape}>Apply</Button>
            <SheetClose render={<Button shape={shape} variant="outline" />}>
              Reset
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    ),
  },
]

const carouselRows: Row[] = [
  {
    label: "previous / next",
    render: (shape) => (
      <div className="w-full px-12">
        <Carousel className="mx-auto w-full max-w-40">
          <CarouselContent>
            {[1, 2, 3].map((slide) => (
              <CarouselItem key={slide}>
                <div className="flex aspect-square items-center justify-center rounded-md border border-gray-alpha-400 text-heading-24 text-gray-1000">
                  {slide}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious shape={shape} />
          <CarouselNext shape={shape} />
        </Carousel>
      </div>
    ),
  },
]

const questionnaireItems = [
  { name: "role", required: true },
  { name: "team" },
  { name: "start", required: true },
] as const

function QuestionnaireExample({ shape }: { shape: Shape }) {
  return (
    <Questionnaire
      className="w-full"
      defaultItem="team"
      items={questionnaireItems}
      onSubmit={(event) => event.preventDefault()}
    >
      <QuestionnaireItem name="role" required>
        <QuestionnaireTitle>What do you do?</QuestionnaireTitle>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="design">Design</QuestionnaireChoice>
          <QuestionnaireChoice value="engineering">
            Engineering
          </QuestionnaireChoice>
        </QuestionnaireChoices>
      </QuestionnaireItem>
      <QuestionnaireItem name="team">
        <QuestionnaireTitle>How big is your team?</QuestionnaireTitle>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="solo">Just me</QuestionnaireChoice>
          <QuestionnaireChoice value="small">2–10</QuestionnaireChoice>
        </QuestionnaireChoices>
      </QuestionnaireItem>
      <QuestionnaireItem name="start" required>
        <QuestionnaireTitle>When do you start?</QuestionnaireTitle>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="now">Now</QuestionnaireChoice>
          <QuestionnaireChoice value="later">Later</QuestionnaireChoice>
        </QuestionnaireChoices>
      </QuestionnaireItem>
      <QuestionnaireActions>
        <QuestionnairePrevious shape={shape} />
        <QuestionnaireSkip shape={shape} />
        <QuestionnaireNext shape={shape} />
        <QuestionnaireSubmit shape={shape} />
      </QuestionnaireActions>
    </Questionnaire>
  )
}

const questionnaireRows: Row[] = [
  {
    label: "actions",
    render: (shape) => <QuestionnaireExample shape={shape} />,
  },
]

const transcript = [
  "What changed in activation this week?",
  "Workspace creation rose 8%, but first invite completion only rose 2%.",
  "Where do people drop?",
  "Most stop at the invite step. They create a workspace, then wait before adding anyone.",
  "What should we try first?",
  "Make collaboration useful before asking for invites: seed the first project with a shared template.",
]

function ScrollToStart() {
  const { scrollToStart } = useMessageScroller()

  React.useLayoutEffect(() => {
    const frame = requestAnimationFrame(() =>
      scrollToStart({ behavior: "auto" })
    )
    return () => cancelAnimationFrame(frame)
  }, [scrollToStart])

  return null
}

function MessageScrollerExample({ shape }: { shape: Shape }) {
  return (
    <div className="h-56 w-full overflow-hidden rounded-md border border-gray-alpha-400">
      <MessageScrollerProvider>
        <ScrollToStart />
        <MessageScroller>
          <MessageScrollerViewport>
            <MessageScrollerContent className="p-3">
              {transcript.map((text, index) => {
                const isUser = index % 2 === 0
                return (
                  <MessageScrollerItem
                    key={text}
                    messageId={String(index)}
                    scrollAnchor={isUser}
                  >
                    <Message align={isUser ? "end" : "start"}>
                      <MessageContent>
                        <Bubble variant={isUser ? "muted" : "ghost"}>
                          <BubbleContent>{text}</BubbleContent>
                        </Bubble>
                      </MessageContent>
                    </Message>
                  </MessageScrollerItem>
                )
              })}
            </MessageScrollerContent>
          </MessageScrollerViewport>
          <MessageScrollerButton shape={shape} />
        </MessageScroller>
      </MessageScrollerProvider>
    </div>
  )
}

const messageScrollerRows: Row[] = [
  {
    label: "scroll button",
    render: (shape) => <MessageScrollerExample shape={shape} />,
  },
]

const miscRows: Row[] = [
  {
    label: "attachment",
    render: (shape) => (
      <Attachment className="w-full">
        <AttachmentMedia>
          <FileCodeIcon />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>message-renderer.tsx</AttachmentTitle>
          <AttachmentDescription>TypeScript · 12 KB</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction shape={shape} aria-label="Remove">
            <XIcon />
          </AttachmentAction>
          <AttachmentAction
            shape={shape}
            variant="outline"
            size="icon-sm"
            aria-label="Remove"
          >
            <XIcon />
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>
    ),
  },
  {
    label: "sidebar trigger",
    render: (shape) => (
      <SidebarProvider className="min-h-0 w-auto">
        <SidebarTrigger shape={shape} />
        <SidebarTrigger shape={shape} variant="outline" />
      </SidebarProvider>
    ),
  },
  {
    label: "toast",
    render: (shape) => (
      <Button
        shape={shape}
        variant="outline"
        onClick={() => {
          const id = toast.add({
            title: "Event created",
            description:
              "The action and close are Toaster's, not the caller's.",
            actionProps: {
              children: "Undo",
              onClick() {
                toast.close(id)
              },
            },
          })
        }}
      >
        Show toast
      </Button>
    ),
  },
]

const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"]

// Buttons a component renders for itself with no shape prop to reach them.
function FixedSection() {
  const anchor = useComboboxAnchor()

  return (
    <section className="flex flex-col gap-5 border-t border-gray-alpha-400 py-10">
      <header className="flex flex-col gap-1">
        <h2 className="text-heading-20 text-gray-1000">Built-in buttons</h2>
        <p className="max-w-prose text-copy-14 text-gray-900">
          Rendered inside the component with no shape to reach them: combobox
          trigger, clear and chip remove, and calendar navigation.
        </p>
      </header>
      <div className="flex flex-wrap items-start gap-6">
        <div className="flex w-64 flex-col gap-3">
          <Combobox items={frameworks} defaultValue={frameworks[0]}>
            <ComboboxInput placeholder="Select a framework" showClear />
            <ComboboxContent>
              <ComboboxEmpty>No items found.</ComboboxEmpty>
              <ComboboxList>
                {(item: string) => (
                  <ComboboxItem key={item} value={item}>
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
          <Combobox
            multiple
            items={frameworks}
            defaultValue={frameworks.slice(0, 2)}
          >
            <ComboboxChips ref={anchor}>
              <ComboboxValue>
                {(values: string[]) => (
                  <>
                    {values.map((value) => (
                      <ComboboxChip key={value}>{value}</ComboboxChip>
                    ))}
                    <ComboboxChipsInput />
                  </>
                )}
              </ComboboxValue>
            </ComboboxChips>
            <ComboboxContent anchor={anchor}>
              <ComboboxEmpty>No items found.</ComboboxEmpty>
              <ComboboxList>
                {(item: string) => (
                  <ComboboxItem key={item} value={item}>
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </div>
        <Calendar
          mode="single"
          className="rounded-md border border-gray-alpha-400"
        />
      </div>
    </section>
  )
}
