// The three x.com sites the rail's switcher moves between, each with its
// own rail. Business is business.x.com's, verbatim: three sections expand,
// the rest are plain links. Money and Help Center are flat.
export type NavEntry = {
  title: string
  href: string
  // Leaves the clone, in a new tab.
  external?: boolean
  // Other path prefixes the link is current under.
  match?: string[]
}

// Every document under money.x.com's legal index sits at /money-x/<slug>,
// beside the index, so the Legal link names them.
const legalPaths = [
  "acceptable-use-policy",
  "cardholder-agreement",
  "cashback-rewards-terms",
  "digital-wallet-terms",
  "direct-deposit-bonus",
  "ecbsv",
  "ecomm-consent",
  "fdic-conditions",
  "interest-faq",
  "licenses",
  "privacy-policy",
  "stored-value-account",
  "terms-and-conditions",
  "usa-patriot-act",
].map((slug) => `/money-x/${slug}`)

export type SiteKey = "business" | "money" | "help"

export const siteKeys: SiteKey[] = ["business", "money", "help"]

export const sites: Record<
  SiteKey,
  {
    name: string
    domain: string
    href: string
    nav: (NavEntry & { items?: NavEntry[] })[]
  }
> = {
  business: {
    name: "Business",
    domain: "business.x.com",
    href: "/business-x",
    nav: [
      { title: "Introduction", href: "/business-x" },
      {
        title: "Basics",
        href: "/business-x/basics",
        items: [
          { title: "Overview", href: "/business-x/basics" },
          { title: "Why X", href: "/business-x/basics/intro-x-for-business" },
          {
            title: "Get your business started with X",
            href: "/business-x/basics/get-your-business-started-with-x",
          },
        ],
      },
      {
        title: "Advertising",
        href: "/business-x/advertising",
        items: [
          { title: "Overview", href: "/business-x/advertising" },
          {
            title: "Get started",
            href: "/business-x/advertising/get-started-with-twitter-ads",
          },
          {
            title: "Best practices",
            href: "/business-x/advertising/creative-best-practices",
          },
          { title: "Measurement", href: "/business-x/advertising/measurement" },
          { title: "Success Stories", href: "/business-x/success-stories" },
        ],
      },
      {
        title: "Products",
        href: "/business-x/products",
        items: [
          { title: "Overview", href: "/business-x/products" },
          {
            title: "Vertical Video Ads",
            href: "/business-x/products/vertical-video-ads",
          },
          { title: "X Spaces", href: "/business-x/products/x-spaces" },
          {
            title: "Amplify Sponsorships",
            href: "/business-x/products/amplify-sponsorships",
          },
          { title: "X Shopping", href: "/business-x/products/shopping" },
          {
            title: "Timeline Takeovers",
            href: "/business-x/products/timeline-takeovers",
          },
          {
            title: "Spotlight Takeovers",
            href: "/business-x/products/spotlight-takeovers",
          },
        ],
      },
      { title: "Resources", href: "/business-x/resources" },
      { title: "Help Center", href: "/business-x/help" },
      { title: "Blog", href: "/business-x/blog" },
      {
        title: "Premium Business",
        href: "https://x.com/i/premium_business",
      },
    ],
  },
  money: {
    name: "Money",
    domain: "money.x.com",
    href: "/money-x",
    nav: [
      { title: "Overview", href: "/money-x" },
      { title: "Features", href: "/money-x#features" },
      { title: "Updates", href: "https://x.com/XMoney", external: true },
      { title: "Help", href: "/money-x/faq" },
      { title: "Legal", href: "/money-x/legal", match: legalPaths },
    ],
  },
  help: {
    name: "Help Center",
    domain: "help.x.com",
    href: "/help-x",
    nav: [
      { title: "Home", href: "/help-x" },
      { title: "Using >x<", href: "/help-x/using-x" },
      { title: "Managing your Account", href: "/help-x/managing-your-account" },
      { title: "Safety and Security", href: "/help-x/safety-and-security" },
      { title: "Rules and Policies", href: "/help-x/rules-and-policies" },
      {
        title: "Business and Advertising",
        href: "/help-x/business-and-advertising",
      },
    ],
  },
}
