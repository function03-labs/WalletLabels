import React from "react"
import DataEditor, {
  DataEditorProps,
  DataEditorRef,
  DrilldownCell,
  GridCell,
  GridCellKind,
  GridColumn,
  GridColumnIcon,
  GridMouseEventArgs,
  Item,
  MarkdownCell,
  Theme,
  UriCell,
} from "@glideapps/glide-data-grid"
import {
  ButtonCellType,
  SparklineCellType,
  SpinnerCellType,
  TagsCellType,
  useExtraCells,
} from "@glideapps/glide-data-grid-cells"
import { GetRowThemeCallback } from "@glideapps/glide-data-grid/dist/ts/data-grid/data-grid-render"
import { formatDistance } from "date-fns"
import { hashCode } from "hashcode"
// import theme from "@/components/theme"
import { useTheme } from "next-themes"

// import findLastTx from "@/lib/findLastTx"
import CryptoIcon from "@/lib/getCryptoIcon"
import pick from "../lib/colorPicker"

const darkTheme = {
  accentColor: "#8c96ff",
  accentLight: "rgba(202, 206, 255, 0.253)",

  textDark: "#ffffff",
  textGroupHeader: "#a1a1a1",
  textMedium: "#b8b8b8",
  textLight: "#a0a0a0",
  textBubble: "#ffffff",

  bgIconHeader: "#b8b8b8",
  fgIconHeader: "#000000",
  textHeader: "#a1a1a1",
  textHeaderSelected: "#000000",

  bgCell: "#16161b",
  bgCellMedium: "#202027",
  bgHeader: "#212121",
  bgHeaderHasFocus: "#474747",
  bgHeaderHovered: "#404040",

  bgBubble: "#212121",
  bgBubbleSelected: "#000000",

  bgSearchResult: "#423c24",

  borderColor: "rgba(225,225,225,0.2)",
  drilldownBorder: "rgba(225,225,225,0.4)",

  linkColor: "#4F5DFF",

  headerFontStyle: "600 0.8125rem",
  baseFontStyle: "13px",
  fontFamily:
    "Inter, Roboto, -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Ubuntu, noto, arial, sans-serif",
}

const RandomColor = (text: string) => {
  const hash = hashCode().value(text)
  const r = (hash & 0xff0000) >> 16
  const g = (hash & 0x00ff00) >> 8
  const b = hash & 0x0000ff
  //fill the string with 0s to make it 6 characters long
  let color = r.toString(16) + g.toString(16) + b.toString(16)
  // add padding 0s to make it 6 characters long

  // make the colors lighter 30%
  const r2 = Math.round(r * 1.3)

  return `#${color.padEnd(6, "0")}`
}

function splitTags(str) {
  const delimiters = /[\s,\/\-\_\(\):]+/ // also words between parentheses, remove the parentheses

  let tags = str.split(delimiters)
  // Remove empty strings and trim tags
  tags = tags.filter(tag => tag.trim() !== "").map(tag => tag.trim())
  return tags
}

