import { Runs } from "@/components/business-x/runs"
import type { Run } from "@/components/business-x/blog"
import { XText } from "@/components/business-x/runs"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils"

export type Question = { q: string; a: Run[][] }

// "Your questions, answered": the heading in the left four columns, the
// accordion in the right four, the first question open. Below 1024px they
// stack.
export function Faq({
  title = "Your questions, answered",
  subtitle = "Everything you need to know",
  items,
  className,
}: {
  title?: string
  subtitle?: string
  items: Question[]
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-14 lg:grid lg:grid-cols-8 lg:gap-x-4",
        className
      )}
    >
      <h2 className="text-heading-32 text-balance text-gray-1000 lg:col-span-4">
        <XText>{title}</XText>
        <span className="block text-gray-900">
          <XText>{subtitle}</XText>
        </span>
      </h2>
      <Accordion defaultValue={[items[0]?.q]} className="lg:col-span-4">
        {items.map((item) => (
          <AccordionItem key={item.q} value={item.q}>
            <AccordionTrigger>
              <span>
                <XText>{item.q}</XText>
              </span>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2 text-copy-13 text-gray-900 [&_a]:text-gray-1000 [&_a]:underline">
              {item.a.map((paragraph, index) => (
                <p key={index}>
                  <Runs runs={paragraph} />
                </p>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
