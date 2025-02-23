/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from "react"
import { Box } from "@chakra-ui/react"

import { badgeCategories } from "@/config/badge-categories"

import CustomHitsTags, {
  CustomHitsBadge,
  StatsWrapper,
} from "@/components/shared/search-box"

export function FindingFilter({
  params,
}: {
  params: { [key: string]: string | string[] | undefined }
}) {
  return (
    <div className="flex justify-between" data-oid="_07m-dy">
      <Box
        className="align-start flex gap-2 text-sm text-muted-foreground"
        data-oid="nl57cxd"
      >
        <div className="hidden whitespace-nowrap sm:block" data-oid="gzjyhhz">
          Interesting finds:
        </div>
        {!params.query ? (
          <div className="flex flex-wrap gap-1" data-oid="d_wb9is">
            {badgeCategories.map((category) => (
              <CustomHitsBadge
                key={category.label}
                category={category}
                data-oid="n2mr6gj"
              />
            ))}
          </div>
        ) : (
          <CustomHitsTags data-oid="fb3fyw2" />
        )}
      </Box>
      {/* <StatsWrapper /> */}
    </div>
  )
}
