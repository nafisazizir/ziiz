import * as React from "react"

import type { ArtProps } from "../props"

// Ported from business.x.com: products/vertical-video-ads.
export function VideoPlayer({
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
        <g visibility="hidden">
          <text
            style={{
              fontSize: "10px",
              fontWeight: "500",
              letterSpacing: "calc(0.1px * 1)",
            }}
          >
            {"6K Likes"}
          </text>
          <text
            style={{
              fontSize: "10px",
              fontWeight: "500",
              letterSpacing: "calc(0.1px * 1)",
            }}
          >
            {"100K Views"}
          </text>
          <text
            style={{
              fontSize: "10px",
              fontWeight: "500",
              letterSpacing: "calc(0.1px * 1)",
            }}
          >
            {"1K Comments"}
          </text>
        </g>
        <g data-part="rules">
          <g data-part="rule-likes">
            <line
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="559"
              y1="167"
              y2="167"
              x2="219"
            />
            <line
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="559"
              y1="167"
              y2="167"
              x2="899"
            />
          </g>
          <g data-part="rule-views">
            <line
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="559"
              y1="231"
              y2="231"
              x2="160"
            />
            <line
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="559"
              y1="231"
              y2="231"
              x2="959"
            />
          </g>
          <g data-part="rule-comments">
            <line
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="559"
              y1="295"
              y2="295"
              x2="219"
            />
            <line
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="559"
              y1="295"
              y2="295"
              x2="899"
            />
          </g>
        </g>
        <g data-part="glyphs">
          <g
            data-part="glyph-likes"
            style={{ transformOrigin: "50% 50%", transformBox: "fill-box" }}
          >
            <rect
              fill="var(--ds-gray-100)"
              height="6"
              width="11"
              x="382"
              y="164"
            />
            <line
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="384.316"
              x2="384.316"
              y1="164"
              y2="170"
            />
            <line
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="387.5"
              x2="387.5"
              y1="164"
              y2="170"
            />
            <line
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="390.68399999999997"
              x2="390.68399999999997"
              y1="164"
              y2="170"
            />
          </g>
          <g
            data-part="glyph-views"
            style={{ transformOrigin: "50% 50%", transformBox: "fill-box" }}
          >
            <rect
              fill="var(--ds-gray-100)"
              height="6"
              width="11"
              x="347"
              y="228"
            />
            <line
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="349.316"
              x2="349.316"
              y1="228"
              y2="234"
            />
            <line
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="352.5"
              x2="352.5"
              y1="228"
              y2="234"
            />
            <line
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="355.68399999999997"
              x2="355.68399999999997"
              y1="228"
              y2="234"
            />
          </g>
          <g
            data-part="glyph-comments"
            style={{ transformOrigin: "50% 50%", transformBox: "fill-box" }}
          >
            <rect
              fill="var(--ds-gray-100)"
              height="6"
              width="11"
              x="382"
              y="292"
            />
            <line
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="384.316"
              x2="384.316"
              y1="292"
              y2="298"
            />
            <line
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="387.5"
              x2="387.5"
              y1="292"
              y2="298"
            />
            <line
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="390.68399999999997"
              x2="390.68399999999997"
              y1="292"
              y2="298"
            />
          </g>
        </g>
        <circle
          cx="559"
          cy="231"
          data-part="ring-mat"
          fill="var(--ds-gray-100)"
          r="139.5"
        />
        <mask id={`${id}-ring`} maskUnits="userSpaceOnUse">
          <path
            d="M 559 91.5 A 139.5 139.5 0 0 1 559 370.5"
            fill="none"
            pathLength={1}
            stroke="var(--ds-background-100)"
            strokeDasharray="1 1"
            strokeWidth="8"
            strokeDashoffset="0"
          />
          <path
            d="M 559 91.5 A 139.5 139.5 0 0 0 559 370.5"
            fill="none"
            pathLength={1}
            stroke="var(--ds-background-100)"
            strokeDasharray="1 1"
            strokeWidth="8"
            strokeDashoffset="0"
          />
        </mask>
        <g data-part="ring" mask={`url(#${id}-ring)`}>
          <g
            style={{
              transformBox: "view-box",
              transformOrigin: "559px 231px 0px",
            }}
          >
            <g
              style={{
                transformBox: "view-box",
                transformOrigin: "559px 231px 0px",
              }}
            >
              <circle
                cx="559"
                cy="231"
                fill="none"
                r="139.5"
                stroke="currentColor"
                strokeDasharray="6 6"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
            </g>
          </g>
        </g>
        <g data-part="axis">
          <line
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            x1="559"
            x2="559"
            y1="231"
            y2="-33"
          />
          <line
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            x1="559"
            x2="559"
            y1="231"
            y2="495"
          />
        </g>
        <g
          data-part="card"
          style={{
            transformBox: "view-box",
            transformOrigin: "559px 231px 0px",
          }}
        >
          <rect
            fill="var(--ds-gray-100)"
            height="347"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            width="219"
            x="449.5"
            y="57.5"
          />
          <g
            data-part="play"
            style={{
              transformBox: "view-box",
              transformOrigin: "559px 231px 0px",
            }}
          >
            <circle
              cx="559"
              cy="231"
              fill="var(--ds-background-100)"
              r="23.5"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d="M554 235.94V226.06C554 224.757 555.427 223.958 556.538 224.639L564.598 229.579C565.659 230.229 565.659 231.771 564.598 232.421L556.538 237.361C555.427 238.042 554 237.243 554 235.94Z"
              fill="currentColor"
              transform="translate(559 231) scale(1) translate(-559 -231)"
            />
          </g>
          <g data-part="bars">
            <rect
              fill="var(--ds-background-100)"
              height="6"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
              width="120"
              x="461"
              y="367"
            />
            <rect
              fill="var(--ds-background-100)"
              height="6"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
              width="58"
              x="461"
              y="377"
            />
            <rect
              fill="var(--ds-background-100)"
              height="6"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
              width="97"
              x="461"
              y="387"
            />
          </g>
        </g>
        <g data-part="markers">
          <g>
            <rect
              fill="currentColor"
              height="6"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
              width="6"
              x="216"
              y="164"
            />
            <rect
              fill="var(--ds-background-100)"
              height="6"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
              width="6"
              x="896"
              y="164"
            />
          </g>
          <g>
            <rect
              fill="var(--ds-background-100)"
              height="6"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
              width="6"
              x="157"
              y="228"
            />
            <rect
              fill="currentColor"
              height="6"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
              width="6"
              x="956"
              y="228"
            />
          </g>
          <g>
            <rect
              fill="currentColor"
              height="6"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
              width="6"
              x="216"
              y="292"
            />
            <rect
              fill="var(--ds-background-100)"
              height="6"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
              width="6"
              x="896"
              y="292"
            />
          </g>
        </g>
        <g data-part="icons">
          <g
            data-part="icon-likes"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          >
            <rect
              fill="var(--ds-background-100)"
              height="23"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              width="23"
              x="280.5"
              y="155.5"
            />
            <path
              d="M295.13 162.667C294.316 162.627 293.344 163.007 292.537 164.107L292 164.834L291.463 164.107C290.655 163.007 289.683 162.627 288.868 162.667C288.04 162.714 287.302 163.187 286.928 163.94C286.56 164.687 286.506 165.794 287.248 167.154C287.964 168.467 289.419 170 292 171.56C294.58 170 296.035 168.467 296.751 167.154C297.492 165.794 297.438 164.687 297.069 163.94C296.695 163.187 295.958 162.714 295.13 162.667ZM297.922 167.794C297.021 169.447 295.254 171.207 292.336 172.907L292 173.107L291.664 172.907C288.745 171.207 286.978 169.447 286.076 167.794C285.17 166.127 285.136 164.554 285.734 163.347C286.325 162.154 287.498 161.407 288.801 161.34C289.902 161.28 291.046 161.714 292 162.68C292.952 161.714 294.097 161.28 295.197 161.34C296.5 161.407 297.673 162.154 298.264 163.347C298.862 164.554 298.828 166.127 297.922 167.794Z"
              fill="currentColor"
              transform="translate(280.5 155.5) scale(1) translate(-280.5 -155.5)"
            />
          </g>
          <g
            data-part="icon-views"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          >
            <rect
              fill="var(--ds-background-100)"
              height="23"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              width="23"
              x="860.5"
              y="219.5"
            />
            <path
              d="M869.835 237V225H871.168V237H869.835ZM876.001 237V228.667H877.335V237H876.001ZM866.668 237L866.671 230.333H868.004L868.001 237H866.668ZM872.833 237V232.333H874.167V237H872.833Z"
              fill="currentColor"
              transform="translate(860.5 219.5) scale(1) translate(-860.5 -219.5)"
            />
          </g>
          <g
            data-part="icon-comments"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          >
            <rect
              fill="var(--ds-background-100)"
              height="23"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              width="23"
              x="280.5"
              y="283.5"
            />
            <path
              d="M285.168 293.666C285.168 290.72 287.557 288.333 290.505 288.333H293.415C296.409 288.333 298.835 290.76 298.835 293.753C298.835 295.726 297.763 297.54 296.037 298.493L290.668 301.466V299.006H290.623C287.63 299.073 285.168 296.666 285.168 293.666ZM290.505 289.666C288.293 289.666 286.501 291.46 286.501 293.666C286.501 295.913 288.348 297.72 290.593 297.673L290.827 297.666H292.001V299.2L295.393 297.326C296.693 296.606 297.501 295.24 297.501 293.753C297.501 291.493 295.672 289.666 293.415 289.666H290.505Z"
              fill="currentColor"
              transform="translate(280.5 283.5) scale(1) translate(-280.5 -283.5)"
            />
          </g>
        </g>
        <g data-part="tags">
          <g data-part="tag-likes">
            <rect
              fill="var(--ds-background-100)"
              height="23"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              y="155.5"
              width="64.30290603637695px"
              x="792.697093963623"
            />
            <clipPath id={`${id}-tag`}>
              <rect
                height="23"
                width="64.30290603637695"
                x="792.697093963623"
                y="155.5"
              />
            </clipPath>
            <g clipPath={`url(#${id}-tag)`}>
              <g
                style={{ transformOrigin: "50% 50%", transformBox: "fill-box" }}
              >
                <text
                  dominantBaseline="central"
                  fill="currentColor"
                  textAnchor="middle"
                  x="824.8485469818115"
                  y="167"
                  style={{
                    fontSize: "10px",
                    fontWeight: "500",
                    letterSpacing: "calc(0.1px * 1)",
                  }}
                >
                  {"6K Likes"}
                </text>
              </g>
            </g>
          </g>
          <g data-part="tag-views">
            <rect
              fill="var(--ds-background-100)"
              height="23"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              y="219.5"
              width="78.82380294799805px"
              x="202"
            />
            <clipPath id={`${id}-tag`}>
              <rect height="23" width="78.82380294799805" x="202" y="219.5" />
            </clipPath>
            <g clipPath={`url(#${id}-tag)`}>
              <g
                style={{ transformOrigin: "50% 50%", transformBox: "fill-box" }}
              >
                <text
                  dominantBaseline="central"
                  fill="currentColor"
                  textAnchor="middle"
                  x="241.41190147399902"
                  y="231"
                  style={{
                    fontSize: "10px",
                    fontWeight: "500",
                    letterSpacing: "calc(0.1px * 1)",
                  }}
                >
                  {"100K Views"}
                </text>
              </g>
            </g>
          </g>
          <g data-part="tag-comments">
            <rect
              fill="var(--ds-background-100)"
              height="23"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              y="283.5"
              width="89.83535766601562px"
              x="767.1646423339844"
            />
            <clipPath id={`${id}-tag`}>
              <rect
                height="23"
                width="89.83535766601562"
                x="767.1646423339844"
                y="283.5"
              />
            </clipPath>
            <g clipPath={`url(#${id}-tag)`}>
              <g
                style={{ transformOrigin: "50% 50%", transformBox: "fill-box" }}
              >
                <text
                  dominantBaseline="central"
                  fill="currentColor"
                  textAnchor="middle"
                  x="812.0823211669922"
                  y="295"
                  style={{
                    fontSize: "10px",
                    fontWeight: "500",
                    letterSpacing: "calc(0.1px * 1)",
                  }}
                >
                  {"1K Comments"}
                </text>
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
        viewBox="0 0 404 242"
        aria-hidden="true"
        {...props}
      >
        <g visibility="hidden">
          <text
            style={{
              fontSize: "calc(16px * 0.75)",
              fontWeight: "500",
              letterSpacing: "calc(0.1px * 0.85)",
            }}
          >
            {"6K Likes"}
          </text>
          <text
            style={{
              fontSize: "calc(16px * 0.75)",
              fontWeight: "500",
              letterSpacing: "calc(0.1px * 0.85)",
            }}
          >
            {"100K Views"}
          </text>
          <text
            style={{
              fontSize: "calc(16px * 0.75)",
              fontWeight: "500",
              letterSpacing: "calc(0.1px * 0.85)",
            }}
          >
            {"1K Comments"}
          </text>
        </g>
        <g data-part="rules">
          <g data-part="rule-likes">
            <line
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="202"
              y1="87.48"
              y2="87.48"
              x2="10"
            />
            <line
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="202"
              y1="87.48"
              y2="87.48"
              x2="394"
            />
          </g>
          <g data-part="rule-views">
            <line
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="202"
              y1="121"
              y2="121"
              x2="4"
            />
            <line
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="202"
              y1="121"
              y2="121"
              x2="400"
            />
          </g>
          <g data-part="rule-comments">
            <line
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="202"
              y1="154.52"
              y2="154.52"
              x2="10"
            />
            <line
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="202"
              y1="154.52"
              y2="154.52"
              x2="394"
            />
          </g>
        </g>
        <g data-part="glyphs">
          <g
            data-part="glyph-likes"
            style={{ transformOrigin: "50% 50%", transformBox: "fill-box" }}
          >
            <rect
              fill="var(--ds-gray-100)"
              height="5.1"
              width="9.35"
              x="99.0314"
              y="84.93"
            />
            <line
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="101"
              x2="101"
              y1="84.93"
              y2="90.03"
            />
            <line
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="103.7064"
              x2="103.7064"
              y1="84.93"
              y2="90.03"
            />
            <line
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="106.4128"
              x2="106.4128"
              y1="84.93"
              y2="90.03"
            />
          </g>
          <g
            data-part="glyph-views"
            style={{ transformOrigin: "50% 50%", transformBox: "fill-box" }}
          >
            <rect
              fill="var(--ds-gray-100)"
              height="5.1"
              width="9.35"
              x="298.0314"
              y="118.45"
            />
            <line
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="300"
              x2="300"
              y1="118.45"
              y2="123.55"
            />
            <line
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="302.7064"
              x2="302.7064"
              y1="118.45"
              y2="123.55"
            />
            <line
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="305.4128"
              x2="305.4128"
              y1="118.45"
              y2="123.55"
            />
          </g>
          <g
            data-part="glyph-comments"
            style={{ transformOrigin: "50% 50%", transformBox: "fill-box" }}
          >
            <rect
              fill="var(--ds-gray-100)"
              height="5.1"
              width="9.35"
              x="99.0314"
              y="151.97"
            />
            <line
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="101"
              x2="101"
              y1="151.97"
              y2="157.07"
            />
            <line
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="103.7064"
              x2="103.7064"
              y1="151.97"
              y2="157.07"
            />
            <line
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              x1="106.4128"
              x2="106.4128"
              y1="151.97"
              y2="157.07"
            />
          </g>
        </g>
        <circle
          cx="202"
          cy="121"
          data-part="ring-mat"
          fill="var(--ds-gray-100)"
          r="73.07"
        />
        <mask id={`${id}-ring`} maskUnits="userSpaceOnUse">
          <path
            d="M 202 47.93000000000001 A 73.07 73.07 0 0 1 202 194.07"
            fill="none"
            pathLength={1}
            stroke="var(--ds-background-100)"
            strokeDasharray="1 1"
            strokeWidth="8"
            strokeDashoffset="0"
          />
          <path
            d="M 202 47.93000000000001 A 73.07 73.07 0 0 0 202 194.07"
            fill="none"
            pathLength={1}
            stroke="var(--ds-background-100)"
            strokeDasharray="1 1"
            strokeWidth="8"
            strokeDashoffset="0"
          />
        </mask>
        <g data-part="ring" mask={`url(#${id}-ring)`}>
          <g
            style={{
              transformBox: "view-box",
              transformOrigin: "202px 121px 0px",
            }}
          >
            <g
              style={{
                transformBox: "view-box",
                transformOrigin: "202px 121px 0px",
              }}
            >
              <circle
                cx="202"
                cy="121"
                fill="none"
                r="73.07"
                stroke="currentColor"
                strokeDasharray="4 4"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
            </g>
          </g>
        </g>
        <g data-part="axis">
          <line
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            x1="202"
            x2="202"
            y1="121"
            y2="-17.29"
          />
          <line
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            x1="202"
            x2="202"
            y1="121"
            y2="259.29"
          />
        </g>
        <g
          data-part="card"
          style={{
            transformBox: "view-box",
            transformOrigin: "202px 121px 0px",
          }}
        >
          <rect
            fill="var(--ds-gray-100)"
            height="181.76"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            width="114.71"
            x="144.65"
            y="30.12"
          />
          <g
            data-part="play"
            style={{
              transformBox: "view-box",
              transformOrigin: "202px 121px 0px",
            }}
          >
            <circle
              cx="202"
              cy="121"
              fill="var(--ds-background-100)"
              r="12.31"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d="M554 235.94V226.06C554 224.757 555.427 223.958 556.538 224.639L564.598 229.579C565.659 230.229 565.659 231.771 564.598 232.421L556.538 237.361C555.427 238.042 554 237.243 554 235.94Z"
              fill="currentColor"
              transform="translate(202 121) scale(0.5238095238095238) translate(-559 -231)"
            />
          </g>
          <g data-part="bars">
            <rect
              fill="var(--ds-background-100)"
              height="3.14"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
              width="62.86"
              x="150.67"
              y="192.24"
            />
            <rect
              fill="var(--ds-background-100)"
              height="3.14"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
              width="30.38"
              x="150.67"
              y="197.48"
            />
            <rect
              fill="var(--ds-background-100)"
              height="3.14"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
              width="50.81"
              x="150.67"
              y="202.71"
            />
          </g>
        </g>
        <g data-part="markers">
          <g>
            <rect
              fill="currentColor"
              height="5"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
              width="5"
              x="7.5"
              y="84.98"
            />
            <rect
              fill="var(--ds-background-100)"
              height="5"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
              width="5"
              x="391.5"
              y="84.98"
            />
          </g>
          <g>
            <rect
              fill="var(--ds-background-100)"
              height="5"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
              width="5"
              x="1.5"
              y="118.5"
            />
            <rect
              fill="currentColor"
              height="5"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
              width="5"
              x="397.5"
              y="118.5"
            />
          </g>
          <g>
            <rect
              fill="currentColor"
              height="5"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
              width="5"
              x="7.5"
              y="152.02"
            />
            <rect
              fill="var(--ds-background-100)"
              height="5"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
              width="5"
              x="391.5"
              y="152.02"
            />
          </g>
        </g>
        <g data-part="icons">
          <g
            data-part="icon-likes"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          >
            <rect
              fill="var(--ds-background-100)"
              height="18"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              width="18"
              x="44"
              y="78.48"
            />
            <path
              d="M295.13 162.667C294.316 162.627 293.344 163.007 292.537 164.107L292 164.834L291.463 164.107C290.655 163.007 289.683 162.627 288.868 162.667C288.04 162.714 287.302 163.187 286.928 163.94C286.56 164.687 286.506 165.794 287.248 167.154C287.964 168.467 289.419 170 292 171.56C294.58 170 296.035 168.467 296.751 167.154C297.492 165.794 297.438 164.687 297.069 163.94C296.695 163.187 295.958 162.714 295.13 162.667ZM297.922 167.794C297.021 169.447 295.254 171.207 292.336 172.907L292 173.107L291.664 172.907C288.745 171.207 286.978 169.447 286.076 167.794C285.17 166.127 285.136 164.554 285.734 163.347C286.325 162.154 287.498 161.407 288.801 161.34C289.902 161.28 291.046 161.714 292 162.68C292.952 161.714 294.097 161.28 295.197 161.34C296.5 161.407 297.673 162.154 298.264 163.347C298.862 164.554 298.828 166.127 297.922 167.794Z"
              fill="currentColor"
              transform="translate(44 78.48) scale(0.782608695652174) translate(-280.5 -155.5)"
            />
          </g>
          <g
            data-part="icon-views"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          >
            <rect
              fill="var(--ds-background-100)"
              height="18"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              width="18"
              x="358"
              y="112"
            />
            <path
              d="M869.835 237V225H871.168V237H869.835ZM876.001 237V228.667H877.335V237H876.001ZM866.668 237L866.671 230.333H868.004L868.001 237H866.668ZM872.833 237V232.333H874.167V237H872.833Z"
              fill="currentColor"
              transform="translate(358 112) scale(0.782608695652174) translate(-860.5 -219.5)"
            />
          </g>
          <g
            data-part="icon-comments"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          >
            <rect
              fill="var(--ds-background-100)"
              height="18"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              width="18"
              x="44"
              y="145.52"
            />
            <path
              d="M285.168 293.666C285.168 290.72 287.557 288.333 290.505 288.333H293.415C296.409 288.333 298.835 290.76 298.835 293.753C298.835 295.726 297.763 297.54 296.037 298.493L290.668 301.466V299.006H290.623C287.63 299.073 285.168 296.666 285.168 293.666ZM290.505 289.666C288.293 289.666 286.501 291.46 286.501 293.666C286.501 295.913 288.348 297.72 290.593 297.673L290.827 297.666H292.001V299.2L295.393 297.326C296.693 296.606 297.501 295.24 297.501 293.753C297.501 291.493 295.672 289.666 293.415 289.666H290.505Z"
              fill="currentColor"
              transform="translate(44 145.52) scale(0.782608695652174) translate(-280.5 -283.5)"
            />
          </g>
        </g>
        <g data-part="tags">
          <g data-part="tag-likes">
            <rect
              fill="var(--ds-background-100)"
              height="23.049999999999997"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              y="75.95500000000001"
              width="62.111297607421875px"
              x="323.8887023925781"
            />
            <clipPath id={`${id}-tag`}>
              <rect
                height="23.049999999999997"
                width="62.111297607421875"
                x="323.8887023925781"
                y="75.95500000000001"
              />
            </clipPath>
            <g clipPath={`url(#${id}-tag)`}>
              <g
                style={{ transformOrigin: "50% 50%", transformBox: "fill-box" }}
              >
                <text
                  dominantBaseline="central"
                  fill="currentColor"
                  textAnchor="middle"
                  x="354.94435119628906"
                  y="87.48"
                  style={{
                    fontSize: "calc(16px * 0.75)",
                    fontWeight: "500",
                    letterSpacing: "calc(0.1px * 0.85)",
                  }}
                >
                  {"6K Likes"}
                </text>
              </g>
            </g>
          </g>
          <g data-part="tag-views">
            <rect
              fill="var(--ds-background-100)"
              height="23.049999999999997"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              y="109.475"
              width="79.48628997802734px"
              x="12"
            />
            <clipPath id={`${id}-tag`}>
              <rect
                height="23.049999999999997"
                width="79.48628997802734"
                x="12"
                y="109.475"
              />
            </clipPath>
            <g clipPath={`url(#${id}-tag)`}>
              <g
                style={{ transformOrigin: "50% 50%", transformBox: "fill-box" }}
              >
                <text
                  dominantBaseline="central"
                  fill="currentColor"
                  textAnchor="middle"
                  x="51.74314498901367"
                  y="121"
                  style={{
                    fontSize: "calc(16px * 0.75)",
                    fontWeight: "500",
                    letterSpacing: "calc(0.1px * 0.85)",
                  }}
                >
                  {"100K Views"}
                </text>
              </g>
            </g>
          </g>
          <g data-part="tag-comments">
            <rect
              fill="var(--ds-background-100)"
              height="23.049999999999997"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              y="142.995"
              width="92.67156219482422px"
              x="293.3284378051758"
            />
            <clipPath id={`${id}-tag`}>
              <rect
                height="23.049999999999997"
                width="92.67156219482422"
                x="293.3284378051758"
                y="142.995"
              />
            </clipPath>
            <g clipPath={`url(#${id}-tag)`}>
              <g
                style={{ transformOrigin: "50% 50%", transformBox: "fill-box" }}
              >
                <text
                  dominantBaseline="central"
                  fill="currentColor"
                  textAnchor="middle"
                  x="339.6642189025879"
                  y="154.52"
                  style={{
                    fontSize: "calc(16px * 0.75)",
                    fontWeight: "500",
                    letterSpacing: "calc(0.1px * 0.85)",
                  }}
                >
                  {"1K Comments"}
                </text>
              </g>
            </g>
          </g>
        </g>
      </svg>
    )
  return null
}
