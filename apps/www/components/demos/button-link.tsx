import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function ButtonLink() {
  return (
    <Button
      variant="outline"
      nativeButton={false}
      render={<Link href="/components" />}
    >
      Browse components
    </Button>
  )
}
