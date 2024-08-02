export function parseQueryParamsAddresses(req: Request) {
  const url = new URL(req.url)
  const searchParams = url.searchParams
  const addresses = searchParams.get("address") || ""
  const limit = searchParams.get("limit")
  const offset = searchParams.get("offset")

  let parsedLimit = limit ? Number(limit) : 20
  if (parsedLimit > 100) {
    parsedLimit = 100
  }

  const parsedOffset = offset ? Number(offset) : 0
  const addressesArray = addresses.split(",").map((address) => address.trim())

  return { addresses: addressesArray, limit: parsedLimit, offset: parsedOffset }
}

export function parseQueryParamsSearch(req: Request) {
  const url = new URL(req.url)
  const searchParams = url.searchParams
  const search = searchParams.get("searchtext") || ""
  const limit = searchParams.get("limit")
  const offset = searchParams.get("offset")

  let parsedLimit = limit ? Number(limit) : 20
  if (parsedLimit > 100) {
    parsedLimit = 100
  }

  const parsedOffset = offset ? Number(offset) : 0

  return { search, limit: parsedLimit, offset: parsedOffset }
}

export function parseQueryParamsLabel(req: Request) {
  const url = new URL(req.url)
  const searchParams = url.searchParams
  const label = searchParams.get("label") || ""
  const limit = searchParams.get("limit")
  const offset = searchParams.get("offset")
  const apiKey = req.headers.get("x-api-key") || ""

  let parsedLimit = limit ? Number(limit) : 20
  if (parsedLimit > 100) {
    parsedLimit = 100
  }

  const parsedOffset = offset ? Number(offset) : 0

  return { label, limit: parsedLimit, apiKey, offset: parsedOffset }
}

export const indexMap = {
  "/": "labels_v2",
  ethereum: "labels_v2",
  solana: "solana",
  arbitrum: "arbitrum",
}

export function checkOrigin(request: Request) {
  const origin = request.headers.get("Origin")

  if (origin !== "https://api-c.walletlabels.xyz") {
    return false
  }

  return true
}
