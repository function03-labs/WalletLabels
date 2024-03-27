"use client";

import { HierarchicalMenu, RefinementList } from "react-instantsearch";

export function Refinement() {
  return (
    <RefinementList
      attribute="label_type"
      transformItems={(items) =>
        items.sort((a, b) => (a.count < b.count ? 1 : -1))
      }
      classNames={{
        root: "space-y-2 p-4 bg-white border border-gray-200 rounded-lg shadow-md w-full",
        labelText: "text-sm font-medium text-gray-700",
        checkbox: "text-red-600",
        list: "space-y-2",
        item: "flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100",
        count:
          "text-red-500 font-medium text-gray-500 ml-auto w-full text-right",
      }}
    />
  );
}
