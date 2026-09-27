import type { Metadata } from "next"

import { SpacesOrbit } from "@/components/art/banners/spaces-orbit"
import { ArcNodes } from "@/components/art/cards/arc-nodes"
import { DiamondCompass } from "@/components/art/cards/diamond-compass"
import { NetworkHub } from "@/components/art/cards/network-hub"
import { RecordingPanels } from "@/components/art/cards/recording-panels"
import { TimerBars } from "@/components/art/cards/timer-bars"
import { WatchPartyCard } from "@/components/art/cards/watch-party-card"
import { ClosingCta } from "@/components/business-x/closing-cta"
import { FormatsExplorer, type Format } from "@/components/business-x/formats"
import { BusinessFrame } from "@/components/business-x/frame"
import { Hero } from "@/components/business-x/hero"
import {
  AvatarCluster,
  ListenPhone,
  SpacePhone,
} from "@/components/business-x/mocks/spaces"
import { CardTrio } from "@/components/business-x/product-blocks"
import { ResourceCards } from "@/components/business-x/resource-cards"
import { XText } from "@/components/business-x/runs"
import {
  Body,
  Eyebrow,
  Section,
  SectionHeading,
  SplitRow,
} from "@/components/business-x/section"
import { SpacesTabs } from "@/components/business-x/spaces-page"
import { XLogo } from "@/components/business-x/x-logo"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "X Spaces | X Business",
  description:
    "business.x.com's X Spaces page rebuilt from ziiz components as shipped.",
}

const tools = [
  {
    title: "Expand your reach",
    copy: "Live Spaces appear at the top of the timeline, making it easy for people to join yours.",
    art: NetworkHub,
  },
  {
    title: "Stay in control",
    copy: "It’s your Space, so you get to decide who can speak and when.",
    art: DiamondCompass,
  },
  {
    title: "Connect in real time",
    copy: "Live audio conversations allow you to connect with your audience in a new way.",
    art: ArcNodes,
  },
]

const recordedTools = [
  {
    title: "Edit and customize your recordings",
    copy: "Pick the start time of a recording to suit your listeners.",
    art: RecordingPanels,
  },
  {
    title: "Replay recorded >x< Spaces",
    copy: "Listeners can find and playback your recording for up to 30 days.",
    art: TimerBars,
  },
  {
    title: "Create and share clips from >x< Spaces",
    copy: "We’re currently testing the ability to clip audio from recorded Spaces.",
    art: WatchPartyCard,
  },
]

const features: Format[] = [
  {
    name: "Live audio",
    intro: [
      "No need to be camera-ready — Spaces are audio, giving you the freedom and flexibility to start a conversation at any time, from anywhere. From home, on location, or at a sports game or awards show, you can bring the power of your voice straight to your audience.",
    ],
    phone: <SpacePhone />,
  },
  {
    name: "Accessible & discoverable",
    intro: [
      "At any point while hosting, listening, or speaking inside of a Space, you can tap the “Turn on captions” button, which will allow you to see live captions of any host or speakers who have consented to having their speech in Spaces captioned.",
      "Live Spaces appear highlighted in purple at the top of your followers’ timelines, making them easy to find and join, and you can assign up to three topics to a Space you host, to help make your Space more discoverable. Look out for the Spaces tab (currently available in English and on iOS) where you’ll be able to listen to and discover live Spaces, recorded Spaces, and podcasts.",
    ],
    phone: <ListenPhone />,
  },
  {
    name: "Share the mic",
    intro: [
      "When you host a Space, you have complete control over mic access. Spaces can include up to 11 speakers at any one time (including the primary host), and once a Space has started, listeners can request speaker access from within the Space.",
      "Hosts can invite up to two co-hosts to help moderate the conversation, and hosts can also utilize safety tools to remove or block accounts.",
    ],
    phone: <SpacePhone title="Share the mic" action="Request to speak" />,
  },
  {
    name: "Contextualize the conversation",
    intro: [
      "Set the mood by adding context to your Space by giving it a descriptive name and sharing relevant Posts directly within the Space. There’s no limit to the number of Posts you can add, and anyone who can speak in the Space can share a Post.",
      "Adding Posts can help drive the conversation, and you can include any Post you like — not just your own.",
    ],
    phone: (
      <SpacePhone title="Draft day, live reactions" action="Share a post" />
    ),
  },
]

