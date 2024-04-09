"use client";

import { useHits } from "react-instantsearch";
import { Grid } from "@component/Grid";

export function CustomHits() {
  const { hits } = useHits();

  const props = {
    data: {
      data: hits.map((hit) => ({
        _id: hit.id as string,
        address: hit.address as string,
        address_name: hit.address_name as string,
        label_type: hit.label_type as string,
        label_subtype: hit.label_subtype as string,
        label: hit.label as string,
        tag: hit.tag as string,
      })),
    },
  };

  //@ts-ignore: Unreachable code error
  return <Grid data={props.data} />;
}
