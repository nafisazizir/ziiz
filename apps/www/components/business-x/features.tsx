import {
  IconArrowsUpDown,
  IconCompass,
  IconMapPin,
  IconRosetteDiscountCheck,
  IconWallet,
  IconX,
} from "@tabler/icons-react"

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
import {
  FeatureAction,
  NumberedFeatures,
  type Feature,
} from "@/components/business-x/numbered-features"

// "Why brands choose X Ads": three numbered features, each with a small
// product mock in a grey panel. The mocks are ziiz cards, badges and inputs
// as shipped, and that is the point of the exercise. The list itself is the
// NumberedFeatures block every section landing uses.
const features: Feature[] = [
  {
    title: "Extend your influence",
    copy: "Reach your audience anywhere from your local community to worldwide, with precise geographic targeting.",
    mock: <LocationsMock />,
    scene: 224,
    action: <FeatureAction>Explore Ads</FeatureAction>,
  },
  {
    title: "Smart spend, better returns",
    copy: "Set your budget, and ensure you get maximum conversions at the lowest cost, making every dollar count.",
    mock: <BudgetMock />,
    scene: 224,
    action: <FeatureAction>Explore Ads</FeatureAction>,
  },
  {
    title: "AI-powered advertising",
    copy: "Let our AI do the hard work. It targets the users most likely to love your ads, saving you time and boosting your results.",
    mock: <AdMock />,
    scene: 256,
    wide: true,
    action: <FeatureAction>Explore Ads</FeatureAction>,
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
      <NumberedFeatures items={features} />
    </section>
  )
}

// x.com's mocks head with an icon tile, a title and two placeholder bars in
// place of a subtitle. CardHeader is a grid already; the tile takes both
// rows and the title and bars stack beside it.
function MockHeader({
  icon: ItemIcon,
  children,
}: {
  icon: typeof IconMapPin
  children: React.ReactNode
}) {
  return (
    <>
      <span className="row-span-2 flex size-7 items-center justify-center bg-gray-100">
        <ItemIcon className="size-4" />
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
        <MockHeader icon={IconMapPin}>Locations</MockHeader>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-1.5">
        {locations.map((place) => (
          <Badge key={place} variant="secondary">
            {place}
            <IconX />
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
        <MockHeader icon={IconWallet}>Budget</MockHeader>
      </CardHeader>
      <CardContent className="relative flex flex-col gap-2">
        <BudgetField id="business-x-amount" label="Amount" unit="USD" />
        <Button
          shape="rounded"
          variant="secondary"
          size="icon-xs"
          className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
        >
          <IconArrowsUpDown />
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
          <IconRosetteDiscountCheck className="size-4 text-amber-700" />
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
            <IconCompass stroke={1.5} className="size-8 text-gray-700" />
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
