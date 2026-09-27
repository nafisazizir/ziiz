import { CreditEllipse } from "@/components/art/sections/credit-ellipse"
import { Button } from "@/components/ui/button"

// "Get $500 in ad credit": the two orbits drawn at 430x530 in the middle of
// the column, a dashed rail running out to a square cap at either edge from
// 480px, and the offer pinned just above the drawing's centre.
export function AdCredit() {
  return (
    <section className="w-full py-0 lg:pt-20 lg:pb-10">
      <div className="relative mx-auto flex justify-center px-8 md:px-0">
        <div
          aria-hidden
          className="absolute top-[52%] left-1/2 z-0 flex w-screen -translate-x-1/2 -translate-y-1/2 items-center max-[479px]:hidden md:w-full"
        >
          <span className="z-10 -mr-1.5 size-3 border border-gray-1000 bg-background-100" />
          <span className="h-px flex-1 bg-[repeating-linear-gradient(to_right,currentColor_0_16px,transparent_16px_32px)] text-gray-1000" />
          <span className="w-100 shrink-0" />
          <span className="h-px flex-1 bg-[repeating-linear-gradient(to_right,currentColor_0_16px,transparent_16px_32px)] text-gray-1000" />
          <span className="z-10 -ml-1.5 size-3 border border-gray-1000 bg-background-100" />
        </div>
        <CreditEllipse className="relative z-10 w-[125%] max-w-[100vw] text-gray-1000 min-[440px]:w-[90%] md:w-100 lg:w-full lg:max-w-107.5" />
        <div className="absolute top-[52%] left-1/2 z-20 flex max-w-72 -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3 px-4 text-center">
          <h2 className="text-heading-32 text-balance text-gray-1000 max-[379px]:text-heading-24">
            Get $500
            <span className="block text-gray-900">in ad credit</span>
          </h2>
          <Button
            shape="rounded"
            size="sm"
            nativeButton={false}
            render={
              <a href="https://business.x.com/en/forms/ad-credit-terms-500" />
            }
          >
            Get Started
          </Button>
          <p className="max-w-52 text-label-12 text-balance text-gray-900">
            When you spend $500. New advertisers eligible. Terms apply.
          </p>
        </div>
      </div>
    </section>
  )
}
