import { posts } from "@/components/business-x/blog-posts"

// The shape business.x.com's blog reduces to: a header plus one run of
// blocks, set by ziiz's own article prose. Media is dimensions only — the
// clone draws grey panels at the right ratio.
export type Run = string | { b: Run[] } | { i: Run[] } | { a: string; r: Run[] }

export type Block =
  | { type: "heading"; level: 2 | 3 | 4; text: string }
  | { type: "p"; runs: Run[] }
  | { type: "caption"; runs: Run[] }
  | { type: "list"; ordered: boolean; items: Run[][] }
  | { type: "image"; w: number; h: number; alt: string; caption?: string }
  | { type: "video" }
  | { type: "ctas"; items: { label: string; href: string; primary: boolean }[] }
  | {
      type: "stats"
      cols: 1 | 2 | 3 | 4
      items: { value: string; label: string }[]
    }
  | { type: "quote"; paragraphs: Run[][]; name: string; org?: string }
  | { type: "posts"; count: number; wide: boolean }
  | { type: "carousel"; count: number }
  | {
      type: "winners"
      label: string
      items: { title: string; desc: string; name: string; handle: string }[]
    }
  | { type: "aside"; label: string; blocks: Block[] }
  | { type: "faq"; items: { q: string; a: Run[][] }[] }

export type Post = {
  slug: string
  // The filter the list page sorts it under.
  category: string
  // The finer label the post page shows in its breadcrumb.
  topic: string
  title: string
  description: string
  blocks: Block[]
}

// The list page's filters, in the site's order. "All" is the default.
export const categories = [
  "All",
  "Best practices",
  "Inspiration",
  "Product updates",
  "Solutions",
  "Trends & insights",
] as const

// Card art and post header art share one source on the site: a 398x245 SVG.
export const cardRatio = 8 / 5

export function getPosts() {
  return posts
}

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug)
}
