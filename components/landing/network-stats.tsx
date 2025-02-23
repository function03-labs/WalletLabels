import Image from "next/image"
import { motion } from "framer-motion"
import {
  ArrowUpRight,
  Clock,
  Database,
  GitMerge,
  Users,
  Zap,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

interface NetworkStatsProps {
  chain: {
    value: string
    label: string
    iconUrl: string
  }
}

export function NetworkStats({ chain }: NetworkStatsProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ type: "spring", stiffness: 300 }}
      data-oid=":rjcog_"
    >
      <Card
        className="flex h-full cursor-pointer flex-col justify-between border-gray-200 bg-white p-6 transition-all hover:border-blue-200"
        data-oid="mclemeq"
      >
        <div data-oid="wc::ub_">
          <div
            className="mb-4 flex items-center justify-between"
            data-oid="5c_fk-e"
          >
            <div className="flex items-center space-x-3" data-oid="p7ptyse">
              <div
                className="relative h-8 w-8 overflow-hidden rounded-lg ring-1 ring-gray-100"
                data-oid="6vg6p36"
              >
                <Image
                  src={chain.iconUrl}
                  alt={chain.label}
                  fill
                  className="object-cover"
                  data-oid="q6e9yxn"
                />
              </div>
              <div data-oid="nknp:s6">
                <h3
                  className="text-base font-bold text-gray-900"
                  data-oid="afr4zmp"
                >
                  {chain.label}
                </h3>
                <div className="flex items-center space-x-1" data-oid="x8et._v">
                  <div
                    className="h-1.5 w-1.5 rounded-full bg-green-500"
                    data-oid="85fxx9l"
                  />

                  <span className="text-xs text-gray-500" data-oid=".r7.u.l">
                    Live
                  </span>
                </div>
              </div>
            </div>
            <Badge
              variant="outline"
              className="border-blue-200 bg-blue-50 text-blue-700 text-xs"
              data-oid="iiyiwuf"
            >
              v2.0
            </Badge>
          </div>

          <div className="mb-4 grid grid-cols-2 gap-3" data-oid="qpg7va6">
            <div data-oid="udw_.hl">
              <div
                className="flex items-center text-xs text-gray-500"
                data-oid="0m5k784"
              >
                <Database className="mr-1 h-3 w-3" data-oid="k07x2uh" />
                Labels
              </div>
              <p
                className="font-mono text-sm font-bold text-gray-900"
                data-oid="2:5k3br"
              >
                200K+
              </p>
            </div>
            <div data-oid="dx15lq4">
              <div
                className="flex items-center text-xs text-gray-500"
                data-oid="188feid"
              >
                <Clock className="mr-1 h-3 w-3" data-oid=":fudp-h" />
                Updates
              </div>
              <p
                className="font-mono text-sm font-bold text-gray-900"
                data-oid="on1t-9i"
              >
                5K/day
              </p>
            </div>
            <div data-oid="o4r3opg">
              <div
                className="flex items-center text-xs text-gray-500"
                data-oid="uxkvhqe"
              >
                <Users className="mr-1 h-3 w-3" data-oid="x8x4-w1" />
                Entities
              </div>
              <p
                className="font-mono text-sm font-bold text-gray-900"
                data-oid="k:dku:h"
              >
                50K+
              </p>
            </div>
            <div data-oid="nlrhwqk">
              <div
                className="flex items-center text-xs text-gray-500"
                data-oid="wy:mykx"
              >
                <ArrowUpRight className="mr-1 h-3 w-3" data-oid="b_hy232" />
                Growth
              </div>
              <p
                className="font-mono text-sm font-bold text-green-600"
                data-oid="ee93qjt"
              >
                +15%
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2" data-oid="-6j9m1b">
          <div className="flex flex-wrap gap-1" data-oid="0orxvyf">
            <Badge
              variant="outline"
              className="border-gray-200 text-xs"
              data-oid="st1.iu-"
            >
              <GitMerge className="mr-1 h-3 w-3" data-oid="a:vv3z2" /> Contracts
            </Badge>
            <Badge
              variant="outline"
              className="border-gray-200 text-xs"
              data-oid="wn5tdmt"
            >
              DeFi
            </Badge>
            <Badge
              variant="outline"
              className="border-gray-200 text-xs"
              data-oid="j9e-8r1"
            >
              MEV
            </Badge>
          </div>
          <div className="text-[10px] text-gray-500" data-oid="ciom2d_">
            API:{" "}
            <code
              className="rounded bg-gray-50 px-1 py-0.5 font-mono"
              data-oid="4jsq3xp"
            >
              api/v2/{chain.value}
            </code>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
