import type { Metadata } from "next"
import Link from "next/link"

import { formatDate, getBlogPosts } from "@/lib/blog"

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes from building ziiz.",
  alternates: { types: { "application/rss+xml": "/rss.xml" } },
}

export default function Page() {
  const posts = getBlogPosts()

  return (
    <>
      <header className="flex flex-col gap-2">
        <h1 className="text-heading-40 text-gray-1000">Blog</h1>
        <p className="text-copy-16 text-gray-900">
          Notes from building ziiz. Also as{" "}
          <a href="/rss.xml" className="underline underline-offset-3">
            RSS
          </a>
          .
        </p>
      </header>
      <ul className="mt-12 flex flex-col divide-y divide-gray-alpha-400">
        {posts.map((post) => (
          <li key={post.url}>
            <Link
              href={post.url}
              className="group -mx-3 flex flex-col gap-1.5 rounded-lg px-3 py-6 transition-colors hover:bg-gray-alpha-100"
            >
              <time
                dateTime={post.data.date}
                className="text-label-13 text-gray-900"
              >
                {formatDate(post.data.date)}
              </time>
              <span className="text-heading-20 text-gray-1000">
                {post.data.title}
              </span>
              <span className="text-copy-14 text-gray-900">
                {post.data.description}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
