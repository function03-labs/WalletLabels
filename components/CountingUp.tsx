"use client";

import CountUp from "react-countup";

export function CountingUp() {
  return (
    <CountUp
      start={0}
      end={70}
      duration={6}
      decimals={0}
      prefix=" "
      suffix="M "
      className="text-xl font-semibold text-slate-700 dark:text-slate-400"
    />
  );
}
