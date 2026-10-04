import {
  IconInfoCircle,
  IconMenu2,
  IconRosetteDiscountCheck,
  IconTrendingUp,
} from "@tabler/icons-react"

import { Phone } from "@/components/business-x/mocks/phone"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const activity = [
  { name: "Alex", badge: "blue", note: "“gas money”", amount: "+$20.00" },
  {
    name: "McDonald’s",
    badge: "gold",
    note: "Food & Drink",
    amount: "$42.21",
    back: "+$1.27",
  },
  {
    name: "Chase Checking 4242",
    note: "Transfer to Bank",
    amount: "$1,200.00",
  },
  { name: "Amanda", badge: "blue", note: "“team lunch”", amount: "$100.00" },
  {
    name: "Delta Airlines",
    badge: "gold",
    note: "Travel",
    amount: "$357.18",
    back: "+$10.72",
  },
]

// The Money tab of the X app on the shared 300px phone: the balance with
// its cents raised, the yield line, the two actions, the card stack and a
// sheet of recent activity. People and merchants are grey discs and tiles.
export function MoneyPhone({
  dollars,
  cents,
  className,
}: {
  dollars: string
  cents: string
  className?: string
}) {
  return (
    <Phone className={className}>
      <div className="flex items-center justify-between px-5 pt-3">
        <span className="size-6 rounded-full bg-gray-300" />
        <span className="text-label-14">Money</span>
        <IconMenu2 className="size-4" />
      </div>
      <div className="flex flex-col gap-1 px-5 pt-5">
        <p className="flex items-start text-heading-40">
          {dollars}
          <span className="mt-1 ml-1 text-label-14">{cents}</span>
        </p>
        <p className="flex items-center gap-1 text-label-12 text-green-900">
          <IconTrendingUp className="size-3.5" />
          6.00% APY
          <IconInfoCircle className="size-3.5" />
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2 px-5 pt-5">
        <Button shape="rounded" size="sm">
          Send Money
        </Button>
        <Button shape="rounded" size="sm" variant="secondary">
          Add Money
        </Button>
      </div>
      <div className="relative mx-4 mt-5 h-16 shrink-0">
        <span className="absolute inset-x-2 top-0 h-full rounded-t-xl bg-gray-400" />
        <span className="absolute inset-x-0 top-3 flex h-full items-start rounded-t-xl bg-gray-1000 p-3">
          <span className="rounded-full bg-gray-900 px-2 text-label-12 text-background-100">
            View Cards
          </span>
        </span>
      </div>
      <div className="relative -mt-4 flex flex-1 flex-col gap-3.5 rounded-t-2xl border border-gray-alpha-400 bg-background-100 px-4 pt-4">
        <p className="flex items-center justify-between text-label-13">
          Recent Activity
          <span className="text-gray-900">›</span>
        </p>
        {activity.map((row) => (
          <div key={row.name} className="flex items-center gap-2.5">
            <span
              className={cn(
                "size-7 shrink-0 bg-gray-300",
                row.badge === "blue" ? "rounded-full" : "rounded-md"
              )}
            />
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="flex items-center gap-1 text-label-12 text-gray-1000">
                {row.name}
                {row.badge && (
                  <IconRosetteDiscountCheck
                    className={cn(
                      "size-3",
                      row.badge === "blue" ? "text-blue-700" : "text-amber-700"
                    )}
                  />
                )}
              </span>
              <span className="text-label-12 text-gray-900">{row.note}</span>
            </div>
            <div className="flex flex-col items-end">
              <span
                className={cn(
                  "text-label-12",
                  row.amount.startsWith("+")
                    ? "text-green-900"
                    : "text-gray-1000"
                )}
              >
                {row.amount}
              </span>
              {row.back && (
                <span className="text-label-12 text-green-900">{row.back}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </Phone>
  )
}
