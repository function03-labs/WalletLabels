import * as React from "react"
import { SVGProps } from "react"

const Logo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    className="transition"
    preserveAspectRatio="none"
    style={{
      borderRadius: 0,
      transform: "scale(1) rotate(0deg)",
    }}
    viewBox="0 0 500 500"
    width="1em"
    height="1em"
    {...props}>
    <path
      stroke="currentColor"
      strokeWidth={35}
      d="m155.568 339.027 183.448-183.448M162.416 439.5h176.168c56.287 0 101.916-45.629 101.916-101.916V161.416c0-56.287-45.629-101.916-101.916-101.916H162.416C106.129 59.5 60.5 105.129 60.5 161.416v176.168c0 56.287 45.629 101.916 101.916 101.916Z"
    />
  </svg>
)
export default Logo
