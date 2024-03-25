import { useMemo } from "react";
import { GridColumn, GridColumnIcon } from "@glideapps/glide-data-grid";

export function useGridColumns() {
  return useMemo<GridColumn[]>(
    () => [
      {
        title: "Address",
        id: "address",
        icon: GridColumnIcon.HeaderString,
      },
      {
        title: "Name",
        id: "address_name",
        group: "Core",
        icon: GridColumnIcon.HeaderTextTemplate,
      },
      {
        title: "Type",
        id: "label_type",
        group: "Core",
        icon: GridColumnIcon.HeaderLookup,
      },
      {
        title: "Subtype",
        id: "subtype",
        group: "Core",
        icon: GridColumnIcon.HeaderJoinStrings,
      },
      {
        title: "Entity",
        id: "label",
        group: "Core",
        icon: GridColumnIcon.HeaderSingleValue,
      },
      {
        title: "Tags",
        id: "tags",
        icon: GridColumnIcon.HeaderArray,
        grow: 1,
        group: "Extra",
      },
      {
        title: "Etherscan Lookup",
        id: "etherscan",
        icon: GridColumnIcon.HeaderLookup,
        group: "Extra",
      },
    ],
    []
  );
}