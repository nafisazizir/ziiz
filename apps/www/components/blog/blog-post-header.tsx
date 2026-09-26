import Link from "next/link"

import { formatDate, type BlogPost } from "@/lib/blog"
import { ArrowLeftIcon } from "@/components/icons"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"

// A post's opening: a row from lg with the breadcrumb, title and byline on
// the left and the card art (400x244, the list's 8:5) on the right, the row
// at least as tall as the art, then a rule. Below lg it stacks, the art
// under the byline at 2:1. The ghost back button hangs into the gutter so
// the arrow's ink, not its hit area, lines up with the title.
export function BlogPostHeader({ post }: { post: BlogPost }) {
  return (
    <header className="flex flex-col border-b border-gray-alpha-400 pb-6 lg:flex-row lg:items-start lg:justify-between lg:gap-4 lg:pb-30">
      <div className="flex min-w-0 flex-col lg:min-h-61 lg:max-w-180 lg:flex-1">
        <div className="flex min-w-0 shrink-0 items-center gap-4 pt-3 lg:pt-10">
          <Button
            variant="ghost"
            shape="rounded"
            size="icon-sm"
            aria-label="Back to Blog"
            nativeButton={false}
            className="-ml-3 text-gray-900"
            render={<Link href="/blog" />}
          >
            <ArrowLeftIcon />
          </Button>
          <Breadcrumb className="min-w-0">
            <BreadcrumbList className="flex-nowrap">
              <BreadcrumbItem className="shrink-0">
                <BreadcrumbLink render={<Link href="/blog" />}>
                  Blog
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>/</BreadcrumbSeparator>
              <BreadcrumbItem className="min-w-0">
                <BreadcrumbPage className="truncate">
                  {post.data.category}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex flex-1 flex-col justify-end gap-4 pt-6 lg:pt-8">
          <h1 className="text-heading-48 text-balance text-gray-1000">
            {post.data.title}
          </h1>
          <p className="text-label-13 text-gray-900">
            <span>{post.data.author}</span>
            <span aria-hidden>{` · `}</span>
            <time dateTime={post.data.date}>{formatDate(post.data.date)}</time>
          </p>
        </div>
      </div>
      <div
        aria-hidden
        className="mt-6 aspect-2/1 w-full shrink-0 bg-gray-100 lg:mt-0 lg:aspect-auto lg:h-61 lg:w-100"
      />
    </header>
  )
}
