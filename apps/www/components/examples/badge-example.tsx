import { Example, ExampleWrapper } from "@/components/example"
import { Badge } from "@/components/ui/badge"
import { Spinner } from "@/components/ui/spinner"
import { IconPlaceholder } from "@/components/icon-placeholder"

export default function BadgeExample() {
  return (
    <ExampleWrapper className="lg:grid-cols-1">
      <BadgeVariants />
      <BadgeWithIconLeft />
      <BadgeWithIconRight />
      <BadgeWithSpinner />
      <BadgeAsLink />
      <BadgeLongText />
      <BadgeCustomColors />
    </ExampleWrapper>
  )
}

function BadgeVariants() {
  return (
    <Example title="Variants">
      <div className="style-sera:gap-6 flex flex-wrap gap-2">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="ghost">Ghost</Badge>
        <Badge variant="link">Link</Badge>
      </div>
    </Example>
  )
}

function BadgeWithIconLeft() {
  return (
    <Example title="Icon Left" className="max-w-fit">
      <div className="style-sera:gap-6 flex flex-wrap gap-2">
        <Badge>
          <IconPlaceholder
            lucide="BadgeCheck"
            tabler="IconRosetteDiscountCheck"
            hugeicons="CheckmarkBadge02Icon"
            phosphor="CheckCircleIcon"
            remixicon="RiCheckboxCircleLine"
            data-icon="inline-start"
          />
          Default
        </Badge>
        <Badge variant="secondary">
          <IconPlaceholder
            lucide="BadgeCheck"
            tabler="IconRosetteDiscountCheck"
            hugeicons="CheckmarkBadge02Icon"
            phosphor="CheckCircleIcon"
            remixicon="RiCheckboxCircleLine"
            data-icon="inline-start"
          />
          Secondary
        </Badge>
        <Badge variant="destructive">
          <IconPlaceholder
            lucide="BadgeCheck"
            tabler="IconRosetteDiscountCheck"
            hugeicons="CheckmarkBadge02Icon"
            phosphor="CheckCircleIcon"
            remixicon="RiCheckboxCircleLine"
            data-icon="inline-start"
          />
          Destructive
        </Badge>
        <Badge variant="outline">
          <IconPlaceholder
            lucide="BadgeCheck"
            tabler="IconRosetteDiscountCheck"
            hugeicons="CheckmarkBadge02Icon"
            phosphor="CheckCircleIcon"
            remixicon="RiCheckboxCircleLine"
            data-icon="inline-start"
          />
          Outline
        </Badge>
        <Badge variant="ghost">
          <IconPlaceholder
            lucide="BadgeCheck"
            tabler="IconRosetteDiscountCheck"
            hugeicons="CheckmarkBadge02Icon"
            phosphor="CheckCircleIcon"
            remixicon="RiCheckboxCircleLine"
            data-icon="inline-start"
          />
          Ghost
        </Badge>
        <Badge variant="link">
          <IconPlaceholder
            lucide="BadgeCheck"
            tabler="IconRosetteDiscountCheck"
            hugeicons="CheckmarkBadge02Icon"
            phosphor="CheckCircleIcon"
            remixicon="RiCheckboxCircleLine"
            data-icon="inline-start"
          />
          Link
        </Badge>
      </div>
    </Example>
  )
}

function BadgeWithIconRight() {
  return (
    <Example title="Icon Right" className="max-w-fit">
      <div className="style-sera:gap-6 flex flex-wrap gap-2">
        <Badge>
          Default
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
            data-icon="inline-end"
          />
        </Badge>
        <Badge variant="secondary">
          Secondary
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
            data-icon="inline-end"
          />
        </Badge>
        <Badge variant="destructive">
          Destructive
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
            data-icon="inline-end"
          />
        </Badge>
        <Badge variant="outline">
          Outline
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
            data-icon="inline-end"
          />
        </Badge>
        <Badge variant="ghost">
          Ghost
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
            data-icon="inline-end"
          />
        </Badge>
        <Badge variant="link">
          Link
          <IconPlaceholder
            lucide="ArrowRightIcon"
            tabler="IconArrowRight"
            hugeicons="ArrowRight02Icon"
            phosphor="ArrowRightIcon"
            remixicon="RiArrowRightLine"
            data-icon="inline-end"
          />
        </Badge>
      </div>
    </Example>
  )
}

