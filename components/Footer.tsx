import { cn } from "@lib/utils";

import { buttonVariants } from "@component/ui/Button";

export function Footer() {
  return (
    <footer className="flex items-center justify-center">
      <div className="text-sm font-medium">
        Crafted by{" "}
        <a
          href="https://twitter.com/aiden0x4"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            buttonVariants({ variant: "link" }),
            "-ml-4 font-semibold text-slate-700"
          )}
        >
          WalletLabs
        </a>
      </div>
    </footer>
  );
}
