"use client";

import { motion } from "framer-motion";

export function FramerWrapper(props: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ ease: "easeOut", duration: 0.53 }}
      className="z-30 "
    >
      {props.children}
    </motion.div>
  );
}
