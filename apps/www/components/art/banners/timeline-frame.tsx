import type { ArtProps } from "../props"

// Ported from business.x.com — products/timeline-takeovers.
export function TimelineFrame({
  variant = "wide",
  ...props
}: ArtProps & { variant?: "wide" | "narrow" }) {
  if (variant === "wide")
    return (
      <svg
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        shapeRendering="geometricPrecision"
        viewBox="0 0 1118 462"
        aria-hidden="true"
        {...props}
      >
        <g data-group="axis">
          <line
            data-part="axis-west"
            stroke="currentColor"
            strokeDasharray="5 5"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            x1="-40"
            y1="231"
            y2="231"
            x2="488.582"
          />
          <line
            data-part="axis-east"
            stroke="currentColor"
            strokeDasharray="5 5"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            x2="1158"
            y1="231"
            y2="231"
            x1="629.418"
          />
        </g>
        <g data-group="rings">
          <g
            data-part="inner"
            style={{
              transformBox: "view-box",
              transform: "rotate(-90deg)",
              transformOrigin: "559px 231px 0px",
            }}
          >
            <rect
              height="310.977"
              stroke="currentColor"
              strokeDasharray="5 5"
              width="310.977"
              x="403.512"
              y="75.512"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          </g>
          <g
            data-part="mid"
            style={{
              transformBox: "view-box",
              transformOrigin: "559px 231px 0px",
            }}
          >
            <rect
              height="538.861"
              stroke="currentColor"
              strokeDasharray="5 5"
              width="538.861"
              x="289.57"
              y="-38.43"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          </g>
          <g
            data-part="outer"
            style={{
              transformBox: "view-box",
              transformOrigin: "559px 231px 0px",
            }}
          >
            <rect
              height="847.842"
              stroke="currentColor"
              strokeDasharray="5 5"
              width="847.842"
              x="135.079"
              y="-192.921"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          </g>
        </g>
        <g data-group="edges">
          <g
            data-part="inner-west"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          >
            <rect
              fill="var(--ds-background-100)"
              height="6"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              transform="rotate(45 403.512 231)"
              width="6"
              x="400.512"
              y="228"
            />
          </g>
          <g
            data-part="inner-east"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          >
            <rect
              fill="var(--ds-background-100)"
              height="6"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              transform="rotate(45 714.488 231)"
              width="6"
              x="711.488"
              y="228"
            />
          </g>
          <g
            data-part="mid-west"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          >
            <rect
              fill="var(--ds-background-100)"
              height="6"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              transform="rotate(45 289.57 231)"
              width="6"
              x="286.57"
              y="228"
            />
          </g>
          <g
            data-part="mid-east"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          >
            <rect
              fill="var(--ds-background-100)"
              height="6"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              transform="rotate(45 828.43 231)"
              width="6"
              x="825.43"
              y="228"
            />
          </g>
          <g
            data-part="outer-west"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          >
            <rect
              fill="var(--ds-background-100)"
              height="6"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              transform="rotate(45 135.079 231)"
              width="6"
              x="132.079"
              y="228"
            />
          </g>
          <g
            data-part="outer-east"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          >
            <rect
              fill="var(--ds-background-100)"
              height="6"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              transform="rotate(45 982.921 231)"
              width="6"
              x="979.921"
              y="228"
            />
          </g>
        </g>
        <g
          data-part="core"
          style={{
            transformBox: "view-box",
            transformOrigin: "559px 231px 0px",
          }}
        >
          <rect
            height="140.836"
            stroke="currentColor"
            width="140.836"
            x="488.582"
            y="160.582"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        </g>
        <g
          data-group="corners"
          style={{
            transformBox: "view-box",
            transformOrigin: "559px 231px 0px",
          }}
        >
          <g
            data-part="nw"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          >
            <rect
              fill="var(--ds-background-100)"
              height="6"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              width="6"
              x="485.582"
              y="157.582"
            />
          </g>
          <g
            data-part="ne"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          >
            <rect
              fill="var(--ds-background-100)"
              height="6"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              width="6"
              x="626.418"
              y="157.582"
            />
          </g>
          <g
            data-part="sw"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          >
            <rect
              fill="var(--ds-background-100)"
              height="6"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              width="6"
              x="485.582"
              y="298.418"
            />
          </g>
          <g
            data-part="se"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          >
            <rect
              fill="var(--ds-background-100)"
              height="6"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              width="6"
              x="626.418"
              y="298.418"
            />
          </g>
        </g>
        <g data-part="badge">
          <circle
            cx="559"
            cy="231"
            fill="var(--ds-background-100)"
            r="36"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
          <g transform="translate(559 231) scale(1) translate(-559 -231)">
            <path
              d="M568.47 240.477L561.118 229.611L567.977 221.523H565.59L560.058 228.049L555.645 221.523H549.629L556.715 231.997L549.523 240.477H551.911L557.777 233.558L562.46 240.477H568.477H568.47ZM554.859 223.047L565.62 238.953H563.241L552.478 223.047H554.857H554.859Z"
              fill="currentColor"
            />
          </g>
        </g>
      </svg>
    )
  if (variant === "narrow")
    return (
      <svg
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        shapeRendering="geometricPrecision"
        viewBox="0 0 404 242"
        aria-hidden="true"
        {...props}
      >
        <g data-group="axis">
          <line
            data-part="axis-west"
            stroke="currentColor"
            strokeDasharray="4 4"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            x1="-20.952"
            y1="121"
            y2="121"
            x2="165.1145"
          />
          <line
            data-part="axis-east"
            stroke="currentColor"
            strokeDasharray="4 4"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            x2="424.952"
            y1="121"
            y2="121"
            x1="238.8855"
          />
        </g>
        <g data-group="rings">
          <g
            data-part="inner"
            style={{
              transformBox: "view-box",
              transform: "rotate(-90deg)",
              transformOrigin: "202px 121px 0px",
            }}
          >
            <rect
              height="162.893"
              stroke="currentColor"
              strokeDasharray="4 4"
              width="162.893"
              x="120.554"
              y="39.554"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          </g>
          <g
            data-part="mid"
            style={{
              transformBox: "view-box",
              transformOrigin: "202px 121px 0px",
            }}
          >
            <rect
              height="282.261"
              stroke="currentColor"
              strokeDasharray="4 4"
              width="282.261"
              x="60.869"
              y="-20.131"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          </g>
        </g>
        <g data-group="edges">
          <g
            data-part="inner-west"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          >
            <rect
              fill="var(--ds-background-100)"
              height="5"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              transform="rotate(45 120.554 121)"
              width="5"
              x="118.054"
              y="118.5"
            />
          </g>
          <g
            data-part="inner-east"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          >
            <rect
              fill="var(--ds-background-100)"
              height="5"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              transform="rotate(45 283.446 121)"
              width="5"
              x="280.946"
              y="118.5"
            />
          </g>
          <g
            data-part="mid-west"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          >
            <rect
              fill="var(--ds-background-100)"
              height="5"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              transform="rotate(45 60.87 121)"
              width="5"
              x="58.37"
              y="118.5"
            />
          </g>
          <g
            data-part="mid-east"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          >
            <rect
              fill="var(--ds-background-100)"
              height="5"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              transform="rotate(45 343.13 121)"
              width="5"
              x="340.63"
              y="118.5"
            />
          </g>
        </g>
        <g
          data-part="core"
          style={{
            transformBox: "view-box",
            transformOrigin: "202px 121px 0px",
          }}
        >
          <rect
            height="73.771"
            stroke="currentColor"
            width="73.771"
            x="165.115"
            y="84.114"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        </g>
        <g
          data-group="corners"
          style={{
            transformBox: "view-box",
            transformOrigin: "202px 121px 0px",
          }}
        >
          <g
            data-part="nw"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          >
            <rect
              fill="var(--ds-background-100)"
              height="5"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              width="5"
              x="162.615"
              y="81.614"
            />
          </g>
          <g
            data-part="ne"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          >
            <rect
              fill="var(--ds-background-100)"
              height="5"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              width="5"
              x="236.386"
              y="81.614"
            />
          </g>
          <g
            data-part="sw"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          >
            <rect
              fill="var(--ds-background-100)"
              height="5"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              width="5"
              x="162.615"
              y="155.386"
            />
          </g>
          <g
            data-part="se"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          >
            <rect
              fill="var(--ds-background-100)"
              height="5"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              width="5"
              x="236.386"
              y="155.386"
            />
          </g>
        </g>
        <g data-part="badge">
          <circle
            cx="202"
            cy="121"
            fill="var(--ds-background-100)"
            r="18.857"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
          <g transform="translate(202 121) scale(0.524) translate(-559 -231)">
            <path
              d="M568.47 240.477L561.118 229.611L567.977 221.523H565.59L560.058 228.049L555.645 221.523H549.629L556.715 231.997L549.523 240.477H551.911L557.777 233.558L562.46 240.477H568.477H568.47ZM554.859 223.047L565.62 238.953H563.241L552.478 223.047H554.857H554.859Z"
              fill="currentColor"
            />
          </g>
        </g>
      </svg>
    )
  return null
}
