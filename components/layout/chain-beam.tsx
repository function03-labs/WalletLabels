"use client"

import React, { forwardRef, useRef } from "react"

import { cn } from "@/lib/utils"

import { Icons } from "@/components/shared/icons"
import { AnimatedBeam } from "@/components/ui/animated-beam"

// eslint-disable-next-line react/display-name
const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-full border-2 border-border bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className
      )}
      data-oid="y8vs.9d"
    >
      {children}
    </div>
  )
})

export function AnimatedBeamMultipleInput() {
  const containerRef = useRef<HTMLDivElement>(null)
  const div1Ref = useRef<HTMLDivElement>(null)
  const div2Ref = useRef<HTMLDivElement>(null)
  const div3Ref = useRef<HTMLDivElement>(null)
  const div6Ref = useRef<HTMLDivElement>(null)
  const div7Ref = useRef<HTMLDivElement>(null)

  return (
    <div
      className="relative flex size-full max-w-lg items-center justify-center overflow-hidden bg-background p-10"
      ref={containerRef}
      data-oid="t9z7s15"
    >
      <div
        className="flex size-full flex-row items-stretch justify-between gap-10"
        data-oid="p0tvoto"
      >
        <div className="flex flex-col justify-center gap-2" data-oid="z4biz:3">
          <Circle ref={div1Ref} data-oid="de89ese">
            <Icons.solana className="size-6" data-oid="ye59buc" />
          </Circle>
          <Circle ref={div2Ref} data-oid="-3pg.3p">
            <Icons.ethereum className="size-6" data-oid="nast87:" />
          </Circle>
          <Circle ref={div3Ref} data-oid="oj2-0zj">
            <Icons.arbitrum className="size-6" data-oid="tvx1-m3" />
          </Circle>
        </div>
        <div className="flex flex-col justify-center" data-oid="ervsayo">
          <Circle ref={div6Ref} className="size-16" data-oid="mlxcuw_">
            <Icons.logo className="size-6" data-oid="m8axf:o" />
          </Circle>
        </div>
        <div className="flex flex-col justify-center" data-oid="t9yca:d">
          <Circle ref={div7Ref} data-oid="br5xbu1">
            <Icons.user className="text-black" data-oid="9nm:umi" />
          </Circle>
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div6Ref}
        data-oid="gnewskc"
      />

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div6Ref}
        data-oid=":8kuj-."
      />

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={div6Ref}
        data-oid="mkyddv-"
      />

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div6Ref}
        toRef={div7Ref}
        data-oid="z8i4c4o"
      />
    </div>
  )
}
