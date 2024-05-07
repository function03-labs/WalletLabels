import { connectDB } from "@/lib/mongodb"
import { parseQueryParamsAddress } from "@/lib/query-params"

export async function GET(request: Request) {
  const { address, limit } = parseQueryParamsAddress(request)

  if (address === "") {
    return new Response(
      JSON.stringify({
        message: "Bad request: 'address' parameter missing",
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

  const queryAtlas = {
    address: address,
  }

  const projection = {
    address_name: 1,
    label_type: 1,
    label_subtype: 1,
    address: 1,
    label: 1,
  }

  try {
    const cursor = db
      .collection(process.env.CLC_NAME_WLBLS_ARBITRUM!)
      .find(queryAtlas, { projection })
      .collation({ locale: "en", strength: 1 })
      .limit(limit)

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
