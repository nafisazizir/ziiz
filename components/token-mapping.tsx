"use client"

import { Swatch } from "@/components/color-scales"
import { DocsSubheading } from "@/components/docs-prose"
import { TooltipProvider } from "@/components/ui/tooltip"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const GROUPS: {
  label: string
  rows: { slot: string; token: string }[]
}[] = [
  {
    label: "Base",
    rows: [
      { slot: "background", token: "background-100" },
      { slot: "foreground", token: "gray-1000" },
    ],
  },
  {
    label: "Surfaces",
    rows: [
      { slot: "card", token: "background-100" },
      { slot: "card-foreground", token: "gray-1000" },
      { slot: "popover", token: "background-100" },
      { slot: "popover-foreground", token: "gray-1000" },
    ],
  },
  {
    label: "Actions",
    rows: [
      { slot: "primary", token: "gray-1000" },
      { slot: "primary-foreground", token: "background-100" },
      { slot: "secondary", token: "gray-100" },
      { slot: "secondary-foreground", token: "gray-1000" },
      { slot: "muted", token: "gray-100" },
      { slot: "muted-foreground", token: "gray-900" },
      { slot: "accent", token: "gray-100" },
      { slot: "accent-foreground", token: "gray-1000" },
      { slot: "destructive", token: "red-800" },
    ],
  },
  {
    label: "Borders and focus",
    rows: [
      { slot: "border", token: "gray-alpha-400" },
      { slot: "input", token: "gray-alpha-400" },
      { slot: "ring", token: "gray-600" },
    ],
  },
  {
    label: "Charts",
    rows: [
      { slot: "chart-1", token: "blue-700" },
      { slot: "chart-2", token: "amber-700" },
      { slot: "chart-3", token: "green-700" },
      { slot: "chart-4", token: "purple-700" },
      { slot: "chart-5", token: "pink-700" },
    ],
  },
  {
    label: "Sidebar",
    rows: [
      { slot: "sidebar", token: "background-200" },
      { slot: "sidebar-foreground", token: "gray-1000" },
      { slot: "sidebar-primary", token: "gray-1000" },
      { slot: "sidebar-primary-foreground", token: "background-200" },
      { slot: "sidebar-accent", token: "gray-100" },
      { slot: "sidebar-accent-foreground", token: "gray-1000" },
      { slot: "sidebar-border", token: "gray-alpha-400" },
      { slot: "sidebar-ring", token: "gray-600" },
    ],
  },
]

export function TokenMapping() {
  return (
    <TooltipProvider>
      <Table className="mt-6">
        <TableHeader>
          <TableRow>
            <TableHead className="w-12" />
            <TableHead className="w-2/5">shadcn token</TableHead>
            <TableHead>ziiz token</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
      {GROUPS.map((group) => (
        <section key={group.label}>
          <DocsSubheading className="mt-8">{group.label}</DocsSubheading>
          <Table className="mt-2">
            <TableBody>
              {group.rows.map((row) => (
                <TableRow key={row.slot}>
                  <TableCell className="w-12">
                    <Swatch token={row.token} className="size-8" />
                  </TableCell>
                  <TableCell className="text-label-13-mono w-2/5">
                    --{row.slot}
                  </TableCell>
                  <TableCell className="text-label-13-mono text-gray-900">
                    --ds-{row.token}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      ))}
    </TooltipProvider>
  )
}
