import { connectDB } from "@/lib/mongodb"
import { parseQueryParamsSearch } from "@/lib/query-params"

export async function GET(request: Request) {
  const { search, limit, offset } = parseQueryParamsSearch(request)

  if (search === "") {
    return new Response(
      JSON.stringify({
        message: "Bad request: 'searchtext' parameter missing",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
  }

  const db = await connectDB()

  const agg = [
    {
      $search: {
        index: "public_eth2",
        text: {
          query: search,
          path: ["label", "address_name", "label_type", "label_subtype"],
        },
      },
    },
    {
      $skip: offset,
    },
    {
      $limit: limit,
    },
    {
      $project: {
        address_name: 1,
        label_type: 1,
        label_subtype: 1,
        address: 1,
        label: 1,
        score: { $meta: "textScore" },
      },
    },
    {
      $sort: {
        score: { $meta: "textScore" },
      },
    },
  ]

  try {
    const cursor = db
      .collection(process.env.CLC_NAME_WLBLS!)
      .aggregate(agg, { allowDiskUse: true })

    const labels = await cursor.toArray()

    const response = {
      data: labels.map((label) => ({
        address: label.address,
        address_name: label.address_name,
        label_type: label.label_type,
        label_subtype: label.label_subtype,
        label: label.label,
      })),
    }

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
}
