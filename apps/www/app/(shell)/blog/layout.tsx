// The shell supplies the frame; the blog takes the full article width the
// shell leaves beside the sidebar, capped at 1152px, and hands its posts
// a prose column inside that.
export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="mx-auto flex w-full max-w-288 flex-col px-1 lg:px-8">
      {children}
    </div>
  )
}
