// ignore ts error all file 
//@ts-nocheck


import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";

export function assembleTypesenseServerConfig() {
    let TYPESENSE_SERVER_CONFIG = {
        apiKey: process.env.NEXT_PUBLIC_TYPESENSE_SEARCH_ONLY_API_KEY, // Be sure to use an API key that only allows searches, in production
        nodes: [
            {
                host: process.env.NEXT_PUBLIC_TYPESENSE_HOST,
                port: process.env.NEXT_PUBLIC_TYPESENSE_PORT,
                protocol: process.env.NEXT_PUBLIC_TYPESENSE_PROTOCOL,
            },
        ],
        numRetries: 3,
        connectionTimeoutSeconds: 4
    };


    return TYPESENSE_SERVER_CONFIG
}


// Initialize the Typesense Instantsearch adapter: https://github.com/typesense/typesense-instantsearch-adapter
const TYPESENSE_SERVER_CONFIG = assembleTypesenseServerConfig()
const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
    server: TYPESENSE_SERVER_CONFIG,
    additionalSearchParameters: {
        // The following parameters are directly passed to Typesense's search API endpoint.
        //  So you can pass any parameters supported by the search endpoint below.
        //  queryBy is required.
        query_by: 'address, address_name',
        // num_typos: 1,
        // typo_tokens_threshold: 1,
        limit_hits: 50,
        facet_by: "label_type",
        // groupLimit: 1
        // pinnedHits: "23:2"
    },
});
export const searchClient = typesenseInstantsearchAdapter.searchClient;

export default searchClient