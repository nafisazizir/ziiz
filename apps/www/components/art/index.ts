import { GrowthGraph } from "./banners/growth-graph"
import { PerformanceCards } from "./banners/performance-cards"
import { AdFormats } from "./banners/ad-formats"
import { PerspectiveFrame } from "./banners/perspective-frame"
import { RingStack } from "./banners/ring-stack"
import { LayeredFrames } from "./banners/layered-frames"
import { CircleChain } from "./banners/circle-chain"
import { FieldLines } from "./banners/field-lines"
import { Orbits } from "./banners/orbits"
import { Beams } from "./banners/beams"
import { Pipeline } from "./banners/pipeline"
import { Spotlight } from "./banners/spotlight"
import { TimelineFrame } from "./banners/timeline-frame"
import { VideoPlayer } from "./banners/video-player"
import { SpacesOrbit } from "./banners/spaces-orbit"
import { Tracks } from "./banners/tracks"
import { SpecialistArcs } from "./sections/specialist-arcs"
import { CrossingRods } from "./sections/crossing-rods"
import { DashField } from "./sections/dash-field"
import { WorldMarkers } from "./sections/world-markers"
import { CreditEllipse } from "./sections/credit-ellipse"
import { XcomWordmark } from "./sections/xcom-wordmark"
import { Starburst } from "./marks/starburst"
import { AudienceCloud } from "./marks/audience-cloud"
import { ConversationPair } from "./marks/conversation-pair"
import { OrbitMark } from "./marks/orbit-mark"
import { ToneRows } from "./marks/tone-rows"
import { RaySquare } from "./marks/ray-square"
import { RadarRing } from "./marks/radar-ring"
import { FunnelGrid } from "./marks/funnel-grid"
import { PetalDiamond } from "./marks/petal-diamond"
import { FanIn } from "./marks/fan-in"
import { XAppTile } from "./marks/x-app-tile"
import { NetworkHub } from "./cards/network-hub"
import { DiamondCompass } from "./cards/diamond-compass"
import { ArcNodes } from "./cards/arc-nodes"
import { TimerBars } from "./cards/timer-bars"
import { WatchPartyCard } from "./cards/watch-party-card"
import { RecordingPanels } from "./cards/recording-panels"
import { MediaFrames } from "./cards/media-frames"
import { StackedFrames } from "./cards/stacked-frames"
import { ShapeTrio } from "./cards/shape-trio"
import { BlogSteps } from "./blog/steps"
import { BlogWedge } from "./blog/wedge"
import { BlogNotch } from "./blog/notch"
import { BlogWedgeMirror } from "./blog/wedge-mirror"
import { BlogCornerNotch } from "./blog/corner-notch"
import { BlogBowl } from "./blog/bowl"
import { BlogLens } from "./blog/lens"
import { BlogSpread } from "./blog/spread"
import { BlogQuadrant } from "./blog/quadrant"
import { BlogSlots } from "./blog/slots"
import { BlogColumns } from "./blog/columns"

export type ArtCategory = keyof typeof categories

export const categories = {
  banners: {
    label: "Banners",
    note: "one hero per page, wide and narrow drawings",
  },
  sections: {
    label: "Sections",
    note: "backdrops for the form, the CTA, the footer",
  },
  marks: {
    label: "Marks",
    note: "feature icons on an 84 canvas, half-unit strokes",
  },
  cards: {
    label: "Cards",
    note: "illustrations above a card title",
  },
  blog: {
    label: "Blog cards",
    note: "patterns the blog rotates behind its cards",
  },
} as const

export type ArtEntry = {
  name: string
  label: string
  category: ArtCategory
  source: string
  variants: { variant: string; viewBox: string }[]
  Component: (
    props: import("./props").ArtProps & { variant?: never }
  ) => React.ReactNode
}

