/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useCallback } from "react"
import { GridCell, GridCellKind, Item } from "@glideapps/glide-data-grid"
import { ButtonCellType, TagsCellType } from "@glideapps/glide-data-grid-cells"

import CryptoIcon from "@/lib/get-crypto-icons"

interface Props {
  data: { [key: string]: string }[]
  getTagsFromLabels: (labels: string) => { tag: string; color: string }[]
}

export function useGridContent({ data, getTagsFromLabels }: Props) {
  return useCallback(
    (cell: Item): GridCell => {
      const [col, row] = cell
      // @ts-ignore: Unreachable code error
      const dataRow = data.data[row]
      if (!dataRow) {
        console.log("No data row found for row", row)
        return {
          kind: GridCellKind.Loading,
          allowOverlay: false,
        }
      }

      const indexes = [
        "address",
        "address_name",
        "label_type",
        "label_subtype",
        "label",
        "tag",
        "Etherscan",
      ]

      if (indexes[col] === "label") {
        return {
          kind: GridCellKind.Drilldown,
          cursor: "pointer",
          allowOverlay: false,
          data: [
            {
              text: dataRow[indexes[col]],
              img: `./assets/32/color/${CryptoIcon(dataRow[indexes[col]])}.png`,
            },
          ],
        }
      }

      if (indexes[col] === "address") {
        return {
          kind: GridCellKind.Text,
          allowOverlay: true,
          readonly: false,
          data: dataRow[indexes[col]],
          displayData: dataRow[indexes[col]],
        }
      }

      if (indexes[col] === "Etherscan") {
        const d: ButtonCellType = {
          kind: GridCellKind.Custom,
          cursor: "pointer",
          allowOverlay: false,
          copyData: "Button",
          readonly: true,
          data: {
            kind: "button-cell",
            backgroundColor: ["transparent", "bgHeaderHasFocus"],
            color: ["textDark", "textDark"],
            borderColor: "borderColor",
            borderRadius: 9,
            title: "View Details",
            onClick: () => {
              window.open(
                `https://etherscan.io/address/${dataRow[indexes[0]]}`,
                "_blank"
              )
            },
          },
          themeOverride: {
            baseFontStyle: "700 12px",
          },
        }
        return d
      }

      if (indexes[col] === "tag") {
        const tags = getTagsFromLabels(dataRow[indexes[1]])

        return {
          kind: GridCellKind.Custom,
          allowOverlay: true,
          copyData: "tags-cell",
          data: {
            kind: "tags-cell",
            possibleTags: tags.map((t) => ({ tag: t.tag, color: t.color })),
            readonly: true,
            tags: tags.map((t) => t.tag),
          },
        } as TagsCellType
      }

      return {
        kind: GridCellKind.Text,
        allowOverlay: false,
        displayData: dataRow[indexes[col]],
        data: dataRow[indexes[col]],
      }
    },

    [data, getTagsFromLabels]
  )
}