export default function Grid(props) {
  const ref = React.useRef<DataEditorRef | null>(null)
  const [theme, setTheme] = React.useState<Partial<Theme>>({})
  const { resolvedTheme } = useTheme()
  const customRenderers = useExtraCells()
  // const lastSeenData = React.useRef<any>({})
  // create a function that will take addresses in every, call the api, and update the cell in the data

  const getTagsFromLabels = (arg0: string) => {
    // cut the string into all possible tags by splitting on" ", ",", "/", "-", "_
    // then return the tags
    const tags = splitTags(arg0)

    return tags.map(tag => {
      return {
        tag: tag,
        color: pick(tag, Boolean(resolvedTheme === "dark")),
      }
    })
  }

  // const updateLastSeen = React.useCallback(() => {
  //   // if props has last_txs then return

  //   // for each row in the data, get row number and get address
  //   props.data.forEach(async (row, i) => {
  //     const address = row.address
  //     // if the address is not in the lastSeenData, then call the api
  //     if (!lastSeenData.current[address]) {
  //       // call the api
  //       findLastTx(address).then((res) => {
  //         // update the lastSeenData
  //         lastSeenData.current[address] = res
  //         // update the cell in the data
  //         ref.current?.updateCells([i].map((r) => ({ cell: [0, i] })))
  //       })
  //     }
  //   })
  // }, [props.data])

  // React.useEffect(() => {
  //   console.log("update last seen effect")
  //   updateLastSeen()
  // }, [updateLastSeen])
  React.useEffect(() => {
    setTheme(resolvedTheme === "dark" ? darkTheme : {})
  }, [resolvedTheme])

  //run this when the data changes
  const cols = React.useMemo<GridColumn[]>(
    () => [
      {
        // width: 100,
        title: "Address",
        id: "address",
        // group: "Core",
        icon: GridColumnIcon.HeaderString,
      },
      {
        // width: 100,
        title: "Name",
        id: "address_name",
        group: "Core",
        icon: GridColumnIcon.HeaderTextTemplate,
      },
      {
        // width: 100,
        title: "Type",
        id: "label_type",
        group: "Core",
        icon: GridColumnIcon.HeaderLookup,
      },
      {
        // width: 100,
        title: "Subtype",
        id: "subtype",
        group: "Core",
        icon: GridColumnIcon.HeaderJoinStrings,
      },
      {
        // width: 100,
        title: "Entity",
        id: "label",
        group: "Core",
        icon: GridColumnIcon.HeaderSingleValue,
      },
      {
        title: "Tags",
        id: "tags",
        icon: GridColumnIcon.HeaderArray,
        grow: 1,
        group: "Extra",
      },
      // {
      //   title: "Last Seen",
      //   id: "lastSeen",
      //   icon: GridColumnIcon.HeaderDate,
      //   group: "Extra",
      // },
      {
        title: "Etherscan Lookup",
        id: "etherscan",
        icon: GridColumnIcon.HeaderLookup,
        group: "Extra",
      },
    ],
    []
  )

  const cols_balanceChart = React.useMemo<GridColumn[]>(() => {
    return [
      {
        title: "Balance History",
        id: "balanceHistory",
        icon: GridColumnIcon.HeaderGeoDistance,
        grow: 1,
        group: "Extra",
      },
    ]
  }, [])

  // import styles from "../styles/Home.module.css"
  // if data is empty array, then it will show a loading spinner

  const getContent = React.useCallback(
    (cell: Item): GridCell => {
      const [col, row] = cell
      const dataRow = props.data[row]
      // console.log("dataRowis : ", dataRow)
      if (!dataRow) {
        return {
          kind: GridCellKind.Loading,
          allowOverlay: false,
        }
      }
      // console.log(props.data.length)
      // console.log("dataRow", dataRow)
      // dumb but simple way to do this
      let indexes = [
        "address",
        "address_name",
        "label_type",
        "label_subtype",
        "label",
        "tag",
        // "lastSeen",
        "Etherscan",
      ]
      if (dataRow.balanceHistory) {
        indexes = [
          "address",
          "address_name",
          "label_type",
          "label_subtype",
          "label",
          "tag",
          // "lastSeen",
          "balanceHistory",
          "Etherscan",
        ]
      }

      if (indexes[col] === "label") {
        const path_to_img = `./assets/32/color/${CryptoIcon(
          dataRow[indexes[col]]
        )}.png`
        const d: DrilldownCell = {
          kind: GridCellKind.Drilldown,
          cursor: "pointer",
          allowOverlay: false,
          data: [
            {
              text: dataRow[indexes[col]],
              img: path_to_img,
            },
          ],
        }
        return d
      }

      if (indexes[col] === "address") {
        return {
          kind: GridCellKind.Text,
          allowOverlay: true,
          data: dataRow[indexes[col]],
          displayData:
            window.innerWidth > 600
              ? dataRow[indexes[col]].slice(0, 24) + "..."
              : dataRow[indexes[col]].slice(0, 6) +
                "..." +
                dataRow[indexes[col]].slice(-4),
        }
      }

      if (indexes[col] === "Etherscan") {
        const d: ButtonCellType = {
          kind: GridCellKind.Custom,
          cursor: "pointer",
          allowOverlay: false,
          copyData: "Button",
          readonly: true,
          data: {
            kind: "button-cell",
            backgroundColor: ["transparent", "bgHeaderHasFocus"],
            color: ["textDark", "textDark"],
            borderColor: "borderColor",
            borderRadius: 9,
            title: "View Details",
            onClick: () => {
              window.open(
                `https://etherscan.io/address/${dataRow[indexes[0]]}`,
                "_blank"
              )
            },
          },
          themeOverride: {
            baseFontStyle: "700 12px",
          },
        }
        return d
      } else if (indexes[col] === "tag") {
        return {
          kind: GridCellKind.Custom,
          allowOverlay: true,
          copyData: "tags",
          data: {
            kind: "tags-cell",
            possibleTags: getTagsFromLabels(dataRow[indexes[1]]),
            readonly: true,
            tags: getTagsFromLabels(dataRow[indexes[1]]).map(t => t.tag),
          },
        } as TagsCellType
      }

      if (indexes[col] === "balanceHistory") {
        const values: number[] = JSON.parse(dataRow[indexes[col]]).map(
          x => x[1]
        )
        return {
          kind: GridCellKind.Custom,
          allowOverlay: false,
          copyData: "4",
          data: {
            kind: "sparkline-cell",
            values: values,
            displayValues: values.map(x => Math.round(x).toString()),
            color: Math.max(...values) > 1 ? "#77c4c4" : "#D98466",
            yAxis: [
              Math.round(Math.min(...values)),
              Math.round(Math.max(...values)) + 1,
            ],
          },
        } as SparklineCellType
      }

      // if (indexes[col] === "lastSeen") {
      //   // findLastTx(dataRow["address"], ref, row)

      //   // check timestamp exists on datarow
      //   if (
      //     lastSeenData.current[dataRow["address"]] &&
      //     lastSeenData.current[dataRow["address"]].timestamp !== undefined
      //   ) {
      //     const d: ButtonCellType = {
      //       kind: GridCellKind.Custom,
      //       cursor: "pointer",
      //       allowOverlay: false,
      //       copyData: "Button",
      //       readonly: true,
      //       data: {
      //         kind: "button-cell",
      //         backgroundColor: ["transparent", "bgHeaderHasFocus"],
      //         color: ["textDark", "textDark"],
      //         borderColor: "transparent",
      //         borderRadius: 0,
      //         title: formatDistance(
      //           new Date(lastSeenData.current[dataRow["address"]].timestamp),
      //           new Date(),
      //           { addSuffix: true }
      //         ),

      //         onClick: () => {
      //           window.open(
      //             `https://etherscan.io/tx/${
      //               lastSeenData.current[dataRow["address"]].txHash
      //             }`,
      //             "_blank"
      //           )
      //         },
      //       },
      //       themeOverride: {
      //         // add italic to the title
      //         baseFontStyle: "italic 12px",
      //       },
      //     }

      //     return d
      //   }

      //   const d: SpinnerCellType = {
      //     kind: GridCellKind.Custom,
      //     allowOverlay: false,
      //     copyData: "Spinner",
      //     data: {
      //       kind: "spinner-cell",
      //     },
      //     lastUpdated: Date.now(),
      //   }
      //   return d
      // }

      const d = dataRow[indexes[col]]
      return {
        kind: GridCellKind.Text,
        allowOverlay: false,
        displayData: d,
        data: d,
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.data, resolvedTheme]
  )

  const [hoverRow, setHoverRow] = React.useState<number | undefined>(undefined)

  const onItemHovered = React.useCallback((args: GridMouseEventArgs) => {
    const [_, row] = args.location
    setHoverRow(args.kind !== "cell" ? undefined : row)
  }, [])

  const getRowThemeOverride = React.useCallback<GetRowThemeCallback>(
    row => {
      if (row !== hoverRow) return undefined
      if (resolvedTheme === "dark") {
        return {
          // dark theme
          bgCell: "#222324",
          bgCellMedium: "#202027",
        }
      } else {
        return {
          bgCell: "#f7f7f7",
          bgCellMedium: "#f0f0f0",
        }
      }
      return {
        bgCell: "#f7f7f7",
        bgCellMedium: "#f0f0f0",
      }
    },
    [hoverRow, resolvedTheme]
  )

  return (
    <>
      {" "}
      <DataEditor
        theme={theme}
        className=" rounded-xl shadow-lg"
        smoothScrollY={true}
        width={"100%"}
        height={"50em"}
        getCellContent={getContent}
        // if balanceHistory exists on data, then add the balance chart column to cols
        columns={
          props.data[0] && props.data[0].balanceHistory
            ? // show cols balanecChart before last
              [
                ...cols.slice(0, cols.length - 1),
                ...cols_balanceChart,
                ...cols.slice(cols.length - 1),
              ]
            : // ? [...cols, ...cols_balanceChart]
              cols
        }
        rows={props.data.length}
        keybindings={{ search: true }}
        getCellsForSelection={true}
        rowMarkers="number"
        freezeColumns={1}
        overscrollY={50}
        getRowThemeOverride={getRowThemeOverride}
        onItemHovered={onItemHovered}
        {...customRenderers}
        smoothScrollX={true}
        ref={ref}

        // on hover select all row
      />
    </>
  )
}
