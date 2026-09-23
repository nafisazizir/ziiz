import { ArrowUpIcon } from "@/components/icons"

import { Button } from "@/components/ui/button"

export default function ButtonRounded() {
  return (
    <div className="flex gap-2">
      <Button shape="rounded">Get Started</Button>
      <Button variant="outline" size="icon" shape="rounded">
        <ArrowUpIcon />
      </Button>
    </div>
  )
}
