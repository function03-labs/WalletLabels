"use client";

import CountUp from "react-countup";

export function CountingUp({
  start,
  end,
  duration,
  decimals,
  prefix,
  suffix,
  className,
  seperator,
}: {
  start: number;
  end: number;
  duration: number;
  decimals: number;
  prefix: string;
  suffix: string;
  className: string;
  seperator?: string;
}) {
  return (
    <CountUp
      start={start}
      end={end}
      duration={duration}
      decimals={decimals}
      prefix={prefix}
      suffix={suffix}
      separator={seperator}
      className={className}
    />
  );
}
