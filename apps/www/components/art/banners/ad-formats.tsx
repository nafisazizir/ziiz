import * as React from "react"

import type { ArtProps } from "../props"

// Ported from business.x.com: advertising/formats, products.
export function AdFormats({
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
          <clipPath id={`${id}-collection-desktop`}>
            <rect height="159.5" width="201" x="668.5" y="231" />
          </clipPath>
        </defs>
        <g>
          <g data-part="axis">
            <line
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="554"
              y1="230.577"
              x2="-16.949"
              y2="230.577"
            />
            <line
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="554"
              y1="230.577"
              x2="1126.66"
              y2="230.577"
            />
            <line
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="554"
              y1="230.577"
              x2="554"
              y2="0"
            />
            <line
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="554"
              y1="230.577"
              x2="554"
              y2="462"
            />
          </g>
          <g data-part="rails">
            <clipPath id={`${id}-collection-desktop-rail-top`}>
              <rect
                height="12"
                y="53.5698"
                width="1143.6090000000002px"
                x="-18.949"
              />
            </clipPath>
            <line
              clipPath={`url(#${id}-collection-desktop-rail-top)`}
              stroke="currentColor"
              strokeDasharray="6.017 6.017"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="-18.949"
              x2="1124.66"
              y1="59.5698"
              y2="59.5698"
            />
            <clipPath id={`${id}-collection-desktop-rail-bottom`}>
              <rect
                height="12"
                y="413.857"
                width="1143.6090000000002px"
                x="-18.949"
              />
            </clipPath>
            <line
              clipPath={`url(#${id}-collection-desktop-rail-bottom)`}
              stroke="currentColor"
              strokeDasharray="6.017 6.017"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="-18.949"
              x2="1124.66"
              y1="419.857"
              y2="419.857"
            />
          </g>
          <g data-part="marks">
            <g style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}>
              <rect
                fill="currentColor"
                height="6"
                width="6"
                x="198.219"
                y="227.575"
              />
            </g>
            <g style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}>
              <rect
                fill="currentColor"
                height="6"
                width="6"
                x="926"
                y="227.575"
              />
            </g>
            <g style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}>
              <rect
                fill="var(--ds-background-100)"
                height="7.42073"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                transform="translate(553.954 59.5695) rotate(45)"
                width="7.42073"
                x="-3.710365"
                y="-3.710365"
              />
            </g>
            <g style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}>
              <rect
                fill="var(--ds-background-100)"
                height="7.42073"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                transform="translate(553.954 419.855) rotate(45)"
                width="7.42073"
                x="-3.710365"
                y="-3.710365"
              />
            </g>
          </g>
          <g data-part="fan-left">
            <g>
              <line
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                x1="132.35"
                y1="230.7"
                x2="84.1945"
                y2="182.591"
              />
              <g
                style={{
                  transform: "translateX(85.8027px) translateY(184.198px)",
                  transformOrigin: "50% 50%",
                  transformBox: "fill-box",
                }}
              >
                <g
                  style={{
                    transformBox: "fill-box",
                    transformOrigin: "50% 50%",
                  }}
                >
                  <rect
                    fill="var(--ds-background-100)"
                    height="5"
                    stroke="currentColor"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                    width="5"
                    x="-2.5"
                    y="-2.5"
                  />
                  <rect
                    fill="currentColor"
                    height="5"
                    width="5"
                    x="-2.5"
                    y="-2.5"
                    opacity="0.010141175851458684"
                  />
                </g>
              </g>
            </g>
            <g>
              <line
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                x1="132.35"
                y1="230.7"
                x2="73.1448"
                y2="196.733"
              />
              <g
                style={{
                  transform: "translateX(74.75px) translateY(196.732px)",
                  transformOrigin: "50% 50%",
                  transformBox: "fill-box",
                }}
              >
                <g
                  style={{
                    transformBox: "fill-box",
                    transformOrigin: "50% 50%",
                  }}
                >
                  <rect
                    fill="var(--ds-background-100)"
                    height="5"
                    stroke="currentColor"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                    width="5"
                    x="-2.5"
                    y="-2.5"
                  />
                  <rect
                    fill="currentColor"
                    height="5"
                    width="5"
                    x="-2.5"
                    y="-2.5"
                    opacity="0.9898588241485413"
                  />
                </g>
              </g>
            </g>
            <g>
              <line
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                x1="132.35"
                y1="230.7"
                x2="66.578"
                y2="213.263"
              />
              <g
                style={{
                  transform: "translateX(67.5645px) translateY(214.298px)",
                  transformOrigin: "50% 50%",
                  transformBox: "fill-box",
                }}
              >
                <g
                  style={{
                    transformBox: "fill-box",
                    transformOrigin: "50% 50%",
                  }}
                >
                  <rect
                    fill="var(--ds-background-100)"
                    height="5"
                    stroke="currentColor"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                    width="5"
                    x="-2.5"
                    y="-2.5"
                  />
                  <rect
                    fill="currentColor"
                    height="5"
                    width="5"
                    x="-2.5"
                    y="-2.5"
                    opacity="0.010141175851458684"
                  />
                </g>
              </g>
            </g>
            <g>
              <line
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                x1="132.35"
                y1="230.7"
                x2="66.578"
                y2="248.217"
              />
              <g
                style={{
                  transform: "translateX(67.5645px) translateY(247.027px)",
                  transformOrigin: "50% 50%",
                  transformBox: "fill-box",
                }}
              >
                <g
                  style={{
                    transformBox: "fill-box",
                    transformOrigin: "50% 50%",
                  }}
                >
                  <rect
                    fill="var(--ds-background-100)"
                    height="5"
                    stroke="currentColor"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                    width="5"
                    x="-2.5"
                    y="-2.5"
                  />
                  <rect
                    fill="currentColor"
                    height="5"
                    width="5"
                    x="-2.5"
                    y="-2.5"
                    opacity="0.9898588241485413"
                  />
                </g>
              </g>
            </g>
            <g>
              <line
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                x1="132.35"
                y1="230.7"
                x2="73.1448"
                y2="264.747"
              />
              <g
                style={{
                  transform: "translateX(74.75px) translateY(264.748px)",
                  transformOrigin: "50% 50%",
                  transformBox: "fill-box",
                }}
              >
                <g
                  style={{
                    transformBox: "fill-box",
                    transformOrigin: "50% 50%",
                  }}
                >
                  <rect
                    fill="var(--ds-background-100)"
                    height="5"
                    stroke="currentColor"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                    width="5"
                    x="-2.5"
                    y="-2.5"
                  />
                  <rect
                    fill="currentColor"
                    height="5"
                    width="5"
                    x="-2.5"
                    y="-2.5"
                    opacity="0.010141175851458684"
                  />
                </g>
              </g>
            </g>
            <g>
              <line
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                x1="132.35"
                y1="230.7"
                x2="84.1945"
                y2="278.889"
              />
              <g
                style={{
                  transform: "translateX(85.8027px) translateY(277.282px)",
                  transformOrigin: "50% 50%",
                  transformBox: "fill-box",
                }}
              >
                <g
                  style={{
                    transformBox: "fill-box",
                    transformOrigin: "50% 50%",
                  }}
                >
                  <rect
                    fill="var(--ds-background-100)"
                    height="5"
                    stroke="currentColor"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                    width="5"
                    x="-2.5"
                    y="-2.5"
                  />
                  <rect
                    fill="currentColor"
                    height="5"
                    width="5"
                    x="-2.5"
                    y="-2.5"
                    opacity="0.9898588241485413"
                  />
                </g>
              </g>
            </g>
            <circle
              cx="128.41"
              cy="230.576"
              fill="var(--ds-background-100)"
              r="11.5"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
            />
          </g>
          <g data-part="fan-right">
            <g>
              <line
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                x1="997.868"
                y1="230.7"
                x2="1046.0235"
                y2="182.591"
              />
              <g
                style={{
                  transform: "translateX(1044.42px) translateY(184.198px)",
                  transformOrigin: "50% 50%",
                  transformBox: "fill-box",
                }}
              >
                <g
                  style={{
                    transformBox: "fill-box",
                    transformOrigin: "50% 50%",
                  }}
                >
                  <rect
                    fill="var(--ds-background-100)"
                    height="5"
                    stroke="currentColor"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                    width="5"
                    x="-2.5"
                    y="-2.5"
                  />
                  <rect
                    fill="currentColor"
                    height="5"
                    width="5"
                    x="-2.5"
                    y="-2.5"
                    opacity="0.010141175851458684"
                  />
                </g>
              </g>
            </g>
            <g>
              <line
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                x1="997.868"
                y1="230.7"
                x2="1057.0732"
                y2="196.733"
              />
              <g
                style={{
                  transform: "translateX(1055.47px) translateY(196.732px)",
                  transformOrigin: "50% 50%",
                  transformBox: "fill-box",
                }}
              >
                <g
                  style={{
                    transformBox: "fill-box",
                    transformOrigin: "50% 50%",
                  }}
                >
                  <rect
                    fill="var(--ds-background-100)"
                    height="5"
                    stroke="currentColor"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                    width="5"
                    x="-2.5"
                    y="-2.5"
                  />
                  <rect
                    fill="currentColor"
                    height="5"
                    width="5"
                    x="-2.5"
                    y="-2.5"
                    opacity="0.9898588241485413"
                  />
                </g>
              </g>
            </g>
            <g>
              <line
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                x1="997.868"
                y1="230.7"
                x2="1063.64"
                y2="213.263"
              />
              <g
                style={{
                  transform: "translateX(1062.65px) translateY(214.298px)",
                  transformOrigin: "50% 50%",
                  transformBox: "fill-box",
                }}
              >
                <g
                  style={{
                    transformBox: "fill-box",
                    transformOrigin: "50% 50%",
                  }}
                >
                  <rect
                    fill="var(--ds-background-100)"
                    height="5"
                    stroke="currentColor"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                    width="5"
                    x="-2.5"
                    y="-2.5"
                  />
                  <rect
                    fill="currentColor"
                    height="5"
                    width="5"
                    x="-2.5"
                    y="-2.5"
                    opacity="0.010141175851458684"
                  />
                </g>
              </g>
            </g>
            <g>
              <line
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                x1="997.868"
                y1="230.7"
                x2="1063.64"
                y2="248.217"
              />
              <g
                style={{
                  transform: "translateX(1062.65px) translateY(247.027px)",
                  transformOrigin: "50% 50%",
                  transformBox: "fill-box",
                }}
              >
                <g
                  style={{
                    transformBox: "fill-box",
                    transformOrigin: "50% 50%",
                  }}
                >
                  <rect
                    fill="var(--ds-background-100)"
                    height="5"
                    stroke="currentColor"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                    width="5"
                    x="-2.5"
                    y="-2.5"
                  />
                  <rect
                    fill="currentColor"
                    height="5"
                    width="5"
                    x="-2.5"
                    y="-2.5"
                    opacity="0.9898588241485413"
                  />
                </g>
              </g>
            </g>
            <g>
              <line
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                x1="997.868"
                y1="230.7"
                x2="1057.0732"
                y2="264.747"
              />
              <g
                style={{
                  transform: "translateX(1055.47px) translateY(264.748px)",
                  transformOrigin: "50% 50%",
                  transformBox: "fill-box",
                }}
              >
                <g
                  style={{
                    transformBox: "fill-box",
                    transformOrigin: "50% 50%",
                  }}
                >
                  <rect
                    fill="var(--ds-background-100)"
                    height="5"
                    stroke="currentColor"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                    width="5"
                    x="-2.5"
                    y="-2.5"
                  />
                  <rect
                    fill="currentColor"
                    height="5"
                    width="5"
                    x="-2.5"
                    y="-2.5"
                    opacity="0.010141175851458684"
                  />
                </g>
              </g>
            </g>
            <g>
              <line
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                x1="997.868"
                y1="230.7"
                x2="1046.0235"
                y2="278.889"
              />
              <g
                style={{
                  transform: "translateX(1044.42px) translateY(277.282px)",
                  transformOrigin: "50% 50%",
                  transformBox: "fill-box",
                }}
              >
                <g
                  style={{
                    transformBox: "fill-box",
                    transformOrigin: "50% 50%",
                  }}
                >
                  <rect
                    fill="var(--ds-background-100)"
                    height="5"
                    stroke="currentColor"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                    width="5"
                    x="-2.5"
                    y="-2.5"
                  />
                  <rect
                    fill="currentColor"
                    height="5"
                    width="5"
                    x="-2.5"
                    y="-2.5"
                    opacity="0.9898588241485413"
                  />
                </g>
              </g>
            </g>
            <circle
              cx="1001.809"
              cy="230.576"
              fill="var(--ds-background-100)"
              r="11.5"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
            />
          </g>
          <g data-part="hub">
            <circle
              cx="553.805"
              cy="230.805"
              fill="var(--ds-background-100)"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              r="50.3047"
            />
            <g style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}>
              <circle cx="553.805" cy="230.805" fill="currentColor" r="24" />
              <path
                d="M564.359 241.367L556.165 229.257L563.809 220.242H561.149L554.983 227.516L550.065 220.242H543.36L551.258 231.916L543.242 241.367H545.903L552.441 233.656L557.66 241.367H564.367H564.359ZM549.189 221.941L561.182 239.669H558.531L546.536 221.941H549.186H549.189Z"
                fill="var(--ds-background-100)"
              />
            </g>
          </g>
          <g data-part="windows">
            <g style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}>
              <g>
                <rect
                  height="270"
                  width="176"
                  x="272"
                  y="120"
                  fill="var(--ds-gray-100)"
                />
                <rect
                  fill="var(--ds-background-100)"
                  height="216"
                  stroke="currentColor"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                  width="149"
                  x="285.5"
                  y="160.5"
                />
                <path
                  d="M352.5 255.003C352.5 253.049 354.641 251.851 356.307 252.872L365.979 258.8C367.571 259.775 367.571 262.088 365.979 263.063L356.307 268.991C354.641 270.012 352.5 268.814 352.5 266.86V255.003Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />
                <rect
                  fill="none"
                  height="21"
                  stroke="currentColor"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                  width="21"
                  x="297.5"
                  y="341.5"
                />
                <rect
                  fill="none"
                  height="8"
                  stroke="currentColor"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                  width="43"
                  x="329.5"
                  y="341.5"
                />
                <rect
                  fill="none"
                  height="8"
                  stroke="currentColor"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                  width="93"
                  x="329.5"
                  y="354.5"
                />
                <rect
                  fill="none"
                  height="269"
                  stroke="currentColor"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                  width="175"
                  x="272.5"
                  y="120.5"
                />
                <line
                  stroke="currentColor"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                  x1="272.5"
                  x2="447.5"
                  y1="147.5"
                  y2="147.5"
                />
                <text
                  fill="currentColor"
                  fontSize="13"
                  fontWeight="500"
                  data-part="label"
                >
                  <tspan x="280.5" y="138.9">
                    {"Go to "}
                    {"Vertical Video"}
                  </tspan>
                </text>
                <g
                  opacity="0"
                  style={{
                    transform: "translateX(-4px)",
                    transformOrigin: "50% 50%",
                    transformBox: "fill-box",
                  }}
                >
                  <g transform="translate(425.5 127.5)">
                    <path
                      d="M11.9082 7L7.58333 11.3249L6.75846 10.5L9.67513 7.58333H2.33333V6.41667H9.67513L6.75846 3.5L7.58333 2.67513L11.9082 7Z"
                      fill="currentColor"
                    />
                  </g>
                </g>
                <rect
                  opacity="0"
                  fill="none"
                  height="278"
                  stroke="currentColor"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                  width="184"
                  x="268"
                  y="116"
                />
              </g>
            </g>
            <g style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}>
              <g>
                <rect
                  height="131.8"
                  width="202"
                  x="616"
                  y="32"
                  fill="var(--ds-gray-100)"
                />
                <g opacity="0.9">
                  <rect
                    fill="var(--ds-background-100)"
                    height="42"
                    stroke="currentColor"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                    width="175"
                    x="629.5"
                    y="72.5"
                  />
                  <g>
                    <rect
                      fill="none"
                      height="20"
                      stroke="currentColor"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                      width="20"
                      x="640.5"
                      y="83.5"
                    />
                    <rect
                      fill="none"
                      height="7"
                      stroke="currentColor"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                      width="50"
                      x="669.5"
                      y="84.5"
                    />
                    <rect
                      fill="none"
                      height="7"
                      stroke="currentColor"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                      width="20"
                      x="669.5"
                      y="95.5"
                    />
                    <rect
                      fill="none"
                      height="7"
                      stroke="currentColor"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                      width="42"
                      x="693.5"
                      y="95.5"
                    />
                  </g>
                  <g>
                    <rect
                      fill="none"
                      height="21"
                      stroke="currentColor"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                      width="20"
                      x="640.5"
                      y="125.5"
                    />
                    <rect
                      fill="none"
                      height="7"
                      stroke="currentColor"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                      width="44"
                      x="669.5"
                      y="127.5"
                    />
                    <rect
                      fill="none"
                      height="7"
                      stroke="currentColor"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                      width="30"
                      x="669.5"
                      y="137.5"
                    />
                    <rect
                      fill="none"
                      height="7"
                      stroke="currentColor"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                      width="20"
                      x="703.5"
                      y="137.5"
                    />
                  </g>
                </g>
                <rect
                  fill="none"
                  height="130.8"
                  stroke="currentColor"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                  width="201"
                  x="616.5"
                  y="32.5"
                />
                <line
                  stroke="currentColor"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                  x1="616.5"
                  x2="817.5"
                  y1="59.5"
                  y2="59.5"
                />
                <text
                  fill="currentColor"
                  fontSize="13"
                  fontWeight="500"
                  data-part="label"
                >
                  <tspan x="624.5" y="50.9">
                    {"Go to "}
                    {">x< Amplify"}
                  </tspan>
                </text>
                <g
                  opacity="0"
                  style={{
                    transform: "translateX(-4px)",
                    transformOrigin: "50% 50%",
                    transformBox: "fill-box",
                  }}
                >
                  <g transform="translate(795.5 39.5)">
                    <path
                      d="M11.9082 7L7.58333 11.3249L6.75846 10.5L9.67513 7.58333H2.33333V6.41667H9.67513L6.75846 3.5L7.58333 2.67513L11.9082 7Z"
                      fill="currentColor"
                    />
                  </g>
                </g>
                <rect
                  opacity="0"
                  fill="none"
                  height="139.8"
                  stroke="currentColor"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                  width="210"
                  x="612"
                  y="28"
                />
              </g>
            </g>
            <g style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}>
              <g>
                <rect
                  height="188"
                  width="202"
                  x="668"
                  y="203"
                  fill="var(--ds-gray-100)"
                />
                <g clipPath={`url(#${id}-collection-desktop)`}>
                  <rect
                    fill="none"
                    height="27"
                    stroke="currentColor"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                    width="27"
                    x="681.5"
                    y="243.5"
                  />
                  <rect
                    fill="var(--ds-background-100)"
                    height="88"
                    stroke="currentColor"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                    width="137"
                    x="719.5"
                    y="243.5"
                  />
                  <rect
                    fill="var(--ds-background-100)"
                    height="35"
                    stroke="currentColor"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                    width="35"
                    x="719.5"
                    y="342.5"
                  />
                  <rect
                    fill="var(--ds-background-100)"
                    height="35"
                    stroke="currentColor"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                    width="35"
                    x="765.5"
                    y="342.5"
                  />
                  <rect
                    fill="var(--ds-background-100)"
                    height="35"
                    stroke="currentColor"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                    width="35"
                    x="811.5"
                    y="342.5"
                  />
                  <rect
                    fill="var(--ds-background-100)"
                    height="35"
                    stroke="currentColor"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                    width="35"
                    x="857.5"
                    y="342.5"
                  />
                </g>
                <rect
                  fill="none"
                  height="187"
                  stroke="currentColor"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                  width="201"
                  x="668.5"
                  y="203.5"
                />
                <line
                  stroke="currentColor"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                  x1="668.5"
                  x2="869.5"
                  y1="230.5"
                  y2="230.5"
                />
                <text
                  fill="currentColor"
                  fontSize="13"
                  fontWeight="500"
                  data-part="label"
                >
                  <tspan x="676.5" y="221.9">
                    {"Go to "}
                    {"Collection Ads"}
                  </tspan>
                </text>
                <g
                  opacity="0"
                  style={{
                    transform: "translateX(-4px)",
                    transformOrigin: "50% 50%",
                    transformBox: "fill-box",
                  }}
                >
                  <g transform="translate(847.5 210.5)">
                    <path
                      d="M11.9082 7L7.58333 11.3249L6.75846 10.5L9.67513 7.58333H2.33333V6.41667H9.67513L6.75846 3.5L7.58333 2.67513L11.9082 7Z"
                      fill="currentColor"
                    />
                  </g>
                </g>
                <rect
                  opacity="0"
                  fill="none"
                  height="196"
                  stroke="currentColor"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                  width="210"
                  x="664"
                  y="199"
                />
              </g>
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
        viewBox="204 20.8 700 420"
        aria-hidden="true"
        {...props}
      >
        <defs>
          <clipPath id={`${id}-collection-mobile`}>
            <rect height="159.5" width="201" x="668.5" y="231" />
          </clipPath>
        </defs>
        <g>
          <g data-part="axis">
            <line
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="554"
              y1="230.577"
              x2="-16.949"
              y2="230.577"
            />
            <line
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="554"
              y1="230.577"
              x2="1126.66"
              y2="230.577"
            />
            <line
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="554"
              y1="230.577"
              x2="554"
              y2="0"
            />
            <line
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="554"
              y1="230.577"
              x2="554"
              y2="462"
            />
          </g>
          <g data-part="rails">
            <clipPath id={`${id}-collection-mobile-rail-top`}>
              <rect
                height="12"
                y="53.5698"
                width="1143.6090000000002px"
                x="-18.949"
              />
            </clipPath>
            <line
              clipPath={`url(#${id}-collection-mobile-rail-top)`}
              stroke="currentColor"
              strokeDasharray="6.017 6.017"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="-18.949"
              x2="1124.66"
              y1="59.5698"
              y2="59.5698"
            />
            <clipPath id={`${id}-collection-mobile-rail-bottom`}>
              <rect
                height="12"
                y="413.857"
                width="1143.6090000000002px"
                x="-18.949"
              />
            </clipPath>
            <line
              clipPath={`url(#${id}-collection-mobile-rail-bottom)`}
              stroke="currentColor"
              strokeDasharray="6.017 6.017"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="-18.949"
              x2="1124.66"
              y1="419.857"
              y2="419.857"
            />
          </g>
          <g data-part="marks">
            <g style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}>
              <rect
                fill="currentColor"
                height="6"
                width="6"
                x="198.219"
                y="227.575"
              />
            </g>
            <g style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}>
              <rect
                fill="currentColor"
                height="6"
                width="6"
                x="926"
                y="227.575"
              />
            </g>
            <g style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}>
              <rect
                fill="var(--ds-background-100)"
                height="7.42073"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                transform="translate(553.954 59.5695) rotate(45)"
                width="7.42073"
                x="-3.710365"
                y="-3.710365"
              />
            </g>
            <g style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}>
              <rect
                fill="var(--ds-background-100)"
                height="7.42073"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                transform="translate(553.954 419.855) rotate(45)"
                width="7.42073"
                x="-3.710365"
                y="-3.710365"
              />
            </g>
          </g>
          <g data-part="fan-left">
            <g>
              <line
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                x1="132.35"
                y1="230.7"
                x2="84.1945"
                y2="182.591"
              />
              <g
                style={{
                  transform: "translateX(85.8027px) translateY(184.198px)",
                  transformOrigin: "50% 50%",
                  transformBox: "fill-box",
                }}
              >
                <g
                  style={{
                    transformBox: "fill-box",
                    transformOrigin: "50% 50%",
                  }}
                >
                  <rect
                    fill="var(--ds-background-100)"
                    height="5"
                    stroke="currentColor"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                    width="5"
                    x="-2.5"
                    y="-2.5"
                  />
                  <rect
                    fill="currentColor"
                    height="5"
                    width="5"
                    x="-2.5"
                    y="-2.5"
                    opacity="0.2637191025132779"
                  />
                </g>
              </g>
            </g>
            <g>
              <line
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                x1="132.35"
                y1="230.7"
                x2="73.1448"
                y2="196.733"
              />
              <g
                style={{
                  transform: "translateX(74.75px) translateY(196.732px)",
                  transformOrigin: "50% 50%",
                  transformBox: "fill-box",
                }}
              >
                <g
                  style={{
                    transformBox: "fill-box",
                    transformOrigin: "50% 50%",
                  }}
                >
                  <rect
                    fill="var(--ds-background-100)"
                    height="5"
                    stroke="currentColor"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                    width="5"
                    x="-2.5"
                    y="-2.5"
                  />
                  <rect
                    fill="currentColor"
                    height="5"
                    width="5"
                    x="-2.5"
                    y="-2.5"
                    opacity="0.7362808974867221"
                  />
                </g>
              </g>
            </g>
            <g>
              <line
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                x1="132.35"
                y1="230.7"
                x2="66.578"
                y2="213.263"
              />
              <g
                style={{
                  transform: "translateX(67.5645px) translateY(214.298px)",
                  transformOrigin: "50% 50%",
                  transformBox: "fill-box",
                }}
              >
                <g
                  style={{
                    transformBox: "fill-box",
                    transformOrigin: "50% 50%",
                  }}
                >
                  <rect
                    fill="var(--ds-background-100)"
                    height="5"
                    stroke="currentColor"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                    width="5"
                    x="-2.5"
                    y="-2.5"
                  />
                  <rect
                    fill="currentColor"
                    height="5"
                    width="5"
                    x="-2.5"
                    y="-2.5"
                    opacity="0.2637191025132779"
                  />
                </g>
              </g>
            </g>
            <g>
              <line
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                x1="132.35"
                y1="230.7"
                x2="66.578"
                y2="248.217"
              />
              <g
                style={{
                  transform: "translateX(67.5645px) translateY(247.027px)",
                  transformOrigin: "50% 50%",
                  transformBox: "fill-box",
                }}
              >
                <g
                  style={{
                    transformBox: "fill-box",
                    transformOrigin: "50% 50%",
                  }}
                >
                  <rect
                    fill="var(--ds-background-100)"
                    height="5"
                    stroke="currentColor"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                    width="5"
                    x="-2.5"
                    y="-2.5"
                  />
                  <rect
                    fill="currentColor"
                    height="5"
                    width="5"
                    x="-2.5"
                    y="-2.5"
                    opacity="0.7362808974867221"
                  />
                </g>
              </g>
            </g>
            <g>
              <line
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                x1="132.35"
                y1="230.7"
                x2="73.1448"
                y2="264.747"
              />
              <g
                style={{
                  transform: "translateX(74.75px) translateY(264.748px)",
                  transformOrigin: "50% 50%",
                  transformBox: "fill-box",
                }}
              >
                <g
                  style={{
                    transformBox: "fill-box",
                    transformOrigin: "50% 50%",
                  }}
                >
                  <rect
                    fill="var(--ds-background-100)"
                    height="5"
                    stroke="currentColor"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                    width="5"
                    x="-2.5"
                    y="-2.5"
                  />
                  <rect
                    fill="currentColor"
                    height="5"
                    width="5"
                    x="-2.5"
                    y="-2.5"
                    opacity="0.2637191025132779"
                  />
                </g>
              </g>
            </g>
            <g>
              <line
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                x1="132.35"
                y1="230.7"
                x2="84.1945"
                y2="278.889"
              />
              <g
                style={{
                  transform: "translateX(85.8027px) translateY(277.282px)",
                  transformOrigin: "50% 50%",
                  transformBox: "fill-box",
                }}
              >
                <g
                  style={{
                    transformBox: "fill-box",
                    transformOrigin: "50% 50%",
                  }}
                >
                  <rect
                    fill="var(--ds-background-100)"
                    height="5"
                    stroke="currentColor"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                    width="5"
                    x="-2.5"
                    y="-2.5"
                  />
                  <rect
                    fill="currentColor"
                    height="5"
                    width="5"
                    x="-2.5"
                    y="-2.5"
                    opacity="0.7362808974867221"
                  />
                </g>
              </g>
            </g>
            <circle
              cx="128.41"
              cy="230.576"
              fill="var(--ds-background-100)"
              r="11.5"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
            />
          </g>
          <g data-part="fan-right">
            <g>
              <line
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                x1="997.868"
                y1="230.7"
                x2="1046.0235"
                y2="182.591"
              />
              <g
                style={{
                  transform: "translateX(1044.42px) translateY(184.198px)",
                  transformOrigin: "50% 50%",
                  transformBox: "fill-box",
                }}
              >
                <g
                  style={{
                    transformBox: "fill-box",
                    transformOrigin: "50% 50%",
                  }}
                >
                  <rect
                    fill="var(--ds-background-100)"
                    height="5"
                    stroke="currentColor"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                    width="5"
                    x="-2.5"
                    y="-2.5"
                  />
                  <rect
                    fill="currentColor"
                    height="5"
                    width="5"
                    x="-2.5"
                    y="-2.5"
                    opacity="0.2637191025132779"
                  />
                </g>
              </g>
            </g>
            <g>
              <line
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                x1="997.868"
                y1="230.7"
                x2="1057.0732"
                y2="196.733"
              />
              <g
                style={{
                  transform: "translateX(1055.47px) translateY(196.732px)",
                  transformOrigin: "50% 50%",
                  transformBox: "fill-box",
                }}
              >
                <g
                  style={{
                    transformBox: "fill-box",
                    transformOrigin: "50% 50%",
                  }}
                >
                  <rect
                    fill="var(--ds-background-100)"
                    height="5"
                    stroke="currentColor"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                    width="5"
                    x="-2.5"
                    y="-2.5"
                  />
                  <rect
                    fill="currentColor"
                    height="5"
                    width="5"
                    x="-2.5"
                    y="-2.5"
                    opacity="0.7362808974867221"
                  />
                </g>
              </g>
            </g>
            <g>
              <line
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                x1="997.868"
                y1="230.7"
                x2="1063.64"
                y2="213.263"
              />
              <g
                style={{
                  transform: "translateX(1062.65px) translateY(214.298px)",
                  transformOrigin: "50% 50%",
                  transformBox: "fill-box",
                }}
              >
                <g
                  style={{
                    transformBox: "fill-box",
                    transformOrigin: "50% 50%",
                  }}
                >
                  <rect
                    fill="var(--ds-background-100)"
                    height="5"
                    stroke="currentColor"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                    width="5"
                    x="-2.5"
                    y="-2.5"
                  />
                  <rect
                    fill="currentColor"
                    height="5"
                    width="5"
                    x="-2.5"
                    y="-2.5"
                    opacity="0.2637191025132779"
                  />
                </g>
              </g>
            </g>
            <g>
              <line
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                x1="997.868"
                y1="230.7"
                x2="1063.64"
                y2="248.217"
              />
              <g
                style={{
                  transform: "translateX(1062.65px) translateY(247.027px)",
                  transformOrigin: "50% 50%",
                  transformBox: "fill-box",
                }}
              >
                <g
                  style={{
                    transformBox: "fill-box",
                    transformOrigin: "50% 50%",
                  }}
                >
                  <rect
                    fill="var(--ds-background-100)"
                    height="5"
                    stroke="currentColor"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                    width="5"
                    x="-2.5"
                    y="-2.5"
                  />
                  <rect
                    fill="currentColor"
                    height="5"
                    width="5"
                    x="-2.5"
                    y="-2.5"
                    opacity="0.7362808974867221"
                  />
                </g>
              </g>
            </g>
            <g>
              <line
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                x1="997.868"
                y1="230.7"
                x2="1057.0732"
                y2="264.747"
              />
              <g
                style={{
                  transform: "translateX(1055.47px) translateY(264.748px)",
                  transformOrigin: "50% 50%",
                  transformBox: "fill-box",
                }}
              >
                <g
                  style={{
                    transformBox: "fill-box",
                    transformOrigin: "50% 50%",
                  }}
                >
                  <rect
                    fill="var(--ds-background-100)"
                    height="5"
                    stroke="currentColor"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                    width="5"
                    x="-2.5"
                    y="-2.5"
                  />
                  <rect
                    fill="currentColor"
                    height="5"
                    width="5"
                    x="-2.5"
                    y="-2.5"
                    opacity="0.2637191025132779"
                  />
                </g>
              </g>
            </g>
            <g>
              <line
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                x1="997.868"
                y1="230.7"
                x2="1046.0235"
                y2="278.889"
              />
              <g
                style={{
                  transform: "translateX(1044.42px) translateY(277.282px)",
                  transformOrigin: "50% 50%",
                  transformBox: "fill-box",
                }}
              >
                <g
                  style={{
                    transformBox: "fill-box",
                    transformOrigin: "50% 50%",
                  }}
                >
                  <rect
                    fill="var(--ds-background-100)"
                    height="5"
                    stroke="currentColor"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                    width="5"
                    x="-2.5"
                    y="-2.5"
                  />
                  <rect
                    fill="currentColor"
                    height="5"
                    width="5"
                    x="-2.5"
                    y="-2.5"
                    opacity="0.7362808974867221"
                  />
                </g>
              </g>
            </g>
            <circle
              cx="1001.809"
              cy="230.576"
              fill="var(--ds-background-100)"
              r="11.5"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
            />
          </g>
          <g data-part="hub">
            <circle
              cx="553.805"
              cy="230.805"
              fill="var(--ds-background-100)"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              r="50.3047"
            />
            <g style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}>
              <circle cx="553.805" cy="230.805" fill="currentColor" r="24" />
              <path
                d="M564.359 241.367L556.165 229.257L563.809 220.242H561.149L554.983 227.516L550.065 220.242H543.36L551.258 231.916L543.242 241.367H545.903L552.441 233.656L557.66 241.367H564.367H564.359ZM549.189 221.941L561.182 239.669H558.531L546.536 221.941H549.186H549.189Z"
                fill="var(--ds-background-100)"
              />
            </g>
          </g>
          <g data-part="windows">
            <g style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}>
              <g>
                <rect
                  height="270"
                  width="176"
                  x="272"
                  y="120"
                  fill="var(--ds-gray-100)"
                />
                <rect
                  fill="var(--ds-background-100)"
                  height="216"
                  stroke="currentColor"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                  width="149"
                  x="285.5"
                  y="160.5"
                />
                <path
                  d="M352.5 255.003C352.5 253.049 354.641 251.851 356.307 252.872L365.979 258.8C367.571 259.775 367.571 262.088 365.979 263.063L356.307 268.991C354.641 270.012 352.5 268.814 352.5 266.86V255.003Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />
                <rect
                  fill="none"
                  height="21"
                  stroke="currentColor"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                  width="21"
                  x="297.5"
                  y="341.5"
                />
                <rect
                  fill="none"
                  height="8"
                  stroke="currentColor"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                  width="43"
                  x="329.5"
                  y="341.5"
                />
                <rect
                  fill="none"
                  height="8"
                  stroke="currentColor"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                  width="93"
                  x="329.5"
                  y="354.5"
                />
                <rect
                  fill="none"
                  height="269"
                  stroke="currentColor"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                  width="175"
                  x="272.5"
                  y="120.5"
                />
                <line
                  stroke="currentColor"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                  x1="272.5"
                  x2="447.5"
                  y1="147.5"
                  y2="147.5"
                />
                <text
                  fill="currentColor"
                  fontSize="13"
                  fontWeight="500"
                  data-part="label"
                >
                  <tspan x="280.5" y="138.9">
                    {"Go to "}
                    {"Vertical Video"}
                  </tspan>
                </text>
                <g
                  opacity="0"
                  style={{
                    transform: "translateX(-4px)",
                    transformOrigin: "50% 50%",
                    transformBox: "fill-box",
                  }}
                >
                  <g transform="translate(425.5 127.5)">
                    <path
                      d="M11.9082 7L7.58333 11.3249L6.75846 10.5L9.67513 7.58333H2.33333V6.41667H9.67513L6.75846 3.5L7.58333 2.67513L11.9082 7Z"
                      fill="currentColor"
                    />
                  </g>
                </g>
                <rect
                  opacity="0"
                  fill="none"
                  height="278"
                  stroke="currentColor"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                  width="184"
                  x="268"
                  y="116"
                />
              </g>
            </g>
            <g style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}>
              <g>
                <rect
                  height="131.8"
                  width="202"
                  x="616"
                  y="32"
                  fill="var(--ds-gray-100)"
                />
                <g opacity="0.9">
                  <rect
                    fill="var(--ds-background-100)"
                    height="42"
                    stroke="currentColor"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                    width="175"
                    x="629.5"
                    y="72.5"
                  />
                  <g>
                    <rect
                      fill="none"
                      height="20"
                      stroke="currentColor"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                      width="20"
                      x="640.5"
                      y="83.5"
                    />
                    <rect
                      fill="none"
                      height="7"
                      stroke="currentColor"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                      width="50"
                      x="669.5"
                      y="84.5"
                    />
                    <rect
                      fill="none"
                      height="7"
                      stroke="currentColor"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                      width="20"
                      x="669.5"
                      y="95.5"
                    />
                    <rect
                      fill="none"
                      height="7"
                      stroke="currentColor"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                      width="42"
                      x="693.5"
                      y="95.5"
                    />
                  </g>
                  <g>
                    <rect
                      fill="none"
                      height="21"
                      stroke="currentColor"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                      width="20"
                      x="640.5"
                      y="125.5"
                    />
                    <rect
                      fill="none"
                      height="7"
                      stroke="currentColor"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                      width="44"
                      x="669.5"
                      y="127.5"
                    />
                    <rect
                      fill="none"
                      height="7"
                      stroke="currentColor"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                      width="30"
                      x="669.5"
                      y="137.5"
                    />
                    <rect
                      fill="none"
                      height="7"
                      stroke="currentColor"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                      width="20"
                      x="703.5"
                      y="137.5"
                    />
                  </g>
                </g>
                <rect
                  fill="none"
                  height="130.8"
                  stroke="currentColor"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                  width="201"
                  x="616.5"
                  y="32.5"
                />
                <line
                  stroke="currentColor"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                  x1="616.5"
                  x2="817.5"
                  y1="59.5"
                  y2="59.5"
                />
                <text
                  fill="currentColor"
                  fontSize="13"
                  fontWeight="500"
                  data-part="label"
                >
                  <tspan x="624.5" y="50.9">
                    {"Go to "}
                    {">x< Amplify"}
                  </tspan>
                </text>
                <g
                  opacity="0"
                  style={{
                    transform: "translateX(-4px)",
                    transformOrigin: "50% 50%",
                    transformBox: "fill-box",
                  }}
                >
                  <g transform="translate(795.5 39.5)">
                    <path
                      d="M11.9082 7L7.58333 11.3249L6.75846 10.5L9.67513 7.58333H2.33333V6.41667H9.67513L6.75846 3.5L7.58333 2.67513L11.9082 7Z"
                      fill="currentColor"
                    />
                  </g>
                </g>
                <rect
                  opacity="0"
                  fill="none"
                  height="139.8"
                  stroke="currentColor"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                  width="210"
                  x="612"
                  y="28"
                />
              </g>
            </g>
            <g style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}>
              <g>
                <rect
                  height="188"
                  width="202"
                  x="668"
                  y="203"
                  fill="var(--ds-gray-100)"
                />
                <g clipPath={`url(#${id}-collection-mobile)`}>
                  <rect
                    fill="none"
                    height="27"
                    stroke="currentColor"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                    width="27"
                    x="681.5"
                    y="243.5"
                  />
                  <rect
                    fill="var(--ds-background-100)"
                    height="88"
                    stroke="currentColor"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                    width="137"
                    x="719.5"
                    y="243.5"
                  />
                  <rect
                    fill="var(--ds-background-100)"
                    height="35"
                    stroke="currentColor"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                    width="35"
                    x="719.5"
                    y="342.5"
                  />
                  <rect
                    fill="var(--ds-background-100)"
                    height="35"
                    stroke="currentColor"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                    width="35"
                    x="765.5"
                    y="342.5"
                  />
                  <rect
                    fill="var(--ds-background-100)"
                    height="35"
                    stroke="currentColor"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                    width="35"
                    x="811.5"
                    y="342.5"
                  />
                  <rect
                    fill="var(--ds-background-100)"
                    height="35"
                    stroke="currentColor"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                    width="35"
                    x="857.5"
                    y="342.5"
                  />
                </g>
                <rect
                  fill="none"
                  height="187"
                  stroke="currentColor"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                  width="201"
                  x="668.5"
                  y="203.5"
                />
                <line
                  stroke="currentColor"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                  x1="668.5"
                  x2="869.5"
                  y1="230.5"
                  y2="230.5"
                />
                <text
                  fill="currentColor"
                  fontSize="13"
                  fontWeight="500"
                  data-part="label"
                >
                  <tspan x="676.5" y="221.9">
                    {"Go to "}
                    {"Collection Ads"}
                  </tspan>
                </text>
                <g
                  opacity="0"
                  style={{
                    transform: "translateX(-4px)",
                    transformOrigin: "50% 50%",
                    transformBox: "fill-box",
                  }}
                >
                  <g transform="translate(847.5 210.5)">
                    <path
                      d="M11.9082 7L7.58333 11.3249L6.75846 10.5L9.67513 7.58333H2.33333V6.41667H9.67513L6.75846 3.5L7.58333 2.67513L11.9082 7Z"
                      fill="currentColor"
                    />
                  </g>
                </g>
                <rect
                  opacity="0"
                  fill="none"
                  height="196"
                  stroke="currentColor"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                  width="210"
                  x="664"
                  y="199"
                />
              </g>
            </g>
          </g>
        </g>
      </svg>
    )
  return null
}
