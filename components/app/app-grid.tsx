"use client"

import React from "react"
import DataEditor, {
  DataEditorRef,
  GetRowThemeCallback,
  GridMouseEventArgs,
  Theme,
} from "@glideapps/glide-data-grid"
import { allCells } from "@glideapps/glide-data-grid-cells"
import { useTheme } from "next-themes"
import { createPortal } from "react-dom"

import { darkTheme } from "@/config/theme"
import { useGridColumns } from "@/lib/hooks/use-grid-columns"
import { useGridContent } from "@/lib/hooks/use-grid-content"
import { splitTags } from "@/lib/utils"
import pick from "@/lib/utils/color-picker"

export function Grid(props: {
  data: { [key: string]: string }[]
  chainSlug: string
}) {
  const cols = useGridColumns()
  const ref = React.useRef<DataEditorRef | null>(null)
  const { resolvedTheme } = useTheme()
  const [theme, setTheme] = React.useState<Partial<Theme>>({})

  React.useEffect(() => {
    setTheme(resolvedTheme === "dark" ? darkTheme : {})
  }, [resolvedTheme])

  const [hoverRow, setHoverRow] = React.useState<number | undefined>(undefined)
  const onItemHovered = React.useCallback((args: GridMouseEventArgs) => {
    const [_, row] = args.location
    setHoverRow(args.kind !== "cell" ? undefined : row)
  }, [])
  const getRowThemeOverride = React.useCallback<GetRowThemeCallback>(
    (row) => {
      if (row !== hoverRow) return undefined
      if (resolvedTheme === "dark") {
        return {
          bgCell: "#1f1f1f",
          bgCellMedium: "#2f2f2f",
        }
      } else {
        return {
          bgCell: "#f7f7f7",
          bgCellMedium: "#f0f0f0",
        }
      }
    },
    [hoverRow, resolvedTheme]
  )

  const getTagsFromLabels = (arg0: string) => {
    const tags = splitTags(arg0)

    return tags.map((tag) => {
      return {
        tag: tag,
        color: pick(tag, Boolean(resolvedTheme === "dark")),
      }
    })
  }

  const getContent = useGridContent({
    data: props.data,
    getTagsFromLabels,
    chainSlug: props.chainSlug,
  })

  return (
    <>
      <DataEditor
        ref={ref}
        theme={theme}
        columns={cols}
        width={"100%"}
        height={"50em"}
        overscrollY={30}
        freezeColumns={1}
        rowMarkers="number"
        smoothScrollX={true}
        smoothScrollY={false}
        customRenderers={allCells}
        getCellsForSelection={true}
        getCellContent={getContent}
        // @ts-ignore: Unreachable code error
        rows={props.data.data.length}
        onItemHovered={onItemHovered}
        keybindings={{ search: true }}
        className="rounded-xl shadow-lg"
        getRowThemeOverride={getRowThemeOverride}
      />
      {createPortal(
        <div
          id="portal"
          style={{ position: "fixed", left: 0, top: 0, zIndex: 9999 }}
        />,
        document.body
      )}
    </>
  )
}
