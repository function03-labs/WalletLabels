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

export interface Activity {
  label: string;
  finding: string[];
  count: number;
}
