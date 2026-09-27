import {
  IconChartHistogram,
  IconChevronDown,
  IconCoins,
  IconMessageCircle,
  IconPlayerPlay,
  IconPointer,
  IconUsersGroup,
} from "@tabler/icons-react"

import { Browser } from "@/components/business-x/mocks/browser"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const objectives = [
  {
    icon: IconCoins,
    title: "Sales",
    copy: "Drive purchases, sign-ups, or other actions",
    recommended: true,
  },
  {
    icon: IconUsersGroup,
    title: "Reach",
    copy: "Show your ad to the most people",
  },
  {
    icon: IconMessageCircle,
    title: "Engagements",
    copy: "Get people to engage with your posts",
  },
  {
    icon: IconPointer,
    title: "Website traffic",
    copy: "Send people to a website",
  },
  {
    icon: IconPlayerPlay,
    title: "Video views",
    copy: "Get people to watch your videos",
  },
]

// The campaign builder in Ads Manager: a stepper down the left, the
// campaign's name and objective on the right, bleeding off the panel's
// bottom right as on x.com.
export function AdsManagerMock() {
  return (
    <Browser>
      <div className="flex w-160 gap-8 pt-2 text-gray-1000">
        <ol className="flex w-36 shrink-0 flex-col gap-3 text-label-12 text-gray-900">
          <li className="flex h-8 items-center justify-between rounded-md border border-gray-alpha-400 px-2 text-gray-1000">
            {`Campaign`}
            <IconChevronDown className="size-3" />
          </li>
          <li className="text-gray-1000">Ad group 1</li>
          <li className="pl-3 text-gray-1000">Details</li>
          <li className="pl-3">Ad 1</li>
          <li className="pl-3">+ Add ad group</li>
          <li className="text-gray-1000">Review and launch</li>
        </ol>
        <div className="flex flex-1 flex-col gap-6">
          <section className="flex flex-col gap-3">
            <div className="flex flex-col gap-0.5">
              <h4 className="text-heading-16">Details</h4>
              <p className="text-label-12 text-gray-900">
                Give your campaign a name so you can find it later.
              </p>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="ads-manager-name">Name</Label>
              <Input
                id="ads-manager-name"
                readOnly
                defaultValue="Campaign, Oct 17, 2:47 PM"
                className="h-8"
              />
            </div>
          </section>
          <section className="flex flex-col gap-3">
            <div className="flex flex-col gap-0.5">
              <h4 className="text-heading-16">Objective</h4>
              <p className="text-label-12 text-gray-900">
                Pick the objective that best matches what you want to achieve.
              </p>
            </div>
            <ul className="flex flex-col">
              {objectives.map((item, index) => (
                <li
                  key={item.title}
                  className="flex items-center gap-3 border-t border-gray-alpha-400 py-3"
                >
                  <span className="flex size-4 items-center justify-center rounded-full border border-gray-alpha-500">
                    {index === 0 && (
                      <span className="size-2 rounded-full bg-gray-1000" />
                    )}
                  </span>
                  <item.icon stroke={1.5} className="size-4 text-gray-900" />
                  <div className="flex flex-1 flex-col">
                    <p className="text-label-13">{item.title}</p>
                    <p className="text-label-12 text-gray-900">{item.copy}</p>
                  </div>
                  {item.recommended && <Badge>Recommended</Badge>}
                </li>
              ))}
            </ul>
          </section>
          <IconChartHistogram className="sr-only" />
        </div>
      </div>
    </Browser>
  )
}
