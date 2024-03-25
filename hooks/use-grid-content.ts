import { useCallback } from "react";
import {
  TagsCellType,
  ButtonCellType,
  SparklineCellType,
} from "@glideapps/glide-data-grid-cells";
import {
  Item,
  GridCell,
  GridCellKind,
  DrilldownCell,
} from "@glideapps/glide-data-grid";

import CryptoIcon from "@lib/get-crypto-icons";

type Label = { [key: string]: string };

interface Props {
  data: Label[];
  getTagsFromLabels: (labels: string) => { tag: string; color: string }[];
}

export const useGridContent = ({ data, getTagsFromLabels }: Props) => {
  return useCallback(
    (cell: Item): GridCell => {
      const [col, row] = cell;
      const dataRow = data[row];
      if (!dataRow) {
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
        const path_to_img = `./assets/32/color/${CryptoIcon(
          dataRow[indexes[col]]
        )}.png`;
        const d: DrilldownCell = {
          kind: GridCellKind.Drilldown,
          cursor: "pointer",
          allowOverlay: false,
          data: [
            {
              text: dataRow[indexes[col]],
              img: path_to_img,
            },
          ],
        };
        return d;
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
              );
            },
          },
          themeOverride: {
            baseFontStyle: "700 12px",
          },
        };
        return d;
      } else if (indexes[col] === "tag") {
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

      const d = dataRow[indexes[col]];
      return {
        kind: GridCellKind.Text,
        allowOverlay: false,
        displayData: d,
        data: d,
      };
    },

    [data, getTagsFromLabels]
  );
};
