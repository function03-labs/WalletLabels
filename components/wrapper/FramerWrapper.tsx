"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";

import { Spotlight } from "@component/ui/Spotlight";

export function FramerWrapper(props: { children: React.ReactNode }) {
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ ease: "easeOut", duration: 0.53 }}
      className="z-30 "
    >
      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill={theme === "dark" ? "#ADD8E6" : "#00008B"}
      />
      {props.children}
    </motion.div>
  );
}
