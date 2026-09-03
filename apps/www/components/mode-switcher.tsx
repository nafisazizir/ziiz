"use client"

import * as React from "react"
import { DarkModeIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function ModeSwitcher({
  variant = "ghost",
  className,
}: {
  variant?: React.ComponentProps<typeof Button>["variant"]
  className?: React.ComponentProps<typeof Button>["className"]
}) {
  const { setTheme, resolvedTheme } = useTheme()

  const toggleTheme = React.useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }, [resolvedTheme, setTheme])

  return (
    <Button
      variant={variant}
      size="icon"
      className={cn("group/toggle extend-touch-target size-8", className)}
      onClick={toggleTheme}
    >
      <HugeiconsIcon icon={DarkModeIcon} strokeWidth={2} className="size-4.5" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
