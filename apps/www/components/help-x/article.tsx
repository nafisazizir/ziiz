import * as React from "react"
import Link from "next/link"

import { DocBlocks } from "@/components/business-x/doc-blocks"
import {
  DocTocBar,
  DocTocProvider,
  DocTocRail,
} from "@/components/business-x/doc-toc"
import { XText } from "@/components/business-x/runs"
import type { HelpArticle } from "@/components/help-x/articles"
import { ShareButton } from "@/components/help-x/share-button"
import { TextSkeleton, TypesetSkeleton } from "@/components/text-skeleton"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

// An article on help.x.com. Geometry is the site's: an 812px band centred
// in what the section rail (the frame's rail width again, on the right)
// leaves, a grey header across the band holding the breadcrumb, the title
// and the summary, then a 700px column padded 56px (24px below 768). Below
// 1024px the rail folds into a bar pinned under the header.
//
// The body is ziiz's article: one typeset run, as the blog's is.
export function HelpArticleView({ article }: { article: HelpArticle }) {
  const crumbs =
    article.crumbs.length > 0
      ? article.crumbs
      : [{ title: "Help Center", href: "/help-x" }, { title: article.title }]

  return (
    <DocTocProvider toc={article.toc}>
      <Frame
        crumb={
          <Breadcrumb>
            <BreadcrumbList>
              {crumbs.map((crumb, index) => (
                <React.Fragment key={index}>
                  {index > 0 && <BreadcrumbSeparator>/</BreadcrumbSeparator>}
                  <BreadcrumbItem>
                    {crumb.href ? (
                      <BreadcrumbLink render={<Link href={crumb.href} />}>
                        <XText>{crumb.title}</XText>
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage>
                        <XText>{crumb.title}</XText>
                      </BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        }
        heading={<XText>{article.title}</XText>}
        summary={article.description && <XText>{article.description}</XText>}
        bar={<DocTocBar />}
        rail={<DocTocRail />}
        footer={<ShareButton title={article.title.replaceAll(">x<", "X")} />}
      >
        <DocBlocks blocks={article.blocks} />
      </Frame>
    </DocTocProvider>
  )
}

// The same frame while the article streams: a breadcrumb, a title, two
// summary lines and an article's opening, each a line box of its own role.
export function HelpArticleSkeleton() {
  return (
    <Frame
      aria-hidden
      crumb={
        <div className="w-64 max-w-full text-label-14">
          <TextSkeleton lines={["w-full"]} />
        </div>
      }
      heading={<TextSkeleton lines={["w-2/3"]} />}
      summary={<TextSkeleton lines={["w-full", "w-1/2"]} />}
    >
      <TypesetSkeleton />
    </Frame>
  )
}

function Frame({
  crumb,
  heading,
  summary,
  bar,
  rail,
  footer,
  children,
  ...props
}: Omit<React.ComponentProps<"article">, "children"> & {
  crumb: React.ReactNode
  heading: React.ReactNode
  summary?: React.ReactNode
  bar?: React.ReactNode
  rail?: React.ReactNode
  footer?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <article
      className="grid w-full pb-12 md:pb-30 lg:grid-cols-[minmax(0,1fr)_var(--rail-width)]"
      {...props}
    >
      <div className="mx-auto w-full max-w-203 min-w-0">
        <header className="bg-gray-100 px-6 pt-6.5 pb-10 md:px-14 md:pb-14">
          <div className="border-b border-gray-alpha-400 pb-4">{crumb}</div>
          <div className="mt-10 flex flex-col gap-4 md:mt-16 md:pr-14">
            <h1 className="text-heading-40 text-balance text-gray-1000 md:text-heading-48">
              {heading}
            </h1>
            {summary && (
              <p className="text-copy-16 text-pretty text-gray-1000">
                {summary}
              </p>
            )}
          </div>
        </header>
        {bar}
        <div className="px-6 pt-12 md:px-14">
          <div className="typeset w-full max-w-175">{children}</div>
          {footer && <div className="mt-12">{footer}</div>}
        </div>
      </div>
      <aside className="sticky top-0 hidden h-dvh flex-col self-start px-6 pt-20 pb-10 lg:flex">
        {rail}
      </aside>
    </article>
  )
}
