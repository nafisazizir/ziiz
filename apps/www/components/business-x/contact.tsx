import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { FormDropdown } from "@/components/business-x/form-dropdown"

// "Connect with an X Ads specialist": the lead form. Field, Input, Textarea
// and a DropdownMenu picker as shipped.
//
// x.com's geometry at 1024px and up: one eight-column form grid. The panel
// and the two-column field grid share the first row, so the panel stretches
// to the fields' height; the legal copy and Submit sit in a second row under
// the fields. Below that the panel is a square above a single-column form,
// with the copy at the top of the square instead of the bottom. The panel
// carries an illustration on x.com and is left empty here like the hero.
const paymentMethods = [
  { label: "Credit Card", value: "card" },
  { label: "Insertion Order", value: "insertion-order" },
]

const countries = [
  { label: "Australia", value: "au" },
  { label: "Brazil", value: "br" },
  { label: "Germany", value: "de" },
  { label: "Japan", value: "jp" },
  { label: "United States", value: "us" },
]

const textFields = [
  { id: "first-name", label: "First Name", placeholder: "Jane" },
  { id: "last-name", label: "Last Name", placeholder: "Doe" },
  { id: "company", label: "Company Name", placeholder: "Acme Inc" },
  { id: "handle", label: "Company Handle", placeholder: "@somehandle" },
  {
    id: "email",
    label: "Business Email Address",
    placeholder: "jane@example.com",
    type: "email",
  },
  {
    id: "phone",
    label: "Phone Number",
    placeholder: "555-0100",
    type: "tel",
  },
]

export function Contact() {
  return (
    <section>
      <form className="grid grid-cols-8 gap-x-4 gap-y-8 lg:gap-y-4">
        <div className="col-span-8 flex aspect-square flex-col bg-gray-100 p-6 lg:col-span-4 lg:aspect-auto lg:justify-end">
          <div className="flex w-full max-w-100 flex-col gap-3">
            <h2 className="text-heading-32 text-balance text-gray-1000">
              Connect with an X Ads specialist
            </h2>
            <p className="text-copy-13 text-balance text-gray-900">
              Our team will reach out within one business day to help set up
              your first campaign, recommend strategy, or answer questions.
            </p>
          </div>
        </div>
        <FieldGroup className="col-span-8 grid grid-cols-1 gap-x-3 gap-y-7 lg:col-span-4 lg:grid-cols-2">
          {textFields.map((field) => (
            <Field key={field.id}>
              <FieldLabel htmlFor={`business-x-${field.id}`}>
                {field.label}
              </FieldLabel>
              <Input
                id={`business-x-${field.id}`}
                type={field.type}
                placeholder={field.placeholder}
              />
            </Field>
          ))}
          <Field>
            <FieldLabel htmlFor="business-x-payment">Payment Method</FieldLabel>
            <FormDropdown
              id="business-x-payment"
              placeholder="Select a payment method"
              options={paymentMethods}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="business-x-country">Country</FieldLabel>
            <FormDropdown
              id="business-x-country"
              placeholder="Select a country"
              options={countries}
            />
          </Field>
          <Field className="lg:col-span-2">
            <FieldLabel htmlFor="business-x-help">
              How can we help you?
            </FieldLabel>
            <Textarea
              id="business-x-help"
              placeholder="Looking for help with ads"
              rows={2}
            />
          </Field>
        </FieldGroup>
        <div className="col-span-8 flex flex-col-reverse gap-6 lg:col-span-4 lg:col-start-5 lg:flex-row lg:items-start lg:gap-8">
          <p className="w-full text-copy-13 text-gray-700 lg:flex-1">
            By submitting this form, you agree to receive various marketing
            communications via email, telephone and/or text message from X and
            our official sales partners in relation to advertising on X. You may
            unsubscribe at any time.
          </p>
          <Button
            shape="rounded"
            size="sm"
            type="button"
            className="shrink-0 self-start"
          >
            Submit
          </Button>
        </div>
      </form>
    </section>
  )
}
