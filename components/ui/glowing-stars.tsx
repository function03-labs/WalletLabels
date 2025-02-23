// Thank you: https://ui.aceternity.com/components/glowing-stars-effect

"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { AnimatePresence, motion } from "framer-motion"

import { cn } from "@/lib/utils"

export const GlowingStarsBackgroundCard = ({
  className,
  children,
}: {
  className?: string
  children?: ReactNode
}) => {
  const [mouseEnter, setMouseEnter] = useState(false)

  return (
    <div
      onMouseEnter={() => {
        setMouseEnter(true)
      }}
      onMouseLeave={() => {
        setMouseEnter(false)
      }}
      className={className}
      data-oid="guwragl"
    >
      <div className="flex items-center justify-center" data-oid="xky2_ye">
        <Illustration mouseEnter={mouseEnter} data-oid="6yuxrsz" />
      </div>
      <div className="px-4 pb-0" data-oid="n25yrtk">
        {children}
      </div>
    </div>
  )
}

export const Illustration = ({ mouseEnter }: { mouseEnter: boolean }) => {
  const stars = 108
  const columns = 18

  const [glowingStars, setGlowingStars] = useState<number[]>([])

  const highlightedStars = useRef<number[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      highlightedStars.current = Array.from({ length: 5 }, () =>
        Math.floor(Math.random() * stars)
      )
      setGlowingStars([...highlightedStars.current])
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="h-[150px] w-full p-1"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: "1px",
      }}
      data-oid="3t3drdp"
    >
      {[...Array(stars)].map((_, starIdx) => {
        const isGlowing = glowingStars.includes(starIdx)
        const delay = (starIdx % 10) * 0.1
        const staticDelay = starIdx * 0.01
        return (
          <div
            key={`matrix-col-${starIdx.toString()}}`}
            className="relative flex items-center justify-center"
            data-oid="0823j6t"
          >
            <Star
              isGlowing={mouseEnter ? true : isGlowing}
              delay={mouseEnter ? staticDelay : delay}
              data-oid="yz809yl"
            />

            {mouseEnter && <Glow delay={staticDelay} data-oid="cd17c-u" />}
            <AnimatePresence mode="wait" data-oid="zuorf7v">
              {isGlowing && <Glow delay={delay} data-oid="9x:a3uq" />}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

const Star = ({ isGlowing, delay }: { isGlowing: boolean; delay: number }) => {
  return (
    <motion.div
      key={delay}
      initial={{
        scale: 1,
      }}
      animate={{
        scale: isGlowing ? [1, 1.2, 2.5, 2.2, 1.5] : 1,
        background: isGlowing ? "hsl(var(--primary))" : "#666",
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        delay: delay,
      }}
      className={cn("relative z-20 size-px rounded-full bg-[#666]")}
      data-oid=":qn1k-u"
    />
  )
}

const Glow = ({ delay }: { delay: number }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        delay: delay,
      }}
      exit={{
        opacity: 0,
      }}
      className="absolute left-1/2 z-10 size-[4px] -translate-x-1/2 rounded-full bg-background shadow-2xl shadow-primary/10 blur-[1px]"
      data-oid="3.y6pts"
    />
  )
}
