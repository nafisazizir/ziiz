import { DocBlocks } from "@/components/business-x/doc-blocks"
import type { Doc } from "@/components/business-x/doc"
import { DocTocProvider, DocTocRail } from "@/components/business-x/doc-toc"
import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { TextSkeleton, TypesetSkeleton } from "@/components/text-skeleton"

const chat = "https://x.com/i/money/chat"

// A document on money.x.com: the FAQ or one of the legal terms. The title
// and the text take the column; a 256px column beside it from 1024px holds
// the section list, sticky, and on the FAQ the support card under it. Below
// 1024px that column follows the text, as it does on the site, and the FAQ
// floats its support pill over the page below 768px.
//
// The body is ziiz's article: one typeset run, as the blog's is.
export function MoneyDoc({ doc, support }: { doc: Doc; support?: boolean }) {
  return (
    <DocTocProvider toc={doc.toc}>
      <Frame
        heading={doc.title}
        aside={
          <>
            <DocTocRail className="flex-1" />
            {support && <SupportCard />}
          </>
        }
      >
        <DocBlocks blocks={doc.blocks} />
      </Frame>
      {support && <SupportPill />}
    </DocTocProvider>
  )
}

export function MoneyDocSkeleton() {
  return (
    <Frame aria-hidden heading={<TextSkeleton lines={["w-2/3"]} />}>
      <TypesetSkeleton />
    </Frame>
  )
}

function Frame({
  heading,
  aside,
  children,
  ...props
}: Omit<React.ComponentProps<"section">, "children"> & {
  heading: React.ReactNode
  aside?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <section className="w-full py-9 md:py-18" {...props}>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-16">
        <div className="min-w-0">
          <h1 className="mb-10 text-heading-32 text-balance text-gray-1000 md:text-heading-48">
            {heading}
          </h1>
          <div className="typeset">{children}</div>
        </div>
        <aside className="flex flex-col gap-8 lg:sticky lg:top-20 lg:h-[calc(100dvh-5rem)] lg:self-start lg:pb-10">
          {aside}
        </aside>
      </div>
    </section>
  )
}

// "Get Instant Support": an agent's opening line over the offer to chat.
function SupportCard() {
  return (
    <div className="hidden shrink-0 flex-col items-start gap-3 bg-gray-100 px-4 pt-6 pb-4 md:flex lg:mt-auto">
      <div className="flex flex-col items-start gap-2">
        <Bubble variant="outline">
          <BubbleContent>Need support? I’m here to help!</BubbleContent>
        </Bubble>
        <span className="flex items-center gap-1.5 text-label-12 text-gray-700">
          <span className="size-4 rounded-full bg-gray-400" />
          John
        </span>
      </div>
      <Separator />
      <div className="flex flex-col gap-1">
        <p className="text-label-13 text-gray-1000">Get Instant Support</p>
        <p className="text-copy-13 text-gray-900">
          Chat with us for instant support
        </p>
      </div>
      <ChatButton />
    </div>
  )
}

function SupportPill() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-6 md:hidden">
      <div className="pointer-events-auto flex items-center gap-3 material-menu rounded-full py-2 pr-2 pl-4">
        <p className="text-label-13 text-gray-1000">Instant support</p>
        <ChatButton />
      </div>
    </div>
  )
}

function ChatButton() {
  return (
    <Button
      shape="rounded"
      size="sm"
      nativeButton={false}
      render={<a href={chat} target="_blank" rel="noopener noreferrer" />}
    >
      Chat with Us
    </Button>
  )
}
