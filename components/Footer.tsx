import styles from "styles/index.module.scss";

import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@component/ui/DropdownMenu";
import { Button } from "@component/ui/Button";
import { Icons } from "@component/ui/Lucide";

type Theme = "dark" | "system" | "light";

export default function Footer() {
  const { theme, setTheme } = useTheme();

  return (
    <footer className={styles.footer} data-theme={theme ? theme : "light"}>
      <div className={styles.footerText}>
        Crafted by{" "}
        <a
          href="https://twitter.com/aiden0x4"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          WalletLabs
        </a>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Icons.sun className="size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Icons.moon className="absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </footer>
  );
}
