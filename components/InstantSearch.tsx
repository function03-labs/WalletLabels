"use client";

import { HierarchicalMenu, RefinementList } from "react-instantsearch";

export function Refinement() {
  return (
    <RefinementList
      className="mt-3"
      attribute="label_type"
      limit={10}
      showMore={true}
      showMoreLimit={20}
      searchablePlaceholder="Search by activity"
      searchable={true}
      transformItems={(items) =>
        items.sort((a, b) => (a.count < b.count ? 1 : -1))
      }
    />
  );
}

export function Hierarchical() {
  return (
    <HierarchicalMenu
      className="mt-3"
      attributes={["label_subtype"]}
      transformItems={(items) =>
        items.sort((a, b) => (a.count < b.count ? 1 : -1))
      }
    />
  );
}
