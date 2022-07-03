import {
  chakra,
  HTMLChakraProps,
  keyframes,
  useColorModeValue,
} from '@chakra-ui/react'

const dash = keyframes`
  from {
    stroke-dasharray: 100;
  }
  50% {
      transform: rotate(180deg);
          stroke-dasharray:400;
  }
  to {
    transform: rotate(360deg);
    stroke-dasharray:600;
  }
`

interface LogoGlyph extends HTMLChakraProps<'svg'> {
  isAnimating?: boolean
}

export const SaasUIGlyph: React.FC<LogoGlyph> = (props) => {
  const { isAnimating, ...rest } = props
  return (
    <chakra.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 180 180"
      {...rest}
    >
      <defs>
        <linearGradient
          id="saas-ui-logo-gradient"
          gradientUnits="userSpaceOnUse"
          x1="2.848"
          y1="91.531"
          x2="177.152"
          y2="91.531"
        >
          <stop offset="0" stopColor="#652ee3" />
          <stop offset=".548" stopColor="#4662e4" />
          <stop offset="1" stopColor="#48a2e5" />
        </linearGradient>
      </defs>
      <g fill={useColorModeValue('black', 'white')}>
        <path d="M121.92 46.15H86.53a2.2 2.2 0 0 0-2.2 2.2v17.2c0 1.38-.59 2.69-1.61 3.62l-.07.06c-.89.8-2.05 1.25-3.25 1.25H58.08a2.2 2.2 0 0 0-2.2 2.2v25.19c0 1.22.99 2.2 2.2 2.2h22.61a2.2 2.2 0 0 0 2.2-2.2V74.1c0-1.38.59-2.69 1.61-3.62.89-.8 2.05-1.25 3.25-1.25h34.17a2.2 2.2 0 0 0 2.2-2.2V48.35a2.2 2.2 0 0 0-2.2-2.2z" />
        <path d="M121.92 82.97H99.31a2.2 2.2 0 0 0-2.2 2.2v23.76c0 1.38-.59 2.69-1.61 3.62-.89.8-2.05 1.25-3.25 1.25H58.08a2.2 2.2 0 0 0-2.2 2.2v18.72c0 1.22.99 2.2 2.2 2.2h35.39a2.2 2.2 0 0 0 2.2-2.2v-17.23c0-1.38.59-2.69 1.61-3.62l.07-.06c.89-.8 2.05-1.25 3.25-1.25h21.33a2.2 2.2 0 0 0 2.2-2.2V85.17c-.01-1.22-.99-2.2-2.21-2.2z" />
      </g>
      <chakra.circle
        cx="90"
        cy="90"
        r="84"
        fill="none"
        strokeMiterlimit="10"
        strokeWidth="5"
        stroke="url(#saas-ui-logo-gradient)"
        strokeDasharray="150"
        transformOrigin="center"
        animation={isAnimating ? `${dash} 1s infinite linear` : ''}
      />
    </chakra.svg>
  )
}
