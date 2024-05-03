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
    <div className="flex justify-between">
      <Box className="align-start flex gap-2 text-sm text-muted-foreground">
        <div className="hidden whitespace-nowrap sm:block">
          Interesting finds:
        </div>
        {!params.query ? (
          <div className="flex flex-wrap gap-1">
            {badgeCategories.map((category) => (
              <CustomHitsBadge key={category.label} category={category} />
            ))}
          </div>
        ) : (
          <CustomHitsTags />
        )}
      </Box>
      <StatsWrapper />
    </div>
  )
}
