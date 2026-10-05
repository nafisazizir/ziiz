import type { PatternProps } from "./frame"
import { PatternSteps } from "./steps"
import { PatternWedge } from "./wedge"
import { PatternNotch } from "./notch"
import { PatternWedgeMirror } from "./wedge-mirror"
import { PatternCornerNotch } from "./corner-notch"
import { PatternBowl } from "./bowl"
import { PatternLens } from "./lens"
import { PatternSpread } from "./spread"
import { PatternQuadrant } from "./quadrant"
import { PatternSlots } from "./slots"
import { PatternColumns } from "./columns"

export type PatternEntry = {
  name: string
  label: string
  Component: (props: PatternProps) => React.ReactNode
}

export const patterns: PatternEntry[] = [
  { name: "PatternSteps", label: "Steps", Component: PatternSteps },
  { name: "PatternWedge", label: "Wedge", Component: PatternWedge },
  { name: "PatternNotch", label: "Notch", Component: PatternNotch },
  {
    name: "PatternWedgeMirror",
    label: "Wedge mirror",
    Component: PatternWedgeMirror,
  },
  {
    name: "PatternCornerNotch",
    label: "Corner notch",
    Component: PatternCornerNotch,
  },
  { name: "PatternBowl", label: "Bowl", Component: PatternBowl },
  { name: "PatternLens", label: "Lens", Component: PatternLens },
  { name: "PatternSpread", label: "Spread", Component: PatternSpread },
  { name: "PatternQuadrant", label: "Quadrant", Component: PatternQuadrant },
  { name: "PatternSlots", label: "Slots", Component: PatternSlots },
  { name: "PatternColumns", label: "Columns", Component: PatternColumns },
]

export {
  PatternSteps,
  PatternWedge,
  PatternNotch,
  PatternWedgeMirror,
  PatternCornerNotch,
  PatternBowl,
  PatternLens,
  PatternSpread,
  PatternQuadrant,
  PatternSlots,
  PatternColumns,
}
export { PatternFrame, type PatternProps } from "./frame"
export { PatternStage } from "./stage"
