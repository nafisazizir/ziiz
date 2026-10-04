import type { ArtProps } from "../props"

// Ported from help.x.com: managing-your-account.
export function PanelStack(props: ArtProps) {
  return (
    <svg
      fill="none"
      shapeRendering="geometricPrecision"
      viewBox="0 0 320 224"
      aria-hidden="true"
      {...props}
    >
      <rect
        data-part="frame"
        fill="var(--ds-gray-100)"
        height="224"
        width="320"
      />
      <g transform="translate(-0.5 16.643)">
        <g data-part="settings-card">
          <rect
            fill="var(--ds-background-100)"
            height="72"
            stroke="currentColor"
            strokeWidth="1"
            width="72"
            x="76"
            y="21.357"
          />
          <g data-part="gear" transform="translate(100 45.357)">
            <path
              d="M12.9206 2.75H11.0706C9.48773 5.12431 9.00769 5.47587 6.21436 4.83125L4.82686 6.21875C5.47147 9.01208 5.11992 9.49212 2.74561 11.075V12.925C5.11992 14.5079 5.47147 14.9879 4.82686 17.7812L6.21436 19.1688C9.00769 18.5241 9.48773 18.8757 11.0706 21.25H12.9206C14.5035 18.8757 14.9835 18.5241 17.7769 19.1688L19.1644 17.7812C18.5197 14.9879 18.8713 14.5079 21.2456 12.925V11.075C18.8713 9.49212 18.5197 9.01208 19.1644 6.21875L17.7769 4.83125C14.9835 5.47587 14.5035 5.12431 12.9206 2.75Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </g>
        </g>
        <g data-part="panel">
          <rect
            height="65"
            stroke="currentColor"
            strokeWidth="1"
            width="111"
            x="160"
            y="105.357"
          />
          <rect
            data-part="panel-bar"
            fill="var(--ds-background-100)"
            height="8"
            stroke="currentColor"
            strokeWidth="1"
            width="30"
            x="167.5"
            y="153.857"
          />
          <rect
            data-part="panel-bar"
            fill="var(--ds-background-100)"
            height="8"
            stroke="currentColor"
            strokeWidth="1"
            width="60"
            x="201.5"
            y="153.857"
          />
        </g>
        <g>
          <rect
            data-part="canvas-placeholder"
            fill="none"
            stroke="currentColor"
            strokeDasharray="4 4"
            strokeWidth="1"
            x="160"
            y="41.357"
            width="52px"
            height="44px"
          />
          <g data-group="row">
            <rect
              data-part="slot"
              data-slot="0"
              fill="none"
              height="64"
              stroke="currentColor"
              strokeWidth="1"
              y="105.357"
              width="18.975326431018765px"
              strokeDasharray="4 4"
              style={{
                transform: "translateX(50px)",
                transformOrigin: "50% 50%",
                transformBox: "fill-box",
              }}
            />
            <rect
              data-part="slot"
              data-slot="1"
              fill="none"
              height="64"
              stroke="currentColor"
              strokeWidth="1"
              y="105.357"
              width="50.024673568981235px"
              strokeDasharray="400 0"
              style={{
                transform: "translateX(74.9753px)",
                transformOrigin: "50% 50%",
                transformBox: "fill-box",
              }}
            />
            <rect
              data-part="slot"
              data-slot="2"
              fill="none"
              height="64"
              stroke="currentColor"
              strokeWidth="1"
              y="105.357"
              width="17px"
              strokeDasharray="4 4"
              style={{
                transform: "translateX(131px)",
                transformOrigin: "50% 50%",
                transformBox: "fill-box",
              }}
            />
          </g>
        </g>
      </g>
    </svg>
  )
}
