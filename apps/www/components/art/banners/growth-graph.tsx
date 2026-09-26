import * as React from "react"

import type { ArtProps } from "../props"

// Ported from business.x.com — home, advertising/measurement.
export function GrowthGraph({
  variant = "wide",
  ...props
}: ArtProps & { variant?: "wide" | "narrow" }) {
  const id = React.useId()
  if (variant === "wide")
    return (
      <svg
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        shapeRendering="geometricPrecision"
        viewBox="0 0 1120 402"
        aria-hidden="true"
        {...props}
      >
        <g data-part="frame">
          <line
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            x1="371"
            y1="35"
            strokeDasharray="5 5"
            x2="371"
            y2="367"
          />
          <line
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            x1="745"
            y1="367"
            strokeDasharray="5 5"
            x2="745"
            y2="35"
          />
          <line
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            x1="745"
            y1="35"
            strokeDasharray="5 5"
            x2="371"
            y2="35"
          />
          <line
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            x1="371"
            y1="367"
            strokeDasharray="5 5"
            x2="745"
            y2="367"
          />
          <line
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            x1="35"
            y1="35"
            x2="371"
            y2="35"
          />
          <line
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            x1="35"
            y1="35"
            x2="35"
            y2="367"
          />
          <line
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            x1="35"
            y1="367"
            x2="371"
            y2="367"
          />
          <line
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            x1="1084"
            y1="35"
            x2="745"
            y2="35"
          />
          <line
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            x1="1084"
            y1="367"
            x2="1084"
            y2="35"
          />
          <line
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            x1="1084"
            y1="367"
            x2="745"
            y2="367"
          />
        </g>
        <g data-part="node-mask">
          <rect
            fill="var(--ds-gray-100)"
            height="56"
            width="10"
            x="188"
            y="187"
          />
          <rect
            fill="var(--ds-gray-100)"
            height="61"
            width="10"
            x="366"
            y="237"
          />
          <rect
            fill="var(--ds-gray-100)"
            height="56"
            width="10"
            x="740.5"
            y="127"
          />
          <rect
            fill="var(--ds-gray-100)"
            height="72"
            width="10"
            x="939.5"
            y="64"
          />
        </g>
        <clipPath id={`${id}-cl`}>
          <rect height="402" y="0" width="457px" x="34.5" />
        </clipPath>
        <clipPath id={`${id}-cr`}>
          <rect height="402" x="561.25" y="0" width="521.75px" />
        </clipPath>
        <g data-part="lines">
          <g clipPath={`url(#${id}-cl)`}>
            <path
              fill="none"
              stroke="currentColor"
              strokeDasharray="5 5"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              d="M34.5 212.5 L193 212.5 L371 271.5 L456.5 199.5 L491.5 199.5"
            />
          </g>
          <g clipPath={`url(#${id}-cr)`}>
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              d="M1083 94.5 L944.5 94.5 L854 152.5 L745.5 152.5 L666 199.5 L561.25 199.5"
            />
          </g>
        </g>
        <path
          d="M34.5 212.5 L193 212.5 L371 271.5 L456.5 199.5 L491.5 199.5 L561.25 199.5 L666 199.5 L745.5 152.5 L854 152.5 L944.5 94.5 L1083 94.5"
          data-part="sweep-ink"
          fill="none"
          stroke="currentColor"
          strokeLinecap="butt"
          strokeWidth="0.5"
          opacity="0"
          strokeDasharray="66.84873894147881 1180.9943879661262"
        />
        <mask id={`${id}-sw`}>
          <path
            d="M34.5 212.5 L193 212.5 L371 271.5 L456.5 199.5 L491.5 199.5 L561.25 199.5 L666 199.5 L745.5 152.5 L854 152.5 L944.5 94.5 L1083 94.5"
            fill="none"
            stroke="var(--ds-background-100)"
            strokeLinecap="butt"
            strokeWidth="4"
            strokeDasharray="66.84873894147881 1180.9943879661262"
          />
        </mask>
        <g data-part="sweep-dash" mask={`url(#${id}-sw)`}>
          <path
            d="M34.5 212.5 L193 212.5 L371 271.5 L456.5 199.5 L491.5 199.5 L561.25 199.5 L666 199.5 L745.5 152.5 L854 152.5 L944.5 94.5 L1083 94.5"
            fill="none"
            stroke="var(--ds-gray-100)"
            strokeLinecap="butt"
            strokeWidth="4"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M34.5 212.5 L193 212.5 L371 271.5 L456.5 199.5 L491.5 199.5 L561.25 199.5 L666 199.5 L745.5 152.5 L854 152.5 L944.5 94.5 L1083 94.5"
            fill="none"
            stroke="currentColor"
            strokeDasharray="5 5"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        </g>
        <g data-part="dots">
          <g clipPath={`url(#${id}-cl)`}>
            <circle
              cx="193"
              fill="currentColor"
              r="3"
              stroke="var(--ds-gray-100)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              cy="212.5"
            />
            <circle
              cx="371"
              fill="currentColor"
              r="3"
              stroke="var(--ds-gray-100)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              cy="271.5"
            />
          </g>
          <g clipPath={`url(#${id}-cr)`}>
            <circle
              cx="944.5"
              fill="currentColor"
              r="3"
              stroke="var(--ds-gray-100)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              cy="94.5"
            />
            <circle
              cx="745.5"
              fill="currentColor"
              r="3"
              stroke="var(--ds-gray-100)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              cy="152.5"
            />
          </g>
        </g>
        <g data-part="markers">
          <rect
            fill="var(--ds-gray-100)"
            height="7"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            width="7"
            x="31.5"
            y="208.5"
          />
          <rect
            fill="var(--ds-gray-100)"
            height="7"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            width="7"
            x="366.5"
            y="31.5"
          />
          <rect
            fill="var(--ds-gray-100)"
            height="7"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            width="7"
            x="366.5"
            y="364.5"
          />
          <rect
            fill="var(--ds-gray-100)"
            height="7"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            width="7"
            x="741.5"
            y="31.5"
          />
          <rect
            fill="var(--ds-gray-100)"
            height="7"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            width="7"
            x="741.5"
            y="364.5"
          />
          <rect
            fill="var(--ds-gray-100)"
            height="7"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            width="7"
            x="1080.5"
            y="91.5"
          />
        </g>
        <g
          data-part="center"
          style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
        >
          <circle
            cx="560"
            cy="200"
            fill="var(--ds-background-100)"
            r="69.5"
            stroke="currentColor"
            strokeDasharray="5 5"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
          <g style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}>
            <circle
              cx="560"
              cy="200"
              fill="var(--ds-gray-100)"
              r="28.5"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d="M570.116 211.125L561.923 199.014L569.567 190H566.906L560.741 197.273L555.823 190H549.118L557.016 201.674L549 211.125H551.661L558.199 203.414L563.418 211.125H570.125H570.116ZM554.946 191.699L566.94 209.426H564.289L552.293 191.699H554.944H554.946Z"
              fill="currentColor"
            />
          </g>
        </g>
        <g data-part="endpoints">
          <g>
            <circle
              cx="490.5"
              cy="199.5"
              fill="var(--ds-background-100)"
              r="2.5"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
            <circle
              cx="629.5"
              cy="199.5"
              fill="var(--ds-background-100)"
              r="2.5"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          </g>
        </g>
        <g data-part="ticks">
          <g>
            <line
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="193"
              x2="193"
              y1="212.5"
              y2="190"
            />
            <line
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="193"
              x2="193"
              y1="212.5"
              y2="240"
            />
          </g>
          <g>
            <line
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="371"
              x2="371"
              y1="271.5"
              y2="240"
            />
            <line
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="371"
              x2="371"
              y1="271.5"
              y2="295"
            />
          </g>
          <g>
            <line
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="745.5"
              x2="745.5"
              y1="152.5"
              y2="130"
            />
            <line
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="745.5"
              x2="745.5"
              y1="152.5"
              y2="180"
            />
          </g>
          <g>
            <line
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="944.5"
              x2="944.5"
              y1="94.5"
              y2="67"
            />
            <line
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="944.5"
              x2="944.5"
              y1="94.5"
              y2="133"
            />
          </g>
        </g>
        <g
          data-part="label"
          style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
        >
          <rect
            height="23"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            width="58"
            x="162.5"
            y="166.5"
            fill="color-mix(in srgb, var(--ds-gray-100), var(--ds-background-100) 0%)"
            stroke="color-mix(in srgb, currentColor, currentColor 0%)"
          />
          <text
            fontSize="13"
            style={{ fontWeight: "400" }}
            textAnchor="middle"
            x="191.5"
            y="182.68"
            fill="color-mix(in srgb, currentColor, currentColor 0%)"
          >
            {"$12.4K"}
          </text>
        </g>
        <g
          data-part="label"
          style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
        >
          <rect
            height="23"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            width="53"
            x="344.5"
            y="289.5"
            fill="color-mix(in srgb, var(--ds-gray-100), var(--ds-background-100) 0%)"
            stroke="color-mix(in srgb, currentColor, currentColor 0%)"
          />
          <text
            fontSize="13"
            style={{ fontWeight: "400" }}
            textAnchor="middle"
            x="371"
            y="305.68"
            fill="color-mix(in srgb, currentColor, currentColor 0%)"
          >
            {"$8.2K"}
          </text>
        </g>
        <g
          data-part="label"
          style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
        >
          <rect
            height="23"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            width="58"
            x="715.5"
            y="107.5"
            fill="color-mix(in srgb, var(--ds-gray-100), var(--ds-background-100) 0%)"
            stroke="color-mix(in srgb, currentColor, currentColor 0%)"
          />
          <text
            fontSize="13"
            style={{ fontWeight: "400" }}
            textAnchor="middle"
            x="744.5"
            y="123.68"
            fill="color-mix(in srgb, currentColor, currentColor 0%)"
          >
            {"$18.7K"}
          </text>
        </g>
        <g
          data-part="label"
          style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
        >
          <rect
            height="23"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            width="61"
            x="915.5"
            y="131.5"
            fill="color-mix(in srgb, var(--ds-gray-100), var(--ds-background-100) 0%)"
            stroke="color-mix(in srgb, currentColor, currentColor 0%)"
          />
          <text
            fontSize="13"
            style={{ fontWeight: "400" }}
            textAnchor="middle"
            x="946"
            y="147.68"
            fill="color-mix(in srgb, currentColor, currentColor 0%)"
          >
            {"$32.5K"}
          </text>
        </g>
      </svg>
    )
  if (variant === "narrow")
    return (
      <svg
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        shapeRendering="geometricPrecision"
        viewBox="0 0 404 240"
        aria-hidden="true"
        {...props}
      >
        <g data-part="frame">
          <line
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            x1="89.5"
            y1="21"
            strokeDasharray="2.99 2.99"
            x2="89.5"
            y2="219"
          />
          <line
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            x1="313"
            y1="219"
            strokeDasharray="2.99 2.99"
            x2="313"
            y2="21"
          />
          <line
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            x1="313"
            y1="21"
            strokeDasharray="2.99 2.99"
            x2="89.5"
            y2="21"
          />
          <line
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            x1="89.5"
            y1="219"
            strokeDasharray="2.99 2.99"
            x2="313"
            y2="219"
          />
          <line
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            x1="27"
            y1="21"
            x2="89.5"
            y2="21"
          />
          <line
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            x1="27"
            y1="21"
            x2="27"
            y2="219"
          />
          <line
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            x1="27"
            y1="219"
            x2="89.5"
            y2="219"
          />
          <line
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            x1="380"
            y1="21"
            x2="313"
            y2="21"
          />
          <line
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            x1="380"
            y1="219"
            x2="380"
            y2="21"
          />
          <line
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            x1="380"
            y1="219"
            x2="313"
            y2="219"
          />
        </g>
        <g data-part="node-mask">
          <rect
            fill="var(--ds-gray-100)"
            height="36.83600000000001"
            width="6"
            x="86.761"
            y="141"
          />
          <rect
            fill="var(--ds-gray-100)"
            height="33.851"
            width="6"
            x="310.344"
            y="75.731"
          />
        </g>
        <clipPath id={`${id}-cl`}>
          <rect height="240" y="0" width="161.702px" x="0" />
        </clipPath>
        <clipPath id={`${id}-cr`}>
          <rect height="240" x="203.344" y="0" width="200.656px" />
        </clipPath>
        <g data-part="lines">
          <g clipPath={`url(#${id}-cl)`}>
            <path
              fill="none"
              stroke="currentColor"
              strokeDasharray="2.99 2.99"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              d="M-111.134 126.866 L-16.507 126.866 L89.761 162.09 L140.806 119.105 L161.702 119.105"
            />
          </g>
          <g clipPath={`url(#${id}-cr)`}>
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              d="M514.836 56.418 L432.15 56.418 L378.12 91.045 L313.344 91.045 L265.881 119.105 L203.344 119.105"
            />
          </g>
        </g>
        <path
          d="M-111.134 126.866 L-16.507 126.866 L89.761 162.09 L140.806 119.105 L161.702 119.105 L203.344 119.105 L265.881 119.105 L313.344 91.045 L378.12 91.045 L432.15 56.418 L514.836 56.418"
          data-part="sweep-ink"
          fill="none"
          stroke="currentColor"
          strokeLinecap="butt"
          strokeWidth="0.5"
          opacity="0"
          strokeDasharray="39.90969357902486 705.0712532294393"
        />
        <mask id={`${id}-sw`}>
          <path
            d="M-111.134 126.866 L-16.507 126.866 L89.761 162.09 L140.806 119.105 L161.702 119.105 L203.344 119.105 L265.881 119.105 L313.344 91.045 L378.12 91.045 L432.15 56.418 L514.836 56.418"
            fill="none"
            stroke="var(--ds-background-100)"
            strokeLinecap="butt"
            strokeWidth="4"
            strokeDasharray="39.90969357902486 705.0712532294393"
          />
        </mask>
        <g data-part="sweep-dash" mask={`url(#${id}-sw)`}>
          <path
            d="M-111.134 126.866 L-16.507 126.866 L89.761 162.09 L140.806 119.105 L161.702 119.105 L203.344 119.105 L265.881 119.105 L313.344 91.045 L378.12 91.045 L432.15 56.418 L514.836 56.418"
            fill="none"
            stroke="var(--ds-gray-100)"
            strokeLinecap="butt"
            strokeWidth="4"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M-111.134 126.866 L-16.507 126.866 L89.761 162.09 L140.806 119.105 L161.702 119.105 L203.344 119.105 L265.881 119.105 L313.344 91.045 L378.12 91.045 L432.15 56.418 L514.836 56.418"
            fill="none"
            stroke="currentColor"
            strokeDasharray="2.99 2.99"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        </g>
        <g data-part="dots">
          <g clipPath={`url(#${id}-cl)`}>
            <circle
              cx="89.761"
              fill="currentColor"
              r="1.79"
              stroke="var(--ds-gray-100)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              cy="162.09"
            />
          </g>
          <g clipPath={`url(#${id}-cr)`}>
            <circle
              cx="313.344"
              fill="currentColor"
              r="1.79"
              stroke="var(--ds-gray-100)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              cy="91.045"
            />
          </g>
        </g>
        <g data-part="markers">
          <rect
            fill="var(--ds-gray-100)"
            height="3.776"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            width="3.776"
            x="87.276"
            y="19.007"
          />
          <rect
            fill="var(--ds-gray-100)"
            height="3.776"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            width="3.776"
            x="311.156"
            y="19.007"
          />
          <rect
            fill="var(--ds-gray-100)"
            height="3.776"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            width="3.776"
            x="87.276"
            y="217.813"
          />
          <rect
            fill="var(--ds-gray-100)"
            height="3.776"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            width="3.776"
            x="311.156"
            y="217.813"
          />
        </g>
        <g
          data-part="center"
          style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
        >
          <circle
            cx="202.298"
            cy="119.702"
            fill="var(--ds-background-100)"
            r="41.4925"
            stroke="currentColor"
            strokeDasharray="2.99 2.99"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
          <g style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}>
            <circle
              cx="202.298"
              cy="119.702"
              fill="var(--ds-gray-100)"
              r="17.216"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d="M208.636 126.045L203.745 118.815L208.308 113.433H206.72L203.039 117.775L200.103 113.433H196.1L200.815 120.402L196.029 126.045H197.618L201.521 121.441L204.637 126.045H208.641H208.636ZM199.579 114.447L206.74 125.031H205.157L197.995 114.447H199.578H199.579Z"
              fill="currentColor"
            />
          </g>
        </g>
        <g data-part="endpoints">
          <g>
            <circle
              cx="160.805"
              cy="119.105"
              fill="var(--ds-background-100)"
              r="1.5"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
            <circle
              cx="243.79"
              cy="119.105"
              fill="var(--ds-background-100)"
              r="1.5"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          </g>
        </g>
        <g data-part="ticks">
          <g>
            <line
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="89.761"
              x2="89.761"
              y1="162.09"
              y2="143"
            />
            <line
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="89.761"
              x2="89.761"
              y1="162.09"
              y2="175.836"
            />
          </g>
          <g>
            <line
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="313.344"
              x2="313.344"
              y1="91.045"
              y2="77.731"
            />
            <line
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="313.344"
              x2="313.344"
              y1="91.045"
              y2="107.582"
            />
          </g>
        </g>
        <g
          data-part="label"
          style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
        >
          <rect
            height="15.388"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            width="33.552"
            x="73.5"
            y="172.037"
            fill="color-mix(in srgb, var(--ds-gray-100), var(--ds-background-100) 0%)"
            stroke="color-mix(in srgb, currentColor, currentColor 0%)"
          />
          <text
            fontSize="10"
            style={{ fontWeight: "400" }}
            textAnchor="middle"
            x="90.276"
            y="183.331"
            fill="color-mix(in srgb, currentColor, currentColor 0%)"
          >
            {"$8.2K"}
          </text>
        </g>
        <g
          data-part="label"
          style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
        >
          <rect
            height="15.388"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            width="36.552"
            x="294.635"
            y="63.5"
            fill="color-mix(in srgb, var(--ds-gray-100), var(--ds-background-100) 100%)"
            stroke="color-mix(in srgb, currentColor, currentColor 100%)"
          />
          <text
            fontSize="10"
            style={{ fontWeight: "400" }}
            textAnchor="middle"
            x="312.911"
            y="74.794"
            fill="color-mix(in srgb, currentColor, currentColor 100%)"
          >
            {"$18.7K"}
          </text>
        </g>
      </svg>
    )
  return null
}
