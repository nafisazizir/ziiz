import type { ArtProps } from "../props"

// Ported from business.x.com — advertising.
export function PerformanceCards({
  variant = "wide",
  ...props
}: ArtProps & { variant?: "wide" | "narrow" }) {
  if (variant === "wide")
    return (
      <svg
        viewBox="0 0 1120 402"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        shapeRendering="geometricPrecision"
        aria-hidden="true"
        {...props}
      >
        <style>
          {
            "\n          @keyframes hero-pipeline-dot-outward {\n            0%, 7% { opacity: 0; offset-distance: 0%; }\n            10% { opacity: 1; offset-distance: 0%; }\n            28% { opacity: 1; offset-distance: 100%; }\n            32%, 100% { opacity: 0; offset-distance: 100%; }\n          }\n          @media (prefers-reduced-motion: reduce) {\n            .hero-pipeline-dot { animation: none !important; opacity: 0; }\n          }\n        "
          }
        </style>
        <g pointerEvents="none">
          <rect width="1120" height="402" fill="var(--ds-gray-100)" />
          <path
            d="M1051.84 485.251L67.1669 -83.2491"
            stroke="currentColor"
            strokeDasharray="5 5"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          />
          <path
            d="M1051.83 -83.25L67.1618 485.25"
            stroke="currentColor"
            strokeDasharray="5 5"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          />
          <path
            d="M1128 201L-9.0001 201"
            stroke="currentColor"
            strokeDasharray="5 5"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          />
          <path
            d="M560 421L560 -19"
            stroke="currentColor"
            strokeDasharray="5 5"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          />
          <g>
            <circle
              cx="0"
              cy="0"
              r="3"
              fill="var(--ds-gray-100)"
              stroke="currentColor"
              opacity="0"
              style={{
                offsetPath: 'path("M560 201 L190.1 -12")',
                offsetRotate: "0deg",
                animationName: "hero-pipeline-dot-outward",
                animationDuration: "8.9s",
                animationDelay: "1.1s",
                animationTimingFunction: "linear",
                animationIterationCount: "infinite",
                animationFillMode: "both",
                willChange: "transform, opacity",
              }}
            />
            <circle
              cx="0"
              cy="0"
              r="3"
              fill="var(--ds-gray-100)"
              stroke="currentColor"
              opacity="0"
              style={{
                offsetPath: 'path("M560 201 L928.4 -12")',
                offsetRotate: "0deg",
                animationName: "hero-pipeline-dot-outward",
                animationDuration: "10.7s",
                animationDelay: "1.2200000000000002s",
                animationTimingFunction: "linear",
                animationIterationCount: "infinite",
                animationFillMode: "both",
                willChange: "transform, opacity",
              }}
            />
            <circle
              cx="0"
              cy="0"
              r="3"
              fill="var(--ds-gray-100)"
              stroke="currentColor"
              opacity="0"
              style={{
                offsetPath: 'path("M560 201 L-12 201")',
                offsetRotate: "0deg",
                animationName: "hero-pipeline-dot-outward",
                animationDuration: "12.9s",
                animationDelay: "1.34s",
                animationTimingFunction: "linear",
                animationIterationCount: "infinite",
                animationFillMode: "both",
                willChange: "transform, opacity",
              }}
            />
            <circle
              cx="0"
              cy="0"
              r="3"
              fill="var(--ds-gray-100)"
              stroke="currentColor"
              opacity="0"
              style={{
                offsetPath: 'path("M560 201 L560 414")',
                offsetRotate: "0deg",
                animationName: "hero-pipeline-dot-outward",
                animationDuration: "15.1s",
                animationDelay: "1.46s",
                animationTimingFunction: "linear",
                animationIterationCount: "infinite",
                animationFillMode: "both",
                willChange: "transform, opacity",
              }}
            />
          </g>
        </g>
        <g style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}>
          <g>
            <rect
              x="268"
              y="124"
              width="176"
              height="154"
              fill="var(--ds-gray-100)"
            />
            <rect
              x="268.5"
              y="124.5"
              width="175"
              height="153"
              fill="none"
              stroke="currentColor"
            />
            <line x1="268" y1="152" x2="444" y2="152" stroke="currentColor" />
            <path
              d="M296.804 168.236L296.65 168.96L292.785 187.288L292.684 187.765H284.181L284.428 186.983L290.226 168.655L290.359 168.236H296.804ZM309.2 168.236L309.048 168.96L305.182 187.288L305.081 187.765H296.577L296.824 186.983L302.623 168.655L302.756 168.236H309.2ZM327.423 168.236L327.176 169.017L321.377 187.346L321.244 187.765H314.8L314.952 187.04L318.818 168.712L318.919 168.236H327.423ZM339.819 168.236L339.572 169.017L333.773 187.346L333.641 187.765H327.196L327.349 187.04L331.215 168.712L331.315 168.236H339.819Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              transform="translate(0 -1)"
            />
            <text fill="currentColor" fontSize="13" data-part="label">
              <tspan x="284" y="238.4">
                <tspan fontWeight="500">{"10x ROAS"}</tspan>
                <tspan fill="var(--ds-gray-900)">{"average,"}</tspan>
              </tspan>
              <tspan x="284" y="258.4">
                <tspan fill="var(--ds-gray-900)">
                  {"never below 4x weekly"}
                </tspan>
              </tspan>
            </text>
            <text
              fill="currentColor"
              fontSize="13"
              fontWeight="500"
              data-part="label"
            >
              <tspan x="276" y="142.4">
                {"Go to "}
                {"Testimonials"}
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
              <g transform="translate(422 131)">
                <path
                  d="M11.9082 7L7.58333 11.3249L6.75846 10.5L9.67513 7.58333H2.33333V6.41667H9.67513L6.75846 3.5L7.58333 2.67513L11.9082 7Z"
                  fill="currentColor"
                />
              </g>
            </g>
            <rect
              x="264"
              y="120"
              width="184"
              height="162"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              opacity="0"
            />
          </g>
        </g>
        <g style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}>
          <g>
            <rect
              x="468"
              y="91"
              width="184"
              height="220"
              fill="var(--ds-gray-100)"
            />
            <rect
              x="468.5"
              y="91.5"
              width="183"
              height="219"
              fill="none"
              stroke="currentColor"
            />
            <line x1="468" y1="119" x2="652" y2="119" stroke="currentColor" />
            <g>
              <rect
                x="484.5"
                y="215.5"
                width="31"
                height="79"
                fill="var(--ds-gray-100)"
                stroke="currentColor"
              />
              <circle
                cx="500"
                cy="199"
                r="3.4"
                fill="var(--ds-gray-200)"
                stroke="currentColor"
                strokeWidth="1.2"
              />
            </g>
            <g>
              <rect
                x="524.5"
                y="151.5"
                width="31"
                height="143"
                fill="var(--ds-gray-100)"
                stroke="currentColor"
              />
              <circle
                cx="540"
                cy="139"
                r="3.4"
                fill="var(--ds-gray-200)"
                stroke="currentColor"
                strokeWidth="1.2"
              />
            </g>
            <g>
              <rect
                x="564.5"
                y="191.5"
                width="31"
                height="103"
                fill="var(--ds-gray-100)"
                stroke="currentColor"
              />
              <circle
                cx="580"
                cy="179"
                r="3.4"
                fill="var(--ds-gray-200)"
                stroke="currentColor"
                strokeWidth="1.2"
              />
            </g>
            <g>
              <rect
                x="604.5"
                y="247.5"
                width="31"
                height="47"
                fill="var(--ds-gray-100)"
                stroke="currentColor"
              />
              <circle
                cx="620"
                cy="235"
                r="3.4"
                fill="var(--ds-gray-200)"
                stroke="currentColor"
                strokeWidth="1.2"
              />
            </g>
            <text
              fill="currentColor"
              fontSize="13"
              fontWeight="500"
              data-part="label"
            >
              <tspan x="476" y="109.4">
                {"Go to "}
                {"Performance"}
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
              <g transform="translate(630 98)">
                <path
                  d="M11.9082 7L7.58333 11.3249L6.75846 10.5L9.67513 7.58333H2.33333V6.41667H9.67513L6.75846 3.5L7.58333 2.67513L11.9082 7Z"
                  fill="currentColor"
                />
              </g>
            </g>
            <rect
              x="464"
              y="87"
              width="192"
              height="228"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              opacity="0"
            />
          </g>
        </g>
        <g style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}>
          <g>
            <rect
              x="676"
              y="124"
              width="176"
              height="154"
              fill="var(--ds-gray-100)"
            />
            <rect
              x="676.5"
              y="124.5"
              width="175"
              height="153"
              fill="none"
              stroke="currentColor"
            />
            <line x1="676" y1="152" x2="852" y2="152" stroke="currentColor" />
            <text fill="currentColor" fontSize="13" data-part="label">
              <tspan x="692" y="219.29">
                <tspan fontWeight="500">{"$500"}</tspan>
                <tspan fill="var(--ds-gray-900)">{"Ad Credit"}</tspan>
              </tspan>
            </text>
            <text
              fill="currentColor"
              fontSize="13"
              fontWeight="500"
              data-part="label"
            >
              <tspan x="684" y="142.4">
                {"Go to "}
                {"Offer"}
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
              <g transform="translate(830 131)">
                <path
                  d="M11.9082 7L7.58333 11.3249L6.75846 10.5L9.67513 7.58333H2.33333V6.41667H9.67513L6.75846 3.5L7.58333 2.67513L11.9082 7Z"
                  fill="currentColor"
                />
              </g>
            </g>
            <rect
              x="672"
              y="120"
              width="184"
              height="162"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              opacity="0"
            />
          </g>
        </g>
      </svg>
    )
  if (variant === "narrow")
    return (
      <svg
        viewBox="230.67 5.44 658.67 391.11"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        shapeRendering="geometricPrecision"
        aria-hidden="true"
        {...props}
      >
        <style>
          {
            "\n          @keyframes hero-pipeline-dot-outward {\n            0%, 7% { opacity: 0; offset-distance: 0%; }\n            10% { opacity: 1; offset-distance: 0%; }\n            28% { opacity: 1; offset-distance: 100%; }\n            32%, 100% { opacity: 0; offset-distance: 100%; }\n          }\n          @media (prefers-reduced-motion: reduce) {\n            .hero-pipeline-dot { animation: none !important; opacity: 0; }\n          }\n        "
          }
        </style>
        <g pointerEvents="none">
          <rect width="1120" height="402" fill="var(--ds-gray-100)" />
          <path
            d="M1051.84 485.251L67.1669 -83.2491"
            stroke="currentColor"
            strokeDasharray="5 5"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          />
          <path
            d="M1051.83 -83.25L67.1618 485.25"
            stroke="currentColor"
            strokeDasharray="5 5"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          />
          <path
            d="M1128 201L-9.0001 201"
            stroke="currentColor"
            strokeDasharray="5 5"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          />
          <path
            d="M560 421L560 -19"
            stroke="currentColor"
            strokeDasharray="5 5"
            style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
          />
          <g>
            <circle
              cx="0"
              cy="0"
              r="3"
              fill="var(--ds-gray-100)"
              stroke="currentColor"
              opacity="0"
              style={{
                offsetPath: 'path("M560 201 L190.1 -12")',
                offsetRotate: "0deg",
                animationName: "hero-pipeline-dot-outward",
                animationDuration: "8.9s",
                animationDelay: "1.1s",
                animationTimingFunction: "linear",
                animationIterationCount: "infinite",
                animationFillMode: "both",
                willChange: "transform, opacity",
              }}
            />
            <circle
              cx="0"
              cy="0"
              r="3"
              fill="var(--ds-gray-100)"
              stroke="currentColor"
              opacity="0"
              style={{
                offsetPath: 'path("M560 201 L928.4 -12")',
                offsetRotate: "0deg",
                animationName: "hero-pipeline-dot-outward",
                animationDuration: "10.7s",
                animationDelay: "1.2200000000000002s",
                animationTimingFunction: "linear",
                animationIterationCount: "infinite",
                animationFillMode: "both",
                willChange: "transform, opacity",
              }}
            />
            <circle
              cx="0"
              cy="0"
              r="3"
              fill="var(--ds-gray-100)"
              stroke="currentColor"
              opacity="0"
              style={{
                offsetPath: 'path("M560 201 L-12 201")',
                offsetRotate: "0deg",
                animationName: "hero-pipeline-dot-outward",
                animationDuration: "12.9s",
                animationDelay: "1.34s",
                animationTimingFunction: "linear",
                animationIterationCount: "infinite",
                animationFillMode: "both",
                willChange: "transform, opacity",
              }}
            />
            <circle
              cx="0"
              cy="0"
              r="3"
              fill="var(--ds-gray-100)"
              stroke="currentColor"
              opacity="0"
              style={{
                offsetPath: 'path("M560 201 L560 414")',
                offsetRotate: "0deg",
                animationName: "hero-pipeline-dot-outward",
                animationDuration: "15.1s",
                animationDelay: "1.46s",
                animationTimingFunction: "linear",
                animationIterationCount: "infinite",
                animationFillMode: "both",
                willChange: "transform, opacity",
              }}
            />
          </g>
        </g>
        <g style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}>
          <g>
            <rect
              x="268"
              y="124"
              width="176"
              height="154"
              fill="var(--ds-gray-100)"
            />
            <rect
              x="268.5"
              y="124.5"
              width="175"
              height="153"
              fill="none"
              stroke="currentColor"
            />
            <line x1="268" y1="152" x2="444" y2="152" stroke="currentColor" />
            <path
              d="M296.804 168.236L296.65 168.96L292.785 187.288L292.684 187.765H284.181L284.428 186.983L290.226 168.655L290.359 168.236H296.804ZM309.2 168.236L309.048 168.96L305.182 187.288L305.081 187.765H296.577L296.824 186.983L302.623 168.655L302.756 168.236H309.2ZM327.423 168.236L327.176 169.017L321.377 187.346L321.244 187.765H314.8L314.952 187.04L318.818 168.712L318.919 168.236H327.423ZM339.819 168.236L339.572 169.017L333.773 187.346L333.641 187.765H327.196L327.349 187.04L331.215 168.712L331.315 168.236H339.819Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              transform="translate(0 -1)"
            />
            <text fill="currentColor" fontSize="13" data-part="label">
              <tspan x="284" y="238.4">
                <tspan fontWeight="500">{"10x ROAS"}</tspan>
                <tspan fill="var(--ds-gray-900)">{"average,"}</tspan>
              </tspan>
              <tspan x="284" y="258.4">
                <tspan fill="var(--ds-gray-900)">
                  {"never below 4x weekly"}
                </tspan>
              </tspan>
            </text>
            <text
              fill="currentColor"
              fontSize="13"
              fontWeight="500"
              data-part="label"
            >
              <tspan x="276" y="142.4">
                {"Go to "}
                {"Testimonials"}
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
              <g transform="translate(422 131)">
                <path
                  d="M11.9082 7L7.58333 11.3249L6.75846 10.5L9.67513 7.58333H2.33333V6.41667H9.67513L6.75846 3.5L7.58333 2.67513L11.9082 7Z"
                  fill="currentColor"
                />
              </g>
            </g>
            <rect
              x="264"
              y="120"
              width="184"
              height="162"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              opacity="0"
            />
          </g>
        </g>
        <g style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}>
          <g>
            <rect
              x="468"
              y="91"
              width="184"
              height="220"
              fill="var(--ds-gray-100)"
            />
            <rect
              x="468.5"
              y="91.5"
              width="183"
              height="219"
              fill="none"
              stroke="currentColor"
            />
            <line x1="468" y1="119" x2="652" y2="119" stroke="currentColor" />
            <g>
              <rect
                x="484.5"
                y="215.5"
                width="31"
                height="79"
                fill="var(--ds-gray-100)"
                stroke="currentColor"
              />
              <circle
                cx="500"
                cy="199"
                r="3.4"
                fill="var(--ds-gray-200)"
                stroke="currentColor"
                strokeWidth="1.2"
              />
            </g>
            <g>
              <rect
                x="524.5"
                y="151.5"
                width="31"
                height="143"
                fill="var(--ds-gray-100)"
                stroke="currentColor"
              />
              <circle
                cx="540"
                cy="139"
                r="3.4"
                fill="var(--ds-gray-200)"
                stroke="currentColor"
                strokeWidth="1.2"
              />
            </g>
            <g>
              <rect
                x="564.5"
                y="191.5"
                width="31"
                height="103"
                fill="var(--ds-gray-100)"
                stroke="currentColor"
              />
              <circle
                cx="580"
                cy="179"
                r="3.4"
                fill="var(--ds-gray-200)"
                stroke="currentColor"
                strokeWidth="1.2"
              />
            </g>
            <g>
              <rect
                x="604.5"
                y="247.5"
                width="31"
                height="47"
                fill="var(--ds-gray-100)"
                stroke="currentColor"
              />
              <circle
                cx="620"
                cy="235"
                r="3.4"
                fill="var(--ds-gray-200)"
                stroke="currentColor"
                strokeWidth="1.2"
              />
            </g>
            <text
              fill="currentColor"
              fontSize="13"
              fontWeight="500"
              data-part="label"
            >
              <tspan x="476" y="109.4">
                {"Go to "}
                {"Performance"}
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
              <g transform="translate(630 98)">
                <path
                  d="M11.9082 7L7.58333 11.3249L6.75846 10.5L9.67513 7.58333H2.33333V6.41667H9.67513L6.75846 3.5L7.58333 2.67513L11.9082 7Z"
                  fill="currentColor"
                />
              </g>
            </g>
            <rect
              x="464"
              y="87"
              width="192"
              height="228"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              opacity="0"
            />
          </g>
        </g>
        <g style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}>
          <g>
            <rect
              x="676"
              y="124"
              width="176"
              height="154"
              fill="var(--ds-gray-100)"
            />
            <rect
              x="676.5"
              y="124.5"
              width="175"
              height="153"
              fill="none"
              stroke="currentColor"
            />
            <line x1="676" y1="152" x2="852" y2="152" stroke="currentColor" />
            <text fill="currentColor" fontSize="13" data-part="label">
              <tspan x="692" y="219.29">
                <tspan fontWeight="500">{"$500"}</tspan>
                <tspan fill="var(--ds-gray-900)">{"Ad Credit"}</tspan>
              </tspan>
            </text>
            <text
              fill="currentColor"
              fontSize="13"
              fontWeight="500"
              data-part="label"
            >
              <tspan x="684" y="142.4">
                {"Go to "}
                {"Offer"}
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
              <g transform="translate(830 131)">
                <path
                  d="M11.9082 7L7.58333 11.3249L6.75846 10.5L9.67513 7.58333H2.33333V6.41667H9.67513L6.75846 3.5L7.58333 2.67513L11.9082 7Z"
                  fill="currentColor"
                />
              </g>
            </g>
            <rect
              x="672"
              y="120"
              width="184"
              height="162"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              opacity="0"
            />
          </g>
        </g>
      </svg>
    )
  return null
}