function BadgeWithSpinner() {
  return (
    <Example title="With Spinner" className="max-w-fit">
      <div className="style-sera:gap-6 flex flex-wrap gap-2">
        <Badge>
          <Spinner data-icon="inline-start" />
          Default
        </Badge>
        <Badge variant="secondary">
          <Spinner data-icon="inline-start" />
          Secondary
        </Badge>
        <Badge variant="destructive">
          <Spinner data-icon="inline-start" />
          Destructive
        </Badge>
        <Badge variant="outline">
          <Spinner data-icon="inline-start" />
          Outline
        </Badge>
        <Badge variant="ghost">
          <Spinner data-icon="inline-start" />
          Ghost
        </Badge>
        <Badge variant="link">
          <Spinner data-icon="inline-start" />
          Link
        </Badge>
      </div>
    </Example>
  )
}

function BadgeAsLink() {
  return (
    <Example title="asChild">
      <div className="style-sera:gap-6 flex flex-wrap gap-2">
        <Badge
          render={
            <a href="#">
              Link{" "}
              <IconPlaceholder
                lucide="ArrowUpRightIcon"
                tabler="IconArrowUpRight"
                hugeicons="ArrowUpRightIcon"
                phosphor="ArrowUpRightIcon"
                remixicon="RiArrowRightUpLine"
                data-icon="inline-end"
              />
            </a>
          }
        />
        <Badge
          variant="secondary"
          render={
            <a href="#">
              Link{" "}
              <IconPlaceholder
                lucide="ArrowUpRightIcon"
                tabler="IconArrowUpRight"
                hugeicons="ArrowUpRightIcon"
                phosphor="ArrowUpRightIcon"
                remixicon="RiArrowRightUpLine"
                data-icon="inline-end"
              />
            </a>
          }
        />
        <Badge
          variant="destructive"
          render={
            <a href="#">
              Link{" "}
              <IconPlaceholder
                lucide="ArrowUpRightIcon"
                tabler="IconArrowUpRight"
                hugeicons="ArrowUpRightIcon"
                phosphor="ArrowUpRightIcon"
                remixicon="RiArrowRightUpLine"
                data-icon="inline-end"
              />
            </a>
          }
        />
        <Badge
          variant="ghost"
          render={
            <a href="#">
              Link{" "}
              <IconPlaceholder
                lucide="ArrowUpRightIcon"
                tabler="IconArrowUpRight"
                hugeicons="ArrowRight02Icon"
                phosphor="ArrowUpRightIcon"
                remixicon="RiArrowRightUpLine"
                data-icon="inline-end"
              />
            </a>
          }
        />
      </div>
    </Example>
  )
}

function BadgeLongText() {
  return (
    <Example title="Long Text">
      <div className="style-sera:gap-6 flex flex-wrap gap-2">
        <Badge variant="secondary">
          A badge with a lot of text to see how it wraps
        </Badge>
      </div>
    </Example>
  )
}

function BadgeCustomColors() {
  return (
    <Example title="Custom Colors" className="max-w-fit">
      <div className="style-sera:gap-6 flex flex-wrap gap-2">
        <Badge className="bg-blue-700 text-white">Blue</Badge>
        <Badge className="bg-green-700 text-white">Green</Badge>
        <Badge className="bg-teal-700 text-white">Teal</Badge>
        <Badge className="bg-purple-700 text-white">Purple</Badge>
        <Badge className="bg-blue-100 text-blue-900">Blue</Badge>
        <Badge className="bg-green-100 text-green-900">Green</Badge>
        <Badge className="bg-teal-100 text-teal-900">Teal</Badge>
        <Badge className="bg-purple-100 text-purple-900">Purple</Badge>
        <Badge className="bg-red-100 text-red-900">Red</Badge>
      </div>
    </Example>
  )
}
