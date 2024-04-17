"use client"

import { motion } from "framer-motion"

import { FADE_DOWN_ANIMATION_VARIANTS } from "@/config/design"
import { Card } from "@/components/ui/card"
import { ButtonSIWELogin } from "@/integrations/siwe/components/button-siwe-login"
import { IsSignedIn } from "@/integrations/siwe/components/is-signed-in"
import { IsSignedOut } from "@/integrations/siwe/components/is-signed-out"

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
          <h3 className="text-4xl font-normal">Playground</h3>
          <IsSignedOut>
            <div className="flex items-center gap-x-5 text-center">
              <span className="text-sm text-foreground">
                Authenticate to access the playground.
              </span>
              <ButtonSIWELogin />
            </div>
          </IsSignedOut>
        </div>
        <hr className="my-5 opacity-50" />
        <IsSignedIn>
          <Card className="w-full p-6">
            <h3 className="text-2xl font-normal">Playground</h3>
          </Card>
        </IsSignedIn>
      </section>
    </motion.div>
  )
}
