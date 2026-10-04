// money.x.com/en/i/legal, in the site's order. A slug is the last segment
// of the document's path there and its route under /money-x; the one entry
// with an href instead lives on another site.
export type LegalDoc = { title: string; slug?: string; href?: string }

export const legalDocs: LegalDoc[] = [
  { title: "Terms of Service", slug: "terms-and-conditions" },
  { title: "Privacy Policy", slug: "privacy-policy" },
  { title: "Cardholder Agreement", slug: "cardholder-agreement" },
  {
    title: "Cross River Bank Stored Value Account Agreement",
    slug: "stored-value-account",
  },
  { title: "Cashback Rewards Terms", slug: "cashback-rewards-terms" },
  { title: "Acceptable Use Policy", slug: "acceptable-use-policy" },
  { title: "Digital Wallet Terms", slug: "digital-wallet-terms" },
  { title: "X Payments Money Transmitter Licenses", slug: "licenses" },
  { title: "Electronic Communications Consent", slug: "ecomm-consent" },
  { title: "USA Patriot Act Notice", slug: "usa-patriot-act" },
  { title: "FDIC Conditions", slug: "fdic-conditions" },
  { title: "eCBSV Agreement", slug: "ecbsv" },
  { title: "X Money Stored Value Account Rates", slug: "interest-faq" },
  {
    title: "X Money Legal Request",
    href: "https://money-support.x.com/forms/x-money-legal-requests",
  },
]