export const art = [
  {
    name: "GrowthGraph",
    label: "Growth graph",
    category: "banners",
    source: "home, advertising/measurement",
    variants: [
      { variant: "wide", viewBox: "0 0 1120 402" },
      { variant: "narrow", viewBox: "0 0 404 240" },
    ],
    Component: GrowthGraph,
  },
  {
    name: "PerformanceCards",
    label: "Performance cards",
    category: "banners",
    source: "advertising",
    variants: [
      { variant: "wide", viewBox: "0 0 1120 402" },
      { variant: "narrow", viewBox: "230.67 5.44 658.67 391.11" },
    ],
    Component: PerformanceCards,
  },
  {
    name: "AdFormats",
    label: "Ad formats",
    category: "banners",
    source: "advertising/formats, products",
    variants: [
      { variant: "wide", viewBox: "0 0 1118 462" },
      { variant: "narrow", viewBox: "204 20.8 700 420" },
    ],
    Component: AdFormats,
  },
  {
    name: "PerspectiveFrame",
    label: "Perspective frame",
    category: "banners",
    source: "advertising/get-started-with-twitter-ads",
    variants: [
      { variant: "wide", viewBox: "0 0 1118 462" },
      { variant: "narrow", viewBox: "0 0 404 230" },
    ],
    Component: PerspectiveFrame,
  },
  {
    name: "RingStack",
    label: "Ring stack",
    category: "banners",
    source: "basics",
    variants: [
      { variant: "wide", viewBox: "-1 0 1120 462" },
      { variant: "narrow", viewBox: "0 0 404 300" },
    ],
    Component: RingStack,
  },
  {
    name: "LayeredFrames",
    label: "Layered frames",
    category: "banners",
    source: "advertising/creative-best-practices",
    variants: [
      { variant: "wide", viewBox: "0 0 1118 462" },
      { variant: "narrow", viewBox: "0 0 404 343" },
    ],
    Component: LayeredFrames,
  },
  {
    name: "CircleChain",
    label: "Circle chain",
    category: "banners",
    source: "basics/get-your-business-started-with-x",
    variants: [
      { variant: "wide", viewBox: "0 0 1118 462" },
      { variant: "narrow", viewBox: "0 0 404 242" },
    ],
    Component: CircleChain,
  },
  {
    name: "FieldLines",
    label: "Field lines",
    category: "banners",
    source: "basics/intro-x-for-business",
    variants: [
      { variant: "wide", viewBox: "0 0 1118 462" },
      { variant: "narrow", viewBox: "0 0 404 340" },
    ],
    Component: FieldLines,
  },
  {
    name: "Orbits",
    label: "Orbits",
    category: "banners",
    source: "blog",
    variants: [
      { variant: "wide", viewBox: "0 0 1118 462" },
      { variant: "narrow", viewBox: "0 0 404 242" },
    ],
    Component: Orbits,
  },
  {
    name: "Beams",
    label: "Beams",
    category: "banners",
    source: "products/amplify-sponsorships",
    variants: [
      { variant: "wide", viewBox: "0 0 1118 462" },
      { variant: "narrow", viewBox: "0 0 404 242" },
    ],
    Component: Beams,
  },
  {
    name: "Pipeline",
    label: "Pipeline",
    category: "banners",
    source: "products/shopping",
    variants: [
      { variant: "wide", viewBox: "0 0 1118 462" },
      { variant: "narrow", viewBox: "0 0 404 242" },
    ],
    Component: Pipeline,
  },
  {
    name: "Spotlight",
    label: "Spotlight",
    category: "banners",
    source: "products/spotlight-takeovers",
    variants: [
      { variant: "wide", viewBox: "0 0 1118 462" },
      { variant: "narrow", viewBox: "0 0 404 340" },
    ],
    Component: Spotlight,
  },
  {
    name: "TimelineFrame",
    label: "Timeline frame",
    category: "banners",
    source: "products/timeline-takeovers",
    variants: [
      { variant: "wide", viewBox: "0 0 1118 462" },
      { variant: "narrow", viewBox: "0 0 404 242" },
    ],
    Component: TimelineFrame,
  },
  {
    name: "VideoPlayer",
    label: "Video player",
    category: "banners",
    source: "products/vertical-video-ads",
    variants: [
      { variant: "wide", viewBox: "0 0 1118 462" },
      { variant: "narrow", viewBox: "0 0 404 242" },
    ],
    Component: VideoPlayer,
  },
  {
    name: "SpacesOrbit",
    label: "Spaces orbit",
    category: "banners",
    source: "products/x-spaces",
    variants: [
      { variant: "wide", viewBox: "0 0 1118 462" },
      { variant: "narrow", viewBox: "0 0 404 242" },
    ],
    Component: SpacesOrbit,
  },
  {
    name: "Tracks",
    label: "Tracks",
    category: "banners",
    source: "resources/x-marketing-calendar",
    variants: [
      { variant: "wide", viewBox: "0 0 1118 462" },
      { variant: "narrow", viewBox: "0 0 404 240" },
    ],
    Component: Tracks,
  },
  {
    name: "SpecialistArcs",
    label: "Specialist arcs",
    category: "sections",
    source: "home, advertising (contact form)",
    variants: [
      { variant: "wide", viewBox: "0 0 548 379" },
      { variant: "narrow", viewBox: "151.8 -43 460 460" },
    ],
    Component: SpecialistArcs,
  },
  {
    name: "CrossingRods",
    label: "Crossing rods",
    category: "sections",
    source: "closing CTA on 19 pages",
    variants: [
      { variant: "wide", viewBox: "0 0 881 440" },
      { variant: "narrow", viewBox: "-19.5 0 480 521" },
    ],
    Component: CrossingRods,
  },
  {
    name: "DashField",
    label: "Dash field",
    category: "sections",
    source:
      "advertising, get-started, vertical-video-ads (tab carousel backdrop)",
    variants: [{ variant: "default", viewBox: "0 0 828 441" }],
    Component: DashField,
  },
  {
    name: "WorldMarkers",
    label: "World markers",
    category: "sections",
    source: "success-stories",
    variants: [
      { variant: "wide", viewBox: "0 0 176 332" },
      { variant: "narrow", viewBox: "-70.185 11.814999999999998 316 316" },
    ],
    Component: WorldMarkers,
  },
  {
    name: "CreditEllipse",
    label: "Credit ellipse",
    category: "sections",
    source: "advertising (ad credit)",
    variants: [{ variant: "default", viewBox: "345 -35 430 530" }],
    Component: CreditEllipse,
  },
  {
    name: "XcomWordmark",
    label: "Xcom wordmark",
    category: "sections",
    source: "footer, every page",
    variants: [{ variant: "default", viewBox: "0 0 1392 318" }],
    Component: XcomWordmark,
  },
  {
    name: "Starburst",
    label: "Starburst",
    category: "marks",
    source: "basics/intro-x-for-business · Free business promotion",
    variants: [{ variant: "default", viewBox: "-6 -6 84 84" }],
    Component: Starburst,
  },
  {
    name: "AudienceCloud",
    label: "Audience cloud",
    category: "marks",
    source:
      "basics/intro-x-for-business · Reach new audiences; spotlight-takeovers",
    variants: [{ variant: "default", viewBox: "-6 -6 84 84" }],
    Component: AudienceCloud,
  },
  {
    name: "ConversationPair",
    label: "Conversation pair",
    category: "marks",
    source: "basics/intro-x-for-business · Start a conversation; takeovers",
    variants: [{ variant: "default", viewBox: "-6 -6 84 84" }],
    Component: ConversationPair,
  },
  {
    name: "OrbitMark",
    label: "Orbit mark",
    category: "marks",
    source: "basics/intro-x-for-business · Stay in the know",
    variants: [{ variant: "default", viewBox: "-6 -6 84 84" }],
    Component: OrbitMark,
  },
  {
    name: "ToneRows",
    label: "Tone rows",
    category: "marks",
    source: "basics/intro-x-for-business · Experiment with tone; advertising",
    variants: [{ variant: "default", viewBox: "-5.75 -5.75 84 84" }],
    Component: ToneRows,
  },
  {
    name: "RaySquare",
    label: "Ray square",
    category: "marks",
    source: "advertising",
    variants: [{ variant: "default", viewBox: "-6 -6 84 84" }],
    Component: RaySquare,
  },
  {
    name: "RadarRing",
    label: "Radar ring",
    category: "marks",
    source: "advertising, spotlight-takeovers",
    variants: [{ variant: "default", viewBox: "-6 -6 84 84" }],
    Component: RadarRing,
  },
  {
    name: "FunnelGrid",
    label: "Funnel grid",
    category: "marks",
    source: "advertising, spotlight-takeovers",
    variants: [{ variant: "default", viewBox: "-6 -6 84 84" }],
    Component: FunnelGrid,
  },
  {
    name: "PetalDiamond",
    label: "Petal diamond",
    category: "marks",
    source: "advertising, spotlight-takeovers",
    variants: [{ variant: "default", viewBox: "-6 -6 82 82" }],
    Component: PetalDiamond,
  },
  {
    name: "FanIn",
    label: "Fan in",
    category: "marks",
    source: "advertising, spotlight-takeovers",
    variants: [{ variant: "default", viewBox: "6 6 67 67" }],
    Component: FanIn,
  },
  {
    name: "XAppTile",
    label: "Xapp tile",
    category: "marks",
    source: "basics (sign-in mock)",
    variants: [{ variant: "default", viewBox: "0 0 33.3 33.3" }],
    Component: XAppTile,
  },
  {
    name: "NetworkHub",
    label: "Network hub",
    category: "cards",
    source: "products/x-spaces · Expand your reach",
    variants: [{ variant: "default", viewBox: "56 42.5 256 303" }],
    Component: NetworkHub,
  },
  {
    name: "DiamondCompass",
    label: "Diamond compass",
    category: "cards",
    source: "products/x-spaces · Connect in real time",
    variants: [{ variant: "default", viewBox: "0 0 264 280" }],
    Component: DiamondCompass,
  },
  {
    name: "ArcNodes",
    label: "Arc nodes",
    category: "cards",
    source: "products/x-spaces · Stay in control",
    variants: [{ variant: "default", viewBox: "0 0 264 280" }],
    Component: ArcNodes,
  },
  {
    name: "TimerBars",
    label: "Timer bars",
    category: "cards",
    source: "products/x-spaces · Replay recorded Spaces",
    variants: [{ variant: "default", viewBox: "0 0 264 280" }],
    Component: TimerBars,
  },
  {
    name: "WatchPartyCard",
    label: "Watch party card",
    category: "cards",
    source: "products/x-spaces · Create and share clips",
    variants: [{ variant: "default", viewBox: "0 0 264 280" }],
    Component: WatchPartyCard,
  },
  {
    name: "RecordingPanels",
    label: "Recording panels",
    category: "cards",
    source: "products/x-spaces · Edit and customize recordings",
    variants: [{ variant: "default", viewBox: "0 0 358 222" }],
    Component: RecordingPanels,
  },
  {
    name: "MediaFrames",
    label: "Media frames",
    category: "cards",
    source: "advertising/creative-best-practices",
    variants: [{ variant: "default", viewBox: "0 0 362.667 214" }],
    Component: MediaFrames,
  },
  {
    name: "StackedFrames",
    label: "Stacked frames",
    category: "cards",
    source: "advertising/creative-best-practices",
    variants: [{ variant: "default", viewBox: "0 0 362.667 214" }],
    Component: StackedFrames,
  },
  {
    name: "ShapeTrio",
    label: "Shape trio",
    category: "cards",
    source: "advertising/creative-best-practices",
    variants: [{ variant: "default", viewBox: "0 0 362.667 214" }],
    Component: ShapeTrio,
  },
  {
    name: "BlogSteps",
    label: "Steps",
    category: "blog",
    source: "blog card pattern 01",
    variants: [{ variant: "default", viewBox: "0 0 398 245" }],
    Component: BlogSteps,
  },
  {
    name: "BlogWedge",
    label: "Wedge",
    category: "blog",
    source: "blog card pattern 02",
    variants: [{ variant: "default", viewBox: "0 0 398 245" }],
    Component: BlogWedge,
  },
  {
    name: "BlogNotch",
    label: "Notch",
    category: "blog",
    source: "blog card pattern 03",
    variants: [{ variant: "default", viewBox: "0 0 398 245" }],
    Component: BlogNotch,
  },
  {
    name: "BlogWedgeMirror",
    label: "Wedge mirror",
    category: "blog",
    source: "blog card pattern 04",
    variants: [{ variant: "default", viewBox: "0 0 398 245" }],
    Component: BlogWedgeMirror,
  },
  {
    name: "BlogCornerNotch",
    label: "Corner notch",
    category: "blog",
    source: "blog card pattern 05",
    variants: [{ variant: "default", viewBox: "0 0 398 245" }],
    Component: BlogCornerNotch,
  },
  {
    name: "BlogBowl",
    label: "Bowl",
    category: "blog",
    source: "blog card pattern 06",
    variants: [{ variant: "default", viewBox: "0 0 398 245" }],
    Component: BlogBowl,
  },
  {
    name: "BlogLens",
    label: "Lens",
    category: "blog",
    source: "blog card pattern 07",
    variants: [{ variant: "default", viewBox: "0 0 398 245" }],
    Component: BlogLens,
  },
  {
    name: "BlogSpread",
    label: "Spread",
    category: "blog",
    source: "blog card pattern 08",
    variants: [{ variant: "default", viewBox: "0 0 398 245" }],
    Component: BlogSpread,
  },
  {
    name: "BlogQuadrant",
    label: "Quadrant",
    category: "blog",
    source: "blog card pattern 09",
    variants: [{ variant: "default", viewBox: "0 0 398 245" }],
    Component: BlogQuadrant,
  },
  {
    name: "BlogSlots",
    label: "Slots",
    category: "blog",
    source: "blog card pattern 10",
    variants: [{ variant: "default", viewBox: "0 0 398 245" }],
    Component: BlogSlots,
  },
  {
    name: "BlogColumns",
    label: "Columns",
    category: "blog",
    source: "blog card pattern 11",
    variants: [{ variant: "default", viewBox: "0 0 398 245" }],
    Component: BlogColumns,
  },
] satisfies ArtEntry[]

export {
  GrowthGraph,
  PerformanceCards,
  AdFormats,
  PerspectiveFrame,
  RingStack,
  LayeredFrames,
  CircleChain,
  FieldLines,
  Orbits,
  Beams,
  Pipeline,
  Spotlight,
  TimelineFrame,
  VideoPlayer,
  SpacesOrbit,
  Tracks,
  SpecialistArcs,
  CrossingRods,
  DashField,
  WorldMarkers,
  CreditEllipse,
  XcomWordmark,
  Starburst,
  AudienceCloud,
  ConversationPair,
  OrbitMark,
  ToneRows,
  RaySquare,
  RadarRing,
  FunnelGrid,
  PetalDiamond,
  FanIn,
  XAppTile,
  NetworkHub,
  DiamondCompass,
  ArcNodes,
  TimerBars,
  WatchPartyCard,
  RecordingPanels,
  MediaFrames,
  StackedFrames,
  ShapeTrio,
  BlogSteps,
  BlogWedge,
  BlogNotch,
  BlogWedgeMirror,
  BlogCornerNotch,
  BlogBowl,
  BlogLens,
  BlogSpread,
  BlogQuadrant,
  BlogSlots,
  BlogColumns,
}
