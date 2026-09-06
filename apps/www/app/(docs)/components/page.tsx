import type { Metadata } from "next"
import Link from "next/link"

import { siteConfig } from "@/lib/config"

export const metadata: Metadata = {
  title: "Components",
  description: "Every component in the registry.",
}

export default function Page() {
  return (
    <>
      <h1>Components</h1>
      <p>
        {siteConfig.componentItems.length} components, each a file you own.
        Install one with <code>npx shadcn@latest add @ziiz/&lt;name&gt;</code>{" "}
        or paste it from its page.
      </p>
      <ul
        data-not-typeset
        className="mt-10 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2"
      >
        {siteConfig.componentItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="group -m-2 flex flex-col gap-1 rounded-md p-2 transition-colors hover:bg-gray-alpha-100"
            >
              <span className="text-heading-14 text-gray-1000">
                {item.name}
              </span>
              <span className="text-copy-13 text-gray-900">
                {item.description ?? "No description yet."}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
