"use client";

import React from "react";
import { useTheme } from "next-themes";

import DataEditor, {
  DataEditorRef,
  GridColumn,
  GridColumnIcon,
} from "@glideapps/glide-data-grid";
import { allCells } from "@glideapps/glide-data-grid-cells";

import pick from "@lib/color-picker";
import { splitTags } from "@lib/utils";

import { useGridContent } from "@hook/use-grid-content";
import { useGridColumns } from "@hook/use-grid-columns";

export function Grid(props: { data: { [key: string]: string }[] }) {
  const cols = useGridColumns();
  const { resolvedTheme } = useTheme();
  const ref = React.useRef<DataEditorRef | null>(null);

  const getTagsFromLabels = (arg0: string) => {
    const tags = splitTags(arg0);

    return tags.map((tag) => {
      return {
        tag: tag,
        color: pick(tag, Boolean(resolvedTheme === "dark")),
      };
    });
  };

  const getContent = useGridContent({
    data: props.data,
    getTagsFromLabels,
  });

  const cols_balanceChart = React.useMemo<GridColumn[]>(() => {
    return [
      {
        title: "Balance History",
        id: "balanceHistory",
        icon: GridColumnIcon.HeaderGeoDistance,
        grow: 1,
        group: "Extra",
      },
    ];
  }, []);

  return (
    <DataEditor
      className="rounded-xl shadow-lg"
      smoothScrollY={true}
      width={"100%"}
      height={"50em"}
      getCellContent={getContent}
      columns={
        // @ts-ignore: Unreachable code error
        props.data.data[0] && props.data.data[0].balanceHistory
          ? [
              ...cols.slice(0, cols.length - 1),
              ...cols_balanceChart,
              ...cols.slice(cols.length - 1),
            ]
          : cols
      }
      // @ts-ignore: Unreachable code error
      rows={props.data.data.length}
      keybindings={{ search: true }}
      getCellsForSelection={true}
      rowMarkers="number"
      freezeColumns={1}
      overscrollY={50}
      smoothScrollX={true}
      ref={ref}
      customRenderers={allCells}
    />
  );
}
