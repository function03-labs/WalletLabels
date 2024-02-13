import { Db } from "mongodb";

export interface QueryParameters {
  address: string;
  limit: number;
}

export interface Label {
  address: string;
  address_name: string;
  label_type: string;
  label_subtype: string;
  label: string;
}
