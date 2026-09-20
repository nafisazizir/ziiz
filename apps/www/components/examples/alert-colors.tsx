import { AlertTriangleIcon } from "@/components/icons"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function AlertColors() {
  return (
    <Alert className="max-w-md border-amber-400 bg-amber-100 text-amber-900">
      <AlertTriangleIcon />
      <AlertTitle>Your subscription will expire in 3 days.</AlertTitle>
      <AlertDescription>
        Renew now to avoid service interruption or upgrade to a paid plan to
        continue using the service.
      </AlertDescription>
    </Alert>
  )
}
