import type { ArtProps } from "../props"

// Ported from business.x.com: home, advertising (contact form).
export function SpecialistArcs({
  variant = "wide",
  ...props
}: ArtProps & { variant?: "wide" | "narrow" }) {
  if (variant === "wide")
    return (
      <svg
        viewBox="0 0 548 379"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        aria-hidden="true"
        {...props}
      >
        <g>
          <g>
            <circle
              cx="273.514"
              cy="-132.871"
              r="400"
              stroke="currentColor"
              strokeWidth="0.5"
              strokeDasharray="14.72 14.72"
              style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
            />
            <circle
              cx="273.514"
              cy="-132.871"
              r="234.654"
              stroke="currentColor"
              strokeWidth="0.5"
              strokeDasharray="14.72 14.72"
              style={{
                transformBox: "fill-box",
                transformOrigin: "50% 50%",
                transform: "rotate(-19.129deg)",
              }}
            />
          </g>
          <line
            x1="131.333"
            y1="-644.178"
            x2="397.875"
            y2="312.409"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <line
            x1="95.5761"
            y1="-632.884"
            x2="441.004"
            y2="330"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <line
            x1="61.8636"
            y1="-619.61"
            x2="492"
            y2="356.5"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <g>
            <circle
              cx="337.191"
              cy="93.1898"
              r="4.25"
              fill="var(--ds-background-100)"
              stroke="currentColor"
              strokeWidth="0.5"
            />
          </g>
          <g>
            <circle
              cx="382.191"
              cy="166.19"
              r="4.25"
              fill="var(--ds-background-100)"
              stroke="currentColor"
              strokeWidth="0.5"
            />
          </g>
          <g>
            <circle
              cx="437.004"
              cy="233"
              r="16.25"
              fill="var(--ds-background-100)"
              stroke="currentColor"
              strokeWidth="0.5"
            />
            <circle
              cx="437.004"
              cy="233"
              r="3.25"
              stroke="currentColor"
              strokeWidth="0.5"
              fill="var(--ds-background-100)"
            />
          </g>
        </g>
      </svg>
    )
  if (variant === "narrow")
    return (
      <svg
        viewBox="151.8 -43 460 460"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        aria-hidden="true"
        {...props}
      >
        <g transform="rotate(-115.5 437.004 233)">
          <g>
            <circle
              cx="273.514"
              cy="-132.871"
              r="400"
              stroke="currentColor"
              strokeWidth="0.5"
              strokeDasharray="14.72 14.72"
              style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
            />
            <circle
              cx="273.514"
              cy="-132.871"
              r="234.654"
              stroke="currentColor"
              strokeWidth="0.5"
              strokeDasharray="14.72 14.72"
              style={{
                transformBox: "fill-box",
                transformOrigin: "50% 50%",
                transform: "rotate(-25.7858deg)",
              }}
            />
          </g>
          <line
            x1="131.333"
            y1="-644.178"
            x2="397.875"
            y2="312.409"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <line
            x1="95.5761"
            y1="-632.884"
            x2="441.004"
            y2="330"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <line
            x1="61.8636"
            y1="-619.61"
            x2="492"
            y2="356.5"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <g>
            <circle
              cx="337.191"
              cy="93.1898"
              r="4.25"
              fill="var(--ds-background-100)"
              stroke="currentColor"
              strokeWidth="0.5"
            />
          </g>
          <g>
            <circle
              cx="382.191"
              cy="166.19"
              r="4.25"
              fill="var(--ds-background-100)"
              stroke="currentColor"
              strokeWidth="0.5"
            />
          </g>
          <g>
            <circle
              cx="437.004"
              cy="233"
              r="16.25"
              fill="var(--ds-background-100)"
              stroke="currentColor"
              strokeWidth="0.5"
            />
            <circle
              cx="437.004"
              cy="233"
              r="3.25"
              stroke="currentColor"
              strokeWidth="0.5"
              fill="currentColor"
            />
          </g>
        </g>
      </svg>
    )
  return null
}
