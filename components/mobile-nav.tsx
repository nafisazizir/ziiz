"use client"

import * as React from "react"
import Link, { type LinkProps } from "next/link"

import { siteConfig } from "@/lib/config"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function MobileNav({ className }: { className?: string }) {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <Button
        variant="ghost"
        onClick={() => setOpen((open) => !open)}
        className={cn(
          "extend-touch-target h-8 touch-manipulation items-center justify-start gap-2.5 p-0! hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 active:bg-transparent dark:hover:bg-transparent",
          className
        )}
      >
        <div className="relative flex h-8 w-4 items-center justify-center">
          <div className="relative size-4">
            <span
              className={cn(
                "absolute left-0 block h-0.5 w-4 bg-foreground transition-all duration-100",
                open ? "top-[0.4rem] -rotate-45" : "top-1"
              )}
            />
            <span
              className={cn(
                "absolute left-0 block h-0.5 w-4 bg-foreground transition-all duration-100",
                open ? "top-[0.4rem] rotate-45" : "top-2.5"
              )}
            />
          </div>
          <span className="sr-only">Toggle Menu</span>
        </div>
        <span className="flex h-8 items-center text-lg leading-none font-medium">
          Menu
        </span>
      </Button>
      {open && (
        <div className="fixed inset-x-0 top-(--header-height) bottom-0 z-50 scrollbar-none overflow-y-auto bg-background/90 backdrop-blur lg:hidden">
          <div className="flex flex-col gap-12 overflow-auto px-6 py-6">
            <div className="flex flex-col gap-4">
              <div className="text-sm font-medium text-muted-foreground">
                Menu
              </div>
              <div className="flex flex-col gap-3">
                {siteConfig.navItems.map((item, index) => (
                  <MobileLink
                    key={index}
                    href={item.href}
                    onOpenChange={setOpen}
                  >
                    {item.label}
                  </MobileLink>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="text-sm font-medium text-muted-foreground">
                Foundation
              </div>
              <div className="flex flex-col gap-3">
                {siteConfig.foundationItems.map(({ name, href }) => (
                  <MobileLink key={name} href={href} onOpenChange={setOpen}>
                    {name}
                  </MobileLink>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: LinkProps & {
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
}) {
  return (
    <Link
      href={href}
      onClick={() => onOpenChange?.(false)}
      className={cn("flex items-center gap-2 text-2xl font-medium", className)}
      {...props}
    >
      {children}
    </Link>
  )
}
