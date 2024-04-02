"use client";

import React from "react";
import { useTheme } from "next-themes";

import DataEditor, {
  DataEditorRef,
  GridColumn,
  GridColumnIcon,
  Theme,
} from "@glideapps/glide-data-grid";
import { allCells } from "@glideapps/glide-data-grid-cells";

import pick from "@lib/color-picker";
import { splitTags } from "@lib/utils";
import { darkTheme } from "@config/theme";

import { useGridContent } from "@hook/use-grid-content";
import { useGridColumns } from "@hook/use-grid-columns";

export function Grid(props: { data: { [key: string]: string }[] }) {
  const cols = useGridColumns();
  const { resolvedTheme } = useTheme();
  const ref = React.useRef<DataEditorRef | null>(null);
  const [theme, setTheme] = React.useState<Partial<Theme>>({});

  React.useEffect(() => {
    setTheme(resolvedTheme === "dark" ? darkTheme : {});
  }, [resolvedTheme]);

  const getTagsFromLabels = (arg0: string) => {
    const tags = splitTags(arg0);

    return tags.map((tag) => {
      return {
        tag: tag,
        color: pick(tag, Boolean(resolvedTheme === "dark")),
      };
    });
  };

  console.log(props.data);

  const getContent = useGridContent({
    data: props.data,
    getTagsFromLabels,
  });

  return (
    <DataEditor
      theme={theme}
      className="rounded-xl shadow-lg"
      smoothScrollY={true}
      width={"100%"}
      height={"50em"}
      getCellContent={getContent}
      columns={cols}
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
