// The shell supplies the frame; the blog only needs its prose column, matching
// the width a docs article gets between the two rails.
export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="mx-auto w-full max-w-2xl px-1 py-10 lg:px-8">
      {children}
    </div>
  )
}
