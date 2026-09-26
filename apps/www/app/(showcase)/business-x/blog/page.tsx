import type { Metadata } from "next"

import { getPosts } from "@/components/business-x/blog"
import { BlogList } from "@/components/business-x/blog-list"
import { BusinessFrame } from "@/components/business-x/frame"
import { Hero } from "@/components/business-x/hero"
import { XLogo } from "@/components/business-x/x-logo"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Blog | X Business",
  description:
    "The blog index of business.x.com rebuilt from ziiz components as shipped.",
}

// business.x.com/en/blog: the section hero, a rule, then the filtered list.
// Same frame and grid as the introduction; only the copy and the list differ.
export default function BusinessXBlogPage() {
  return (
    <BusinessFrame>
      <Hero
        title={
          <>
            {`Inspiration, insights, best practices `}
            <br className="max-md:hidden" />
            {`to help you succeed on `}
            <XLogo className="inline size-[0.85em] align-[-0.08em]" />
          </>
        }
        description={
          <>
            {`Your central hub for timely announcements, feature breakdowns, monthly recaps, and strategies to drive success on `}
            <XLogo className="inline size-[0.85em] align-[-0.08em]" />
            {`.`}
          </>
        }
      />
      <Separator className="mt-10 lg:mt-0" />
      <div className="py-10 lg:py-20">
        <BlogList posts={getPosts()} />
      </div>
    </BusinessFrame>
  )
}
