import { ImageResponse } from "next/og"

import { formatDate, getBlogPost, getBlogPosts } from "@/lib/blog"
import { siteConfig } from "@/lib/config"

export const alt = "Blog post"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export function generateStaticParams() {
  return getBlogPosts().map((post) => ({ slug: post.slugs[0] }))
}

// Inter as static TTF from Google Fonts; satori cannot read the app's woff2.
// A network failure at build time falls back to the renderer's default face
// rather than failing the page.
async function loadInter(weight: 400 | 600, text: string) {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=Inter:wght@${weight}&text=${encodeURIComponent(text)}`,
      { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 6.1; rv:5.0)" } }
    ).then((r) => r.text())
    const url = css.match(
      /src: url\(([^)]+)\) format\('(?:truetype|opentype)'\)/
    )?.[1]
    if (!url) return null
    return await fetch(url).then((r) => r.arrayBuffer())
  } catch {
    return null
  }
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getBlogPost(slug)
  const title = post?.data.title ?? siteConfig.name
  const description = post?.data.description ?? siteConfig.description
  const date = post ? formatDate(post.data.date) : ""

  const text = `${title}${description}${date}${siteConfig.name}`
  const [regular, semibold] = await Promise.all([
    loadInter(400, text),
    loadInter(600, text),
  ])
  const fonts = [
    regular && { name: "Inter", data: regular, weight: 400 as const },
    semibold && { name: "Inter", data: semibold, weight: 600 as const },
  ].filter((f) => f !== null)

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        background: "#ffffff",
        color: "#171717",
        fontFamily: "Inter",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          fontSize: 28,
          color: "#666666",
        }}
      >
        <span style={{ fontWeight: 600, color: "#171717" }}>
          {siteConfig.name}
        </span>
        <span>Blog</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div
          style={{
            fontSize: 64,
            fontWeight: 600,
            letterSpacing: "-0.04em",
            lineHeight: 1.1,
          }}
        >
          {title}
        </div>
        <div style={{ fontSize: 30, lineHeight: 1.4, color: "#666666" }}>
          {description}
        </div>
      </div>
      <div style={{ fontSize: 24, color: "#666666" }}>{date}</div>
    </div>,
    { ...size, fonts: fonts.length ? fonts : undefined }
  )
}
