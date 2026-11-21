/* Fixtures for the claude.ai clone. Every chat, project and artifact is
 * invented; times are fixed strings so pages render the same every time. */

export const BASE = "/claude-ai"

export const USER = {
  name: "Nafis",
  fullName: "Nafis Azizi Riza",
  email: "nafis@example.com",
  plan: "Ultra",
}

export type Model = { id: string; name: string; description: string }

export const MODELS: Model[] = [
  { id: "fable-5.2", name: "Fable 5.2", description: "For your toughest work" },
  {
    id: "opus-5.5",
    name: "Opus 5.5",
    description: "For complex work and everyday tasks",
  },
  {
    id: "sonnet-5.5",
    name: "Sonnet 5.5",
    description: "Most efficient for simpler tasks",
  },
  {
    id: "haiku-5.5",
    name: "Haiku 5.5",
    description: "Fastest for quick answers",
  },
]

export type Block =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "code"; lang: string; code: string }
  | { type: "quote"; text: string }

export type Turn =
  { role: "user"; text: string } | { role: "assistant"; blocks: Block[] }

export type Chat = {
  id: string
  title: string
  updated: string
  pinned?: boolean
  project?: string
  turns: Turn[]
}

const OKLCH: Turn[] = [
  {
    role: "user",
    text: "What does chroma actually mean in OKLCH? I keep seeing 0.25 as a max but my blues clip way before that.",
  },
  {
    role: "assistant",
    blocks: [
      {
        type: "p",
        text: "Chroma is distance from gray: how far a colour sits from the neutral axis at its lightness. OKLCH keeps it on an open scale, so 0.25 is a rough ceiling for vivid colours in wide gamuts, not a limit that holds at every hue.",
      },
      {
        type: "p",
        text: "What clips your blues is the sRGB gamut. Its edge is a lumpy shape, and the maximum chroma depends on both lightness and hue:",
      },
      {
        type: "ul",
        items: [
          "Blue peaks low, around L 0.45, and runs out of room fast as it gets lighter.",
          "Yellow peaks high, near L 0.95, which is why a dark yellow turns olive.",
          "Every hue hits zero chroma at pure black and pure white.",
        ],
      },
      {
        type: "p",
        text: "So the useful number is chroma as a fraction of the edge at that lightness and hue. Find the edge by bisecting until the colour converts into gamut:",
      },
      {
        type: "code",
        lang: "ts",
        code: `function maxChroma(L: number, H: number) {
  let lo = 0
  let hi = 0.4
  for (let i = 0; i < 24; i++) {
    const C = (lo + hi) / 2
    if (inSrgb(L, C, H)) lo = C
    else hi = C
  }
  return lo
}`,
      },
      {
        type: "p",
        text: "Then pick a saturation like 0.85 and multiply. A ramp built that way keeps the same perceived vividness at every step without ever clipping.",
      },
    ],
  },
  {
    role: "user",
    text: "Does that keep contrast stable if I tint my grays the same way?",
  },
  {
    role: "assistant",
    blocks: [
      {
        type: "p",
        text: "Not on its own. Adding chroma moves luminance at the same OKLab L: blue tints pull it down, yellow tints push it up. Text pairs drift by a few hundredths of a contrast ratio, enough to tip a 4.5:1 pair under.",
      },
      {
        type: "p",
        text: "Re-solve each tinted step's lightness until its relative luminance matches the pure-gray step it replaces. The hue changes and the contrast does not.",
      },
      {
        type: "p",
        text: "In short: tint is hue and chroma, contrast is luminance. Hold the second while you change the first.",
      },
    ],
  },
]

const REGEX: Turn[] = [
  {
    role: "user",
    text: "Regex for an ISO 8601 date, just the date part, that rejects month 13 and day 32.",
  },
  {
    role: "assistant",
    blocks: [
      {
        type: "p",
        text: "This checks the shape and the ranges, though not days per month:",
      },
      {
        type: "code",
        lang: "regex",
        code: "^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$",
      },
      {
        type: "p",
        text: "It accepts 2026-02-30, because a regex that knows February gets long and still misses leap years. Validate the shape here, then let a date library confirm the day exists:",
      },
      {
        type: "code",
        lang: "ts",
        code: `const ISO = /^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$/

function isIsoDate(s: string) {
  if (!ISO.test(s)) return false
  const d = new Date(\`\${s}T00:00:00Z\`)
  return d.toISOString().startsWith(s)
}`,
      },
    ],
  },
]

