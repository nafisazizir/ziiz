"use client"

import { toast } from "sonner"

import { Button } from "@/components/ui/button"

export default function SonnerDemo() {
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast("Event created", {
          description: "Sunday, December 3 at 9:00 AM",
          action: { label: "Undo", onClick: () => {} },
        })
      }
    >
      Show Sonner
    </Button>
  )
}
