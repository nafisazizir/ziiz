import { notFound } from "next/navigation"

import {
  getPlaygroundItem,
  PLAYGROUND_ITEMS,
  PLAYGROUND_LOADERS,
} from "@/lib/playground"
import { Toaster } from "@/components/ui/sonner"
import { Toaster as BaseToaster } from "@/components/ui/toast"

export function generateStaticParams() {
  return PLAYGROUND_ITEMS.map((item) => ({ name: item.name }))
}

export const dynamicParams = false

// Runs before hydration so the palette shortcut works even while the
// preview is loading. The parent window owns the actual palette.
function KeyForwardScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          document.addEventListener("keydown", function (e) {
            if ((e.key === "p" || e.key === "k") && (e.metaKey || e.ctrlKey)) {
              e.preventDefault();
              if (window.parent && window.parent !== window) {
                window.parent.postMessage({ type: "ziiz-palette", key: e.key }, "*");
              }
            }
          });
        `,
      }}
    />
  )
}

export default async function PreviewPage({
  params,
}: {
  params: Promise<{ name: string }>
}) {
  const { name } = await params
  const item = getPlaygroundItem(name)
  const loader = PLAYGROUND_LOADERS[name]

  if (!item || !loader) {
    return notFound()
  }

  const { default: Component } = await loader()

  return (
    <div className="relative bg-background">
      <KeyForwardScript />
      <Component />
      <BaseToaster />
      <Toaster />
    </div>
  )
}