const KYOTO: Turn[] = [
  {
    role: "user",
    text: "Four days in Kyoto in early April. I like walking, gardens and food, not big crowds. Rough plan?",
  },
  {
    role: "assistant",
    blocks: [
      {
        type: "p",
        text: "Early April is peak cherry blossom, so the famous spots will be busy whatever you do. The plan below goes early to the big names and spends the middle of each day somewhere quieter.",
      },
      { type: "h3", text: "Day 1, Higashiyama" },
      {
        type: "ul",
        items: [
          "Kiyomizu-dera at opening, before the tour groups.",
          "Walk down Sannenzaka and Ninenzaka to Yasaka Shrine.",
          "Afternoon in Shoren-in, a temple garden most people skip.",
        ],
      },
      { type: "h3", text: "Day 2, the north" },
      {
        type: "ul",
        items: [
          "Philosopher's Path at 7am, then Honen-in.",
          "Lunch near Ginkaku-ji, then the moss at Shisen-do.",
        ],
      },
      { type: "h3", text: "Day 3, Arashiyama" },
      {
        type: "ul",
        items: [
          "Bamboo grove first thing, then Okochi Sanso villa garden.",
          "Boat up the Hozu river or the walk to Adashino Nenbutsu-ji.",
        ],
      },
      { type: "h3", text: "Day 4, markets and the south" },
      {
        type: "ul",
        items: [
          "Fushimi Inari past the first gates, where the crowd thins out.",
          "Nishiki Market for lunch, Tofuku-ji's gardens to finish.",
        ],
      },
      {
        type: "p",
        text: "Book anything with limited entry, like Okochi Sanso's tea or a kaiseki dinner, before you go. Walk-ins in blossom week are hard.",
      },
    ],
  },
]

const SOURDOUGH: Turn[] = [
  {
    role: "user",
    text: "My sourdough spreads flat. 78% hydration, 500g flour. What should I change first?",
  },
  {
    role: "assistant",
    blocks: [
      {
        type: "p",
        text: "Drop to 72% hydration for your next two bakes. 78% is a lot for most supermarket flour, and a dough that slumps is the usual sign.",
      },
      {
        type: "ol",
        items: [
          "Hold back 30g of the water and add it only if the dough feels tight after mixing.",
          "Add a third set of stretch and folds in the first two hours.",
          "Shape tighter, then cold-proof overnight so it holds its shape going into the oven.",
        ],
      },
      {
        type: "p",
        text: "Change one thing per bake, so you know which one fixed it.",
      },
    ],
  },
]

function short(ask: string, answer: string): Turn[] {
  return [
    { role: "user", text: ask },
    { role: "assistant", blocks: [{ type: "p", text: answer }] },
  ]
}

