"use client"

import { useEffect, useRef } from "react"

import { Icons } from "@/components/shared/icons"

interface FloatingLabelProps {
  text: string
  icon: keyof typeof Icons
  color: string
  speed?: number
  size?: number
  delay?: number
}

export function FloatingLabel(props: FloatingLabelProps) {
  const { text, icon, color, speed = 20, size = 24 } = props
  const Icon = Icons[icon] || Icons.help
  if (!Icon) {
    console.warn(`Icon "${icon}" not found`)
  }
  const labelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (labelRef.current) {
      const x = `${Math.random() * 80 + 20}vw`
      const y = `${Math.random() * 80 + 20}vh`
      const driftX = `${Math.random() * 20 - 20}vw`
      const driftY = `${Math.random() * 20 - 10}vh`
      const rotate = `${Math.random() * 20 - 10}deg`
      labelRef.current.style.setProperty("--x", x)
      labelRef.current.style.setProperty("--y", y)
      labelRef.current.style.setProperty("--drift-x", driftX)
      labelRef.current.style.setProperty("--drift-y", driftY)
      labelRef.current.style.setProperty("--rotate", rotate)
    }
  }, [])
  return (
    <div
      ref={labelRef}
      className="bg-opacity/10 fixed flex scale-150 items-center gap-2 rounded-full px-3 py-1.5 backdrop-blur-sm transition-transform"
      style={{
        backgroundColor: color,
        animation: `float ${speed}s ease-in-out infinite`,
      }}
    >
      <Icon className="size-6 text-white" aria-hidden="true" />
      <span className="whitespace-nowrap text-sm font-medium text-white">
        {text}
      </span>
    </div>
  )
}
