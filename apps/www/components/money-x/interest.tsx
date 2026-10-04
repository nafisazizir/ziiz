import {
  IconBuildingBank,
  IconFirstAidKit,
  IconGift,
  IconHome,
  IconMusic,
  IconPlane,
  IconRocket,
  type Icon,
} from "@tabler/icons-react"

import { cn } from "@/lib/utils"

type Tile = {
  icon: Icon
  label: string
  amount: string
  // Centre offset from the panel's centre and scale, measured on the 1120px
  // landscape panel and on the 528px portrait one. Tiles the portrait
  // panel leaves out have no second set.
  wide: [x: number, y: number, scale: number]
  tall?: [x: number, y: number, scale: number]
  // Further back: smaller on the site, and out of focus.
  far?: boolean
}

const tiles: Tile[] = [
  {
    icon: IconPlane,
    label: "Japan Trip",
    amount: "$6,847.12",
    wide: [454, -139, 0.93],
    tall: [299, 341, 1.04],
  },
  {
    icon: IconBuildingBank,
    label: "Savings",
    amount: "$8,763.45",
    wide: [-382, -178, 0.93],
    tall: [-254, -252, 1],
  },
  {
    icon: IconBuildingBank,
    label: "Savings",
    amount: "$8,000.00",
    wide: [-152, -200, 0.71],
    tall: [-98, 220, 0.79],
    far: true,
  },
  {
    icon: IconMusic,
    label: "Recitals",
    amount: "$8,000.00",
    wide: [-9, -320, 0.71],
    tall: [-4, -297, 0.79],
    far: true,
  },
  {
    icon: IconRocket,
    label: "For Cybertruck",
    amount: "$2,487.63",
    wide: [-219, 200, 1.11],
    tall: [-145, 154, 1.21],
  },
  {
    icon: IconHome,
    label: "New House",
    amount: "$22,905.71",
    wide: [359, -259, 0.79],
    tall: [240, -230, 0.89],
  },
  {
    icon: IconGift,
    label: "Holiday Gifts",
    amount: "$2,621.64",
    wide: [-499, 196, 0.82],
  },
  {
    icon: IconFirstAidKit,
    label: "Emergency",
    amount: "$7,248.21",
    wide: [529, 140, 0.86],
  },
]

// "Up to 6.00% APY" over a field of savings goals. The panel is 5:6, then
// 2:1 from 1024px, and the field scales with its width: every offset and
// tile size below is a share of it. The site drifts the tiles; here they
// hold one frame of that, with a 97px fade at the top and bottom edges.
export function InterestField() {
  return (
    <div
      role="img"
      aria-label="Industry-leading interest"
      className="[container-type:inline-size] pointer-events-none relative aspect-5/6 w-full overflow-hidden bg-gray-100 select-none lg:aspect-2/1"
    >
      {tiles.map((tile) => (
        <div
          key={tile.label + tile.amount}
          style={
            {
              "--x": tile.tall?.[0] ?? 0,
              "--y": tile.tall?.[1] ?? 0,
              "--s": tile.tall?.[2] ?? 1,
              "--wx": tile.wide[0],
              "--wy": tile.wide[1],
              "--ws": tile.wide[2],
            } as React.CSSProperties
          }
          className={cn(
            "absolute top-[calc(50%+var(--y)*100cqw/528)] left-[calc(50%+var(--x)*100cqw/528)] -translate-1/2 lg:top-[calc(50%+var(--wy)*100cqw/1120)] lg:left-[calc(50%+var(--wx)*100cqw/1120)]",
            !tile.tall && "max-lg:hidden",
            tile.far && "opacity-50 blur-[2px]"
          )}
        >
          <div className="flex h-32 w-[179px] [zoom:calc(var(--s)*100cqw/528px)] flex-col items-start justify-between bg-background-100 p-3 text-gray-1000 lg:[zoom:calc(var(--ws)*100cqw/1120px)]">
            <div className="flex items-center gap-2">
              <span className="flex size-5.5 shrink-0 items-center justify-center rounded-full bg-gray-100">
                <tile.icon className="size-3.5" />
              </span>
              <span className="text-label-13">{tile.label}</span>
            </div>
            <div className="flex flex-col items-start whitespace-nowrap">
              <span className="text-label-12 text-green-900">+6.00% APY</span>
              <span className="text-heading-24">{tile.amount}</span>
            </div>
          </div>
        </div>
      ))}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-4 text-center">
        <p className="text-heading-32 text-gray-1000 lg:text-heading-48">
          Up to 6.00% APY
          <span className="ml-1">¹</span>
        </p>
        <p className="text-label-12 whitespace-nowrap text-gray-900">
          Rates and eligibility vary by subscription. Interest not currently
          available in New York. See terms.
        </p>
      </div>
      <div className="absolute inset-x-0 top-0 h-[97px] bg-linear-to-b from-gray-100 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[97px] bg-linear-to-t from-gray-100 to-transparent" />
    </div>
  )
}
