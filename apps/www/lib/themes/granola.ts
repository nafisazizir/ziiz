/* Granola as granola.ai paints it, measured 2026-11-15. The site is light
 * only and white; the cream oats surface is a section colour there. Its dark
 * is the #292929 bands. */

import type { BrandTheme } from "@/lib/themes/brand"

const PAGES = [
  "/",
  "/pricing",
  "/enterprise",
  "/blog",
  "/integrations",
  "/customers",
]

const TINT = { hue: 106.5, strength: 0.037 }

/** The app's hues sit at 0.49 to 1 of the gamut edge; teal, which it does
 *  not have, takes their median, 0.88. */
const MEDIAN_SATURATION = 0.88

export const GRANOLA: BrandTheme = {
  slug: "granola",
  name: "Granola",
  measured: {
    date: "2026-11-15",
    pages: PAGES.map((p) => `granola.ai${p}`),
  },
  dark: "no dark mode (prefers-color-scheme is ignored); measured from the #292929 bands",
  endpoints: {
    light: { floor: "#FFFFFF", ceiling: "#292929" },
    dark: { floor: "#292929", ceiling: "#FCFCF8" },
  },
  // Fitted to the painted neutrals: eleven warm ones on the light page
  // (0.0013), and plain gray on the dark band (strength 0, 0.0015).
  tint: { light: TINT, dark: { hue: TINT.hue, strength: 0 } },
  // The hues are Granola's own: the oats-*-300 solids in the app bundle
  // (Granola.app, app.asar, dist-app/assets/index-*.css), the colours its
  // folder and tag picker paints. Hovers follow ziiz's offset. Red is the
  // one hue not taken as painted: see the finding "Red, made red".
  anchors: {
    blue: {
      hue: 252.4,
      solid: 64.7,
      hover: 58.6,
      saturation: 0.74,
      source: "#4691E2, oats-blue-300, the blue tag",
    },
    red: {
      hue: 25,
      solid: 59.6,
      hover: 53.6,
      saturation: 0.81,
      source:
        "#DB3D3E by choice (2026-11-15); Granola paints #E95D3D, oats-red-300, a red-orange at H 34",
    },
    amber: {
      hue: 65.9,
      solid: 73.8,
      hover: 69.1,
      saturation: 0.98,
      source: "#ED9212, oats-yellow-300, the amber tag",
    },
    green: {
      hue: 131.8,
      solid: 72.2,
      hover: 65.4,
      saturation: 1,
      source: "#74BD00, oats-grass-green-500, the live audio bars",
    },
    teal: {
      hue: 181.95,
      solid: 64.92,
      hover: 57.53,
      saturation: MEDIAN_SATURATION,
      source:
        "none: the teal tag is oats-green-400 #788C15, olive; ziiz teal at the median",
    },
    purple: {
      hue: 296.0,
      solid: 69.3,
      hover: 62.4,
      saturation: 0.49,
      source: "#A191CE, oats-purple-300, the violet tag",
    },
    pink: {
      hue: 338.5,
      solid: 79.8,
      hover: 75.8,
      saturation: 1,
      source: "#FF91E0, oats-pink-300",
    },
  },
  brand: {
    name: "Olive",
    anchor: { hue: 121.2, solid: 50.7, hover: 43.1, saturation: 1 },
    source:
      "#5B6F00, oats-green-500, fill-accent; app hover #4C5616 (the site's goes lighter, #6B7D19)",
  },
  ramps: [
    {
      label: "surfaces and borders by area",
      swatches: [
        ["page", "#FFFFFF"],
        ["section", "#F7F7F2"],
        ["btn-sec", "#F6F5F2"],
        ["btn-sec:hover", "#EAEAE6"],
        ["panel", "#EAEBE5"],
        ["border", "#D5D5D2"],
        ["band", "#292929"],
      ],
    },
    {
      label: "text by characters",
      swatches: [
        ["secondary", "#72726E"],
        ["ink", "#292929"],
        ["tertiary", "#9E9E99"],
        ["strong", "#4E4D4B"],
      ],
    },
    {
      label: "colour",
      swatches: [
        ["lime", "#B2C248"],
        ["olive button", "#5B6F00"],
        ["olive :hover", "#6B7D19"],
        ["olive tint", "#E5EACD"],
        ["gold card", "#E0C976"],
        ["New", "#788C15"],
      ],
    },
    {
      label: "app bundle · oats solids (300) and the brand",
      swatches: [
        ["red", "#E95D3D"],
        ["amber", "#ED9212"],
        ["yellow", "#FEBE29"],
        ["gold", "#B89F56"],
        ["grass", "#74BD00"],
        ["olive", "#5B6F00"],
        ["blue", "#4691E2"],
        ["purple", "#A191CE"],
        ["pink", "#FF91E0"],
      ],
    },
  ],
  neutrals: {
    light: [
      "#FFFFFF",
      "#F7F7F2",
      "#F6F5F2",
      "#EAEBE5",
      "#EAEAE6",
      "#D5D5D2",
      "#DAD9D4",
      "#9E9E99",
      "#72726E",
      "#4E4D4B",
      "#292929",
    ],
    dark: ["#292929", "#3E3E3E", "#4E4D4B", "#919191", "#FCFCF8", "#FFFFFF"],
  },
  roles: {
    light: [
      {
        role: "page",
        hex: "#FFFFFF",
        ziiz: "background-100",
        evidence: "root on 6 pages, 93M px²",
      },
      {
        role: "section",
        hex: "#F7F7F2",
        ziiz: "background-200",
        evidence: "33 surfaces, 8.2M px², 6 pages",
      },
      {
        role: "secondary button",
        hex: "#F6F5F2",
        ziiz: "gray-100",
        evidence: "Download pill, 6 pages",
      },
      {
        role: "secondary button :hover",
        hex: "#EAEAE6",
        ziiz: "gray-200",
        evidence: "hovered",
      },
      {
        role: "border",
        hex: "#D5D5D2",
        ziiz: "gray-alpha-400",
        evidence: "283 opaque borders, 6 pages",
      },
      {
        role: "outline button",
        hex: "#DAD9D4",
        ziiz: "gray-alpha-400",
        evidence: "Talk to sales, 6 pages",
      },
      {
        role: "outline button :hover",
        hex: "#D3D1CA",
        ziiz: "gray-alpha-500",
        evidence: "hovered",
      },
      {
        role: "tertiary text",
        hex: "#9E9E99",
        ziiz: null,
        evidence: "390 chars, 2 pages",
      },
      {
        role: "secondary text",
        hex: "#72726E",
        ziiz: "gray-900",
        evidence: "17,300 chars, 6 pages, the most-used text",
      },
      {
        role: "primary button :hover",
        hex: "#4E4D4B",
        ziiz: "gray-950",
        evidence: "hovered, Download for free",
      },
      {
        role: "ink, primary button",
        hex: "#292929",
        ziiz: "gray-1000",
        evidence: "13,300 chars; 6 buttons",
      },
      {
        role: "olive button",
        hex: "#5B6F00",
        ziiz: "brand-700",
        evidence: "Download for Mac, 2 pages",
      },
      {
        role: "olive button :hover",
        hex: "#6B7D19",
        ziiz: "brand-800",
        evidence: "hovered: goes lighter",
      },
      {
        role: "lime",
        hex: "#B2C248",
        ziiz: "brand-*",
        evidence: "5.5M px²: footer panel, 54 rule bars, 6 pages",
      },
      {
        role: "olive tint button",
        hex: "#E5EACD",
        ziiz: "brand-*",
        evidence: "Learn more pill, icon tiles, 6 pages",
      },
      {
        role: "gold card",
        hex: "#E0C976",
        ziiz: null,
        evidence:
          "card fills, 289k px², 6 pages; near oats-gold-200, which ziiz has no ramp for",
      },
      {
        role: "danger fill (app)",
        hex: "#E95D3D",
        ziiz: "red-700",
        evidence:
          "app bundle fill-danger; the theme deepens it to #DB3D3E by choice",
      },
      {
        role: "danger text (app)",
        hex: "#BD4A30",
        ziiz: "red-900",
        evidence: "app bundle ink-danger; follows the deeper red",
      },
      {
        role: "amber tag (app)",
        hex: "#ED9212",
        ziiz: "amber-700",
        evidence: "app bundle oats-yellow-300",
      },
      {
        role: "blue tag (app)",
        hex: "#4691E2",
        ziiz: "blue-700",
        evidence: "app bundle oats-blue-300",
      },
      {
        role: "violet tag (app)",
        hex: "#A191CE",
        ziiz: "purple-700",
        evidence: "app bundle oats-purple-300",
      },
    ],
    dark: [
      {
        role: "dark band",
        hex: "#292929",
        ziiz: "background-100",
        evidence: "56 surfaces, 3.8M px², 6 pages",
      },
      {
        role: "button :hover",
        hex: "#3E3E3E",
        ziiz: "gray-100",
        evidence: "Talk to sales on the band, hovered",
      },
      {
        role: "secondary text (white 70%)",
        hex: "#BEBEBEB2",
        ziiz: "gray-900",
        evidence: "115 chars, 1 page",
      },
      {
        role: "ink",
        hex: "#FFFFFF",
        ziiz: "gray-1000",
        evidence: "549 chars, 3 pages",
      },
    ],
  },
  findings: [
    {
      title: "White page, cream sections",
      body: "The page is #FFFFFF; the cream #F7F7F2 is a section colour. Secondary text #72726E outweighs the ink by characters, and borders are an opaque #D5D5D2.",
    },
    {
      title: "Lime is the loudest colour",
      body: "#B2C248 covers 5.5M px² of footer panel and rule bars. The olive #5B6F00 is reserved for one button, and its hover steps lighter, to #6B7D19, where ziiz steps darker.",
    },
    {
      title: "No dark mode",
      body: "The site ignores prefers-color-scheme. Its dark is a #292929 band with white ink and 70% white for secondary text, and that band is plain gray: the warmth is only on the light page.",
    },
    {
      title: "In the app, ink acts and olive is on",
      body: "The app bundle names it: fill-primary is #292929 and fill-accent is #5B6F00, two tokens. Its Button has primary (ink) and accent (olive) variants, about 230 uses to 24. Accent goes on the brand moments (Start and Resume recording, Enhance notes, View plans, Renew subscription) and on checked switches.",
    },
    {
      title: "Red, made red",
      body: "Granola's red #E95D3D sits at hue 34, past pure red (29) toward orange, and its lightness and softness read as coral. The theme uses #DB3D3E instead: hue 25, a little deeper and more saturated, still soft beside the oats. White on it is 4.42:1, just under 4.5.",
    },
    {
      title: "Hues are 300s, and no teal",
      body: "The app's named ramps are red, yellow, gold, green, blue, purple and pink, five steps each, with 300 as the solid. Its teal tag is olive and its lime tag is gold. Yellow and gold have no ziiz ramp; warning is yellow #FED468.",
    },
  ],
  hero: "Granola as granola.ai paints it, measured from six live pages, then rebuilt by the ziiz generator. A white page with cream sections, a barely warm gray, lime for decoration and one olive button.",
}