const recordedFeatures: Format[] = [
  {
    name: "Before your Space starts",
    intro: [
      "Recording your Space makes it easy to reach listeners beyond the live moment. Set up your conversation details, turn on recording with a single tap, and launch your session right away or schedule it for later.",
    ],
    subs: [
      {
        name: "Define your Space details",
        copy: "Edit the name and description, then select up to three related Topics.",
      },
      {
        name: "Enable recording",
        copy: "Next to Record Space, tap the toggle to record your Space.",
      },
      {
        name: "Launch or schedule",
        copy: "Tap Start a Space or use the calendar icon to schedule it for a later date and time.",
      },
    ],
    phone: <SpacePhone title="Record this Space" action="Start a Space" />,
  },
  {
    name: "After your Space ends",
    intro: [
      "Recording your Space makes it easy to reach listeners beyond the live moment. Set up your conversation details, turn on recording with a single tap, and launch your session right away or schedule it for later.",
    ],
    subs: [
      {
        name: "Edit Your Recording",
        copy: "Use the slider bar to edit the start time of your recording.",
      },
      {
        name: "Share Your Space",
        copy: "Share your recording via Post, DM, or embed it on your site so your followers and fans can catch up on the conversation.",
      },
      {
        name: "Track Your Performance",
        copy: "On the Space card of your recording, hosts can access their Host Analytics dashboard to view how many live listeners, recording replays (when applicable), participants, and their space duration of their live and recorded Space.",
      },
    ],
    phone: <SpacePhone title="Watch party, let’s go" action="Play recording" />,
  },
  {
    name: "Downloading a recorded Space",
    intro: [
      "Currently, it is not possible to download a Spaces Recording directly to your device as an audio file. However, as a Host, unless you have deleted the recording, you can retrieve a copy of your Spaces recording at any time from your >x< data archive as a .ts file that you can easily convert into an audio file like .mp3 or .wav, or even a video.",
      "To download a Spaces Recording from your >x< data archive:",
    ],
    subs: [
      {
        name: "Open settings",
        copy: "From the main menu of the >x< App or x.com, click or tap Settings and privacy, then tap Your account.",
      },
      {
        name: "Request your archive",
        copy: "Next, click or tap Download an archive of your data. From that point, it may ask you to re-login to your account from your mobile web browser.",
      },
      {
        name: "Request your data",
        copy: "Under >x< data, click or tap the Request archive button.",
      },
      {
        name: "Download your archive",
        copy: ">x< will notify you once your file download is complete.",
      },
      {
        name: "Find your recording",
        copy: "Upon downloading your archive, open the .zip file and navigate to data > spaces_media.",
      },
    ],
    phone: <SpacePhone title="Your recording is ready" action="Download" />,
  },
]

const reading = [
  {
    title: "About >x< Spaces",
    copy: "Live audio conversations on >x< where anyone can join and listen, while selected users can speak. Hosts can schedule, record, invite speakers, and moderate the conversation.",
    href: "https://help.x.com/using-x/spaces",
    action: "Learn More",
    panel: (
      <ListenPhone className="mt-12 h-auto min-h-full self-center rounded-b-none border-b-0" />
    ),
  },
  {
    title: "Communities on >x<",
    copy: "Dedicated spaces on >x< built around specific interests or topics, where members can connect, post, and engage with others who share the same interests.",
    href: "https://help.x.com/using-x/communities",
    action: "Learn More",
    panel: <AvatarCluster className="m-4" />,
  },
]

