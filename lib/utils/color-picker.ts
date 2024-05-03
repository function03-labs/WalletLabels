const colors = [
  {
    name: "Water",
    hex: "#CBE4F9",
    dark: "#9DB2C9",
    darker: "#3A98B9",
    rgb: "203, 228, 249",
    cmyk: "0.184, 0.084, 0, 0.023",
  },
  {
    name: "Water",
    hex: "#CDF5F6",
    dark: "#9DB2C9",
    darker: "#495371",
    rgb: "205, 245, 246",
    cmyk: "0.166, 0.004, 0, 0.035",
  },
  {
    name: "Beige",
    hex: "#EFF9DA",
    dark: "#BFCBA8",
    darker: "#146356",
    rgb: "239, 249, 218",
    cmyk: "0.040, 0, 0.124, 0.023",
  },
  {
    name: "Antique White",
    hex: "#F9EBDF",
    dark: "#C9B9AD",
    darker: "#FFC090",
    rgb: "249, 235, 223",
    cmyk: "0, 0.056, 0.104, 0.023",
  },
  {
    name: "Pale Pink",
    hex: "#F9D8D6",
    dark: "#C9A9A7",
    darker: "#B24080",
    rgb: "249, 216, 214",
    cmyk: "0, 0.132, 0.140, 0.023",
  },
  {
    name: "Soap",
    hex: "#D6CDEA",
    dark: "#A69FC9",
    darker: "#D864A9",
    rgb: "214, 205, 234",
    cmyk: "0.085, 0.123, 0, 0.082",
  },
  {
    name: "Tropical Violet",
    hex: "#C1AFE0",
    dark: "#938FBF",
    darker: "#A61F69",
    rgb: "rgb(193, 175, 224)",
    cmyk: "0.138, 0.218, 0, 0.121",
  },
  {
    name: "Beau Blue",
    hex: "#BBCFF2",
    dark: "#8CA0C9",
    darker: "#0E8388",

    rgb: "rgb(187, 207, 242)",
    cmyk: "0.227, 0.144, 0, 0.050",
  },
  {
    name: "Tea Green",
    hex: "#C8EFB3",
    dark: "#96BF82",
    darker: "#679F52",
    rgb: "rgb(200, 239, 179)",
    cmyk: "0.163, 0, 0.251, 0.062",
  },
  {
    name: "Very Pale Yellow",
    hex: "#FFF7BA",
    dark: "#C9C58A",
    darker: "#D07000",
    rgb: "rgb(255, 247, 186)",
    cmyk: "0, 0.031, 0.270, 0",
  },
  {
    name: "Caramel",
    hex: "#F9D39D",
    dark: "#C9A46D",
    darker: "#FDD36A",
    rgb: "rgb(249, 211, 157)",
    cmyk: "0, 0.152, 0.369, 0.023",
  },
  {
    name: "Melon",
    hex: "#FCB6B6",
    dark: "#C98686",
    darker: "#A12568",
    rgb: "rgb(252, 182, 182)",
    cmyk: "0, 0.277, 0.277, 0.011",
  },
  {
    name: "Pale Lavender",
    hex: "#E8D6F0",
    dark: "#B9A8C9",
    darker: "#865DFF",
    rgb: "rgb(232, 214, 240)",
    cmyk: "0.033, 0.108, 0, 0.059",
  },
  {
    name: "Ice Blue",
    hex: "#D6EAF8",
    dark: "#A6BAC9",
    darker: "#0078AA",
    rgb: "rgb(214, 234, 248)",
    cmyk: "0.131, 0.063, 0, 0.023",
  },
  {
    name: "Pale Mint",
    hex: "#D6F9F0",
    dark: "#A6C9BF",
    darker: "#0E8388",
    rgb: "rgb(214, 249, 240)",
    cmyk: "0.131, 0, 0.040, 0.023",
  },
  {
    name: "Yellow",
    hex: "#FFF9D6",
    dark: "#C9C9A6",
    darker: "#A47E3B",
    rgb: "rgb(255, 249, 214)",
    cmyk: "0, 0.024, 0.165, 0",
  },
]
function pick(str: string, dark = false) {
  const index =
    str.split("").reduce((a, b) => a + b.charCodeAt(0), 0) % colors.length

  if (dark) {
    return colors[index].darker
  }
  return colors[index].hex
}

export default pick
