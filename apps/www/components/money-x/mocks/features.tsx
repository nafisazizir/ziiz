import {
  IconCheck,
  IconFaceId,
  IconHome,
  IconNfc,
  IconReceipt,
  IconRocket,
  IconRosetteDiscountCheck,
} from "@tabler/icons-react"

import { XText } from "@/components/business-x/runs"
import { XLogo } from "@/components/business-x/x-logo"
import { XCard } from "@/components/money-x/mocks/x-card"
import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { cn } from "@/lib/utils"

const activity = [
  {
    icon: IconRocket,
    name: "SpaceX",
    gold: true,
    date: "16 Jul 2026",
    amount: "$6,200.00",
    kind: "Early Paycheck",
    lead: true,
  },
  {
    icon: XLogo,
    name: ">x< Premium",
    gold: true,
    date: "18 Jul 2026",
    amount: "$8.00",
    kind: "ACH",
  },
  {
    icon: IconHome,
    name: "July Rent",
    date: "17 Jul 2026",
    amount: "$3,100.00",
    kind: "Check",
  },
]

// 01: three rows of account activity, the incoming paycheck lifted onto the
// page surface and its amount in green.
export function ActivityMock() {
  return (
    <div className="flex w-60 flex-col gap-1.5 text-label-12">
      <span className="px-3 text-gray-900">Activity</span>
      {activity.map((row) => (
        <div
          key={row.name}
          className={cn(
            "flex items-center gap-2.5 px-3 py-2.5",
            row.lead && "bg-background-100"
          )}
        >
          <span className="flex size-7 shrink-0 items-center justify-center rounded-md border border-gray-alpha-400 bg-background-100 text-gray-1000">
            <row.icon className="size-3.5" />
          </span>
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="flex items-center gap-1 text-gray-1000">
              <XText>{row.name}</XText>
              {row.gold && (
                <IconRosetteDiscountCheck className="size-3 text-amber-700" />
              )}
            </span>
            <span className="text-gray-900">{row.date}</span>
          </div>
          <div className="flex flex-col items-end">
            <span className={row.lead ? "text-green-900" : "text-gray-1000"}>
              {row.amount}
            </span>
            <span className={row.lead ? "text-gray-1000" : "text-gray-700"}>
              {row.kind}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

// 02: a payment on top of a stack of earlier ones.
export function SendMock() {
  return (
    <div className="relative w-56 pt-3">
      <span className="absolute inset-x-4 top-0 h-8 border border-gray-alpha-400 bg-background-100 opacity-50" />
      <span className="absolute inset-x-2 top-1.5 h-8 border border-gray-alpha-400 bg-background-100 opacity-75" />
      <div className="relative flex flex-col gap-1.5 border border-gray-alpha-400 bg-background-100 p-3">
        <div className="flex items-center justify-between">
          <span className="text-heading-16 text-gray-1000">$1,200.00</span>
          <span className="flex -space-x-1.5">
            <span className="size-5 rounded-full bg-gray-400 ring-2 ring-background-100" />
            <span className="size-5 rounded-full bg-gray-300 ring-2 ring-background-100" />
          </span>
        </div>
        <div className="flex items-center justify-between text-label-12 text-gray-900">
          <span className="flex items-center gap-1">
            sent to
            <strong className="font-medium text-gray-1000">Alex</strong>
            <IconRosetteDiscountCheck className="size-3 text-blue-700" />
          </span>
          3h
        </div>
      </div>
    </div>
  )
}

// 04: the card held to a reader. The scene is 238px tall and anchored to
// the panel's bottom edge, so the phone runs off it; the panel's height
// sets the zoom, the way the site's drawing does.
export function CashbackMock() {
  return (
    <div className="[container-type:size] flex size-full justify-center">
      <div className="relative h-[238px] w-[268px] shrink-0 [zoom:calc(100cqh/238px)]">
        <span className="absolute top-3 left-1/2 flex h-8 w-14 -translate-x-1/2 items-center justify-center rounded-full border border-gray-alpha-400 text-gray-900">
          <IconNfc className="size-4" />
        </span>
        <div className="absolute top-[60px] left-1/2 flex w-44 -translate-x-1/2 items-center gap-2 bg-background-100 px-2.5 py-2 text-label-12">
          <IconReceipt className="size-4 shrink-0 text-gray-1000" />
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="flex justify-between text-gray-1000">
              Cashback
              <span className="text-green-900">$9.74</span>
            </span>
            <span className="text-gray-900">16 Jul 2026</span>
          </div>
        </div>
        <div className="absolute top-[121px] left-1/2 flex h-80 w-52 -translate-x-1/2 flex-col gap-3 rounded-t-[2rem] border-[5px] border-b-0 border-gray-1000 bg-gray-1000 px-3 pt-3">
          <div className="flex items-center justify-between px-3 text-label-12 text-background-100">
            4:20
            <span className="h-4 w-12 rounded-full bg-gray-900" />
            <span className="h-2 w-5 rounded-xs bg-background-100" />
          </div>
          <XCard className="w-full" />
        </div>
      </div>
    </div>
  )
}

// 05: the Face ID prompt on a tile of page surface.
export function SecurityMock() {
  return (
    <div className="flex size-28 items-center justify-center bg-background-100 text-gray-1000">
      <IconFaceId stroke={1.5} className="size-12" />
    </div>
  )
}

// 06: a question to support and its answer, as two bubbles.
export function SupportMock() {
  return (
    <div className="flex w-[280px] shrink-0 flex-col gap-1.5">
      <Bubble variant="outline" className="max-w-full">
        <BubbleContent>Has my mailed check gone out yet?</BubbleContent>
      </Bubble>
      <span className="flex items-center justify-end gap-1 text-label-12 text-gray-700">
        <IconCheck className="size-3" />
        Read
      </span>
      <Bubble variant="tinted" className="max-w-full">
        <BubbleContent>
          Your check has shipped and should arrive in about 2 business days.
        </BubbleContent>
      </Bubble>
      <span className="flex items-center gap-1.5 text-label-12 text-gray-700">
        <span className="size-4 rounded-full bg-gray-400" />
        John
      </span>
    </div>
  )
}
