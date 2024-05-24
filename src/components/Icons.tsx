type IconProps = React.HTMLAttributes<SVGElement>;

export const Icons = {
  Accepted_On_L2: (props: IconProps) => (
    <svg
      {...props}
      stroke-width="2px"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      role="img"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className="sc-kAyceB iHwjMm"
    >
      <g clip-path="url(#clip0_20_8578)">
        <path
          d="M15.757 10.502L8.25699 6.00195C8.17934 5.95542 8.09052 5.93085 7.99999 5.93085C7.90947 5.93085 7.82064 5.95542 7.74299 6.00195L0.242992 10.502C0.168838 10.5463 0.107458 10.6092 0.0648385 10.6844C0.0222193 10.7596 -0.000183105 10.8445 -0.000183105 10.931C-0.000183105 11.0174 0.0222193 11.1023 0.0648385 11.1775C0.107458 11.2527 0.168838 11.3156 0.242992 11.36L7.74299 15.86C7.82064 15.9065 7.90947 15.9311 7.99999 15.9311C8.09052 15.9311 8.17934 15.9065 8.25699 15.86L15.757 11.36C15.8311 11.3156 15.8925 11.2527 15.9351 11.1775C15.9778 11.1023 16.0002 11.0174 16.0002 10.931C16.0002 10.8445 15.9778 10.7596 15.9351 10.6844C15.8925 10.6092 15.8311 10.5463 15.757 10.502Z"
          fill="#117D49"
          stroke-width="0"
        ></path>
        <path
          d="M8 2.43085L15.5 6.93085L8 11.4308L0.5 6.93085L8 2.43085Z"
          fill="white"
          stroke="#117D49"
          stroke-width="1"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
      </g>
      <defs>
        <clipPath id="clip0_20_8578">
          <rect
            width="16"
            height="16"
            fill="white"
            transform="translate(0 0.930847)"
          ></rect>
        </clipPath>
      </defs>
    </svg>
  ),

  Reverted: (props: IconProps) => (
    <svg
      {...props}
      stroke-width="2px"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      role="img"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className="sc-kAyceB iHwjMm"
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <rect
          x="14"
          width="14"
          height="14"
          rx="7"
          transform="rotate(90 14 0)"
          fill="#FF4F0A"
          fill-opacity="0.67"
          stroke-width="0"
        ></rect>
        <path
          d="M6.27282 3.69565C6.27282 3.9047 6.27282 6.96487 6.27282 7.17391C6.27282 7.55791 6.59827 7.86957 7.00009 7.86957C7.40191 7.86957 7.72736 7.55791 7.72736 7.17391C7.72736 6.96487 7.72736 3.9047 7.72736 3.69565C7.72736 3.31165 7.40191 3 7.00009 3C6.59827 3 6.27282 3.31165 6.27282 3.69565ZM7.00009 8.91304C6.39754 8.91304 5.90918 9.38017 5.90918 9.95652C5.90918 10.5329 6.39754 11 7.00009 11C7.60264 11 8.091 10.5329 8.091 9.95652C8.091 9.38017 7.60264 8.91304 7.00009 8.91304Z"
          fill="white"
          stroke-width="0"
        ></path>
      </svg>
    </svg>
  ),
  Check: (props: IconProps) => (
    <svg
      {...props}
      stroke-width="2px"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      color="white"
      className="sc-kAyceB fzVPti sc-gMZepy khfcFB"
      role="img"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      fill="white"
      strokeWidth="3px"
    >
      <path d="M5 13l4 4L19 7"></path>
    </svg>
  ),
  InfoIcon: (props: React.HTMLAttributes<HTMLDivElement>) => (
    <div
      {...props}
      className="w-4 h-4 border border-white rounded-full flex items-center justify-center text-[10px] cursor-pointer"
    >
      ?
    </div>
  ),
  CopyIcon: (props: IconProps) => (
    <svg
      {...props}
      stroke-width="2px"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      className="sc-kAyceB iHwjMm sc-fxwrCY fxa-DNc"
      role="img"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
    </svg>
  ),
  Loader: (props: IconProps) => (
    <svg
      {...props}
      className="animate-spin -ml-1 mr-3 h-6 w-6 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
    >
      <circle
        className="opacity-100"
        cx="12"
        cy="12"
        r="10"
        stroke="#4B4B4B"
        strokeWidth="2"
      ></circle>
      <path
        className="opacity-100"
        fill="white"
        strokeWidth="0"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  ),
};
