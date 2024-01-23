import "@styles/globals.css";
import fontSans from "@fonts/font-sans";

import { cn } from "@lib/utils";
import { Analytics } from "@vercel/analytics/react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "bg-white font-sans text-gray-900 antialiased dark:bg-black dark:text-white",
        fontSans.className
      )}
    >
      {children}
      <Analytics />
    </div>
  );
}
