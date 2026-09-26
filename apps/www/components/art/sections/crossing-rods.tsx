import type { ArtProps } from "../props"

// Ported from business.x.com: closing CTA on 19 pages.
export function CrossingRods({
  variant = "wide",
  ...props
}: ArtProps & { variant?: "wide" | "narrow" }) {
  if (variant === "wide")
    return (
      <svg
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        shapeRendering="geometricPrecision"
        viewBox="0 0 881 440"
        aria-hidden="true"
        {...props}
      >
        <line
          data-reveal="divider"
          stroke="currentColor"
          strokeDasharray="5.63 5.63"
          strokeWidth="1"
          style={{ transformBox: "view-box", transformOrigin: "50% 50%" }}
          x1="0.660156"
          x2="880.66"
          y1="247.271"
          y2="247.271"
        />
        <path
          d="M249.16 133.271L567.66 359.271"
          data-reveal="line"
          stroke="currentColor"
          strokeWidth="1"
          pathLength={1}
          strokeDashoffset="0"
          strokeDasharray="1 1"
        />
        <g
          data-rod="0"
          style={{ transformBox: "view-box", transformOrigin: "50% 50%" }}
        >
          <path
            d="M516.111 96.9828L458.73 247.748"
            data-reveal="line"
            stroke="currentColor"
            strokeWidth="1"
            pathLength={1}
            strokeDashoffset="0"
            strokeDasharray="1 1"
          />
          <g
            data-reveal="marker"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          >
            <rect
              fill="var(--ds-background-100)"
              height="6.2"
              stroke="currentColor"
              strokeWidth="1"
              transform="rotate(-24.2722 516.111 96.9828)"
              width="6.2"
              x="513.011"
              y="93.8828"
            />
          </g>
        </g>
        <g
          data-rod="1"
          style={{ transformBox: "view-box", transformOrigin: "50% 50%" }}
        >
          <path
            d="M693.66 183.814L208.16 314.5"
            data-reveal="line"
            stroke="currentColor"
            strokeWidth="1"
            pathLength={1}
            strokeDashoffset="0"
            strokeDasharray="1 1"
          />
          <g
            data-reveal="marker"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          >
            <circle cx="693.66" cy="183.814" fill="currentColor" r="2.25023" />
          </g>
          <g
            data-reveal="marker"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          >
            <circle cx="208.16" cy="314.5" fill="currentColor" r="2.25023" />
          </g>
        </g>
        <g
          data-rod="2"
          style={{ transformBox: "view-box", transformOrigin: "50% 50%" }}
        >
          <path
            d="M431.917 301.271L366.66 418.845"
            data-reveal="line"
            stroke="currentColor"
            strokeWidth="1"
            pathLength={1}
            strokeDashoffset="0"
            strokeDasharray="1 1"
          />
          <g
            data-reveal="marker"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          >
            <circle
              cx="366.66"
              cy="418.845"
              fill="var(--ds-background-100)"
              r="3.50925"
              stroke="currentColor"
              strokeWidth="1"
            />
          </g>
        </g>
        <g
          data-rod="3"
          style={{ transformBox: "view-box", transformOrigin: "50% 50%" }}
        >
          <path
            d="M748.163 45.501L197.783 424.388"
            data-reveal="line"
            stroke="currentColor"
            strokeWidth="1"
            pathLength={1}
            strokeDashoffset="0"
            strokeDasharray="1 1"
          />
          <g
            data-reveal="marker"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          >
            <circle cx="197.783" cy="424.388" fill="currentColor" r="2.25023" />
          </g>
          <g
            data-reveal="marker"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          >
            <circle
              cx="718.552"
              cy="65.884"
              fill="var(--ds-background-100)"
              r="3.50925"
              stroke="currentColor"
              strokeWidth="1"
            />
          </g>
        </g>
      </svg>
    )
  if (variant === "narrow")
    return (
      <svg
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        shapeRendering="geometricPrecision"
        viewBox="-19.5 0 480 521"
        aria-hidden="true"
        {...props}
      >
        <path
          d="M82.8 62.1L329.5 384.203"
          data-reveal="line"
          stroke="currentColor"
          strokeWidth="1"
          pathLength={1}
          strokeDashoffset="0"
          strokeDasharray="1 1"
        />
        <g
          data-rod="0"
          style={{ transformBox: "view-box", transformOrigin: "50% 50%" }}
        >
          <path
            d="M329.502 45.1016L232.923 263.85"
            data-reveal="line"
            stroke="currentColor"
            strokeWidth="1"
            pathLength={1}
            strokeDashoffset="0"
            strokeDasharray="1 1"
          />
          <g
            data-reveal="marker"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          >
            <rect
              fill="var(--ds-background-100)"
              height="6.2"
              stroke="currentColor"
              strokeWidth="1"
              transform="rotate(-24.2722 329.502 45.1016)"
              width="6.2"
              x="326.402"
              y="42.001599999999996"
            />
          </g>
        </g>
        <g
          data-rod="1"
          style={{ transformBox: "view-box", transformOrigin: "50% 50%" }}
        >
          <path
            d="M450.3 155.75L2.15 330.29"
            data-reveal="line"
            stroke="currentColor"
            strokeWidth="1"
            pathLength={1}
            strokeDashoffset="0"
            strokeDasharray="1 1"
          />
          <g
            data-reveal="marker"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          >
            <circle cx="450.3" cy="155.75" fill="currentColor" r="2.25023" />
          </g>
          <g
            data-reveal="marker"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          >
            <circle cx="2.15" cy="330.29" fill="currentColor" r="2.25023" />
          </g>
        </g>
        <g
          data-rod="2"
          style={{ transformBox: "view-box", transformOrigin: "50% 50%" }}
        >
          <path
            d="M210.083 319.184L153.571 441.203"
            data-reveal="line"
            stroke="currentColor"
            strokeWidth="1"
            pathLength={1}
            strokeDashoffset="0"
            strokeDasharray="1 1"
          />
          <g
            data-reveal="marker"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          >
            <circle
              cx="153.571"
              cy="441.203"
              fill="var(--ds-background-100)"
              r="3.50925"
              stroke="currentColor"
              strokeWidth="1"
            />
          </g>
        </g>
        <g
          data-rod="3"
          style={{ transformBox: "view-box", transformOrigin: "50% 50%" }}
        >
          <path
            d="M409.5 101.877L26.9998 427.877"
            data-reveal="line"
            stroke="currentColor"
            strokeWidth="1"
            pathLength={1}
            strokeDashoffset="0"
            strokeDasharray="1 1"
          />
          <g
            data-reveal="marker"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          >
            <circle cx="26.9998" cy="427.877" fill="currentColor" r="2.25023" />
          </g>
          <g
            data-reveal="marker"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          >
            <circle
              cx="407.009"
              cy="104"
              fill="var(--ds-background-100)"
              r="3.50925"
              stroke="currentColor"
              strokeWidth="1"
            />
          </g>
        </g>
      </svg>
    )
  return null
}
