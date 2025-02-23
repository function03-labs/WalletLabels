import { useState } from "react"
import { motion } from "framer-motion"
import { Code2, Search } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export function SearchDemo() {
  const [searchValue, setSearchValue] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = () => {
    setIsSearching(true)
    // Simulate search delay
    setTimeout(() => setIsSearching(false), 1000)
  }

  return (
    <Card
      className="mx-auto max-w-4xl border-gray-200 bg-white"
      data-oid="t:u3jya"
    >
      <div
        className="border-b border-gray-100 bg-gray-50 p-4"
        data-oid="v8cmh75"
      >
        <div className="flex items-center justify-between" data-oid="_o1nge:">
          <div className="flex items-center space-x-4" data-oid="x9.yfa5">
            <Code2 className="h-5 w-5 text-gray-400" data-oid="zim2gh5" />
            <div className="font-mono text-sm text-gray-600" data-oid=".ljg7qz">
              API Query Explorer
            </div>
          </div>
          <Badge
            variant="outline"
            className="border-blue-200"
            data-oid="q1bxf7g"
          >
            REST / GraphQL
          </Badge>
        </div>
      </div>

      <div className="space-y-6 p-6" data-oid="4wiei-7">
        <div className="flex items-center space-x-3" data-oid="hrfeycl">
          <Input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Enter wallet address or label..."
            className="font-mono flex-1 border-gray-200 bg-transparent text-gray-900 placeholder:text-gray-400 focus:border-blue-500"
            data-oid="fqqivu-"
          />

          <Button
            onClick={handleSearch}
            className="bg-blue-600 px-6 text-white hover:bg-blue-700"
            disabled={isSearching}
            data-oid="c9sf30-"
          >
            {isSearching ? (
              "Searching..."
            ) : (
              <div className="flex items-center space-x-2" data-oid="-b1jwfz">
                <Search className="h-4 w-4" data-oid="bqpxeal" />
                <span data-oid="3:.jqnk">Search</span>
              </div>
            )}
          </Button>
        </div>

        {searchValue && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
            data-oid="b9.68c1"
          >
            <div
              className="rounded-lg bg-gray-900 p-4 font-mono"
              data-oid="vqsp_8f"
            >
              <div className="mb-2 text-sm text-gray-400" data-oid="axe-t9o">
                // API Request
              </div>
              <div className="text-green-400" data-oid="hlli9k:">
                GET /api/v1/labels/search?q={searchValue}
              </div>
            </div>

            <div className="rounded-lg bg-gray-50 p-4" data-oid="ou8aou:">
              <div
                className="mb-4 flex items-center justify-between"
                data-oid="_32qq61"
              >
                <div
                  className="text-sm font-medium text-gray-900"
                  data-oid="efr5z:h"
                >
                  Response
                </div>
                <Badge
                  className="bg-green-50 text-green-700"
                  data-oid="ll_o-0d"
                >
                  200 OK
                </Badge>
              </div>
              <div className="space-y-3" data-oid=".c4bztv">
                <div className="grid grid-cols-2 gap-4" data-oid="accj4cr">
                  <div data-oid="_pj4181">
                    <div className="text-sm text-gray-500" data-oid="re8b-lh">
                      Entity Type
                    </div>
                    <div
                      className="font-mono text-sm text-gray-900"
                      data-oid="srfqyan"
                    >
                      DeFi Protocol
                    </div>
                  </div>
                  <div data-oid="r-fpddl">
                    <div className="text-sm text-gray-500" data-oid=":rkt79u">
                      Last Active
                    </div>
                    <div
                      className="font-mono text-sm text-gray-900"
                      data-oid="kjuhrfw"
                    >
                      2 hours ago
                    </div>
                  </div>
                  <div data-oid="8x6.hut">
                    <div className="text-sm text-gray-500" data-oid="h8v0oxp">
                      Transaction Count
                    </div>
                    <div
                      className="font-mono text-sm text-gray-900"
                      data-oid="pwy12zg"
                    >
                      1.2M+
                    </div>
                  </div>
                  <div data-oid=".ubbsdg">
                    <div className="text-sm text-gray-500" data-oid="r7rs_m8">
                      Total Value
                    </div>
                    <div
                      className="font-mono text-sm text-gray-900"
                      data-oid="0d2xmc3"
                    >
                      $5.2M
                    </div>
                  </div>
                </div>

                <div data-oid="n3x36xt">
                  <div className="text-sm text-gray-500" data-oid="opp_ds:">
                    Categories
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2" data-oid="19gs955">
                    <Badge variant="outline" data-oid="eu-rt79">
                      DeFi
                    </Badge>
                    <Badge variant="outline" data-oid="1q_gc:e">
                      MEV
                    </Badge>
                    <Badge variant="outline" data-oid="q:6.id-">
                      Exchanges
                    </Badge>
                  </div>
                </div>

                <div data-oid="x2grld0">
                  <div className="text-sm text-gray-500" data-oid="23tn5bj">
                    Associated Networks
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2" data-oid="vl8udkb">
                    <Badge
                      className="bg-blue-50 text-blue-700"
                      data-oid="5j_m8.u"
                    >
                      Ethereum
                    </Badge>
                    <Badge
                      className="bg-purple-50 text-purple-700"
                      data-oid="l0freal"
                    >
                      Arbitrum
                    </Badge>
                    <Badge
                      className="bg-orange-50 text-orange-700"
                      data-oid="fp685jk"
                    >
                      Optimism
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </Card>
  )
}
