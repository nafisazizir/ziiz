import type { Metadata } from "next"
import Link from "next/link"
import { IconArrowRight, IconArrowUpRight } from "@tabler/icons-react"

import { MoneyFrame } from "@/components/business-x/frame"
import { legalDocs } from "@/components/money-x/legal"

export const metadata: Metadata = {
  title: "X Money Legal Terms and Policies",
  description:
    "The legal index of money.x.com rebuilt from ziiz components as shipped.",
}

const row =
  "group flex min-h-14 items-center justify-between gap-4 border-b border-gray-alpha-400 px-4 py-3 transition-colors hover:bg-gray-100"

// money.x.com/en/i/legal: the documents as numbered rows in the column a
// document's own text takes, with the 256px a document gives its contents
// list left empty beside it from 1024px.
export default function MoneyXLegalPage() {
  return (
    <MoneyFrame>
      <section className="w-full py-9 md:py-18">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-16">
          <div className="min-w-0">
            <h1 className="mb-10 text-heading-32 text-balance text-gray-1000 md:text-heading-48">
              X Money Legal Terms and Policies
            </h1>
            <ul className="flex flex-col [&>li:last-child>a]:border-b-0">
              {legalDocs.map((doc, index) => {
                const label = (
                  <span className="flex min-w-0 items-center gap-4 text-label-13">
                    <span className="shrink-0 text-gray-900 tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-gray-1000">{doc.title}</span>
                  </span>
                )
                const arrow =
                  "size-4 shrink-0 text-gray-1000 opacity-0 transition-opacity group-hover:opacity-100"
                return (
                  <li key={doc.title}>
                    {doc.slug ? (
                      <Link href={`/money-x/${doc.slug}`} className={row}>
                        {label}
                        <IconArrowRight className={arrow} />
                      </Link>
                    ) : (
                      <a
                        href={doc.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={row}
                      >
                        {label}
                        <IconArrowUpRight className={arrow} />
                      </a>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </section>
    </MoneyFrame>
  )
}
