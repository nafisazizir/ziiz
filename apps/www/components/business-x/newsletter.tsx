import { FormDropdown } from "@/components/business-x/form-dropdown"
import { XLogo } from "@/components/business-x/x-logo"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const countries = [
  { label: "Australia", value: "au" },
  { label: "Brazil", value: "br" },
  { label: "Germany", value: "de" },
  { label: "Japan", value: "jp" },
  { label: "United States", value: "us" },
]

// The sign-up strip: a 400px column of heading, then the form pushed to the
// bottom, beside a grey panel at least 320px tall with a notification card
// floating in it. Below 1024px the panel sits between heading and form.
export function Newsletter({
  title,
  description = "Sign up for updates on products, tips, and more.",
  agency,
  reverse,
  panelAction,
  className,
}: {
  title: string
  description?: string
  agency?: boolean
  // Panel on the left, form on the right (the Why X page).
  reverse?: boolean
  // A pill pinned to the panel's bottom edge.
  panelAction?: React.ReactNode
  className?: string
}) {
  const text = reverse ? "lg:col-start-2" : "lg:col-start-1"
  const panel = reverse ? "lg:col-start-1" : "lg:col-start-2"
  return (
    <div
      className={cn(
        "flex flex-col gap-6 lg:grid lg:grid-rows-[auto_1fr]",
        reverse ? "lg:grid-cols-[1fr_400px]" : "lg:grid-cols-[400px_1fr]",
        className
      )}
    >
      <div className={cn("flex flex-col gap-3 lg:row-start-1", text)}>
        <h2 className="text-heading-32 text-balance text-gray-1000">{title}</h2>
        <p className="text-copy-13 text-balance text-gray-900">{description}</p>
      </div>
      <div
        className={cn(
          "relative flex min-h-80 items-center justify-center overflow-hidden bg-gray-100 p-6 lg:row-span-2 lg:row-start-1",
          panelAction && "pb-16",
          panel
        )}
      >
        <Notification />
        {panelAction && (
          <div className="absolute inset-x-0 bottom-5 flex justify-center">
            {panelAction}
          </div>
        )}
      </div>
      <form
        className={cn("flex flex-col gap-6 lg:row-start-2 lg:mt-auto", text)}
      >
        <FieldGroup className="grid grid-cols-1 gap-x-3 gap-y-7 lg:grid-cols-2">
          <Field className="col-span-full">
            <FieldLabel htmlFor="newsletter-email">Business email</FieldLabel>
            <Input
              id="newsletter-email"
              type="email"
              placeholder="benji@email.com"
              size="lg"
            />
          </Field>
          <Field className={cn(!agency && "col-span-full")}>
            <FieldLabel htmlFor="newsletter-country">Country</FieldLabel>
            <FormDropdown
              id="newsletter-country"
              placeholder="Select a country"
              options={countries}
            />
          </Field>
          {agency && (
            <Field>
              <FieldLabel htmlFor="newsletter-agency">
                Are you a marketing agency?
              </FieldLabel>
              <FormDropdown
                id="newsletter-agency"
                placeholder="Yes / No"
                options={[
                  { label: "Yes", value: "yes" },
                  { label: "No", value: "no" },
                ]}
              />
            </Field>
          )}
        </FieldGroup>
        <Button shape="rounded" size="sm" type="button" className="self-start">
          Submit
        </Button>
      </form>
    </div>
  )
}

// A push notification: the app tile, a bold line and two lines of copy.
function Notification() {
  return (
    <div className="flex w-full max-w-72 items-start gap-3 material-medium p-3">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-gray-1000 text-background-100">
        <XLogo className="size-4" />
      </span>
      <div className="flex flex-col gap-0.5">
        <p className="text-label-13 text-gray-1000">Codefinity success story</p>
        <p className="text-copy-13 text-gray-900">
          See how Codefinity used X Ads to reach the right audience and turn
          engagement into measurable results.
        </p>
      </div>
    </div>
  )
}
