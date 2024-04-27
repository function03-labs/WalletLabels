"use client";

import { useMemo } from "react";
import { GridColumn, GridColumnIcon } from "@glideapps/glide-data-grid";

export function useGridColumns() {
  return useMemo<GridColumn[]>(
    () => [
      {
        title: "Address",
        id: "address",
        width:
          window.innerWidth > 768 ? 350 : window.innerWidth > 600 ? 200 : 100,
        icon: GridColumnIcon.HeaderString,
      },
      {
        title: "Name",
        id: "address_name",
        group: "Core",
        grow: 1,
        icon: GridColumnIcon.HeaderTextTemplate,
      },
      {
        title: "Type",
        id: "label_type",
        group: "Core",
        grow: 0.5,
        icon: GridColumnIcon.HeaderLookup,
      },
      {
        title: "Subtype",
        id: "subtype",
        group: "Core",
        grow: 0.5,
        icon: GridColumnIcon.HeaderJoinStrings,
      },
      {
        title: "Entity",
        id: "label",
        group: "Core",
        grow: 1,
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
