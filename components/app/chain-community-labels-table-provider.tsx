"use client"

import * as React from "react"

import { dataTableConfig, type DataTableConfig } from "@/config/data-table"

import { ToggleGroup } from "@/components/ui/toggle-group"

type FeatureFlagValue = DataTableConfig["featureFlags"][number]["value"]

interface LabelsTableContextProps {
  featureFlags: FeatureFlagValue[]
  setFeatureFlags: React.Dispatch<React.SetStateAction<FeatureFlagValue[]>>
}

const LabelsTableContext = React.createContext<LabelsTableContextProps>({
  featureFlags: [],
  setFeatureFlags: () => {},
})

export function useLabelsTable() {
  const context = React.useContext(LabelsTableContext)
  if (!context) {
    throw new Error("useLabelsTable must be used within a LabelsTableProvider")
  }
  return context
}

export function ChainCommunityLabelsTableProvider({
  children,
}: React.PropsWithChildren) {
  const [featureFlags, setFeatureFlags] = React.useState<FeatureFlagValue[]>([])

  return (
    <LabelsTableContext.Provider
      value={{
        featureFlags,
        setFeatureFlags,
      }}
    >
      <div className="w-full overflow-x-auto">
        <ToggleGroup
          type="multiple"
          variant="outline"
          size="sm"
          value={featureFlags}
          onValueChange={(value: FeatureFlagValue[]) => setFeatureFlags(value)}
          className="w-fit"
        >
          {dataTableConfig.featureFlags.map((flag) => (
            <></>
          ))}
        </ToggleGroup>
      </div>
      {children}
    </LabelsTableContext.Provider>
  )
}
