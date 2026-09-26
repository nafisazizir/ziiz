import { blog } from "@/.source/server"
import { loader } from "fumadocs-core/source"

export const blogSource = loader({
  baseUrl: "/blog",
  source: blog.toFumadocsSource(),
})

export type BlogPost = ReturnType<typeof blogSource.getPages>[number]

/** Every post, newest first. */
export function getBlogPosts(): BlogPost[] {
  return blogSource
    .getPages()
    .slice()
    .sort((a, b) => b.data.date.localeCompare(a.data.date))
}

export function getBlogPost(slug: string) {
  return blogSource.getPage([slug]) ?? null
}

export function formatDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  })
}

/** The list page's filters: "All", then every category a post uses. */
export function getBlogCategories() {
  const used = new Set(getBlogPosts().map((post) => post.data.category))
  return ["All", ...[...used].sort()]
}

/** What the list needs from a post: the frontmatter, not the compiled body. */
export type BlogCard = {
  url: string
  title: string
  description: string
  date: string
  category: string
}

export function toBlogCard(post: BlogPost): BlogCard {
  return {
    url: post.url,
    title: post.data.title,
    description: post.data.description,
    date: post.data.date,
    category: post.data.category,
  }
}
