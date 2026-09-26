import * as React from "react"

import type { ArtProps } from "../props"

// Ported from business.x.com: basics.
export function RingStack({
  variant = "wide",
  ...props
}: ArtProps & { variant?: "wide" | "narrow" }) {
  const id = React.useId()
  if (variant === "wide")
    return (
      <svg
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        shapeRendering="geometricPrecision"
        viewBox="-1 0 1120 462"
        aria-hidden="true"
        {...props}
      >
        <g data-group="rails">
          <line
            data-part="rail-dashed"
            stroke="currentColor"
            strokeDasharray="5 5"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            x1="339"
            y1="231"
            y2="231"
            x2="-13"
          />
          <line
            data-part="rail-dashed"
            stroke="currentColor"
            strokeDasharray="5 5"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            x1="786"
            y1="231"
            y2="231"
            x2="1119"
          />
        </g>
        <g data-group="marks">
          <g data-rail="left">
            <line
              data-part="rail-solid"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              y1="231"
              y2="231"
              x1="-6.0857142857143005"
              x2="55.89142857142856"
            />
            <line
              data-part="rail-solid"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              y1="231"
              y2="231"
              x1="-13"
              x2="-13"
            />
          </g>
          <g data-rail="right">
            <line
              data-part="rail-solid"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              y1="231"
              y2="231"
              x1="1119"
              x2="1119"
            />
            <line
              data-part="rail-solid"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              y1="231"
              y2="231"
              x1="1119"
              x2="1119"
            />
          </g>
        </g>
        <g data-group="rings">
          <mask
            height="331"
            id={`${id}-ring-0`}
            maskUnits="userSpaceOnUse"
            width="182"
            x="336.5"
            y="65.5"
          >
            <g
              data-part="ring-wipe"
              style={{
                transformBox: "fill-box",
                transformOrigin: "50% 0% 0px",
              }}
            >
              <rect
                fill="var(--ds-background-100)"
                height="331"
                width="91"
                x="427.5"
                y="65.5"
              />
            </g>
            <g
              data-part="ring-wipe"
              style={{
                transformBox: "fill-box",
                transformOrigin: "50% 100% 0px",
              }}
            >
              <rect
                fill="var(--ds-background-100)"
                height="331"
                width="91"
                x="336.5"
                y="65.5"
              />
            </g>
          </mask>
          <g mask={`url(#${id}-ring-0)`}>
            <ellipse
              cx="427.5"
              cy="231"
              data-part="ring"
              fill="none"
              rx="88"
              ry="162.5"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          </g>
          <mask
            height="381"
            id={`${id}-ring-1`}
            maskUnits="userSpaceOnUse"
            width="182"
            x="424.5"
            y="40.5"
          >
            <g
              data-part="ring-wipe"
              style={{
                transformBox: "fill-box",
                transformOrigin: "50% 0% 0px",
              }}
            >
              <rect
                fill="var(--ds-background-100)"
                height="381"
                width="91"
                x="515.5"
                y="40.5"
              />
            </g>
            <g
              data-part="ring-wipe"
              style={{
                transformBox: "fill-box",
                transformOrigin: "50% 100% 0px",
              }}
            >
              <rect
                fill="var(--ds-background-100)"
                height="381"
                width="91"
                x="424.5"
                y="40.5"
              />
            </g>
          </mask>
          <g mask={`url(#${id}-ring-1)`}>
            <ellipse
              cx="515.5"
              cy="231"
              data-part="ring"
              fill="none"
              rx="88"
              ry="187.5"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          </g>
          <mask
            height="381"
            id={`${id}-ring-2`}
            maskUnits="userSpaceOnUse"
            width="182"
            x="512.5"
            y="40.5"
          >
            <g
              data-part="ring-wipe"
              style={{
                transformBox: "fill-box",
                transformOrigin: "50% 0% 0px",
              }}
            >
              <rect
                fill="var(--ds-background-100)"
                height="381"
                width="91"
                x="603.5"
                y="40.5"
              />
            </g>
            <g
              data-part="ring-wipe"
              style={{
                transformBox: "fill-box",
                transformOrigin: "50% 100% 0px",
              }}
            >
              <rect
                fill="var(--ds-background-100)"
                height="381"
                width="91"
                x="512.5"
                y="40.5"
              />
            </g>
          </mask>
          <g mask={`url(#${id}-ring-2)`}>
            <ellipse
              cx="603.5"
              cy="231"
              data-part="ring"
              fill="none"
              rx="88"
              ry="187.5"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          </g>
          <mask
            height="331"
            id={`${id}-ring-3`}
            maskUnits="userSpaceOnUse"
            width="182"
            x="600.5"
            y="65.5"
          >
            <g
              data-part="ring-wipe"
              style={{
                transformBox: "fill-box",
                transformOrigin: "50% 0% 0px",
              }}
            >
              <rect
                fill="var(--ds-background-100)"
                height="331"
                width="91"
                x="691.5"
                y="65.5"
              />
            </g>
            <g
              data-part="ring-wipe"
              style={{
                transformBox: "fill-box",
                transformOrigin: "50% 100% 0px",
              }}
            >
              <rect
                fill="var(--ds-background-100)"
                height="331"
                width="91"
                x="600.5"
                y="65.5"
              />
            </g>
          </mask>
          <g mask={`url(#${id}-ring-3)`}>
            <ellipse
              cx="691.5"
              cy="231"
              data-part="ring"
              fill="none"
              rx="88"
              ry="162.5"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          </g>
        </g>
        <g data-group="caps">
          <g
            data-part="cap-ping"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          >
            <circle
              cx="339"
              cy="231"
              data-part="cap"
              fill="var(--ds-background-100)"
              r="5.5"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
            />
          </g>
          <g
            data-part="cap-ping"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          >
            <circle
              cx="780"
              cy="231"
              data-part="cap"
              fill="var(--ds-background-100)"
              r="5.5"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
            />
          </g>
        </g>
        <g data-group="chips">
          <g transform="translate(0 0)">
            <g
              data-part="chip"
              style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
            >
              <rect
                fill="var(--ds-background-100)"
                height="23.4"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                width="18.041"
                x="417.5"
                y="219.5"
              />
              <path
                clipRule="evenodd"
                d="M422.8 224.8V225.973H425.432C425.709 225.973 425.934 226.198 425.934 226.475V235.926C425.934 236.203 425.709 236.428 425.432 236.428H422.8V237.6H430.241V236.428H427.608C427.33 236.428 427.106 236.203 427.106 235.926V226.475C427.106 226.198 427.33 225.973 427.608 225.973H430.241V224.8H422.8Z"
                fill="currentColor"
                fillRule="evenodd"
              />
            </g>
          </g>
          <g transform="translate(0 0)">
            <g
              data-part="chip"
              style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
            >
              <rect
                fill="var(--ds-background-100)"
                height="23.4"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                width="25.482"
                x="503.5"
                y="219.5"
              />
              <path
                clipRule="evenodd"
                d="M523.682 224.8V225.973H521.049C520.772 225.973 520.547 226.198 520.547 226.475V235.926C520.547 236.203 520.772 236.428 521.049 236.428H523.682V237.6H508.8V236.428H511.432C511.709 236.428 511.934 236.203 511.934 235.926V226.475C511.934 226.198 511.709 225.973 511.432 225.973H508.8V224.8H523.682ZM513.608 225.973C513.33 225.973 513.106 226.198 513.106 226.475V235.926C513.106 236.203 513.33 236.428 513.608 236.428H518.873C519.15 236.428 519.375 236.203 519.375 235.926V226.475C519.375 226.198 519.15 225.973 518.873 225.973H513.608Z"
                fill="currentColor"
                fillRule="evenodd"
              />
            </g>
          </g>
          <g transform="translate(0 0)">
            <g
              data-part="chip"
              style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
            >
              <rect
                fill="var(--ds-background-100)"
                height="23.4"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                width="33.928"
                x="586.5"
                y="219.5"
              />
              <path
                clipRule="evenodd"
                d="M591.8 224.8V225.972H594.433C594.71 225.972 594.934 226.197 594.934 226.474V235.925C594.934 236.202 594.71 236.427 594.433 236.427H591.8V237.599H615.128V236.427H612.495C612.218 236.427 611.993 236.202 611.993 235.925V226.474C611.993 226.197 612.218 225.972 612.495 225.972H615.128V224.8H591.8ZM610.319 236.427C610.596 236.427 610.821 236.202 610.821 235.925V226.474C610.821 226.197 610.596 225.972 610.319 225.972H604.552C604.274 225.972 604.05 226.197 604.05 226.474V235.925C604.05 236.202 604.274 236.427 604.552 236.427H610.319ZM602.376 236.427C602.653 236.427 602.878 236.202 602.878 235.925V226.474C602.878 226.197 602.653 225.972 602.376 225.972H596.608C596.331 225.972 596.107 226.197 596.107 226.474V235.925C596.107 236.202 596.331 236.427 596.608 236.427H602.376Z"
                fill="currentColor"
                fillRule="evenodd"
              />
            </g>
          </g>
          <g transform="translate(0 0)">
            <g
              data-part="chip"
              style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
            >
              <rect
                fill="var(--ds-background-100)"
                height="23.4"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                width="41.899"
                x="671.5"
                y="219.5"
              />
              <path
                clipRule="evenodd"
                d="M708.099 224.8V225.972H705.466C705.189 225.972 704.964 226.197 704.964 226.474V235.925C704.964 236.202 705.189 236.427 705.466 236.427H708.099V237.599H676.8V236.427H679.433C679.71 236.427 679.934 236.202 679.934 235.925V226.474C679.934 226.197 679.71 225.972 679.433 225.972H676.8V224.8H708.099ZM681.608 225.972C681.331 225.972 681.107 226.197 681.107 226.474V235.925C681.107 236.202 681.331 236.427 681.608 236.427H687.376C687.653 236.427 687.878 236.202 687.878 235.925V226.474C687.878 226.197 687.653 225.972 687.376 225.972H681.608ZM697.523 225.972C697.245 225.972 697.021 226.197 697.021 226.474V235.925C697.021 236.202 697.245 236.427 697.523 236.427H703.29C703.567 236.427 703.792 236.202 703.792 235.925V226.474C703.792 226.197 703.567 225.972 703.29 225.972H697.523ZM689.579 225.972C689.302 225.972 689.078 226.197 689.078 226.474V235.925C689.078 236.202 689.302 236.427 689.579 236.427H695.319C695.596 236.427 695.821 236.202 695.821 235.925V226.474C695.821 226.197 695.596 225.972 695.319 225.972H689.579Z"
                fill="currentColor"
                fillRule="evenodd"
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
        viewBox="0 0 404 300"
        aria-hidden="true"
        {...props}
      >
        <g data-group="rails">
          <line
            data-part="rail-dashed"
            stroke="currentColor"
            strokeDasharray="4 4"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            x1="81"
            y1="150"
            y2="150"
            x2="-6"
          />
          <line
            data-part="rail-dashed"
            stroke="currentColor"
            strokeDasharray="4 4"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            x1="323"
            y1="150"
            y2="150"
            x2="410"
          />
        </g>
        <g data-group="marks">
          <g data-rail="left">
            <line
              data-part="rail-solid"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              y1="150"
              y2="150"
              x1="35.94964285714284"
              x2="52.45714285714285"
            />
            <line
              data-part="rail-solid"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              y1="150"
              y2="150"
              x1="2.7353571428571275"
              x2="19.242857142857126"
            />
          </g>
          <g data-rail="right">
            <line
              data-part="rail-solid"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              y1="150"
              y2="150"
              x1="410"
              x2="410"
            />
            <line
              data-part="rail-solid"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              y1="150"
              y2="150"
              x1="410"
              x2="410"
            />
          </g>
        </g>
        <g data-group="rings">
          <mask
            height="206"
            id={`${id}-ring-0`}
            maskUnits="userSpaceOnUse"
            width="98"
            x="84"
            y="47"
          >
            <g
              data-part="ring-wipe"
              style={{
                transformBox: "fill-box",
                transformOrigin: "50% 0% 0px",
              }}
            >
              <rect
                fill="var(--ds-background-100)"
                height="206"
                width="49"
                x="133"
                y="47"
              />
            </g>
            <g
              data-part="ring-wipe"
              style={{
                transformBox: "fill-box",
                transformOrigin: "50% 100% 0px",
              }}
            >
              <rect
                fill="var(--ds-background-100)"
                height="206"
                width="49"
                x="84"
                y="47"
              />
            </g>
          </mask>
          <g mask={`url(#${id}-ring-0)`}>
            <ellipse
              cx="133"
              cy="150"
              data-part="ring"
              fill="none"
              rx="46"
              ry="100"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          </g>
          <mask
            height="236"
            id={`${id}-ring-1`}
            maskUnits="userSpaceOnUse"
            width="98"
            x="130"
            y="32"
          >
            <g
              data-part="ring-wipe"
              style={{
                transformBox: "fill-box",
                transformOrigin: "50% 0% 0px",
              }}
            >
              <rect
                fill="var(--ds-background-100)"
                height="236"
                width="49"
                x="179"
                y="32"
              />
            </g>
            <g
              data-part="ring-wipe"
              style={{
                transformBox: "fill-box",
                transformOrigin: "50% 100% 0px",
              }}
            >
              <rect
                fill="var(--ds-background-100)"
                height="236"
                width="49"
                x="130"
                y="32"
              />
            </g>
          </mask>
          <g mask={`url(#${id}-ring-1)`}>
            <ellipse
              cx="179"
              cy="150"
              data-part="ring"
              fill="none"
              rx="46"
              ry="115"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          </g>
          <mask
            height="236"
            id={`${id}-ring-2`}
            maskUnits="userSpaceOnUse"
            width="98"
            x="176"
            y="32"
          >
            <g
              data-part="ring-wipe"
              style={{
                transformBox: "fill-box",
                transformOrigin: "50% 0% 0px",
              }}
            >
              <rect
                fill="var(--ds-background-100)"
                height="236"
                width="49"
                x="225"
                y="32"
              />
            </g>
            <g
              data-part="ring-wipe"
              style={{
                transformBox: "fill-box",
                transformOrigin: "50% 100% 0px",
              }}
            >
              <rect
                fill="var(--ds-background-100)"
                height="236"
                width="49"
                x="176"
                y="32"
              />
            </g>
          </mask>
          <g mask={`url(#${id}-ring-2)`}>
            <ellipse
              cx="225"
              cy="150"
              data-part="ring"
              fill="none"
              rx="46"
              ry="115"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          </g>
          <mask
            height="206"
            id={`${id}-ring-3`}
            maskUnits="userSpaceOnUse"
            width="98"
            x="222"
            y="47"
          >
            <g
              data-part="ring-wipe"
              style={{
                transformBox: "fill-box",
                transformOrigin: "50% 0% 0px",
              }}
            >
              <rect
                fill="var(--ds-background-100)"
                height="206"
                width="49"
                x="271"
                y="47"
              />
            </g>
            <g
              data-part="ring-wipe"
              style={{
                transformBox: "fill-box",
                transformOrigin: "50% 100% 0px",
              }}
            >
              <rect
                fill="var(--ds-background-100)"
                height="206"
                width="49"
                x="222"
                y="47"
              />
            </g>
          </mask>
          <g mask={`url(#${id}-ring-3)`}>
            <ellipse
              cx="271"
              cy="150"
              data-part="ring"
              fill="none"
              rx="46"
              ry="100"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          </g>
        </g>
        <g data-group="caps">
          <g
            data-part="cap-ping"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          >
            <circle
              cx="87"
              cy="150"
              data-part="cap"
              fill="var(--ds-background-100)"
              r="5"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
            />
          </g>
          <g
            data-part="cap-ping"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          >
            <circle
              cx="317"
              cy="150"
              data-part="cap"
              fill="var(--ds-background-100)"
              r="5"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
            />
          </g>
        </g>
        <g data-group="chips">
          <g transform="translate(-293.52 -81.2)">
            <g
              data-part="chip"
              style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
            >
              <rect
                fill="var(--ds-background-100)"
                height="23.4"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                width="18.041"
                x="417.5"
                y="219.5"
              />
              <path
                clipRule="evenodd"
                d="M422.8 224.8V225.973H425.432C425.709 225.973 425.934 226.198 425.934 226.475V235.926C425.934 236.203 425.709 236.428 425.432 236.428H422.8V237.6H430.241V236.428H427.608C427.33 236.428 427.106 236.203 427.106 235.926V226.475C427.106 226.198 427.33 225.973 427.608 225.973H430.241V224.8H422.8Z"
                fill="currentColor"
                fillRule="evenodd"
              />
            </g>
          </g>
          <g transform="translate(-337.24 -81.2)">
            <g
              data-part="chip"
              style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
            >
              <rect
                fill="var(--ds-background-100)"
                height="23.4"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                width="25.482"
                x="503.5"
                y="219.5"
              />
              <path
                clipRule="evenodd"
                d="M523.682 224.8V225.973H521.049C520.772 225.973 520.547 226.198 520.547 226.475V235.926C520.547 236.203 520.772 236.428 521.049 236.428H523.682V237.6H508.8V236.428H511.432C511.709 236.428 511.934 236.203 511.934 235.926V226.475C511.934 226.198 511.709 225.973 511.432 225.973H508.8V224.8H523.682ZM513.608 225.973C513.33 225.973 513.106 226.198 513.106 226.475V235.926C513.106 236.203 513.33 236.428 513.608 236.428H518.873C519.15 236.428 519.375 236.203 519.375 235.926V226.475C519.375 226.198 519.15 225.973 518.873 225.973H513.608Z"
                fill="currentColor"
                fillRule="evenodd"
              />
            </g>
          </g>
          <g transform="translate(-378.46 -81.2)">
            <g
              data-part="chip"
              style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
            >
              <rect
                fill="var(--ds-background-100)"
                height="23.4"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                width="33.928"
                x="586.5"
                y="219.5"
              />
              <path
                clipRule="evenodd"
                d="M591.8 224.8V225.972H594.433C594.71 225.972 594.934 226.197 594.934 226.474V235.925C594.934 236.202 594.71 236.427 594.433 236.427H591.8V237.599H615.128V236.427H612.495C612.218 236.427 611.993 236.202 611.993 235.925V226.474C611.993 226.197 612.218 225.972 612.495 225.972H615.128V224.8H591.8ZM610.319 236.427C610.596 236.427 610.821 236.202 610.821 235.925V226.474C610.821 226.197 610.596 225.972 610.319 225.972H604.552C604.274 225.972 604.05 226.197 604.05 226.474V235.925C604.05 236.202 604.274 236.427 604.552 236.427H610.319ZM602.376 236.427C602.653 236.427 602.878 236.202 602.878 235.925V226.474C602.878 226.197 602.653 225.972 602.376 225.972H596.608C596.331 225.972 596.107 226.197 596.107 226.474V235.925C596.107 236.202 596.331 236.427 596.608 236.427H602.376Z"
                fill="currentColor"
                fillRule="evenodd"
              />
            </g>
          </g>
          <g transform="translate(-421.45 -81.2)">
            <g
              data-part="chip"
              style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
            >
              <rect
                fill="var(--ds-background-100)"
                height="23.4"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                width="41.899"
                x="671.5"
                y="219.5"
              />
              <path
                clipRule="evenodd"
                d="M708.099 224.8V225.972H705.466C705.189 225.972 704.964 226.197 704.964 226.474V235.925C704.964 236.202 705.189 236.427 705.466 236.427H708.099V237.599H676.8V236.427H679.433C679.71 236.427 679.934 236.202 679.934 235.925V226.474C679.934 226.197 679.71 225.972 679.433 225.972H676.8V224.8H708.099ZM681.608 225.972C681.331 225.972 681.107 226.197 681.107 226.474V235.925C681.107 236.202 681.331 236.427 681.608 236.427H687.376C687.653 236.427 687.878 236.202 687.878 235.925V226.474C687.878 226.197 687.653 225.972 687.376 225.972H681.608ZM697.523 225.972C697.245 225.972 697.021 226.197 697.021 226.474V235.925C697.021 236.202 697.245 236.427 697.523 236.427H703.29C703.567 236.427 703.792 236.202 703.792 235.925V226.474C703.792 226.197 703.567 225.972 703.29 225.972H697.523ZM689.579 225.972C689.302 225.972 689.078 226.197 689.078 226.474V235.925C689.078 236.202 689.302 236.427 689.579 236.427H695.319C695.596 236.427 695.821 236.202 695.821 235.925V226.474C695.821 226.197 695.596 225.972 695.319 225.972H689.579Z"
                fill="currentColor"
                fillRule="evenodd"
              />
            </g>
          </g>
        </g>
      </svg>
    )
  return null
}
