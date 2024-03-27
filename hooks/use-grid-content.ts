import { useCallback } from "react";

import {
  TagsCellType,
  SparklineCellType,
} from "@glideapps/glide-data-grid-cells";
import { Item, GridCell, GridCellKind } from "@glideapps/glide-data-grid";

import CryptoIcon from "@lib/get-crypto-icons";

interface Props {
  data: { [key: string]: string }[];
  getTagsFromLabels: (labels: string) => { tag: string; color: string }[];
}

export function useGridContent({ data, getTagsFromLabels }: Props) {
  return useCallback(
    (cell: Item): GridCell => {
      const [col, row] = cell;
      // @ts-ignore: Unreachable code error
      const dataRow = data.data[row];
      if (!dataRow) {
        console.log("No data row found for row", row);
        return {
          kind: GridCellKind.Loading,
          allowOverlay: false,
        };
      }

      let indexes = [
        "address",
        "address_name",
        "label_type",
        "label_subtype",
        "label",
        "tag",
        "Etherscan",
      ];

      if (dataRow.balanceHistory) {
        indexes = [
          "address",
          "address_name",
          "label_type",
          "label_subtype",
          "label",
          "tag",
          "balanceHistory",
          "Etherscan",
        ];
      }

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
        };
      }

      if (indexes[col] === "address") {
        return {
          kind: GridCellKind.Text,
          allowOverlay: true,
          data: dataRow[indexes[col]],
          displayData:
            window.innerWidth > 600
              ? dataRow[indexes[col]].slice(0, 24) + "..."
              : dataRow[indexes[col]].slice(0, 6) +
                "..." +
                dataRow[indexes[col]].slice(-4),
        };
      }

      if (indexes[col] === "Etherscan") {
        return {
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
              );
            },
          },
          themeOverride: {
            baseFontStyle: "700 12px",
          },
        };
      }

      if (indexes[col] === "tag") {
        return {
          kind: GridCellKind.Custom,
          allowOverlay: true,
          copyData: "tags",
          data: {
            kind: "tags-cell",
            possibleTags: getTagsFromLabels(dataRow[indexes[1]]),
            readonly: true,
            tags: getTagsFromLabels(dataRow[indexes[1]]).map((t) => t.tag),
          },
        } as TagsCellType;
      }

      if (indexes[col] === "balanceHistory") {
        const values: number[] = JSON.parse(dataRow[indexes[col]]).map(
          (x: string) => x[1]
        );
        return {
          kind: GridCellKind.Custom,
          allowOverlay: false,
          copyData: "4",
          data: {
            kind: "sparkline-cell",
            values: values,
            displayValues: values.map((x) => Math.round(x).toString()),
            color: Math.max(...values) > 1 ? "#77c4c4" : "#D98466",
            yAxis: [
              Math.round(Math.min(...values)),
              Math.round(Math.max(...values)) + 1,
            ],
          },
        } as SparklineCellType;
      }

      return {
        kind: GridCellKind.Text,
        allowOverlay: false,
        displayData: dataRow[indexes[col]],
        data: dataRow[indexes[col]],
      };
    },

    [data, getTagsFromLabels]
  );
}
