import type { Run } from "@/components/business-x/blog"
import { Runs } from "@/components/business-x/runs"

const notes: Run[][] = [
  [
    "Annual Percentage Yield (“APY”) is accurate as of 7/27/2026 and subject to change. Rates and eligibility vary by subscription and jurisdiction. Premium+ users are eligible for 6.00% APY. All other users may be eligible for a boosted APY of 6.00% when Qualifying Direct Deposit requirements are met. New York residents do not obtain APY, interest, or interest boosts on Stored Value Accounts. See ",
    { a: "/money-x/interest-faq", r: ["here"] },
    " for details, eligibility, and current rates. Fees may impact your earnings. Your funds are held at Cross River Bank, Member FDIC and other FDIC-insured institutions. Certain conditions must be satisfied for pass-through deposit insurance coverage to apply. X Payments LLC is not an FDIC-insured bank. Deposit insurance only covers the failure of an insured bank.",
  ],
  [
    "Premium and Premium+ users earn up to 3% cashback on eligible purchases made with the >x< Card. All other users may be eligible for boosted cashback up to 3%. Boosted rate applies when you receive Qualifying Deposits in the total amount of $1,000 or more within a trailing 34 day period into your Stored Value Account. A Qualifying Deposit is (i) a direct deposit received via the Automated Clearing House (“ACH”) with SEC code = PPD or (ii) an X Creator payout from ",
    {
      a: "/help-x/using-x/original-content-rewards",
      r: ["Original Content Rewards"],
    },
    ", ",
    {
      a: "/help-x/using-x/creator-revenue-sharing",
      r: ["Creator Revenue Sharing"],
    },
    " or ",
    {
      a: "/help-x/using-x/subscriptions-creator",
      r: ["Creator Subscriptions"],
    },
    ". Certain transactions are not eligible. See ",
    { a: "/money-x/cashback-rewards-terms", r: ["Cashback Rewards Terms"] },
    " for details.",
  ],
  [
    "Deposit accounts are held at Cross River Bank, Member FDIC, and insured up to $250,000. Deposits are automatically enrolled in a cash sweep program, which provides up to $10M of aggregate FDIC pass-through deposit insurance coverage, across participating FDIC-insured network banks, subject to limits. Certain conditions must be satisfied for deposit insurance coverage to apply, see ",
    { a: "/money-x/faq#fdic-insurance-and-sweep-program", r: ["terms"] },
    ". X Payments LLC is not an FDIC-insured bank. Deposit insurance only covers the failure of an insured bank.",
  ],
  [
    '“More than 10x the national average" compares the 6.00% Annual Percentage Yield (APY) on the >x< Money Account to the national average interest rate for savings accounts of 0.38%, as published by the FDIC in its ',
    {
      a: "http://fdic.gov/resources/bankers/national-rates/",
      r: ["National Deposit Rates"],
    },
    " as of July 20, 2026. The FDIC updates national deposit rates monthly; comparison is accurate as of the date stated.",
  ],
  [
    'Deposits are eligible for up to $10,000,000 in aggregate FDIC insurance through placement at multiple FDIC-insured network banks via IntraFi\'s ICS® service. "40x" compares this aggregate maximum to the standard FDIC insurance amount of $250,000 per depositor, per insured bank, per ownership category. X Payments LLC is a financial technology company, not an FDIC-insured depository institution. Banking services provided by Cross River Bank, Member FDIC. Certain conditions must be satisfied for pass-through deposit insurance coverage to apply. See network bank list ',
    { a: "https://depositorcontrol.com/x-money", r: ["here"] },
    ".",
  ],
  [
    "Premium and Premium+ subscribers get unlimited ATM operator fee reimbursements. Users without a Premium or Premium+ subscription are reimbursed up to $4 per transaction, for up to 2 transactions per month. Reimbursements are processed within 3 calendar days.",
  ],
]

// The six notes the page's superscripts point at, in the small print role,
// a blank line apart.
export function Footnotes() {
  return (
    <ol className="flex flex-col gap-4 text-label-12 text-gray-900 [&_a]:text-gray-1000 [&_a]:underline [&_a]:underline-offset-2 [&_a]:transition-opacity [&_a]:hover:opacity-80">
      {notes.map((note, index) => (
        <li key={index}>
          {`${index + 1}. `}
          <Runs runs={note} />
        </li>
      ))}
    </ol>
  )
}
