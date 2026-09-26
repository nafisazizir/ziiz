import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowDataTransferVerticalIcon,
  Cancel01Icon,
  CheckmarkBadge02Icon,
  CompassIcon,
  Location01Icon,
  Wallet01Icon,
} from "@/components/icons/hugeicons"

import { AspectRatio } from "@/components/ui/aspect-ratio"
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

// "Why brands choose X Ads": three numbered features, each with a small
// product mock in a grey panel. The mocks are ziiz cards, badges and inputs
// as shipped, and that is the point of the exercise.
//
// x.com's geometry at 1024px and up: an eight-column grid, a feature is a
// 9:8 panel at two columns beside two columns of text, and the third runs
// 7:3 across four. The "Explore Ads" button is collapsed until the feature
// is hovered, and the other features dim to half while one is.
//
// Below 1024px the features stack. From 640px each is a two-column row with
// the text leading on 01 and 03 and the panel leading on 02; under 640px the
// panel sits above the text. The panel is 3:2 until 960px, then 11:6 up to
// the grid.
//
// x.com draws its mocks in container-query units: at every viewport the
// card is exactly as wide as the panel's content area is tall (197px in a
// 311x197 area at 375px, 116px in 136x116 at 1024px, 190px in 220x190 at
// 1512px). The ziiz mocks are real components at a fixed natural width
// (`scene`), so each is zoomed from that width to the panel's content
// height. Every panel is landscape, so the zoomed card always fits.
const features = [
  {
    number: "01",
    title: "Extend your influence",
    copy: "Reach your audience anywhere from your local community to worldwide, with precise geographic targeting.",
    mock: <LocationsMock />,
    scene: 224,
  },
  {
    number: "02",
    title: "Smart spend, better returns",
    copy: "Set your budget, and ensure you get maximum conversions at the lowest cost, making every dollar count.",
    mock: <BudgetMock />,
    scene: 224,
  },
  {
    number: "03",
    title: "AI-powered advertising",
    copy: "Let our AI do the hard work. It targets the users most likely to love your ads, saving you time and boosting your results.",
    mock: <AdMock />,
    scene: 256,
    wide: true,
  },
]

