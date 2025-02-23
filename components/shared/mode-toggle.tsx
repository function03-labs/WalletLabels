"use client"

import { useTheme } from "next-themes"

import { Icons } from "@/components/shared/icons"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu data-oid="h7yodda">
      <DropdownMenuTrigger asChild data-oid="mooc.2i">
        <Button variant="outline" size="icon" data-oid="ec6gfhj">
          <Icons.sun
            className="size-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
            data-oid="8g3x.t8"
          />

          <Icons.moon
            className="absolute size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 dark:text-white"
            data-oid="np.4p0."
          />

          <span className="sr-only" data-oid="0g7-uw1">
            Toggle theme
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" data-oid=":qf1t8.">
        {["light", "dark", "system"].map((theme) => (
          <DropdownMenuItem
            key={theme}
            onClick={() => setTheme(theme)}
            data-oid="etyd2g1"
          >
            {theme[0].toUpperCase() + theme.slice(1)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
