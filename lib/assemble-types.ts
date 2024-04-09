import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";

export function assembleTypesenseServerConfig(pathname: string) {
  let TYPESENSE_SERVER_CONFIG;

  if (pathname === "/ethereum" || pathname === "/") {
    TYPESENSE_SERVER_CONFIG = {
      apiKey: process.env.NEXT_PUBLIC_TYPESENSE_SEARCH_ONLY_API_KEY!,
      nodes: [
        {
          host:
            process.env.NEXT_PUBLIC_TYPESENSE_HOST_ETH || "default-host-eth",
          port: parseInt(
            process.env.NEXT_PUBLIC_TYPESENSE_PORT_ETH || "default-port-eth"
          ),
          protocol:
            process.env.NEXT_PUBLIC_TYPESENSE_PROTOCOL_ETH ||
            "default-protocol-eth",
        },
      ],
      numRetries: 3,
      connectionTimeoutSeconds: 30,
      cacheSearchResultsForSeconds: 2 * 60,
    };
  } else {
    TYPESENSE_SERVER_CONFIG = {
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
  }

  return TYPESENSE_SERVER_CONFIG;
}

export function getSearchClient(pathname: string) {
  const TYPESENSE_SERVER_CONFIG = assembleTypesenseServerConfig(pathname);
  const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
    server: TYPESENSE_SERVER_CONFIG!,
    additionalSearchParameters: {
      query_by: "address, address_name, label_type",
      limit_hits: 30,
      facet_by: "label_type",
    },
  });
  return typesenseInstantsearchAdapter.searchClient;
}

export const searchClient = getSearchClient;
