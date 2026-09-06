import {
  Alert02Icon,
  AlertCircleIcon,
  InformationCircleIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { cn } from "@/lib/utils"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const icons = {
  default: null,
  info: InformationCircleIcon,
  warning: Alert02Icon,
  danger: AlertCircleIcon,
}

// A prose-level aside. Alert, opted out of the typeset so the text roles
// come from the component; the flow margin is reapplied by hand.
function Callout({
  title,
  icon,
  variant = "default",
  className,
  children,
  ...props
}: Omit<React.ComponentProps<typeof Alert>, "variant"> & {
  icon?: React.ReactNode
  variant?: keyof typeof icons
}) {
  const Icon = icons[variant]

  return (
    <Alert
      data-slot="callout"
      data-variant={variant}
      variant={variant === "danger" ? "destructive" : "default"}
      className={cn(
        "not-typeset mt-(--typeset-flow,1.5rem) w-auto bg-background-200 data-[variant=warning]:text-amber-900 data-[variant=warning]:*:data-[slot=alert-description]:text-amber-900 **:[code]:bg-gray-alpha-200",
        className
      )}
      {...props}
    >
      {icon ?? (Icon ? <HugeiconsIcon icon={Icon} strokeWidth={2} /> : null)}
      {title ? <AlertTitle>{title}</AlertTitle> : null}
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  )
}

export { Callout }
