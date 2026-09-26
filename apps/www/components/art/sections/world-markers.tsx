import type { ArtProps } from "../props"

// Ported from business.x.com — success-stories.
export function WorldMarkers({
  variant = "wide",
  ...props
}: ArtProps & { variant?: "wide" | "narrow" }) {
  if (variant === "wide")
    return (
      <svg
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        shapeRendering="geometricPrecision"
        viewBox="0 0 176 332"
        aria-hidden="true"
        {...props}
      >
        <g transform="rotate(0 87.815 169.815)">
          <circle
            cx="87.815"
            cy="169.815"
            data-part="globe"
            fill="none"
            r="127.316"
            stroke="currentColor"
            strokeWidth="1"
            pathLength={1}
            strokeDashoffset="0"
            strokeDasharray="1 1"
          />
          <line
            data-part="meridian"
            stroke="currentColor"
            strokeDasharray="4 4"
            strokeWidth="1"
            x1="0.443"
            y1="-0.232"
            x2="176.443"
            y2="335.768"
          />
          <g data-part="nodes">
            <g
              data-part="node"
              style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
            >
              <g
                data-part="gear"
                style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
              >
                <circle
                  cx="95"
                  cy="77"
                  fill="var(--ds-background-100)"
                  r="15"
                  stroke="currentColor"
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
              </g>
              <circle
                cx="95"
                cy="77"
                fill="none"
                r="3.5"
                stroke="currentColor"
                strokeWidth="1"
              />
            </g>
            <g
              data-part="node"
              style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
            >
              <g
                data-part="gear"
                style={{
                  transformBox: "fill-box",
                  transformOrigin: "50% 50%",
                  transform: "rotate(-43.1145deg)",
                }}
              >
                <circle
                  cx="36"
                  cy="148"
                  fill="none"
                  r="15"
                  stroke="currentColor"
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
              </g>
              <circle
                cx="36"
                cy="148"
                fill="currentColor"
                r="3.5"
                stroke="currentColor"
                strokeWidth="1"
              />
            </g>
            <g
              data-part="node"
              style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
            >
              <g
                data-part="gear"
                style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
              >
                <circle
                  cx="136"
                  cy="133"
                  fill="none"
                  r="26"
                  stroke="currentColor"
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
              </g>
              <circle
                cx="136"
                cy="133"
                fill="currentColor"
                r="3.5"
                stroke="currentColor"
                strokeWidth="1"
              />
            </g>
            <g
              data-part="node"
              style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
            >
              <g
                data-part="gear"
                style={{
                  transformBox: "fill-box",
                  transformOrigin: "50% 50%",
                  transform: "rotate(-30.3425deg)",
                }}
              >
                <circle
                  cx="42"
                  cy="223"
                  fill="var(--ds-background-100)"
                  r="21"
                  stroke="currentColor"
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
              </g>
              <circle
                cx="42"
                cy="223"
                fill="none"
                r="3.5"
                stroke="currentColor"
                strokeWidth="1"
              />
            </g>
            <g
              data-part="node"
              style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
            >
              <g
                data-part="gear"
                style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
              >
                <circle
                  cx="149"
                  cy="193"
                  fill="var(--ds-background-100)"
                  r="9"
                  stroke="currentColor"
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
              </g>
              <circle
                cx="149"
                cy="193"
                fill="none"
                r="3.5"
                stroke="currentColor"
                strokeWidth="1"
              />
            </g>
            <g
              data-part="node"
              style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
            >
              <g
                data-part="gear"
                style={{
                  transformBox: "fill-box",
                  transformOrigin: "50% 50%",
                  transform: "rotate(-48.4166deg)",
                }}
              >
                <circle
                  cx="97"
                  cy="258"
                  fill="none"
                  r="13"
                  stroke="currentColor"
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
              </g>
              <circle
                cx="97"
                cy="258"
                fill="currentColor"
                r="3.5"
                stroke="currentColor"
                strokeWidth="1"
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
        preserveAspectRatio="xMidYMid meet"
        shapeRendering="geometricPrecision"
        viewBox="-70.185 11.814999999999998 316 316"
        aria-hidden="true"
        {...props}
      >
        <g transform="rotate(-31.95 87.815 169.815)">
          <circle
            cx="87.815"
            cy="169.815"
            data-part="globe"
            fill="none"
            r="127.316"
            stroke="currentColor"
            strokeWidth="1"
            pathLength={1}
            strokeDashoffset="0"
            strokeDasharray="1 1"
          />
          <line
            data-part="meridian"
            stroke="currentColor"
            strokeDasharray="4 4"
            strokeWidth="1"
            x1="0.443"
            y1="-0.232"
            x2="176.443"
            y2="335.768"
          />
          <g data-part="nodes">
            <g
              data-part="node"
              style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
            >
              <g
                data-part="gear"
                style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
              >
                <circle
                  cx="95"
                  cy="77"
                  fill="var(--ds-background-100)"
                  r="15"
                  stroke="currentColor"
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
              </g>
              <circle
                cx="95"
                cy="77"
                fill="none"
                r="3.5"
                stroke="currentColor"
                strokeWidth="1"
              />
            </g>
            <g
              data-part="node"
              style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
            >
              <g
                data-part="gear"
                style={{
                  transformBox: "fill-box",
                  transformOrigin: "50% 50%",
                  transform: "rotate(-46.1266deg)",
                }}
              >
                <circle
                  cx="36"
                  cy="148"
                  fill="none"
                  r="15"
                  stroke="currentColor"
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
              </g>
              <circle
                cx="36"
                cy="148"
                fill="currentColor"
                r="3.5"
                stroke="currentColor"
                strokeWidth="1"
              />
            </g>
            <g
              data-part="node"
              style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
            >
              <g
                data-part="gear"
                style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
              >
                <circle
                  cx="136"
                  cy="133"
                  fill="none"
                  r="26"
                  stroke="currentColor"
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
              </g>
              <circle
                cx="136"
                cy="133"
                fill="currentColor"
                r="3.5"
                stroke="currentColor"
                strokeWidth="1"
              />
            </g>
            <g
              data-part="node"
              style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
            >
              <g
                data-part="gear"
                style={{
                  transformBox: "fill-box",
                  transformOrigin: "50% 50%",
                  transform: "rotate(-32.494deg)",
                }}
              >
                <circle
                  cx="42"
                  cy="223"
                  fill="var(--ds-background-100)"
                  r="21"
                  stroke="currentColor"
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
              </g>
              <circle
                cx="42"
                cy="223"
                fill="none"
                r="3.5"
                stroke="currentColor"
                strokeWidth="1"
              />
            </g>
            <g
              data-part="node"
              style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
            >
              <g
                data-part="gear"
                style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
              >
                <circle
                  cx="149"
                  cy="193"
                  fill="var(--ds-background-100)"
                  r="9"
                  stroke="currentColor"
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
              </g>
              <circle
                cx="149"
                cy="193"
                fill="none"
                r="3.5"
                stroke="currentColor"
                strokeWidth="1"
              />
            </g>
            <g
              data-part="node"
              style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
            >
              <g
                data-part="gear"
                style={{
                  transformBox: "fill-box",
                  transformOrigin: "50% 50%",
                  transform: "rotate(-51.8921deg)",
                }}
              >
                <circle
                  cx="97"
                  cy="258"
                  fill="none"
                  r="13"
                  stroke="currentColor"
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
              </g>
              <circle
                cx="97"
                cy="258"
                fill="currentColor"
                r="3.5"
                stroke="currentColor"
                strokeWidth="1"
              />
            </g>
          </g>
        </g>
      </svg>
    )
  return null
}
