"use client"

import { Box, Flex, IconButton, Table } from "@radix-ui/themes"
import { motion } from "framer-motion"
import { CopyIcon, EditIcon } from "lucide-react"
import { LuLaptop } from "react-icons/lu"

import { FADE_DOWN_ANIMATION_VARIANTS } from "@/config/design"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ButtonSIWELogin } from "@/integrations/siwe/components/button-siwe-login"
import { IsSignedIn } from "@/integrations/siwe/components/is-signed-in"
import { IsSignedOut } from "@/integrations/siwe/components/is-signed-out"

const apiKeys = [
  {
    id: 1,
    name: "My API Key",
    key: "657ccb71-b75496ea97-74581e2-c1d73469",
  },
  {
    id: 2,
    name: "My API Key",
    key: "657ccb71-b75496ea97-74581e2-c1d73469",
  },
  {
    id: 3,
    name: "My API Key",
    key: "657ccb71-b75496ea97-74581e2-c1d73469",
  },
]

export default function PageDashboardApiKeys() {
  return (
    <motion.div
      animate="show"
      className="flex w-full items-center justify-between"
      initial="hidden"
      variants={FADE_DOWN_ANIMATION_VARIANTS}
      viewport={{ once: true }}
      whileInView="show"
    >
      <section className="w-full p-10">
        <div>
          <h3 className="text-4xl font-normal">API Keys</h3>
          <IsSignedOut>
            <div className="flex items-center gap-x-5 text-center">
              <span className="text-sm text-foreground">
                Authenticate to access your api keys. LuLaptop
              </span>
              <ButtonSIWELogin />
            </div>
          </IsSignedOut>
        </div>
        <hr className="my-5 opacity-50" />
        <IsSignedIn>
          <Card className="w-full p-6">
            <h3 className="text-2xl font-normal">Api Keys</h3>
          </Card>
        </IsSignedIn>
      </section>
    </motion.div>
  )
}
