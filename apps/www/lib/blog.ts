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
