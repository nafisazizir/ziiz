import { Eyebrow } from "@/components/business-x/section"
import { XText } from "@/components/business-x/runs"
import { cn } from "@/lib/utils"

export type Testimonial = {
  quote: string
  name: string
  role: string
}

// Customer quotes under a split heading: an eyebrow on the left, the title
// and actions on the right. The first quote is a four-column dark card;
// two more sit beside it in two columns each, hidden below 1024px where the
// dark card stands alone. Brand logos are the site's own photos, so a bar
// stands in for each.
export function Testimonials({
  eyebrow = "Testimonials",
  title,
  subtitle,
  actions,
  body,
  items,
  className,
}: {
  eyebrow?: string
  title: string
  subtitle?: string
  actions?: React.ReactNode
  // Paragraphs under the title, in place of actions.
  body?: React.ReactNode
  items: Testimonial[]
  className?: string
}) {
  const [lead, ...rest] = items
  return (
    <div className={cn("flex flex-col gap-10 lg:gap-19", className)}>
      <div className="flex flex-col gap-3 lg:grid lg:grid-cols-8 lg:gap-x-4">
        <Eyebrow className="lg:col-span-4 lg:self-start">{eyebrow}</Eyebrow>
        <div className="flex flex-col gap-5 lg:col-span-4 lg:col-start-5">
          <h2 className="text-heading-32 text-balance text-gray-1000">
            <XText>{title}</XText>
            {subtitle && (
              <span className="block text-gray-900">
                <XText>{subtitle}</XText>
              </span>
            )}
          </h2>
          {body && (
            <div className="flex flex-col gap-5 text-label-13 text-gray-1000">
              {body}
            </div>
          )}
          {actions && (
            <div className="flex flex-wrap gap-3 max-md:hidden">{actions}</div>
          )}
        </div>
      </div>
      <ul className="flex flex-col lg:grid lg:grid-cols-8 lg:gap-x-4">
        <Card item={lead} dark className="lg:col-span-4" />
        {rest.slice(0, 2).map((item) => (
          <Card
            key={item.name}
            item={item}
            className="max-lg:hidden lg:col-span-2"
          />
        ))}
      </ul>
    </div>
  )
}

function Card({
  item,
  dark,
  className,
}: {
  item: Testimonial
  dark?: boolean
  className?: string
}) {
  return (
    <li
      className={cn(
        "relative flex flex-col overflow-hidden p-6 max-md:aspect-[405/387] md:max-lg:aspect-5/3",
        dark
          ? "bg-gray-1000 text-background-100"
          : "bg-gray-100 text-gray-1000",
        className
      )}
    >
      <span
        aria-hidden
        className={cn(
          "block h-6 w-20",
          dark ? "bg-gray-800" : "bg-gray-alpha-300"
        )}
      />
      <p
        className={cn(
          "flex-1 pt-10 pb-8 text-heading-24 text-balance lg:pt-8 lg:text-label-13",
          dark ? "text-background-100" : "text-gray-1000"
        )}
      >
        <XText>{item.quote}</XText>
      </p>
      <div className="flex flex-col text-label-13">
        <p className={dark ? "text-gray-500" : "text-gray-700"}>{item.name}</p>
        <p>{item.role}</p>
      </div>
    </li>
  )
}
