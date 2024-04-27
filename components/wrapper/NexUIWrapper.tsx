"use client";

import { NextUIProvider } from "@nextui-org/react";

export const NexUIWrapper = ({ children }: any) => {
  return <NextUIProvider>{children}</NextUIProvider>;
};
