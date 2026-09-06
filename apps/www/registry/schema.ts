import type * as React from "react"

export type RegistryIndexItem = {
  name: string
  type:
    | "registry:ui"
    | "registry:component"
    | "registry:hook"
    | "registry:lib"
    | "registry:example"
    | "registry:block"
  title: string
  description?: string
  files: string[]
  component?: () => Promise<{ default: React.ComponentType }>
}
