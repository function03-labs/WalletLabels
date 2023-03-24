import React from "react"
// import svgs from "cryptocurrency-icons/svg/color"
//import MANIFEST.json from "cryptocurrency-icons/manifest.json"
import manifest from "cryptocurrency-icons/manifest.json"
import Fuse from "fuse.js"

const options = {
  keys: ["symbol", "name"],
  threshold: 0.2, // fuzzy matching threshold
}

const fuse = new Fuse(
  manifest.map((item) => ({
    ...item,
    name: item.name.toLowerCase(),
  })),
  options
)

const CryptoIcon = (name: string) => {
  const result = fuse.search(name)[0]
  if (!result) return null
  const { symbol } = result.item
  return symbol.toLowerCase()
}

export default CryptoIcon