export const CHATS: Chat[] = [
  {
    id: "oklch-chroma",
    title: "OKLCH chroma and the sRGB edge",
    updated: "12 minutes ago",
    pinned: true,
    project: "ziiz",
    turns: OKLCH,
  },
  {
    id: "iso-date-regex",
    title: "Regex for ISO dates",
    updated: "2 hours ago",
    turns: REGEX,
  },
  {
    id: "kyoto-spring",
    title: "Four days in Kyoto in spring",
    updated: "Yesterday",
    pinned: true,
    turns: KYOTO,
  },
  {
    id: "sourdough-spread",
    title: "Sourdough spreading flat",
    updated: "2 days ago",
    turns: SOURDOUGH,
  },
  {
    id: "palette-name",
    title: "Naming a neutral palette",
    updated: "3 days ago",
    project: "ziiz",
    turns: short(
      "Pure gray palette, white page, near-black ink. Give me five names that are not a brand.",
      "Graphite, Newsprint, Pewter, Ink and Ash. Graphite reads best beside warmer names like Oat, because it says what the palette is: gray with a little weight to it."
    ),
  },
  {
    id: "reducer-refactor",
    title: "Refactor a React reducer",
    updated: "4 days ago",
    turns: short(
      "My reducer has 14 cases and half of them set loading flags. How do I split it?",
      "Pull the request lifecycle into its own small reducer keyed by request name, and keep the domain reducer for the data itself. The loading flags then come from one place, and each domain case shrinks to the data change it makes."
    ),
  },
  {
    id: "postgres-index",
    title: "Postgres index for a status query",
    updated: "Last week",
    turns: short(
      "Query filters on status = 'open' and sorts by created_at desc. 4M rows, 2% open. Index?",
      "A partial index: CREATE INDEX ON tickets (created_at DESC) WHERE status = 'open'. It holds only the 2% you read, stays small, and serves the sort directly."
    ),
  },
  {
    id: "white-on-red",
    title: "Contrast of white on red",
    updated: "Last week",
    project: "ziiz",
    turns: short(
      "Is white on #E5484D accessible for a button label?",
      "It measures about 3.9:1, under the 4.5:1 that WCAG asks of 14px text. Darken the fill to around #C83839 and white clears 5.1:1 without the button reading brown."
    ),
  },
  {
    id: "meal-prep",
    title: "Weekly meal prep list",
    updated: "2 weeks ago",
    turns: short(
      "Meal prep for 5 lunches, high protein, no fish, under an hour on Sunday.",
      "Roast two trays: chicken thighs with paprika, and chickpeas with sweet potato. Cook a pot of rice, make a yoghurt and herb sauce, and portion everything into five boxes with raw greens added each morning."
    ),
  },
  {
    id: "cover-letter",
    title: "Cover letter edit",
    updated: "3 weeks ago",
    turns: short(
      "Can you tighten my opening paragraph? It feels generic.",
      "Lead with the one thing you did that matches their biggest problem, in a sentence with a number in it. The line about being passionate can go: the example shows it."
    ),
  },
]

export const getChat = (id: string) => CHATS.find((c) => c.id === id)

export type Project = {
  id: string
  name: string
  description: string
  updated: string
  chats: number
}

export const PROJECTS: Project[] = [
  {
    id: "ziiz",
    name: "ziiz",
    description:
      "Design system work: ramps, type roles, materials and component reviews.",
    updated: "Updated 12 minutes ago",
    chats: 14,
  },
  {
    id: "kitchen",
    name: "Kitchen notebook",
    description: "Bread, meal prep and recipes worth keeping.",
    updated: "Updated 2 days ago",
    chats: 6,
  },
  {
    id: "travel",
    name: "Japan, April",
    description: "Itinerary, bookings and phrases for the spring trip.",
    updated: "Updated yesterday",
    chats: 4,
  },
  {
    id: "job-search",
    name: "Job search",
    description: "Cover letters, interview prep and offers.",
    updated: "Updated 3 weeks ago",
    chats: 9,
  },
]

export type Artifact = {
  id: string
  title: string
  kind: "Code" | "Document" | "Interactive" | "Diagram"
  updated: string
  /** The short time on a home card. */
  when: string
}

export const ARTIFACTS: Artifact[] = [
  {
    id: "ramp-viewer",
    title: "Gray ramp viewer",
    kind: "Interactive",
    updated: "Last edited 12 minutes ago",
    when: "58m ago",
  },
  {
    id: "kyoto-map",
    title: "Kyoto day plans",
    kind: "Document",
    updated: "Last edited yesterday",
    when: "Yesterday",
  },
  {
    id: "iso-date",
    title: "isIsoDate.ts",
    kind: "Code",
    updated: "Last edited 2 hours ago",
    when: "2h ago",
  },
  {
    id: "reducer-flow",
    title: "Request lifecycle",
    kind: "Diagram",
    updated: "Last edited 4 days ago",
    when: "Nov 16",
  },
  {
    id: "contrast-checker",
    title: "Contrast checker",
    kind: "Interactive",
    updated: "Last edited last week",
    when: "Nov 12",
  },
  {
    id: "meal-plan",
    title: "Five lunches",
    kind: "Document",
    updated: "Last edited 2 weeks ago",
    when: "Nov 4",
  },
]

/** The reply a new message gets: the clone has no model behind it. */
export const CANNED: Block[] = [
  {
    type: "p",
    text: "This is a prototype, so there is no model behind it. Every reply is this one, streamed in to show how a response lands: text sets in the reading column, the actions appear once it finishes, and the composer stays where it was.",
  },
  {
    type: "ul",
    items: [
      "Messages you send sit right-aligned in a bubble.",
      "Replies run full width as prose, with no bubble.",
    ],
  },
]
