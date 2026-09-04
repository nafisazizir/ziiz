/**
 * The reading column shared by every docs route: a page title on the
 * text-heading-40 role, then a typeset body. The title overrides the typeset's
 * own h1 binding (text-heading-32), which is for headings inside a body.
 */
export function DocsPage({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <article className="typeset">
      <h1 className="text-heading-40 tracking-tighter">{title}</h1>
      {description ? <p>{description}</p> : null}
      {children}
    </article>
  )
}
