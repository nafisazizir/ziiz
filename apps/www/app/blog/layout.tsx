import { SiteHeader } from "@/components/site-header"

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-h-svh bg-background">
      <SiteHeader />
      <main className="mx-auto w-full max-w-2xl px-6 py-10 lg:py-16">
        {children}
      </main>
    </div>
  )
}
