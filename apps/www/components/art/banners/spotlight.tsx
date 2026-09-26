import type { ArtProps } from "../props"

// Ported from business.x.com: products/spotlight-takeovers.
export function Spotlight({
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
        <circle
          cx="559"
          cy="231"
          data-part="front"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          opacity="0"
          r="610"
        />
        <g data-group="rings">
          <circle
            cx="559"
            cy="231"
            data-part="ring"
            fill="none"
            r="92"
            stroke="currentColor"
            strokeDasharray="5 5"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          />
          <circle
            cx="559"
            cy="231"
            data-part="ring"
            fill="none"
            r="260.45"
            stroke="currentColor"
            strokeDasharray="5 5"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          />
          <circle
            cx="559"
            cy="231"
            data-part="ring"
            fill="none"
            r="426.1"
            stroke="currentColor"
            strokeDasharray="5 5"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          />
          <circle
            cx="559"
            cy="231"
            data-part="ring"
            fill="none"
            r="532.37"
            stroke="currentColor"
            strokeDasharray="5 5"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          />
        </g>
        <g data-group="rays">
          <g
            data-part="ray-draw"
            style={{
              transformBox: "view-box",
              transformOrigin: "559px 231px 0px",
            }}
          >
            <line
              data-part="ray"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="559"
              x2="924.02"
              y1="231"
              y2="231"
            />
          </g>
          <g
            data-part="ray-draw"
            style={{
              transformBox: "view-box",
              transformOrigin: "559px 231px 0px",
            }}
          >
            <line
              data-part="ray"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="559"
              x2="193.97"
              y1="231"
              y2="231"
            />
          </g>
          <g
            data-part="ray-draw"
            style={{
              transformBox: "view-box",
              transformOrigin: "559px 231px 0px",
            }}
          >
            <line
              data-part="ray"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="559"
              x2="685.71"
              y1="231"
              y2="33.29"
            />
          </g>
          <g
            data-part="ray-draw"
            style={{
              transformBox: "view-box",
              transformOrigin: "559px 231px 0px",
            }}
          >
            <line
              data-part="ray"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="559"
              x2="433.14"
              y1="231"
              y2="429.25"
            />
          </g>
          <g
            data-part="ray-draw"
            style={{
              transformBox: "view-box",
              transformOrigin: "559px 231px 0px",
            }}
          >
            <line
              data-part="ray"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="559"
              x2="619.05"
              y1="231"
              y2="60.84"
            />
          </g>
          <g
            data-part="ray-draw"
            style={{
              transformBox: "view-box",
              transformOrigin: "559px 231px 0px",
            }}
          >
            <line
              data-part="ray"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="559"
              x2="499.9"
              y1="231"
              y2="401.49"
            />
          </g>
          <g
            data-part="ray-draw"
            style={{
              transformBox: "view-box",
              transformOrigin: "559px 231px 0px",
            }}
          >
            <line
              data-part="ray"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="559"
              x2="687.45"
              y1="231"
              y2="103.26"
            />
          </g>
          <g
            data-part="ray-draw"
            style={{
              transformBox: "view-box",
              transformOrigin: "559px 231px 0px",
            }}
          >
            <line
              data-part="ray"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="559"
              x2="431.27"
              y1="231"
              y2="359.45"
            />
          </g>
        </g>
        <g data-group="dots">
          <circle
            cx="608.77"
            cy="153.17"
            data-part="dot"
            fill="var(--ds-background-100)"
            r="3.5"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          />
          <circle
            cx="510.35"
            cy="308.64"
            data-part="dot"
            fill="var(--ds-background-100)"
            r="3.5"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          />
          <circle
            cx="467"
            cy="231"
            data-part="dot"
            fill="var(--ds-background-100)"
            r="3.5"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          />
          <circle
            cx="298.55"
            cy="231"
            data-part="dot"
            fill="var(--ds-background-100)"
            r="3.5"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          />
          <circle
            cx="819.45"
            cy="231"
            data-part="dot"
            fill="var(--ds-background-100)"
            r="3.5"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          />
          <circle
            cx="193.97"
            cy="231"
            data-part="dot"
            fill="var(--ds-background-100)"
            r="3.5"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          />
          <circle
            cx="924.02"
            cy="231"
            data-part="dot"
            fill="var(--ds-background-100)"
            r="3.5"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          />
        </g>
        <g data-part="badge">
          <circle
            cx="559"
            cy="231"
            fill="var(--ds-background-100)"
            r="36.5"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          />
          <circle
            cx="559"
            cy="231"
            fill="var(--ds-background-100)"
            r="24.5"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          />
          <g>
            <g transform="translate(559 231) scale(1) translate(-559 -231)">
              <path
                d="M568.47 240.477L561.118 229.611L567.977 221.523H565.59L560.058 228.049L555.645 221.523H549.629L556.715 231.997L549.523 240.477H551.911L557.777 233.558L562.46 240.477H568.477H568.47ZM554.859 223.047L565.62 238.953H563.241L552.478 223.047H554.857H554.859Z"
                fill="currentColor"
              />
            </g>
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
        viewBox="0 0 404 340"
        aria-hidden="true"
        {...props}
      >
        <circle
          cx="202"
          cy="170"
          data-part="front"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          opacity="0"
          r="448.92"
        />
        <g data-group="rings">
          <circle
            cx="202"
            cy="170"
            data-part="ring"
            fill="none"
            r="67.71"
            stroke="currentColor"
            strokeDasharray="3.68 3.68"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          />
          <circle
            cx="202"
            cy="170"
            data-part="ring"
            fill="none"
            r="191.67"
            stroke="currentColor"
            strokeDasharray="3.68 3.68"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          />
          <circle
            cx="202"
            cy="170"
            data-part="ring"
            fill="none"
            r="313.58"
            stroke="currentColor"
            strokeDasharray="3.68 3.68"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          />
          <circle
            cx="202"
            cy="170"
            data-part="ring"
            fill="none"
            r="391.79"
            stroke="currentColor"
            strokeDasharray="3.68 3.68"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          />
        </g>
        <g data-group="rays">
          <g
            data-part="ray-draw"
            style={{
              transformBox: "view-box",
              transformOrigin: "202px 170px 0px",
            }}
          >
            <line
              data-part="ray"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="202"
              x2="470.63"
              y1="170"
              y2="170"
            />
          </g>
          <g
            data-part="ray-draw"
            style={{
              transformBox: "view-box",
              transformOrigin: "202px 170px 0px",
            }}
          >
            <line
              data-part="ray"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="202"
              x2="-66.64"
              y1="170"
              y2="170"
            />
          </g>
          <g
            data-part="ray-draw"
            style={{
              transformBox: "view-box",
              transformOrigin: "202px 170px 0px",
            }}
          >
            <line
              data-part="ray"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="202"
              x2="295.25"
              y1="170"
              y2="24.5"
            />
          </g>
          <g
            data-part="ray-draw"
            style={{
              transformBox: "view-box",
              transformOrigin: "202px 170px 0px",
            }}
          >
            <line
              data-part="ray"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="202"
              x2="109.38"
              y1="170"
              y2="315.9"
            />
          </g>
          <g
            data-part="ray-draw"
            style={{
              transformBox: "view-box",
              transformOrigin: "202px 170px 0px",
            }}
          >
            <line
              data-part="ray"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="202"
              x2="246.19"
              y1="170"
              y2="44.77"
            />
          </g>
          <g
            data-part="ray-draw"
            style={{
              transformBox: "view-box",
              transformOrigin: "202px 170px 0px",
            }}
          >
            <line
              data-part="ray"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="202"
              x2="158.51"
              y1="170"
              y2="295.47"
            />
          </g>
          <g
            data-part="ray-draw"
            style={{
              transformBox: "view-box",
              transformOrigin: "202px 170px 0px",
            }}
          >
            <line
              data-part="ray"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="202"
              x2="296.53"
              y1="170"
              y2="75.99"
            />
          </g>
          <g
            data-part="ray-draw"
            style={{
              transformBox: "view-box",
              transformOrigin: "202px 170px 0px",
            }}
          >
            <line
              data-part="ray"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="202"
              x2="108"
              y1="170"
              y2="264.53"
            />
          </g>
        </g>
        <g data-group="dots">
          <circle
            cx="238.63"
            cy="112.72"
            data-part="dot"
            fill="var(--ds-background-100)"
            r="2.58"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          />
          <circle
            cx="166.2"
            cy="227.14"
            data-part="dot"
            fill="var(--ds-background-100)"
            r="2.58"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          />
          <circle
            cx="134.29"
            cy="170"
            data-part="dot"
            fill="var(--ds-background-100)"
            r="2.58"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          />
          <circle
            cx="10.33"
            cy="170"
            data-part="dot"
            fill="var(--ds-background-100)"
            r="2.58"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          />
          <circle
            cx="393.67"
            cy="170"
            data-part="dot"
            fill="var(--ds-background-100)"
            r="2.58"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          />
          <circle
            cx="-66.64"
            cy="170"
            data-part="dot"
            fill="var(--ds-background-100)"
            r="2.58"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          />
          <circle
            cx="470.63"
            cy="170"
            data-part="dot"
            fill="var(--ds-background-100)"
            r="2.58"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          />
        </g>
        <g data-part="badge">
          <circle
            cx="202"
            cy="170"
            fill="var(--ds-background-100)"
            r="26.86"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          />
          <circle
            cx="202"
            cy="170"
            fill="var(--ds-background-100)"
            r="18.03"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          />
          <g>
            <g transform="translate(202 170) scale(0.73593) translate(-559 -231)">
              <path
                d="M568.47 240.477L561.118 229.611L567.977 221.523H565.59L560.058 228.049L555.645 221.523H549.629L556.715 231.997L549.523 240.477H551.911L557.777 233.558L562.46 240.477H568.477H568.47ZM554.859 223.047L565.62 238.953H563.241L552.478 223.047H554.857H554.859Z"
                fill="currentColor"
              />
            </g>
          </g>
        </g>
      </svg>
    )
  return null
}