export function Features() {
  return (
    <section className="flex flex-col gap-14">
      <h2 className="text-heading-32 text-balance text-gray-1000">
        Why brands choose X Ads
        <br />
        <span className="text-gray-900">
          to grow their brand and drive results
        </span>
      </h2>
      <ol className="group/list grid grid-cols-8 gap-x-4 gap-y-12">
        {features.map((feature, index) => (
          <li
            key={feature.number}
            className={cn(
              "group/feature col-span-8 grid grid-cols-1 gap-4 transition-opacity duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-has-[li:hover]/list:not-hover:opacity-50 sm:grid-cols-2",
              feature.wide ? "lg:grid-cols-8" : "lg:col-span-4"
            )}
          >
            <div
              className={cn(
                "flex aspect-3/2 items-center justify-center overflow-hidden bg-gray-100 p-4 sm:aspect-9/6 min-[60rem]:aspect-11/6 lg:p-6",
                feature.wide ? "lg:col-span-4 lg:aspect-7/3" : "lg:aspect-9/8",
                index % 2 === 0 && "sm:order-2 lg:order-none"
              )}
            >
              <div className="[container-type:size] flex size-full items-center justify-center">
                <div
                  className="flex shrink-0 items-center justify-center"
                  style={{
                    width: feature.scene,
                    zoom: `calc(100cqh / ${feature.scene}px)`,
                  }}
                >
                  {feature.mock}
                </div>
              </div>
            </div>
            <div
              className={cn(
                "flex flex-col justify-start gap-3 text-balance sm:justify-between sm:gap-0",
                feature.wide && "lg:col-span-2",
                index % 2 === 0 && "sm:order-1 lg:order-none"
              )}
            >
              <span className="text-label-13 text-gray-700">
                {feature.number}
              </span>
              <div className="flex flex-col">
                <div className="flex flex-col gap-1">
                  <h3 className="text-heading-14 text-gray-1000">
                    {feature.title}
                  </h3>
                  <p className="text-copy-13 text-gray-900">{feature.copy}</p>
                </div>
                {/* Collapsed row that opens on hover, like x.com; the
                    negative margin keeps the focus ring out of the clip. */}
                <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-300 md:grid-rows-[0fr] md:group-hover/feature:grid-rows-[1fr]">
                  <div className="-mx-2 flex flex-col justify-end overflow-hidden px-2">
                    <div className="pt-4 pb-2 transition-opacity duration-300 md:opacity-0 md:group-hover/feature:opacity-100">
                      <Button shape="rounded" variant="secondary" size="sm">
                        Explore Ads
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

// x.com's mocks head with an icon tile, a title and two placeholder bars in
// place of a subtitle. CardHeader is a grid already; the tile takes both
// rows and the title and bars stack beside it.
function MockHeader({
  icon,
  children,
}: {
  icon: typeof Location01Icon
  children: React.ReactNode
}) {
  return (
    <>
      <span className="row-span-2 flex size-7 items-center justify-center bg-gray-100">
        <HugeiconsIcon icon={icon} strokeWidth={2} className="size-4" />
      </span>
      <CardTitle>{children}</CardTitle>
      <MockLines />
    </>
  )
}

function MockLines() {
  return (
    <div className="flex gap-1.5">
      <Skeleton className="h-1.5 w-7" />
      <Skeleton className="h-1.5 w-14" />
    </div>
  )
}

const locations = ["United States", "Japan", "Brazil", "Argentina", "Germany"]

function LocationsMock() {
  return (
    <Card size="sm" className="w-full max-w-56">
      <CardHeader className="grid-cols-[auto_1fr] gap-x-3">
        <MockHeader icon={Location01Icon}>Locations</MockHeader>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-1.5">
        {locations.map((place) => (
          <Badge key={place} variant="secondary">
            {place}
            <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} />
          </Badge>
        ))}
      </CardContent>
    </Card>
  )
}

function BudgetMock() {
  return (
    <Card size="sm" className="w-full max-w-56">
      <CardHeader className="grid-cols-[auto_1fr] gap-x-3">
        <MockHeader icon={Wallet01Icon}>Budget</MockHeader>
      </CardHeader>
      <CardContent className="relative flex flex-col gap-2">
        <BudgetField id="business-x-amount" label="Amount" unit="USD" />
        <Button
          shape="rounded"
          variant="secondary"
          size="icon-xs"
          className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
        >
          <HugeiconsIcon icon={ArrowDataTransferVerticalIcon} strokeWidth={2} />
          <span className="sr-only">Swap</span>
        </Button>
        <BudgetField id="business-x-audience" label="Audience" unit="Views" />
      </CardContent>
    </Card>
  )
}

// The label leads the value and the unit trails it, all on one line, so the
// two fields stay short enough for the panel.
function BudgetField({
  id,
  label,
  unit,
}: {
  id: string
  label: string
  unit: string
}) {
  return (
    <InputGroup>
      <InputGroupAddon align="inline-start">
        <InputGroupText>{label}</InputGroupText>
      </InputGroupAddon>
      <InputGroupInput id={id} placeholder="0" aria-label={label} />
      <InputGroupAddon align="inline-end">
        <InputGroupText>{unit}</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  )
}

function AdMock() {
  return (
    <Card size="sm" className="w-full max-w-64">
      <CardHeader className="grid-cols-[auto_1fr] gap-x-3">
        <span className="row-span-2 size-7 bg-gray-100" />
        <CardTitle className="flex items-center gap-1">
          Business
          <HugeiconsIcon
            icon={CheckmarkBadge02Icon}
            strokeWidth={2}
            className="size-4 text-amber-700"
          />
          <span className="ml-auto text-label-12 text-gray-900">Ad</span>
        </CardTitle>
        <MockLines />
      </CardHeader>
      <CardContent>
        <div className="bg-gray-100">
          <AspectRatio
            ratio={3 / 1}
            className="flex items-center justify-center"
          >
            <HugeiconsIcon
              icon={CompassIcon}
              strokeWidth={1.5}
              className="size-8 text-gray-700"
            />
          </AspectRatio>
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        <AvatarGroup>
          <Avatar size="sm">
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <Avatar size="sm">
            <AvatarFallback>J</AvatarFallback>
          </Avatar>
          <AvatarGroupCount>+2k</AvatarGroupCount>
        </AvatarGroup>
        <span className="text-label-12 text-gray-900">
          Engaged with your posts
        </span>
      </CardFooter>
    </Card>
  )
}
