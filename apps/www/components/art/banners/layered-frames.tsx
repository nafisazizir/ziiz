import * as React from "react"

import type { ArtProps } from "../props"

// Ported from business.x.com: advertising/creative-best-practices.
export function LayeredFrames({
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
        viewBox="0 0 1118 462"
        aria-hidden="true"
        {...props}
      >
        <defs>
          <clipPath id={`${id}-composer`}>
            <rect height="208" width="126" x="380" y="70" />
          </clipPath>
          <clipPath id={`${id}-foot`}>
            <rect height="88" width="186" x="559" y="277" />
          </clipPath>
          <clipPath id={`${id}-corner`}>
            <rect height="117" width="117" x="443" y="277" />
          </clipPath>
          <clipPath id={`${id}-step`}>
            <rect height="87" width="69" x="375" y="277" />
          </clipPath>
          <clipPath id={`${id}-band`}>
            <rect height="114" width="266" x="505" y="164" />
          </clipPath>
          <clipPath id={`${id}-header`}>
            <rect height="75" width="240" x="505" y="90" />
          </clipPath>
          <clipPath id={`${id}-rail`}>
            <rect height="114" width="24" x="357" y="164" />
          </clipPath>
        </defs>
        <g transform="translate(0 0) scale(1)">
          <g
            data-part="camera"
            style={{
              transformBox: "view-box",
              transform: "scale(0.961728)",
              transformOrigin: "564px 232px 0px",
            }}
          >
            <g data-part="tiles">
              <g
                data-part="tile-composer"
                style={{ transformOrigin: "50% 50%", transformBox: "fill-box" }}
              >
                <g clipPath={`url(#${id}-composer)`}>
                  <rect
                    fill="var(--ds-background-100)"
                    height="208"
                    width="126"
                    x="380"
                    y="70"
                  />
                  <g transform="translate(411.5 119.5)">
                    <rect
                      fill="var(--ds-gray-100)"
                      height="237"
                      stroke="currentColor"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                      width="312"
                      x="0"
                      y="0"
                    />
                    <rect
                      fill="var(--ds-gray-100)"
                      height="28.5465"
                      stroke="currentColor"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                      width="28.5465"
                      x="12"
                      y="12"
                    />
                    <rect
                      fill="var(--ds-gray-100)"
                      height="5"
                      stroke="currentColor"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                      width="54"
                      x="47.918"
                      y="25.264"
                    />
                    <rect
                      fill="var(--ds-gray-100)"
                      height="5"
                      stroke="currentColor"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                      width="68"
                      x="47.918"
                      y="33.377"
                    />
                    <rect
                      fill="none"
                      height="180.585"
                      stroke="currentColor"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                      width="193"
                      x="47.918"
                      y="45.415"
                    />
                  </g>
                </g>
                <rect
                  fill="none"
                  height="207"
                  stroke="currentColor"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                  width="125"
                  x="380.5"
                  y="70.5"
                />
              </g>
              <g
                data-part="tile-foot"
                style={{ transformOrigin: "50% 50%", transformBox: "fill-box" }}
              >
                <g clipPath={`url(#${id}-foot)`}>
                  <rect
                    fill="var(--ds-background-100)"
                    height="88"
                    width="186"
                    x="559"
                    y="277"
                  />
                  <g transform="translate(405.5 101.5)">
                    <rect
                      fill="var(--ds-gray-100)"
                      height="237"
                      stroke="currentColor"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                      width="312"
                      x="0"
                      y="0"
                    />
                    <rect
                      fill="none"
                      height="180.585"
                      stroke="currentColor"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                      width="193"
                      x="47.918"
                      y="45.415"
                    />
                    <rect
                      fill="none"
                      height="180.585"
                      stroke="currentColor"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                      width="53.0805"
                      x="247.918"
                      y="45.415"
                    />
                  </g>
                </g>
                <rect
                  fill="none"
                  height="87"
                  stroke="currentColor"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                  width="185"
                  x="559.5"
                  y="277.5"
                />
              </g>
              <g
                data-part="tile-corner"
                style={{ transformOrigin: "50% 50%", transformBox: "fill-box" }}
              >
                <g clipPath={`url(#${id}-corner)`}>
                  <rect
                    fill="var(--ds-background-100)"
                    height="117"
                    width="117"
                    x="443"
                    y="277"
                  />
                  <g transform="translate(411.5 101.5)">
                    <rect
                      fill="var(--ds-gray-100)"
                      height="237"
                      stroke="currentColor"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                      width="312"
                      x="0"
                      y="0"
                    />
                    <rect
                      fill="none"
                      height="180.585"
                      stroke="currentColor"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                      width="193"
                      x="47.918"
                      y="45.415"
                    />
                  </g>
                </g>
                <rect
                  fill="none"
                  height="116"
                  stroke="currentColor"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                  width="116"
                  x="443.5"
                  y="277.5"
                />
              </g>
              <g
                data-part="tile-step"
                style={{ transformOrigin: "50% 50%", transformBox: "fill-box" }}
              >
                <g clipPath={`url(#${id}-step)`}>
                  <rect
                    fill="var(--ds-background-100)"
                    height="87"
                    width="69"
                    x="375"
                    y="277"
                  />
                  <g transform="translate(411.5 101.5)">
                    <rect
                      fill="var(--ds-gray-100)"
                      height="237"
                      stroke="currentColor"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                      width="312"
                      x="0"
                      y="0"
                    />
                  </g>
                </g>
                <rect
                  fill="none"
                  height="86"
                  stroke="currentColor"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                  width="68"
                  x="375.5"
                  y="277.5"
                />
              </g>
              <g
                data-part="tile-band"
                style={{ transformOrigin: "50% 50%", transformBox: "fill-box" }}
              >
                <g clipPath={`url(#${id}-band)`}>
                  <rect
                    fill="var(--ds-background-100)"
                    height="114"
                    width="266"
                    x="505"
                    y="164"
                  />
                  <g transform="translate(405.5 115.5)">
                    <rect
                      fill="var(--ds-gray-100)"
                      height="237"
                      stroke="currentColor"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                      width="312"
                      x="0"
                      y="0"
                    />
                    <rect
                      fill="none"
                      height="180.585"
                      stroke="currentColor"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                      width="193"
                      x="47.918"
                      y="45.415"
                    />
                    <rect
                      fill="none"
                      height="180.585"
                      stroke="currentColor"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                      width="53.0805"
                      x="247.918"
                      y="45.415"
                    />
                  </g>
                </g>
                <rect
                  fill="none"
                  height="113"
                  stroke="currentColor"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                  width="265"
                  x="505.5"
                  y="164.5"
                />
              </g>
              <g
                data-part="tile-header"
                style={{ transformOrigin: "50% 50%", transformBox: "fill-box" }}
              >
                <g clipPath={`url(#${id}-header)`}>
                  <rect
                    fill="var(--ds-background-100)"
                    height="75"
                    width="240"
                    x="505"
                    y="90"
                  />
                  <g transform="translate(405.5 119.5)">
                    <rect
                      fill="var(--ds-gray-100)"
                      height="237"
                      stroke="currentColor"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                      width="312"
                      x="0"
                      y="0"
                    />
                    <rect
                      fill="var(--ds-gray-100)"
                      height="5"
                      stroke="currentColor"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                      width="93"
                      x="47.918"
                      y="25.264"
                    />
                    <rect
                      fill="var(--ds-gray-100)"
                      height="5"
                      stroke="currentColor"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                      width="68"
                      x="47.918"
                      y="33.377"
                    />
                    <rect
                      fill="var(--ds-gray-200)"
                      height="5.07539"
                      stroke="currentColor"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                      width="44.0025"
                      x="118.992"
                      y="33.339"
                    />
                    <rect
                      fill="none"
                      height="180.585"
                      stroke="currentColor"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                      width="193"
                      x="47.918"
                      y="45.415"
                    />
                    <rect
                      fill="none"
                      height="180.585"
                      stroke="currentColor"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                      width="53.0805"
                      x="247.918"
                      y="45.415"
                    />
                  </g>
                </g>
                <rect
                  fill="none"
                  height="74"
                  stroke="currentColor"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                  width="239"
                  x="505.5"
                  y="90.5"
                />
              </g>
              <g
                data-part="tile-rail"
                style={{ transformOrigin: "50% 50%", transformBox: "fill-box" }}
              >
                <g clipPath={`url(#${id}-rail)`}>
                  <rect
                    fill="var(--ds-background-100)"
                    height="114"
                    width="24"
                    x="357"
                    y="164"
                  />
                </g>
                <rect
                  fill="none"
                  height="113"
                  stroke="currentColor"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                  width="23"
                  x="357.5"
                  y="164.5"
                />
              </g>
            </g>
            <g data-part="rays">
              <line
                data-part="ray-solid"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                x1="380"
                y1="70"
                x2="298.70157068062827"
                y2="-11.298429319371735"
              />
              <line
                data-part="ray-solid"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                x1="375"
                y1="364"
                x2="264.38219895287955"
                y2="474.61780104712045"
              />
              <line
                data-part="ray-solid"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                x1="745"
                y1="90"
                x2="847.2408376963351"
                y2="-12.240837696335078"
              />
              <line
                data-part="ray-solid"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                x1="745"
                y1="365"
                x2="854.5706806282723"
                y2="474.57068062827227"
              />
              <line
                data-part="ray-dashed"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                x1="357"
                y1="164"
                strokeDasharray="5 5"
                x2="-24.821989528795825"
                y2="57.85348691099475"
              />
              <line
                data-part="ray-dashed"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                x1="357"
                y1="278"
                strokeDasharray="5 5"
                x2="-24.821989528795825"
                y2="384.1465130890052"
              />
              <line
                data-part="ray-dashed"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                x1="771"
                y1="164"
                strokeDasharray="5 5"
                x2="1142.3507853403141"
                y2="60.76448167539266"
              />
              <line
                data-part="ray-dashed"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                x1="771"
                y1="278"
                strokeDasharray="5 5"
                x2="1142.3507853403141"
                y2="381.23551832460737"
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
        viewBox="0 0 404 343"
        aria-hidden="true"
        {...props}
      >
        <defs>
          <clipPath id={`${id}-composer`}>
            <rect height="208" width="126" x="380" y="70" />
          </clipPath>
          <clipPath id={`${id}-foot`}>
            <rect height="88" width="186" x="559" y="277" />
          </clipPath>
          <clipPath id={`${id}-corner`}>
            <rect height="117" width="117" x="443" y="277" />
          </clipPath>
          <clipPath id={`${id}-step`}>
            <rect height="87" width="69" x="375" y="277" />
          </clipPath>
          <clipPath id={`${id}-band`}>
            <rect height="114" width="266" x="505" y="164" />
          </clipPath>
          <clipPath id={`${id}-header`}>
            <rect height="75" width="240" x="505" y="90" />
          </clipPath>
          <clipPath id={`${id}-rail`}>
            <rect height="114" width="24" x="357" y="164" />
          </clipPath>
        </defs>
        <g transform="translate(-177.76 15.486666666666672) scale(0.6733333333333333)">
          <g
            data-part="camera"
            style={{
              transformBox: "view-box",
              transform: "scale(0.965187)",
              transformOrigin: "564px 232px 0px",
            }}
          >
            <g data-part="tiles">
              <g
                data-part="tile-composer"
                style={{ transformOrigin: "50% 50%", transformBox: "fill-box" }}
              >
                <g clipPath={`url(#${id}-composer)`}>
                  <rect
                    fill="var(--ds-background-100)"
                    height="208"
                    width="126"
                    x="380"
                    y="70"
                  />
                  <g transform="translate(411.5 119.5)">
                    <rect
                      fill="var(--ds-gray-100)"
                      height="237"
                      stroke="currentColor"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                      width="312"
                      x="0"
                      y="0"
                    />
                    <rect
                      fill="var(--ds-gray-100)"
                      height="28.5465"
                      stroke="currentColor"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                      width="28.5465"
                      x="12"
                      y="12"
                    />
                    <rect
                      fill="var(--ds-gray-100)"
                      height="5"
                      stroke="currentColor"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                      width="54"
                      x="47.918"
                      y="25.264"
                    />
                    <rect
                      fill="var(--ds-gray-100)"
                      height="5"
                      stroke="currentColor"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                      width="68"
                      x="47.918"
                      y="33.377"
                    />
                    <rect
                      fill="none"
                      height="180.585"
                      stroke="currentColor"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                      width="193"
                      x="47.918"
                      y="45.415"
                    />
                  </g>
                </g>
                <rect
                  fill="none"
                  height="207"
                  stroke="currentColor"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                  width="125"
                  x="380.5"
                  y="70.5"
                />
              </g>
              <g
                data-part="tile-foot"
                style={{ transformOrigin: "50% 50%", transformBox: "fill-box" }}
              >
                <g clipPath={`url(#${id}-foot)`}>
                  <rect
                    fill="var(--ds-background-100)"
                    height="88"
                    width="186"
                    x="559"
                    y="277"
                  />
                  <g transform="translate(405.5 101.5)">
                    <rect
                      fill="var(--ds-gray-100)"
                      height="237"
                      stroke="currentColor"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                      width="312"
                      x="0"
                      y="0"
                    />
                    <rect
                      fill="none"
                      height="180.585"
                      stroke="currentColor"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                      width="193"
                      x="47.918"
                      y="45.415"
                    />
                    <rect
                      fill="none"
                      height="180.585"
                      stroke="currentColor"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                      width="53.0805"
                      x="247.918"
                      y="45.415"
                    />
                  </g>
                </g>
                <rect
                  fill="none"
                  height="87"
                  stroke="currentColor"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                  width="185"
                  x="559.5"
                  y="277.5"
                />
              </g>
              <g
                data-part="tile-corner"
                style={{ transformOrigin: "50% 50%", transformBox: "fill-box" }}
              >
                <g clipPath={`url(#${id}-corner)`}>
                  <rect
                    fill="var(--ds-background-100)"
                    height="117"
                    width="117"
                    x="443"
                    y="277"
                  />
                  <g transform="translate(411.5 101.5)">
                    <rect
                      fill="var(--ds-gray-100)"
                      height="237"
                      stroke="currentColor"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                      width="312"
                      x="0"
                      y="0"
                    />
                    <rect
                      fill="none"
                      height="180.585"
                      stroke="currentColor"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                      width="193"
                      x="47.918"
                      y="45.415"
                    />
                  </g>
                </g>
                <rect
                  fill="none"
                  height="116"
                  stroke="currentColor"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                  width="116"
                  x="443.5"
                  y="277.5"
                />
              </g>
              <g
                data-part="tile-step"
                style={{ transformOrigin: "50% 50%", transformBox: "fill-box" }}
              >
                <g clipPath={`url(#${id}-step)`}>
                  <rect
                    fill="var(--ds-background-100)"
                    height="87"
                    width="69"
                    x="375"
                    y="277"
                  />
                  <g transform="translate(411.5 101.5)">
                    <rect
                      fill="var(--ds-gray-100)"
                      height="237"
                      stroke="currentColor"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                      width="312"
                      x="0"
                      y="0"
                    />
                  </g>
                </g>
                <rect
                  fill="none"
                  height="86"
                  stroke="currentColor"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                  width="68"
                  x="375.5"
                  y="277.5"
                />
              </g>
              <g
                data-part="tile-band"
                style={{ transformOrigin: "50% 50%", transformBox: "fill-box" }}
              >
                <g clipPath={`url(#${id}-band)`}>
                  <rect
                    fill="var(--ds-background-100)"
                    height="114"
                    width="266"
                    x="505"
                    y="164"
                  />
                  <g transform="translate(405.5 115.5)">
                    <rect
                      fill="var(--ds-gray-100)"
                      height="237"
                      stroke="currentColor"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                      width="312"
                      x="0"
                      y="0"
                    />
                    <rect
                      fill="none"
                      height="180.585"
                      stroke="currentColor"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                      width="193"
                      x="47.918"
                      y="45.415"
                    />
                    <rect
                      fill="none"
                      height="180.585"
                      stroke="currentColor"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                      width="53.0805"
                      x="247.918"
                      y="45.415"
                    />
                  </g>
                </g>
                <rect
                  fill="none"
                  height="113"
                  stroke="currentColor"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                  width="265"
                  x="505.5"
                  y="164.5"
                />
              </g>
              <g
                data-part="tile-header"
                style={{ transformOrigin: "50% 50%", transformBox: "fill-box" }}
              >
                <g clipPath={`url(#${id}-header)`}>
                  <rect
                    fill="var(--ds-background-100)"
                    height="75"
                    width="240"
                    x="505"
                    y="90"
                  />
                  <g transform="translate(405.5 119.5)">
                    <rect
                      fill="var(--ds-gray-100)"
                      height="237"
                      stroke="currentColor"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                      width="312"
                      x="0"
                      y="0"
                    />
                    <rect
                      fill="var(--ds-gray-100)"
                      height="5"
                      stroke="currentColor"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                      width="93"
                      x="47.918"
                      y="25.264"
                    />
                    <rect
                      fill="var(--ds-gray-100)"
                      height="5"
                      stroke="currentColor"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                      width="68"
                      x="47.918"
                      y="33.377"
                    />
                    <rect
                      fill="var(--ds-gray-200)"
                      height="5.07539"
                      stroke="currentColor"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                      width="44.0025"
                      x="118.992"
                      y="33.339"
                    />
                    <rect
                      fill="none"
                      height="180.585"
                      stroke="currentColor"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                      width="193"
                      x="47.918"
                      y="45.415"
                    />
                    <rect
                      fill="none"
                      height="180.585"
                      stroke="currentColor"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                      width="53.0805"
                      x="247.918"
                      y="45.415"
                    />
                  </g>
                </g>
                <rect
                  fill="none"
                  height="74"
                  stroke="currentColor"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                  width="239"
                  x="505.5"
                  y="90.5"
                />
              </g>
              <g
                data-part="tile-rail"
                style={{ transformOrigin: "50% 50%", transformBox: "fill-box" }}
              >
                <g clipPath={`url(#${id}-rail)`}>
                  <rect
                    fill="var(--ds-background-100)"
                    height="114"
                    width="24"
                    x="357"
                    y="164"
                  />
                </g>
                <rect
                  fill="none"
                  height="113"
                  stroke="currentColor"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                  width="23"
                  x="357.5"
                  y="164.5"
                />
              </g>
            </g>
            <g data-part="rays">
              <line
                data-part="ray-solid"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                x1="380"
                y1="70"
                x2="274.6178010471204"
                y2="-35.38219895287959"
              />
              <line
                data-part="ray-solid"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                x1="375"
                y1="364"
                x2="250.7696335078534"
                y2="488.2303664921466"
              />
              <line
                data-part="ray-solid"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                x1="745"
                y1="90"
                x2="871.3246073298429"
                y2="-36.324607329842934"
              />
              <line
                data-part="ray-solid"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                x1="745"
                y1="365"
                x2="877.6073298429319"
                y2="497.60732984293196"
              />
              <line
                data-part="ray-dashed"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                x1="357"
                y1="164"
                strokeDasharray="5.9405940594059405 5.9405940594059405"
                x2="251.6178010471204"
                y2="134.70374869109946"
              />
              <line
                data-part="ray-dashed"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                x1="357"
                y1="278"
                strokeDasharray="5.9405940594059405 5.9405940594059405"
                x2="251.6178010471204"
                y2="307.29625130890054"
              />
              <line
                data-part="ray-dashed"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                x1="771"
                y1="164"
                strokeDasharray="5.9405940594059405 5.9405940594059405"
                x2="876.3821989528795"
                y2="134.70374869109946"
              />
              <line
                data-part="ray-dashed"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                x1="771"
                y1="278"
                strokeDasharray="5.9405940594059405 5.9405940594059405"
                x2="876.3821989528795"
                y2="307.29625130890054"
              />
            </g>
          </g>
        </g>
      </svg>
    )
  return null
}
