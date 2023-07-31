import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useTheme } from "next-themes";
import styles from "styles/index.module.scss";

export function Footer() {
  const { theme } = useTheme();
  const [defaulttheme, setDefaultTheme] = useState("light");
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "100px",
  });

  useEffect(() => {
    if (theme == "system") {
      setDefaultTheme(
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
      );
    } else {
      setDefaultTheme(theme);
    }
  }, [theme]);

  return (
    <footer
      ref={ref}
      className={styles.footer}
      data-animate={isInView}
      data-theme={defaulttheme ? defaulttheme : "light"}
    >
      <div className={styles.footerText}>
        Crafted by{" "}
        <a
          href="https://twitter.com/aiden0x4"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <img
            src="https://pbs.twimg.com/profile_images/1626383708054757377/ejkm30BA_400x400.jpg"
            alt="Avatar of Aiden" />
          Aiden
        </a>
      </div>
    </footer>
  );
}
