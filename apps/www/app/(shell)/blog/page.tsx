import type { Metadata } from "next"

import { getBlogCategories, getBlogPosts, toBlogCard } from "@/lib/blog"
import { BlogHero } from "@/components/blog/blog-hero"
import { BlogList } from "@/components/blog/blog-list"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes from building ziiz.",
  alternates: { types: { "application/rss+xml": "/rss.xml" } },
}

// The section hero, a rule, then the filtered list.
export default function Page() {
  return (
    <>
      <BlogHero
        title={
          <>
            {`Notes and decisions `}
            <br className="max-md:hidden" />
            {`from building ziiz`}
          </>
        }
        description={
          <>
            {`Why the colors, type roles, prose layer and components are the way they are, written down as each one lands. Also as `}
            <a href="/rss.xml" className="underline underline-offset-3">
              RSS
            </a>
            {`.`}
          </>
        }
      />
      <Separator className="mt-10 lg:mt-0" />
      <div className="py-10 lg:py-20">
        <BlogList
          posts={getBlogPosts().map(toBlogCard)}
          categories={getBlogCategories()}
        />
      </div>
    </>
  )
}
