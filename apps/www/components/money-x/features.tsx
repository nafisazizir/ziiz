import {
  NumberedFeatures,
  type Feature,
} from "@/components/business-x/numbered-features"
import { XText } from "@/components/business-x/runs"
import {
  ActivityMock,
  CashbackMock,
  SecurityMock,
  SendMock,
  SupportMock,
} from "@/components/money-x/mocks/features"
import { CardFlip } from "@/components/money-x/mocks/x-card"

const features: Feature[] = [
  {
    title: "From paycheck to payments",
    copy: (
      <XText>
        {
          "Get paid up to 2 days early with direct deposit — then send wires, mail checks, and pay your bills, all without leaving >x<."
        }
      </XText>
    ),
    mock: <ActivityMock />,
    scene: 260,
  },
  {
    title: "Send money instantly",
    copy: <XText>{"Pay anyone on >x< — free and with no limits."}</XText>,
    mock: <SendMock />,
    scene: 260,
  },
  {
    title: "Meet the >x< Card",
    copy: (
      <>
        Worldwide ATM fee reimbursements.⁶
        <br />
        No foreign transaction fees.
        <br />
        Use it anywhere Visa is accepted.
      </>
    ),
    // The scene is as wide as the panel is tall; the card's own 434px row
    // overflows it evenly on both sides.
    mock: <CardFlip />,
    scene: 189,
    wide: true,
  },
  {
    title: "Up to 3% cashback",
    copy: (
      <XText>
        {"Earned on eligible purchases when you pay with the >x< Card.²"}
      </XText>
    ),
    panel: <CashbackMock />,
  },
  {
    title: "Powerful security",
    copy: "Your account is secured with passkeys, custom transaction limits, and advanced privacy controls.",
    mock: <SecurityMock />,
    scene: 190,
  },
  {
    title: "Fast, 24/7 support",
    copy: "Dedicated support when you need it — fast and easy to reach.",
    mock: <SupportMock />,
    scene: 270,
    wide: true,
  },
]

// "Everything money can do": the business clone's numbered grid, with the
// site's one departure from it. The third feature's wide panel starts at
// the third column, under the gap between the first two, so its row leads
// with two empty columns from 1024px.
export function MoneyFeatures() {
  return (
    <NumberedFeatures
      items={features}
      className="lg:[&>li:nth-child(3)>div:first-child]:col-start-3"
    />
  )
}
