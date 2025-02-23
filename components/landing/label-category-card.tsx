import { motion } from "framer-motion"
import { ArrowUpRight, BarChart, Target, Zap } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

interface LabelCategoryCardProps {
  category: {
    label: string
    emoji: string
  }
}

export function LabelCategoryCard({ category }: LabelCategoryCardProps) {
  // Simulated technical details for each category
  const getTechDetails = (label: string) => {
    const baseDetails = {
      accuracy: "99.8%",
      coverage: "85K+",
      growth: "+12%",
    }
    return baseDetails
  }

  const details = getTechDetails(category.label)

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ type: "spring", stiffness: 300 }}
      data-oid="59c774c"
    >
      <Card
        className="flex h-full cursor-pointer flex-col justify-between border-gray-200 bg-white p-6 transition-all hover:border-blue-200"
        data-oid="qdbpw3g"
      >
        <div data-oid="jbz390.">
          <div
            className="mb-4 flex items-center justify-between"
            data-oid="otty6cp"
          >
            <div className="flex items-center space-x-3" data-oid="jnniqap">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-50 text-xl"
                data-oid="rghetjh"
              >
                {category.emoji}
              </div>
              <div data-oid="8.tv59s">
                <h3
                  className="text-base font-bold capitalize text-gray-900"
                  data-oid="s0vcjy:"
                >
                  {category.label}
                </h3>
                <div className="flex items-center space-x-1" data-oid="-3-gjwh">
                  <div
                    className="h-1.5 w-1.5 rounded-full bg-green-500"
                    data-oid="8byodp7"
                  />

                  <span className="text-xs text-gray-500" data-oid=".j96j0:">
                    Active
                  </span>
                </div>
              </div>
            </div>
            <Badge
              variant="outline"
              className="border-blue-200 bg-blue-50 text-blue-700 text-xs"
              data-oid="8f6em1x"
            >
              ML
            </Badge>
          </div>

          <div className="mb-4 grid grid-cols-3 gap-3" data-oid=":_1me9c">
            <div data-oid=".0ar6_r">
              <div
                className="flex items-center text-xs text-gray-500"
                data-oid="0n7gger"
              >
                <Target className="mr-1 h-3 w-3" data-oid="70xus:m" />
                Accuracy
              </div>
              <p
                className="font-mono text-sm font-bold text-gray-900"
                data-oid="dkt-7r_"
              >
                {details.accuracy}
              </p>
            </div>
            <div data-oid="0mv4gmf">
              <div
                className="flex items-center text-xs text-gray-500"
                data-oid="qiarw2j"
              >
                <BarChart className="mr-1 h-3 w-3" data-oid="o:azkom" />
                Coverage
              </div>
              <p
                className="font-mono text-sm font-bold text-gray-900"
                data-oid="r4r8uct"
              >
                {details.coverage}
              </p>
            </div>
            <div data-oid="ypq664b">
              <div
                className="flex items-center text-xs text-gray-500"
                data-oid="8ifi0av"
              >
                <ArrowUpRight className="mr-1 h-3 w-3" data-oid="m.jdpmd" />
                Growth
              </div>
              <p
                className="font-mono text-sm font-bold text-green-600"
                data-oid="uxcuz_."
              >
                {details.growth}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2" data-oid="a8pr_74">
          <div className="flex flex-wrap gap-1" data-oid="az3hlmi">
            <Badge
              variant="outline"
              className="border-gray-200 text-xs"
              data-oid="esc2a5g"
            >
              <Zap className="mr-1 h-3 w-3" data-oid="jmmac-7" /> Auto-detect
            </Badge>
            <Badge
              variant="outline"
              className="border-gray-200 text-xs"
              data-oid="h61b:1."
            >
              Real-time
            </Badge>
            <Badge
              variant="outline"
              className="border-gray-200 text-xs"
              data-oid="bmc7ov4"
            >
              Pattern
            </Badge>
          </div>
          <div className="text-[10px] text-gray-500" data-oid=":100vt7">
            Updated:{" "}
            <span className="font-mono" data-oid="za85fza">
              2 mins ago
            </span>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
