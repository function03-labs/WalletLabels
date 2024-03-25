import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";

export function assembleTypesenseServerConfig() {
  let TYPESENSE_SERVER_CONFIG = {
    apiKey: process.env.NEXT_PUBLIC_TYPESENSE_SEARCH_ONLY_API_KEY!,
    nodes: [
      {
        host: process.env.NEXT_PUBLIC_TYPESENSE_HOST || "default-host",
        port: parseInt(
          process.env.NEXT_PUBLIC_TYPESENSE_PORT || "default-port"
        ),
        protocol:
          process.env.NEXT_PUBLIC_TYPESENSE_PROTOCOL || "default-protocol",
      },
    ],
    numRetries: 3,
    connectionTimeoutSeconds: 30,
    cacheSearchResultsForSeconds: 2 * 60,
  };

  return TYPESENSE_SERVER_CONFIG;
}

const TYPESENSE_SERVER_CONFIG = assembleTypesenseServerConfig();
const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: TYPESENSE_SERVER_CONFIG!,
  additionalSearchParameters: {
    query_by: "address, address_name",
    limit_hits: 50,
    facet_by: "label_type",
  },
});
export const searchClient = typesenseInstantsearchAdapter.searchClient;
