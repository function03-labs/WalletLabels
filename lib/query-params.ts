export function parseQueryParamsAddress(req: Request) {
  const url = new URL(req.url);
  const searchParams = url.searchParams;
  const address = searchParams.get("address") || "";
  const limit = searchParams.get("limit");

  let parsedLimit = limit ? Number(limit) : 20;
  if (parsedLimit > 100) {
    parsedLimit = 100;
  }

  return { address, limit: parsedLimit };
}

export function parseQueryParamsSearch(req: Request) {
  const url = new URL(req.url);
  const searchParams = url.searchParams;
  const search = searchParams.get("searchtext") || "";
  const limit = searchParams.get("limit");

  let parsedLimit = limit ? Number(limit) : 20;
  if (parsedLimit > 100) {
    parsedLimit = 100;
  }

  return { search, limit: parsedLimit };
}

export function parseQueryParamsLabel(req: Request) {
  const url = new URL(req.url);
  const searchParams = url.searchParams;
  const label = searchParams.get("label") || "";
  const limit = searchParams.get("limit");
  const apiKey = req.headers.get("x-api-key") || "";

  let parsedLimit = limit ? Number(limit) : 20;
  if (parsedLimit > 100) {
    parsedLimit = 100;
  }

  return { label, limit: parsedLimit, apiKey };
}

export const indexMap = {
  "/": "labels_v2",
  ethereum: "labels_v2",
  solana: "solana",
  arbitrum: "arbitrum",
};
