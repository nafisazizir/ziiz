import { XCard } from "@/components/money-x/mocks/x-card"
import { Button } from "@/components/ui/button"

// money.x.com opens centred: the headline in a 656px measure, the card in
// its sleeve, then where it is live and one action. The picture's box steps
// 5:3, 2:1 from 768px and 11:4 from 1024px, where it also outgrows the
// measure to 752px; the drawing inside stays 2:1 and as tall as the box.
// Below 1024px the section runs to the screen's edges.
export function MoneyHero() {
  return (
    <section className="-mx-4 flex flex-col items-center py-20 lg:mx-0 lg:pb-16">
      <div className="flex w-full flex-col items-center gap-10 lg:w-164 lg:max-w-full">
        <h1 className="text-center text-heading-32 text-balance text-gray-1000 lg:text-heading-48">
          {`Your money, on the world's `}
          <br />
          {`most powerful network.`}
        </h1>
        <div className="flex w-full flex-col items-center gap-5 lg:gap-0">
          <div className="relative aspect-5/3 w-full overflow-hidden md:aspect-2/1 lg:aspect-11/4 lg:w-188 lg:max-w-none">
            <div className="absolute inset-y-0 left-1/2 aspect-2/1 -translate-x-1/2">
              <Sleeve />
            </div>
          </div>
          <div className="flex max-w-full flex-col items-center gap-3">
            <p className="text-center text-label-12 whitespace-nowrap text-gray-900 lg:text-copy-13">
              {`Rolling out to select users in the `}
              <span className="text-gray-1000">United States</span>.
            </p>
            <Button
              shape="rounded"
              size="sm"
              nativeButton={false}
              render={
                <a
                  href="https://x.com/XMoney"
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              Follow for updates
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

// A stand-in for the site's video: the card in an open sleeve, drawn 261px
// wide and zoomed to three quarters of the box's height. The sleeve stays
// the dark object in both themes, so it steps down the ramp in dark.
function Sleeve() {
  return (
    <div
      aria-hidden
      className="[container-type:size] flex size-full items-center justify-center"
    >
      <div className="relative h-[205px] w-[261px] shrink-0 [zoom:calc(75cqh/205px)]">
        <span className="absolute inset-x-0 top-0 h-[90px] bg-gray-1000 [clip-path:polygon(5%_0,100%_6%,87%_100%,0_100%)] dark:bg-gray-300" />
        <span className="absolute top-20 bottom-0 left-0 w-[244px] bg-gray-950 dark:bg-gray-200" />
        <XCard className="absolute top-[108px] left-3 w-[150px]" />
        <span className="absolute top-20 bottom-0 left-0 w-20 bg-gray-1000 dark:bg-gray-300" />
        <span className="absolute top-20 bottom-0 left-[164px] w-20 bg-gray-1000 dark:bg-gray-300" />
      </div>
    </div>
  )
}
