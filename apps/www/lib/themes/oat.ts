/* Oat, designed fresh on the ziiz spine (2026-11-18), not taken from the
 * Oat app's tokens. Warm and cosy without orange or red: a milk chocolate
 * brand on a page halfway between a brown-leaning near-white and Cursor's
 * olive cream (cursor.com, measured 2026-11-18: #F7F7F4, 0.06 of the gamut
 * edge at hue 97). Picked over four rounds of candidates
 * from amber through toffee to dark chocolate. Nothing here is measured,
 * so the roles compare the generator to the values the design asked for. */

import type { BrandTheme } from "@/lib/themes/brand"

export const OAT: BrandTheme = {
  slug: "oat",
  name: "Oat",
  measured: {
    date: "2026-11-18",
    pages: [
      "designed in lib/themes/oat.ts",
      "page referenced from cursor.com/home, measured 2026-11-18",
    ],
    source:
      "designed, not measured: the inputs and the targets they were tuned to, light then dark",
  },
  dark: "warm espresso #181510 with a soft cream ink, between Cursor's near-black and a brown dark",
  endpoints: {
    light: { floor: "#FAF9F5", ceiling: "#28251F" },
    dark: { floor: "#181510", ceiling: "#F0ECE6" },
  },
  // Halfway between a brown-leaning near-white (hue 70, 0.16) and Cursor's
  // olive cream (hue 97, 0.06) on hue and strength; dark a touch stronger.
  tint: {
    light: { hue: 84, strength: 0.11 },
    dark: { hue: 76, strength: 0.17 },
  },
  // Softened and pulled a little warm so nothing reads as neon beside the
  // oat grays. Amber sits at gold, well off the brand's brown.
  anchors: {
    blue: {
      hue: 248,
      solid: 56,
      hover: 50,
      saturation: 0.6,
      source: "a dusty denim",
    },
    red: {
      hue: 26,
      solid: 57,
      hover: 51,
      saturation: 0.82,
      source: "a brick red, clear of the brand",
    },
    amber: {
      hue: 84,
      solid: 80,
      hover: 75.5,
      saturation: 0.8,
      source: "gold, 22° off the brand's hue",
    },
    green: {
      hue: 140,
      solid: 60,
      hover: 54,
      saturation: 0.62,
      source: "sage",
    },
    teal: {
      hue: 188,
      solid: 62,
      hover: 55,
      saturation: 0.58,
      source: "a muted sea-glass",
    },
    purple: {
      hue: 310,
      solid: 55,
      hover: 48.5,
      saturation: 0.55,
      source: "plum",
    },
    pink: {
      hue: 4,
      solid: 63,
      hover: 58.5,
      saturation: 0.65,
      source: "a dusty rose",
    },
  },
  brand: {
    name: "Milk chocolate",
    anchor: { hue: 62, solid: 48, hover: 42, saturation: 0.62 },
    source: "#795533, a soft brown with white text on it (6.6:1)",
  },
  ramps: [
    {
      label: "the inputs, light",
      swatches: [
        ["page", "#FAF9F5"],
        ["ink", "#28251F"],
        ["milk chocolate", "#795533"],
      ],
    },
    {
      label: "the inputs, dark",
      swatches: [
        ["page", "#181510"],
        ["ink", "#F0ECE6"],
        ["milk chocolate", "#795533"],
      ],
    },
    {
      label: "the highlight it was tuned to: light (option C), then dark",
      swatches: [
        ["light tint", "#FFE9D6"],
        ["light text", "#89552E"],
        ["dark tint", "#382615"],
        ["dark text", "#C78355"],
      ],
    },
    {
      label: "what it was picked over",
      swatches: [
        ["toffee", "#BE8542"],
        ["hazelnut", "#946637"],
        ["dark chocolate", "#66452B"],
        ["amber", "#EAAF35"],
        ["Cursor page", "#F7F7F4"],
        ["lighter page", "#FCFAF6"],
      ],
    },
  ],
  neutrals: {
    light: [
      "#FAF9F5",
      "#F2F0EC",
      "#EDEBE6",
      "#EAE7E2",
      "#D7D1C6",
      "#A49F94",
      "#7B7770",
      "#28251F",
    ],
    dark: [
      "#181510",
      "#25221E",
      "#292521",
      "#302C27",
      "#48433C",
      "#8E8478",
      "#9E9486",
      "#F0ECE6",
    ],
  },
  roles: {
    light: [
      {
        role: "page",
        hex: "#FAF9F5",
        ziiz: "background-100",
        evidence: "the floor, a shade under white",
      },
      {
        role: "ink",
        hex: "#28251F",
        ziiz: "gray-1000",
        evidence: "the ceiling, warm near-black",
      },
      {
        role: "brand",
        hex: "#795533",
        ziiz: "brand-700",
        evidence: "milk chocolate, checked and pressed states",
      },
      {
        role: "highlight text",
        hex: "#89552E",
        ziiz: "brand-900",
        evidence: "option C: L50, C 0.088",
      },
      {
        role: "highlight tint",
        hex: "#FFE9D6",
        ziiz: "brand-alpha-200",
        evidence: "option C: L94.6, C 0.035",
      },
    ],
    dark: [
      {
        role: "page",
        hex: "#181510",
        ziiz: "background-100",
        evidence: "the floor, espresso",
      },
      {
        role: "ink",
        hex: "#F0ECE6",
        ziiz: "gray-1000",
        evidence: "the ceiling, soft cream",
      },
      {
        role: "brand",
        hex: "#795533",
        ziiz: "brand-700",
        evidence: "the same fill in both themes",
      },
      {
        role: "highlight text",
        hex: "#C78355",
        ziiz: "brand-900",
        evidence: "as generated; the light fix was tuned to match its presence",
      },
      {
        role: "highlight tint",
        hex: "#382615",
        ziiz: "brand-alpha-200",
        evidence: "as generated",
      },
    ],
  },
  findings: [
    {
      title: "Brown, not orange",
      body: "Every orange and red candidate was ruled out. Milk chocolate sits at hue 62 and 0.62 of the gamut edge: warm enough to be cosy, too dark and too soft to read as orange.",
    },
    {
      title: "Halfway to Cursor",
      body: "Cursor's page is an olive cream at 0.06 of the gamut edge; the brown-leaning candidates were up to six times stronger and read as paper. Oat takes the midpoint, hue 84 at 0.11, so the grays agree with the brown without turning beige.",
    },
    {
      title: "A dark brand needed two generator rules",
      body: "As first generated, the light highlight read as ink: 900 had to sit past the hover (L42), landing at L41 with little chroma, on a tint muted twice. TEXT_DEPTH now stops light 900 seven points below gray-900 (L50), and light tints 100 to 300 no longer take the anchor's saturation. No shipped ramp changes.",
    },
    {
      title: "White on the brand",
      body: "At L48 milk chocolate carries white text at 6.6:1, so checked boxes and counts are solid brown chips rather than a highlight.",
    },
    {
      title: "Amber moved to gold",
      body: "Amber sits at hue 84, 22° off the brand, so a warning never reads as a brand moment.",
    },
    {
      title: "Hues softened",
      body: "The seven named ramps ride 0.55 to 0.82 of the gamut edge, so a status colour sits beside the oat grays without shouting.",
    },
  ],
  hero: "Oat, designed fresh on the ziiz spine: a milk chocolate brand on a page halfway between warm paper and Cursor's olive cream, with softened hues and an espresso dark.",
}
