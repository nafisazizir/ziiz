import type { Story } from "@/components/business-x/story-card"

// Scraped from business.x.com/en/success-stories and its nine detail pages on
// 2026-09-27. Posts embedded from x.com are reduced to the account, the
// copy and the media shape; photos and brand logos are placeholders.
export type StoryBlock =
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "h3"; text: string }

export type StoryPost = {
  name: string
  handle: string
  text: string
  media?: "image" | "video" | "none"
  action?: string
  time: string
  likes: string
  replies: string
}

export type StoryQuote = { text: string; name: string; role: string }

export type StoryDetail = Story & {
  deck: string
  stats: { value: string; label: string }[]
  blocks: StoryBlock[]
  posts: StoryPost[]
  quotes: StoryQuote[]
  product?: { title: string; paragraphs: string[]; href: string }
  follow: { handle: string; caption: string }
  source?: string
}

export const stories: StoryDetail[] = [
  {
    slug: "al-rajhi-bank-blue-week",
    brand: "Al Rajhi Bank",
    category: "Success Stories",
    date: "Feb 17, 2026",
    description:
      "Scheduled Notifications turned an X Takeover into sustained, week-long engagement.",
    deck: "Scheduled Notifications turned an X Takeover into sustained, week-long engagement.",
    stats: [
      { value: "33M", label: "Impressions" },
      { value: "1.36%", label: "Engagement Rate" },
      { value: "1,500", label: "Total Subscribers" },
    ],
    blocks: [
      { type: "h2", text: "About Al Rajhi Bank" },
      {
        type: "p",
        text: "As one of the most influential financial institutions in Saudi Arabia, Al Rajhi Bank sought to strengthen its presence during Blue Week 2025, one of the most competitive retail moments of the year. For the first time, a bank in Saudi Arabia leveraged Scheduled Notification tactic in a promotional setting, combining it with a high-impact X Takeover to ensure customers stayed informed and engaged throughout the week, transforming passive scrolling into active participation.",
      },
      { type: "h2", text: "Campaign Objective" },
      {
        type: "p",
        text: "The campaign aimed to keep customers informed across Blue Week; from the initial announcement to the final offer drop, ensuring users were the first to know about new deals. The primary goal was to drive consistent engagement and encourage users to return repeatedly to explore offers throughout the promotional period.",
      },
      { type: "h2", text: "The Solution" },
      {
        type: "p",
        text: "Al Rajhi Bank launched a Scheduled Notifications activation paired with a premium X Takeover to maximize visibility and engagement. Key elements included:",
      },
      {
        type: "ul",
        items: [
          "Mass Awareness: leveraged a Takeover, ensuring high visibility and broad reach across the platform during peak engagement moments.",
          "Opt-in: Users liked a post to subscribe, receiving notifications directly from the brand, in a more personalized way, creating a sense of exclusivity.",
          "Instant confirmation: Subscribers received an automated reply confirming their enrollment.",
          "Scheduled high-impact notifications: Three timely notifications were sent during Blue Week, prompting users to revisit offers and maintain momentum.",
        ],
      },
      { type: "h2", text: "The Results" },
      {
        type: "p",
        text: "The campaign delivered strong results, both in subscription engagement and mass visibility:",
      },
      {
        type: "ul",
        items: [
          "Total subscribers: 1,500",
          "280 bookmarks, indicating strong revisit intent",
          "200 reposts, organic amplification of Blue Week offers",
          "33M total campaign impressions",
        ],
      },
      {
        type: "p",
        text: "The results demonstrate that the Like-to-Subscribe mechanic kept audiences engaged and returning for multiple offer drops, while the Takeover ensured massive awareness across X.",
      },
      {
        type: "p",
        text: "Al Rajhi Bank’s Blue Week 2025 activation highlights the effectiveness of Scheduled Notifications combined with a high-visibility X Takeover. By delivering real-time updates and exclusive offers directly to users, the bank converted a crowded promotional period into a personalized, high-retention engagement experience, setting a benchmark for financial services marketing in Saudi Arabia.",
      },
    ],
    posts: [
      {
        name: "مصرف الراجحي",
        handle: "@alrajhibank",
        text: '@WidadSalem88 تذكير هام! عروض "الأسبوع الأزرق" تناسب وترضي الكل، اختر متجرك واستفد من بطاقتك مع خصوماتنا 💳 رد بـ #إيقاف لإلغاء الاشتراك',
        media: "image",
        time: "11:02 PM · Oct 28, 2025",
        likes: "3",
        replies: "Read 1 reply",
      },
      {
        name: "مصرف الراجحي",
        handle: "@alrajhibank",
        text: 'العروض الأقوى في السنة بدت! فضّل التغريدة 💙 وخلّك جاهز لتفاصيل عروض "الأسبوع الأزرق"',
        media: "video",
        time: "10:30 PM · Oct 23, 2025",
        likes: "1.4K",
        replies: "Read 235 replies",
      },
    ],
    quotes: [
      {
        text: "“This execution delivered a significant impact, driving strong visibility and maximizing reach across all audience segments. It played a major role in creating immediate awareness and momentum for the campaign.”",
        name: "Fahad A. Alamri",
        role: "Senior Specialist, Growth Marketing (About the Takeover Activation)",
      },
      {
        text: "“This was one of the smartest ideas we tested in this campaign. It achieved high engagement among users who are actively interested in offers, ensuring that every engaged user received customized notification about all available promotions. This feature helped us guarantee full delivery and visibility of the campaign’s offers to the most interested audience.”",
        name: "Fahad A. Alamri",
        role: "Senior Specialist, Growth Marketing (About the Scheduled notification:)",
      },
    ],
    follow: {
      handle: "@alrajhibank",
      caption: "Follow along for what's next.",
    },
  },
  {
    slug: "how-1x-drove-virality-for-neo-launch-with-takeovers",
    brand: "1X NEO",
    category: "Takeover",
    date: "Jan 23, 2026",
    description: "How 1X drove virality for NEO launch with Takeovers.",
    deck: "How 1X drove virality for NEO launch with Takeovers.",
    stats: [
      {
        value: "87M",
        label: "Launch Day Impressions (61M Paid + 21M Halo Organic)",
      },
      { value: "180K", label: "Clicks to Website from Spotlight Takeover" },
      { value: "65K", label: "Organic Posts about the Launch" },
    ],
    blocks: [
      {
        type: "p",
        text: "1X is an AI and robotics company on a mission to build a truly abundant society through general-purpose robots capable of performing any kind of work autonomously.",
      },
      { type: "h2", text: "Campaign objective" },
      {
        type: "p",
        text: "1X set out to launch their groundbreaking NEO home robot to a highly engaged audience on X, generating massive awareness, driving pre-orders and website traffic, and sparking widespread organic conversation around their reveal of the world's first consumer-ready humanoid robot designed to automate chores and provide personalized assistance.",
      },
      { type: "h2", text: "The solution" },
      {
        type: "p",
        text: "1X leveraged X's Spotlight Takeover format to dominate the platform on launch day, combining high-impact paid visibility with organic halo effects to reach millions of users instantly. This premium ad experience allowed 1X to showcase their innovative NEO robot through compelling video content, directly connecting with X's tech-savvy, forward-thinking community eager for cutting-edge AI and robotics advancements.",
      },
      {
        type: "p",
        text: "The campaign delivered explosive results: the Takeover alone generated ~66M paid impressions plus 21M organic halo impressions, 65K likes, 11K reposts, and 6.3K replies, demonstrating immediate and intense user interest.",
      },
      { type: "p", text: "Key performance highlights include:" },
      {
        type: "ul",
        items: [
          "A massive follower growth spike of 56K new followers overnight (an 80%+ increase in 24 hours), nearly doubling their total from ~67K pre-launch to 130K.",
          "The launch video amassed 6.2M views, equivalent to roughly 7% of all US monthly active users on X seeing the content.",
          "Over 180K clicks to their website, tying for the 3rd highest CTR performance among Spotlight Takeovers on X for the year (including Super Bowl Sunday).",
          "Exceptional engagement with 34.6K bookmarks, signaling strong user intent to save and revisit the NEO content.",
        ],
      },
      {
        type: "p",
        text: "Conversation volume surged dramatically, with 65K organic posts related to 1X and the NEO robot on October 28th, a 297% month-over-month increase, from 45K unique authors (up 275% M/M), reflecting broad participation from diverse new voices.",
      },
      {
        type: "p",
        text: "The momentum proved sustainable: November vs. October showed continued M/M growth of 730% in impressions, 290% in likes, 272% in reposts, and 473% in replies.",
      },
      {
        type: "p",
        text: "By harnessing X's powerful Takeover product and engaged ecosystem, 1X achieved unparalleled reach, virality, and lasting brand impact for the NEO launch, positioning their humanoid robot as a cultural and technological milestone.",
      },
    ],
    posts: [
      {
        name: "1X",
        handle: "@1x_tech",
        text: "NEO The Home Robot\nOrder Today",
        media: "video",
        time: "4:04 AM · Oct 29, 2025",
        likes: "67.9K",
        replies: "Read 6.5K replies",
      },
    ],
    quotes: [
      {
        text: "“X has always been the foundation of the 1X community and where robotics conversations happen. It's even how I first connected with my friend turned boss, @radbackwards. Launching NEO here was obvious. With strong creative, X delivers unmatched results and cultural impact. This campaign couldn't have gone any better.”",
        name: "Kendall Pennington",
        role: "Head of Comms, 1X",
      },
    ],
    product: {
      title: "Spotlight Takeovers",
      paragraphs: [
        "Spotlight Takeovers put your immersive video creative where the conversations starts, the Explore tab. The Explore tab is home to everything that’s trending on X (and in the world), all in one place. Don’t just be a part of what’s happening, be what’s happening with Spotlight Takeovers.",
        'This product gives you a high-impact 24-hour takeover of the Explore Tab and the "What\'s happening" module on X.com, where people go to view trends and top conversations in real time. Spotlight Takeovers are complemented by media-forward companion posts that appear in the Home Timeline, which together help maximize awareness and conversation around a certain topic, launch, or event.',
      ],
      href: "/business-x/products/spotlight-takeovers",
    },
    follow: {
      handle: "@1X_tech",
      caption: "See what the team is building next.",
    },
    source: "Source: X Ads Manager. Oct 28, 2025. United States.",
  },
  {
    slug: "salam-national-day-takeover",
    brand: "Salam Telecom - National Day",
    category: "Success Stories",
    date: "Jan 5, 2026",
    description:
      "Salam participating in the Saudi National Day conversation by showcasing their collaboration with a local famous singer and producing a Saudi National Day exclusive video.",
    deck: "Salam participating in the Saudi National Day conversation by showcasing their collaboration with a local famous singer and producing a Saudi National Day exclusive video.",
    stats: [
      { value: "37M", label: "Video Views" },
      { value: "+124K", label: "Post Engagement" },
      { value: "+124K", label: "Post Engagement" },
    ],
    blocks: [
      { type: "h2", text: "About Salam" },
      {
        type: "p",
        text: "Salam is a Saudi-based telecommunications and digital services company enabling large-scale digital transformation across the Kingdom. It has evolved into a fully integrated digital solutions provider serving the government, enterprise, and business sectors with future-ready technologies. Salam has expanded beyond core connectivity to deliver a broad portfolio that includes advanced network solutions, cloud and data centre services, cybersecurity, Internet of Things (IoT), and emerging technologies such as AI, all designed to support mission-critical operations and accelerate digital maturity.",
      },
      {
        type: "p",
        text: "Guided by a “human-inspired, business-focused” approach, Salam partners closely with public and private sector organizations to build secure, scalable, and intelligent digital ecosystems. Through continuous innovation and strategic partnerships, Salam plays a vital role in advancing Saudi Arabia’s Vision 2030 and shaping a more connected, digitally empowered future.",
      },
      { type: "h2", text: "Campaign Objective" },
      {
        type: "p",
        text: "The campaign's core mission was unmistakable: amplify brand resonance and fuel national pride through immersive storytelling. In a bold and culturally attuned move, Salam tapped into the star power of singer Ayed for their National Day hero video a stirring anthem crafted to honor the Saudi spirit. Their strategy transcended simple content distribution; it was engineered to drive massive Awareness and maximize Video Views across the Kingdom.",
      },
      {
        type: "p",
        text: "With a high-impact National Day Takeover, complemented by 2 Immersive Takeovers and an auction campaign that launched early on September 20th and remained active through the 29th, Salam didn’t just occupy the timeline they owned the moment. This multi-layered approach reflects Salam’s commitment to capturing attention at scale, sparking emotional connection, and solidifying their place in the hearts of Saudi audiences.",
      },
      {
        type: "p",
        text: "Salam also executed the tieline takeover on the day of Saudi National Day, owning the full premium space on X.",
      },
      { type: "h2", text: "The Solution" },
      {
        type: "p",
        text: "To meet Salam’s goals, the strategy blended cultural relevance with maximum visibility.",
      },
      {
        type: "p",
        text: "The National Day Takeover delivered peak reach on the most meaningful day of the year, while Immersive Takeovers the day before and after extended impact across the celebration window. Paired with an early-start auction campaign from September 20th to 29th, Salam ensured continuous visibility making Ayed’s hero video not only seen but felt.",
      },
      {
        type: "p",
        text: "X and Salam worked hand-in-hand from the start beginning strategic planning a month and a half ahead of the National Day Takeover. Through multiple collaborative meetings and ongoing communication, both teams aligned on the ideal mix of premium formats and timing. This close partnership ensured that every decision from the hero video launch to the sequencing of Takeovers and auction delivery was optimized to achieve Salam’s ambitious awareness and engagement",
      },
      { type: "h2", text: "About Salam" },
      {
        type: "p",
        text: "Salam is widely recognised in Saudi Arabia as a leading provider of fixed-broadband and digital infrastructure, with top-ranked network performance in multiple cities.",
      },
      {
        type: "p",
        text: "Their vision is be Saudi Arabia’s most trusted digital partner- bold, human-first, and built to empower.",
      },
      { type: "h2", text: "The Results" },
      {
        type: "p",
        text: "The campaign delivered more than just planned awareness; it sparked unexpected organic engagement and cultural relevance. Beyond video views, the hero content with Ayed triggered strong emotional connections, leading to increased brand affinity and organic shares. Additionally, the early auction launch drove sustained momentum, outperforming expectations by extending reach even before and after the peak National Day moment. The team not only met, but even exceed initial KPI’s during this period, during a key moment to connect with their local audience.",
      },
    ],
    posts: [
      {
        name: "Salam | سلام",
        handle: "@salam",
        text: "في اليوم الوطني السعودي 95 نوقف وقفة فخر للأرض اللي خذنا منها طبعنا وأكرمتنا بعزها بكل نغمة وكل لحن نغني لها بصوت سلام قصة حبنا الأكبر 🇸🇦 @ay12dy",
        media: "video",
        time: "2:00 AM · Sep 21, 2025",
        likes: "1.8K",
        replies: "Read 189 replies",
      },
    ],
    quotes: [
      {
        text: "“X proved to be a key partner for Salam during National Day. The platform’s premium solutions enabled us to deliver a highly visible and immersive brand experience at scale. The collaboration reinforced the value of strategic partnerships that combine cultural relevance with media innovation to drive meaningful outcomes”",
        name: "Ahmed Zaki",
        role: "Vice President, Brand and Communications",
      },
    ],
    follow: { handle: "@salam", caption: "Follow along for what's next." },
  },
  {
    slug: "nikke-anniversary-campaign",
    brand: "Tencent: NIKKE",
    category: "Success Stories",
    date: "Jan 5, 2026",
    description:
      "Tencent’s Goddess of Victory: NIKKE is a mobile sci-fi RPG shooter combining immersive storytelling, real-time combat, and collectible characters designed for long-term player engagement.",
    deck: "Tencent’s Goddess of Victory: NIKKE is a mobile sci-fi RPG shooter combining immersive storytelling, real-time combat, and collectible characters designed for long-term player engagement.",
    stats: [
      { value: "#1", label: "Japan Trend in 30 min" },
      { value: "1.3M", label: "Livestream Views" },
      { value: "+43%", label: "Follower Growth" },
    ],
    blocks: [
      { type: "h2", text: "About NIKKE" },
      {
        type: "p",
        text: "Tencent’s Goddess of Victory: NIKKE is a mobile sci-fi RPG shooter combining immersive storytelling, real-time combat, and collectible characters designed for long-term player engagement.",
      },
      {
        type: "p",
        text: "Positioned as a leading global anime-style RPG IP, NIKKE aims to deliver emotional, character-driven experiences that blend cinematic narrative depth with innovative gameplay and world-class art.",
      },
      { type: "h2", text: "Campaign Objective" },
      {
        type: "p",
        text: "The campaign aimed to amplify NIKKE’s 2.5-year anniversary celebration by turning it into a high-impact social moment on X. It focused on driving massive livestream engagement, sparking organic trending discussions, and deepening emotional connection with both existing and new players through immersive, shareable experiences.",
      },
      {
        type: "p",
        text: "The goal was for the anniversary to reach record-high visibility and engagement. They sought to organically trend on X through real-time conversations, boost livestream participation, attract returning and new users, and extend the momentum beyond the event day to sustain ongoing community excitement.",
      },
      { type: "h2", text: "The Solution" },
      {
        type: "p",
        text: "The campaign leveraged X’s Live Event Page, custom emojis, and reminder features to create a viral communication flow tailored to NIKKE’s anniversary goals. The integrated approach, combining teaser posts, pinned videos, and real-time engagement, matched the client’s need for emotional storytelling and high-frequency social amplification among anime gaming audiences.",
      },
      {
        type: "p",
        text: "X and Tencent’s NIKKE team co-developed a multi-phase strategy from pre-launch to replay. X provided creative and technical support, ensuring Live Event setup, KOL integration, and hashtag optimization worked seamlessly. The joint effort maximized interaction through live comments, giveaways, and UGC extensions, sustaining buzz well beyond the livestream.",
      },
      {
        type: "p",
        text: "The campaign focused on Japan’s anime and bishoujo gaming community, especially Gen Z players who value immersive visuals, emotional storytelling, and interactive fandom culture.",
      },
      { type: "h2", text: "The Results" },
      {
        type: "p",
        text: "The livestream reached #1 on Japan’s trending chart within 30 minutes and topped the global chart in 90 minutes, drawing 1.3M views, 2× YouTube’s benchmark. Topic volume surged +300%, driving exceptional exposure and engagement.",
      },
      {
        type: "p",
        text: "Results far exceeded expectations. The campaign not only met goals for trending and reach but also achieved stronger-than-planned visibility and fan participation, validating X’s effectiveness in amplifying live moments.",
      },
      {
        type: "p",
        text: "Momentum extended long after the event. Over three months, @NIKKE_Japan followers rose from 635K to 910K (+43%), reflecting lasting community growth and a significant boost in brand affinity.",
      },
    ],
    posts: [
      {
        name: "【公式】勝利の女神：NIKKE",
        handle: "@NIKKE_japan",
        text: "【生放送投稿キャンペーン】 #NIKKEAnniversary #NIKKE マリアンフィギュアやiPadなど、豪華賞品が当たるキャンペーンを開催🥳 @NIKKE_japan をフォローし、#祝NIKKE2周年半生放送 を付けて生放送の感想を投稿してください！",
        media: "image",
        time: "8:32 PM · Apr 19, 2025",
        likes: "6.3K",
        replies: "Read 2.0K replies",
      },
      {
        name: "【公式】勝利の女神：NIKKE",
        handle: "@NIKKE_japan",
        text: "【生放送告知】 #NIKKEAnniversary #NIKKE NIKKE2.5周年記念生放送「想いをつなぐ、深海の舞台へ」 Xでの配信ページが公開されました✨ 指揮官の皆さま、ぜひ通知をオンにして、放送当日に備えてください📺",
        media: "image",
        time: "7:28 PM · Apr 16, 2025",
        likes: "1.2K",
        replies: "Read more on X",
      },
    ],
    quotes: [
      {
        text: "“X is our key platform for building player resonance and creating brand-defining moments. Its powerful interaction features and highly active gaming community helped us quickly trend, drive organic amplification, and significantly boost both brand impact and fan engagement.”",
        name: "Peggy Xiao",
        role: "Senior Marketing Manager, Tencent",
      },
    ],
    follow: {
      handle: "@NIKKE_japan",
      caption: "Follow along for what's next.",
    },
  },
  {
    slug: "wakeone-zerobaseone-album-release",
    brand: "WakeOne",
    category: "Success Stories",
    date: "Jan 5, 2026",
    description:
      "WakeOne focused on activating X’s real time features to build anticipation, trigger fan participation, and amplify key release moments organically for Zerobaseone’s album launch.",
    deck: "WakeOne focused on activating X’s real time features to build anticipation, trigger fan participation, and amplify key release moments organically for Zerobaseone’s album launch.",
    stats: [
      { value: "14M", label: "Impressions" },
      { value: "+90%", label: "Mention growth" },
      { value: "66K", label: "Reposts within 24hr" },
    ],
    blocks: [
      { type: "h2", text: "About WakeOne" },
      {
        type: "p",
        text: "WakeOne is a Korea based entertainment agency specializing in artist management, music production, content creation, and global promotion. It supports artists across talent development, multimedia content distribution, and international fan engagement.",
      },
      {
        type: "p",
        text: "WakeOne positions itself as a next generation entertainment agency focused on building globally competitive K pop acts. Through Zerobaseone, a fast rising fifth generation boy group, WakeOne demonstrates its mission to scale artists with strong international fandom, leveraging survival show momentum, high album sales, and social media driven fan communities.",
      },
      { type: "h2", text: "Campaign Objective" },
      {
        type: "p",
        text: "The primary objective was to maximize viral exposure on X ahead of Zerobaseone’s album launch, using the teasing and launch phases to drive large scale conversation and global fan engagement. WakeOne focused on activating X’s real time features to build anticipation, trigger fan participation, and amplify key release moments organically.",
      },
      {
        type: "p",
        text: "A core expectation was to increase Spotify streams in the two weeks following release compared to the previous comeback. The campaign also aimed to expand reach beyond existing fans, strengthen Zerobaseone’s position as a fast rising fifth generation boy group, and reinforce X as a primary platform for international fandom discussion during major launches.",
      },
      { type: "h2", text: "The Solution" },
      {
        type: "p",
        text: "To meet WakeOne’s need for rapid scale and high visibility, the campaign focused on products built for viral impact. Branded Notifications, Hashfetti, and Hashmoji were selected to trigger fan participation and amplify organic sharing, while multiple takeover formats were deployed across key dates to sustain conversation momentum around the launch.",
      },
      {
        type: "p",
        text: "X partnered closely with WakeOne through early idea sharing sessions held months before launch. Together, we aligned on timing, creative direction, and product use, enabling the client to produce exclusive content optimized for X’s interactive formats and real time fan behavior.",
      },
      {
        type: "p",
        text: "The campaign targeted K pop interested users, particularly Zerobaseone fans active in related conversations. The core audience was primarily female, aged 18 to 34, with strong engagement around music and emotionally driven topics.",
      },
      { type: "h2", text: "The Results" },
      {
        type: "p",
        text: "The campaign delivered strong and sustained engagement, with conversation and search volumes closely aligned with key media activations. Overall conversation volume more than doubled compared to the previous period. At peak, ZEROBASEONE generated 14K+ mentions, 16K+ Hashmoji related mentions, more than 1K posts, and 66K reposts, representing a 107% increase versus the prior weekly average.",
      },
      {
        type: "p",
        text: "These results exceeded the initial objective of maximizing viral exposure and conversation volume ahead of launch, while sustaining momentum beyond a single peak moment.",
      },
      {
        type: "p",
        text: "A key upside was strong paid and organic synergy. Hashmoji and Hashfetti drove fan led organic sharing, resulting in organic mentions remaining over 90 percent higher one month post campaign, delivering long term fandom engagement.",
      },
    ],
    posts: [
      {
        name: "ZEROBASEONE",
        handle: "@ZB1_official",
        text: "[속보] 2025년 ICON ZEROBASEONE 9월 1일 6PM 정규 1집 컴백 우주를 술렁이게 할 Planetwide ICON ZEROBASEONE의 컴백 소식이 궁금하다면! 지금 바로 아래 ♥를 Click 해주세요!",
        media: "video",
        time: "1:00 PM · Aug 18, 2025",
        likes: "23.4K",
        replies: "Read 126 replies",
      },
      {
        name: "ZEROBASEONE",
        handle: "@ZB1_official",
        text: "ZEROBASEONE The 5th Mini Album STREAM Title Track ‘BLUE’ NOW 🎧 #ZEROBASEONE #ZB1 #제로베이스원 #BLUE_PARADISE #BLUE #ZEROBASEONE_BLUE #제로베이스원_BLUE",
        media: "video",
        time: "8:18 PM · Feb 26, 2025",
        likes: "780",
        replies: "Read more on X",
      },
      {
        name: "ZEROBASEONE",
        handle: "@ZB1_official",
        text: "2025년 Planetwide ICON ZEROBASEONE ‘ICONIK’ 컴백! ‘ICONIK’ 듣고 우주 최강 자신감 풀충전 하고 싶다면?! Listen to 'ICONIK' on Spotify 👇",
        media: "image",
        action: "Listen to 'ICONIK' on Spotify",
        time: "5:34 PM · Aug 28, 2025",
        likes: "1.6K",
        replies: "Read 1 reply",
      },
    ],
    quotes: [
      {
        text: "“Overall, we believe the biggest achievement of this X campaign was maximizing exposure for ZB1’s comeback content and successfully driving organic user actions. Internally, we also had an ambitious target for Spotify streaming numbers, and we were able to exceed that goal. From the early planning stages, we worked closely with the X team to combine various solutions throughout the entire campaign period, which allowed us to continuously boost the content on X. Thank you very much for all your support!”",
        name: "Ah-seon Choi",
        role: "Marketing manager, CJ ENM",
      },
    ],
    follow: {
      handle: "@ZB1_official",
      caption: "Follow along for what's next.",
    },
  },
  {
    slug: "gigabyte-winning-the-tech-audience",
    brand: "GIGABYTE AORUS",
    category: "Engagements",
    date: "Oct 14, 2025",
    description:
      "How GIGABYTE AORUS won the tech audience with a record-breaking live stream on X.",
    deck: "How GIGABYTE AORUS drove reach, brand mentions, and record live-stream viewership on X across its target markets.",
    stats: [
      { value: "+82%", label: "Reach Uplift" },
      { value: "+73%", label: "Brand Mentions" },
      { value: "49M", label: "Impressions" },
    ],
    blocks: [
      { type: "h2", text: "About GIGABYTE AORUS" },
      {
        type: "p",
        text: "AORUS is positioned as a leading global gaming and tech brand known for performance, reliability, and innovation. Its mission is to push the boundaries of hardware design and empower users with next-generation gaming experiences. Its vision is to remain at the forefront of the global tech landscape by combining technological excellence with a strong connection to gaming and AI communities.",
      },
      { type: "h2", text: "Campaign Objective" },
      {
        type: "p",
        text: "Amplify GIGABYTE AORUS’s global “Leading Edge” launch by driving visibility and engagement on X. The campaign leveraged X’s real-time, interest-based communities, especially around AI and emerging technology, to connect with tech-savvy audiences while also aligning with COMPUTEX 2025.",
      },
      {
        type: "p",
        text: "The goal was to deliver broad awareness and strong engagement with tech-savvy audiences, align with key industry moments, and reinforce the brand’s position as a leader in AI and gaming. The campaign focused on tech-savvy audiences and AI enthusiasts, especially tech early adopters with high interest in gaming, emerging technology, and hardware innovation. These communities were already active on X, making it the natural environment to engage them in real time.",
      },
      { type: "h2", text: "The Solution" },
      { type: "h3", text: "Phase 1 (Preheat)" },
      {
        type: "p",
        text: "Traffic ads and Takeovers built early awareness and event anticipation.",
      },
      { type: "h3", text: "Phase 2 (Launch)" },
      {
        type: "p",
        text: "Full-day Takeovers, traffic ads, and Keyword Search Ads drove peak visibility and live event engagement, with the launch streamed directly on X.",
      },
      { type: "h3", text: "Phase 3 (Sustain)" },
      {
        type: "p",
        text: "Promoted posts and Carousel Ads reinforced product visibility and extended momentum beyond COMPUTEX week.",
      },
      {
        type: "p",
        text: "X worked closely with the client to optimize media formats: including traffic ads, Takeovers, Keyword Search Ads, and, for the first time, the client’s full event live stream hosted on the platform. Continuous coordination ensured the campaign achieved maximum share of voice, while also extending impact and reinforcing product awareness beyond the event window.",
      },
      { type: "h2", text: "The Results" },
      {
        type: "p",
        text: "Success was measured through X Ads Manager and internal metrics. The campaign ran during COMPUTEX 2025, with an all-day Spotlight and Timeline Takeover on launch day that secured 100% Share of Voice and boosted visibility, engagement, and social buzz beyond the event window.",
      },
      {
        type: "p",
        text: "The campaign generated an 82% uplift in reach across target markets and 49 million impressions, driving awareness at scale. Brand mentions rose by 73%, reflecting strong cultural traction, while the live stream on X hit record concurrent viewership. Internal data also showed higher product interest and positive sentiment, reinforcing audience connection beyond paid exposure.",
      },
      {
        type: "p",
        text: "Building on strong engagement and reach, the campaign not only reinforced the brand’s AI image but outperformed expectations in AI buzz and organic discussion, as diverse formats and key placements moved audiences from viewing to talking and sharing, fueling cross-segment expansion.",
      },
      {
        type: "p",
        text: "The campaign benefited from AI conversations gaining traction on X, creating a high-interest environment that amplified AI-related product messaging. By leveraging a diverse suite of premium ad placements, GIGABYTE AORUS achieved maximum visibility.",
      },
    ],
    posts: [],
    quotes: [
      {
        text: "“X helped us capture market attention at the most critical moment. In a crowded tech market, its dynamic communities and real-time conversations made it the ideal place for GIGABYTE AORUS to spotlight innovation.”",
        name: "Enya Chang",
        role: "Global Marketing Manager, GIGABYTE",
      },
    ],
    follow: { handle: "", caption: "" },
  },
  {
    slug: "banco-guayaquil-promoparati",
    brand: "Banco Guayaquil",
    category: "Website conversions",
    date: "Sep 17, 2025",
    description:
      "Banco Guayaquil invited the public to its Christmas giveaway, featuring prizes up to a grand prize car.",
    deck: "Banco Guayaquil invited the public to its Christmas giveaway, featuring prizes up to a grand prize car.",
    stats: [
      { value: "7 MM", label: "Impressions" },
      { value: "160.000", label: "Engagement with the users" },
      { value: "0,15 USD", label: "CPE" },
    ],
    blocks: [
      { type: "h2", text: "Campaign objective" },
      {
        type: "p",
        text: "In December, Banco Guayaquil launched a campaign to express gratitude to everyone contributing to its growth and success, proudly celebrating its recognition as “Bank of the Year.” The campaign invited both users and non-users to join in the celebration and participate in the #PromoParaTi initiative. Capitalizing on the festive Christmas season, the bank engaged the public with opportunities to win various gifts, driving significant interaction and creating a buzz on the platform. The primary goal was to maximize participation in the gift raffle, foster engagement, and convey heartfelt thanks for the support received throughout 2024. The campaign was designed to make every participant feel personally appreciated, emphasizing a collective “Thank You” through #PromoParaTi.",
      },
      { type: "h2", text: "The solution" },
      {
        type: "p",
        text: "Banco Guayaquil leveraged X's Takeover formats to maximize exposure for the #PromoParaTi campaign. Scheduled Notifications engaged the audience, encouraging registration and participation in various giveaways. Unlock Posts sparked widespread conversation about the campaign's promotions. The Hashmoji amplified engagement by harnessing the power of the hashtag. Combined with compelling images and videos, these efforts drove remarkable results throughout the campaign.",
      },
      { type: "h3", text: "Optimize ad performance" },
      {
        type: "p",
        text: "Leveraging Wise.blue’s advanced analytics to make data-driven adjustments for better results.",
      },
      { type: "h2", text: "The Results?" },
      {
        type: "p",
        text: "Banco Guayaquil's Christmas campaign achieved remarkable success. The Scheduled Notification launched the campaign, capturing users' attention and encouraging participation in the gift raffle. The Unlock Conversation format fostered an emotional connection by inviting users to share their Christmas wishes tied to a gift, marking a unique, first-of-its-kind engagement on the platform. Takeover formats, amplified by compelling videos, powerfully conveyed the campaign’s message of gratitude. Overall, the initiative effectively raised awareness of the bank’s 2024 achievements, including its recognition as “Bank of the Year,” while strengthening its bond with the audience by expressing heartfelt thanks to those who believe in the brand.",
      },
    ],
    posts: [
      {
        name: "Banco Guayaquil",
        handle: "@BancoGuayaquil",
        text: "Hoy más que nunca queremos decirles: PRIMERO GRACIAS. A nuestros clientes, banqueros del barrio, proveedores, colaboradores y los millones de ecuatorianos que nos inspiran para ser un mejor banco cada día. Gracias a ellos podemos decir que el banco del año es el banco para ti.",
        media: "video",
        time: "10:03 AM · Dec 3, 2024",
        likes: "74",
        replies: "Read 12 replies",
      },
      {
        name: "Banco Guayaquil",
        handle: "@BancoGuayaquil",
        text: "¿Qué regalo quieres esta Navidad? 🎄 #PromoParaTi",
        media: "image",
        time: "5:51 AM · Dec 18, 2024",
        likes: "279",
        replies: "Read more on X",
      },
      {
        name: "Banco Guayaquil",
        handle: "@BancoGuayaquil",
        text: "Dale Like ❤️ si quieres uno de estos premios con la #PromoParaTi 👇😱 Mazda CX 3, Mabe Side by Side, LG UHD 65¨+ Barra de sonido Sony, Whirpool Automática, iPhone 15, iPad 10ma Generación, Apple Watch Serie 9 (41mm), PS5",
        media: "image",
        time: "Dec 2024",
        likes: "1.1K",
        replies: "Read more on X",
      },
    ],
    quotes: [],
    follow: {
      handle: "@BancoGuayaquil",
      caption: "Follow along for what's next.",
    },
  },
  {
    slug: "an-ngo-meets-performance-through-purpose-on-x",
    brand: "An NGO Meets Performance Through Purpose on X",
    category: "Website conversions",
    date: "Sep 9, 2025",
    description: "How unoentrecienmil.org drove impact with X Ads",
    deck: "How unoentrecienmil.org drove impact with X Ads",
    stats: [
      { value: "123%", label: "above target for Qualified Leads" },
      { value: "€1.76", label: "Cost per Lead" },
      { value: "100%", label: "overachievement in Lead volume" },
    ],
    blocks: [
      { type: "h2", text: "Background" },
      {
        type: "p",
        text: "Fundación @unoentrecienmil is a Spanish NGO dedicated to curing childhood leukemia, a disease that affects 350 children each year in Spain. Founded in 2012, the foundation has built a strong reputation for transparency, impact, and innovation, funding cutting-edge research such as immunotherapy and launching programs like the “Accelerator,” which studies the role of exercise in recovery. Through initiatives like the campaign “Investigaciones Curación” the foundation mobilizes entire communities to support pediatric cancer research and bring hope to children and families.",
      },
      { type: "h2", text: "Campaign Objective" },
      {
        type: "p",
        text: "With the “Investigaciones Curación,” @unoentrecienmil set out to generate new signatories for its mission to eradicate childhood leukemia.",
      },
      { type: "p", text: "Success was defined by two KPIs goals:" },
      {
        type: "ul",
        items: [
          "Acquire more than 250 Leads",
          "Keep the cost per lead (CPL) under €2",
        ],
      },
      {
        type: "p",
        text: "The foundation expected to quickly reach new audiences interested in supporting the cause, while maintaining efficiency.",
      },
      { type: "h2", text: "The Solution" },
      {
        type: "p",
        text: "@unoentrecienmil leveraged X Ads, optimizing towards Lead Generation. The strategy combined precise targeting with compelling creative:",
      },
      {
        type: "ul",
        items: [
          "Targeting: Users in Spain on iOS and Android devices, aged 21+, across 27 handles and 49 carefully chosen keywords. Existing signatories were excluded to ensure a fresh pool of prospects.",
          "Creative: Summer-themed video and image ads designed to stand out in the timeline and resonate with audiences in Spain.",
          "Optimization: Real-time adjustments, including the budget increase, helped maximize momentum and results, while operational flexibility ensured seamless delivery.",
        ],
      },
      {
        type: "p",
        text: "Throughout the campaign, X and @unoentrecienmil collaborated closely, using Ads Manager and internal data as the source of truth to track performance and maintain transparency.",
      },
      { type: "h2", text: "The Results" },
      {
        type: "p",
        text: "Confident in early results, Unoentrecienmil raised their daily budget by 82% mid-flight, an agile move that reflected both the urgency of the mission and the opportunity to scale impact. In just two weeks, the campaign exceeded all expectations:",
      },
      {
        type: "ul",
        items: [
          "559 qualified leads, 123% above target.",
          "€1.76 cost per lead, 12% below benchmark.",
          "100% overachievement in lead volume, with leads acquired faster and more efficiently than on other platforms.",
        ],
      },
      {
        type: "p",
        text: "For Unoentrecienmil, the campaign demonstrated not only efficiency but also the ability to activate a sensitive cause safely and effectively on X. The performance offered a blueprint for future activations and gave the foundation confidence to scale its digital efforts further.",
      },
    ],
    posts: [
      {
        name: "unoentrecienmil",
        handle: "@unoentrecienmil",
        text: "De cada 5 niños con leucemia, 1 no volverá a soplar las velas. ¿Nos ayudas a cambiar el dato? Firma aquí ✍️",
        media: "image",
        action: "Firma Aquí",
        time: "8:53 PM · Jul 9, 2025",
        likes: "2.5K",
        replies: "Read 66 replies",
      },
      {
        name: "unoentrecienmil",
        handle: "@unoentrecienmil",
        text: "De cada 5 niños con leucemia, 1 no volverá a jugar al baloncesto. ¿Nos ayudas a cambiar el dato? Firma ahora ✍️",
        media: "image",
        action: "Firma Aquí",
        time: "6:31 PM · Jul 16, 2025",
        likes: "130",
        replies: "Read 4 replies",
      },
      {
        name: "unoentrecienmil",
        handle: "@unoentrecienmil",
        text: "De cada 5 niños con leucemia, 1 no volverá al colegio. ¿Nos ayudas a cambiar el dato? Firma aquí ✍️",
        media: "image",
        action: "Firma Aquí",
        time: "6:31 PM · Jul 16, 2025",
        likes: "159",
        replies: "Read 9 replies",
      },
    ],
    quotes: [
      {
        text: "“We are very happy with the performance of this campaign. Even though it was designed to be short and conclude in July, the results exceeded expectations. The speed and quality of the leads we obtained gave us confidence to restructure and scale for September. The guidance and collaboration with X made a real difference, ensuring our investment delivered the best possible impact for our mission.”",
        name: "Paola de la Fuente",
        role: "Account Manager, Fundación @unoentrecienmil",
      },
    ],
    follow: {
      handle: "@unoentrecienmil",
      caption: "Follow along for what's next.",
    },
    source:
      "Source: X Data via X Ads Manager, 1st Party Data from unoentrecienmil, Campaign flight: Jul 16, 2025 to Jul 31, 2025",
  },
  {
    slug: "budweiser-lolla-brand-campaign",
    brand: "Budweiser (ABI)",
    category: "Website conversions",
    date: "Sep 8, 2025",
    description:
      "How Budweiser embedded itself into Lollapalooza Chile to build brand love and cultural relevance.",
    deck: "Budweiser is a global beer icon with a strong presence in Chile, known for turning music, sports, and cultural moments into experiences that bring people together.",
    stats: [],
    blocks: [
      {
        type: "p",
        text: "Budweiser is a global beer icon with a strong presence in the Chilean market, recognized for its connection to music, sports, and cultural moments. In Chile, the brand positions itself as a catalyst for unforgettable experiences, aiming to unite people through events that celebrate music, friendship, and good times. Its mission is to be more than just a beer, it’s about creating moments that matter and fostering authentic connections with consumers.",
      },
      { type: "h2", text: "Campaign objective" },
      {
        type: "p",
        text: "Budweiser was looking to drive cultural relevance and maximize visibility during the Lollapalooza Early Bird sales moment, connecting with young adult audiences and boosting brand love.",
      },
      {
        type: "p",
        text: "The goal was not just to boost visibility but to drive meaningful engagement with fans, positioning Budweiser as the beer of choice for music lovers. They wanted the campaign to generate strong share of voice during high-conversation moments, create social buzz through interactive mechanics like contests, and achieve competitive CPMs compared to market benchmarks. Beyond short-term metrics, the client aimed to build cultural relevance and brand love by embedding Budweiser into the festival experience from day one. The campaign needed to deliver both immediate awareness and set the foundation for sustained presence leading up to the event.",
      },
      { type: "h2", text: "The solution" },
      {
        type: "p",
        text: "The approach was designed to ensure Budweiser owned the conversation during one of the most culturally relevant moments for their audience: Lollapalooza Early Bird ticket sales. Premium Takeover formats were chosen to guarantee maximum reach and visibility at the exact time users were talking about the event. Engagement-focused formats were also used to amplify the contest mechanic and drive organic participation. Targeting was refined to reach festival-goers, music lovers, and young adult audiences with high cultural affinity, ensuring every impression resonated with potential festival attendees and positioned Budweiser at the heart of the conversation.",
      },
      {
        type: "p",
        text: "The Aleph team in Chile worked hand-in-hand with Budweiser and their media agency to align on timing, creative strategy, and audience targeting. Leveraging keyword-based audiences, we ensured the brand connected with users actively engaging in Lollapalooza-related conversations. We also provided tailored best practices for Takeover execution and monitored performance in real time, optimizing to maximize engagement and CPM efficiency. This close collaboration positioned Budweiser at the heart of the cultural conversation during one of the year’s most relevant moments.",
      },
      {
        type: "p",
        text: "The campaign targeted music and festival enthusiasts in Chile, particularly those engaging with Lollapalooza-related conversations on X. We used keyword-based audience targeting to reach users interacting with terms connected to the festival, live music, and cultural events, ensuring high relevance. The audience also included 21+ users aligned with Budweiser’s brand positioning and lifestyle affinity.",
      },
      { type: "h3", text: "Optimize ad performance" },
      {
        type: "p",
        text: "Leveraging Wise.blue’s advanced analytics to make data-driven adjustments for better results.",
      },
      { type: "h2", text: "The Results?" },
      {
        type: "p",
        text: "Budweiser became one of the most visible and talked-about brands during the Lollapalooza Early Bird ticket sales period. Strategic use of Takeovers and keyword-based audiences positioned the brand front and center, ensuring festival fans saw Budweiser’s message at the peak of their excitement.",
      },
      { type: "h3", text: "✔ Engagement and Brand Visibility" },
      {
        type: "p",
        text: "The campaign not only met but surpassed expectations by dominating the conversation during a key cultural moment. Engagement and brand visibility exceeded past activations, reinforcing Budweiser’s reputation as a brand that shows up when it matters most.",
      },
      { type: "h3", text: "✔ Organic Conversation" },
      {
        type: "p",
        text: "Beyond paid performance, the activation sparked an organic wave of user-generated posts, with fans sharing their queue screenshots and tagging the brand. This organic engagement amplified reach, strengthened emotional connections, and extended the campaign’s cultural relevance beyond the planned media run.",
      },
    ],
    posts: [
      {
        name: "Budweiser Chile",
        handle: "@BudweiserCl",
        text: "¿No alcanzaste el Early Bird? ¡Budweiser te lleva a Lolla! 🤝 Si tu número de fila fue uno de los más altos, ¡esta es tu oportunidad! Comenta con un pantallazo tu número de fila y participa por una entrada doble.",
        media: "image",
        time: "12:40 AM · Aug 13, 2025",
        likes: "159",
        replies: "Read 149 replies",
      },
      {
        name: "Budweiser Chile",
        handle: "@BudweiserCl",
        text: "El ambiente de Lollapalooza Chile 2026 ya está en el aire. ¡Prepárate para vibrar con tus artistas favoritos y asegurar tu entrada! Budweiser te invita a ser parte de esta fiesta. ¡El Early Bird está por llegar! Sé de los primeros en vivir la experiencia.",
        media: "image",
        time: "12:00 AM · Aug 13, 2025",
        likes: "12",
        replies: "Read 4 replies",
      },
      {
        name: "Budweiser Chile",
        handle: "@BudweiserCl",
        text: "¿Listo para Lolla 2026? La venta de entradas ya comenzó",
        media: "image",
        action: "¿Listo para Lolla 2026?",
        time: "12:00 AM · Aug 13, 2025",
        likes: "13",
        replies: "Read 2 replies",
      },
    ],
    quotes: [
      {
        text: "“Budweiser fully immersed itself in the cultural relevance of Lollapalooza Early Bird with a media strategy built to own the conversation. We spotted a unique opportunity: the long virtual queues and the near-impossible odds of securing early bird tickets. Our idea was simple yet powerful: launch the challenge ‘Send us your screenshot with your queue number and win double tickets to Lolla.’ X (Twitter) became our main stage, with premium takeovers ensuring no one opened the app without seeing our message. As #LollaCL hit trending topic #8 in Chile, Budweiser captured 15% of the entire conversation, driving 260 interactions and 134 participants within just 20 minutes. The activation delivered over 3.2M cross-platform impressions and a brand presence from second zero, connecting with our core audience in a culturally relevant moment that won’t happen twice.”",
        name: "Fernanda Ferrada",
        role: "Connections Marketing Coordinator, AB InBev Chile",
      },
    ],
    follow: {
      handle: "@BudweiserCl",
      caption: "Follow along for what's next.",
    },
  },
]

export function getStory(slug: string) {
  return stories.find((story) => story.slug === slug)
}
