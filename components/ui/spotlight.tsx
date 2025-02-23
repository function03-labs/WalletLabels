import React from "react"

import { cn } from "@/lib/utils"

type SpotlightProps = {
  className?: string
  fill?: string
}

export const Spotlight = ({ className, fill }: SpotlightProps) => {
  return (
    <svg
      className={cn(
        "pointer-events-none absolute z-[1] h-[169%]  w-[138%] animate-spotlight opacity-0 lg:w-[84%]",
        className
      )}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3787 2842"
      fill="none"
      data-oid=".oeeyaj"
    >
      <g filter="url(#filter)" data-oid="xhvvuwq">
        <ellipse
          cx="1924.71"
          cy="273.501"
          rx="1924.71"
          ry="273.501"
          transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
          fill={fill || "white"}
          fillOpacity="0.21"
          data-oid="_kxqe29"
        ></ellipse>
      </g>
      <defs data-oid="crcx:sm">
        <filter
          id="filter"
          x="0.860352"
          y="0.838989"
          width="3785.16"
          height="2840.26"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
          data-oid="7c.ygah"
        >
          <feFlood
            floodOpacity="0"
            result="BackgroundImageFix"
            data-oid="ud3j.bt"
          ></feFlood>
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
            data-oid="a_rt5j7"
          ></feBlend>
          <feGaussianBlur
            stdDeviation="151"
            result="effect1_foregroundBlur_1065_8"
            data-oid="mb7jt.w"
          ></feGaussianBlur>
        </filter>
      </defs>
    </svg>
  )
}
