import { NextResponse } from "next/server"

import { getBlogPosts } from "@/lib/blog"
import { siteConfig } from "@/lib/config"

export const dynamic = "force-static"

function escape(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
}

export function GET() {
  const items = getBlogPosts()
    .map((post) => {
      const link = `${siteConfig.url}${post.url}`
      const date = new Date(`${post.data.date}T00:00:00Z`).toUTCString()
      return `    <item>
      <title>${escape(post.data.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${escape(post.data.description)}</description>
      <author>${escape(post.data.author)}</author>
      <pubDate>${date}</pubDate>
    </item>`
    })
    .join("\n")

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(siteConfig.name)} Blog</title>
    <link>${siteConfig.url}/blog</link>
    <description>${escape(siteConfig.description)}</description>
    <language>en-us</language>
    <atom:link href="${siteConfig.url}/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`

  return new NextResponse(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  })
}
