import { DocsPage, getDocsMetadata } from "@/lib/docs-page"

const slug = ["typography"]

export const metadata = getDocsMetadata(slug)

export default function Page() {
  return <DocsPage slug={slug} />
}