const recordedReading = [
  {
    title: ">x< Spaces Spark Program policy",
    copy: "The >x< Spaces Spark Program supports and rewards creators who host engaging conversations on >x< Spaces, with guidelines and requirements for participating in the program.",
    href: "https://help.x.com/rules-and-policies/spaces-spark-program",
    action: "Learn More",
    panel: (
      <SpacePhone className="mt-12 h-auto min-h-full self-center rounded-b-none border-b-0" />
    ),
  },
  {
    title: "Podcasts on >x< Spaces Tab",
    copy: "Discover podcasts, live Spaces, and recorded conversations personalized to your interests, the people you follow, and trending topics on >x<.",
    href: "https://help.x.com/using-x/spaces",
    action: "Learn More",
    panel: <AvatarCluster className="m-4" />,
  },
]

function Overview() {
  return (
    <>
      <Section rule className="gap-8 lg:gap-14">
        <SectionHeading
          title=">x< Spaces is where live"
          subtitle="audio conversations happen"
          className="lg:max-w-1/2"
        />
        <SplitRow lead={<Eyebrow>Bring your voice</Eyebrow>}>
          <Body>
            <p>
              <XText>
                {
                  "The conversation about you and your content is at its best on >x<, and now you can Post and talk. Spaces unlocks conversations on >x< with the depth and power only the human voice can bring."
                }
              </XText>
            </p>
            <p>
              These ephemeral, live audio conversations allow for open,
              authentic, and unfiltered discussions, and there’s a Space for any
              and every topic and conversation, from small and intimate to
              millions of listeners.
            </p>
          </Body>
        </SplitRow>
      </Section>
      <Section className="pt-10 pb-4 lg:pt-20 lg:pb-30">
        <CardTrio
          title="Start talking"
          subtitle="Essential tools to grow and engage your crowd"
          items={tools}
        />
      </Section>
      <Section rule className="gap-12 pt-14 pb-4 lg:gap-14 lg:pt-20 lg:pb-20">
        <SectionHeading
          title="Everything About"
          subtitle=">x< Features & Functionality"
        />
        <FormatsExplorer formats={features} />
      </Section>
      <Section rule className="gap-10 lg:gap-15">
        <SectionHeading title="Further reading" />
        <ResourceCards items={reading} panelRatio="5/4" />
      </Section>
    </>
  )
}

function Recorded() {
  return (
    <>
      <Section className="pt-10 pb-4 lg:pt-20 lg:pb-30">
        <CardTrio
          title="Start talking"
          subtitle="Essential tools to grow and engage your crowd"
          items={recordedTools}
        />
      </Section>
      <Section rule className="gap-12 pt-14 pb-4 lg:gap-14 lg:pt-20 lg:pb-20">
        <SectionHeading
          title="Everything About"
          subtitle=">x< Features & Functionality"
        />
        <FormatsExplorer formats={recordedFeatures} />
      </Section>
      <Section rule className="gap-10 lg:gap-15">
        <SectionHeading title="Further reading" />
        <ResourceCards items={recordedReading} panelRatio="5/4" />
      </Section>
    </>
  )
}

// business.x.com/en/products/x-spaces.
export default function XSpacesPage() {
  return (
    <BusinessFrame>
      <Hero
        title={
          <>
            <XLogo className="inline size-[0.85em] align-[-0.08em]" />
            {` Spaces`}
          </>
        }
        description={
          <XText>
            {
              "The conversation about you and your content is at its best here, and now you can Post and talk. Spaces unlocks conversations on >x< with the depth and power only the human voice can bring."
            }
          </XText>
        }
        actions={
          <Button
            shape="rounded"
            size="sm"
            variant="secondary"
            nativeButton={false}
            render={<a href="https://help.x.com/using-x/spaces" />}
          >
            Learn More
          </Button>
        }
        art={SpacesOrbit}
      />
      <SpacesTabs overview={<Overview />} recorded={<Recorded />} />
      <ClosingCta />
    </BusinessFrame>
  )
}
