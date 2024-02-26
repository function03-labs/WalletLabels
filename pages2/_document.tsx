import { Head, Html, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="min-h-screen bg-white font-sans text-slate-900 antialiased dark:bg-slate-900 dark:text-slate-50">
        <Main />
        <NextScript />
        <div
          id="portal"
          style={{ position: "fixed", top: 0, left: 0, zIndex: 9999 }}
        ></div>
      </body>
    </Html>
  )
}
