import { connectDB } from "@/lib/mongodb"
import { checkOrigin, parseQueryParamsAddresses } from "@/lib/query-params"

export async function GET(request: Request) {
  const { addresses, limit, offset } = parseQueryParamsAddresses(request)

/*   if (checkOrigin(request) === false) {
    return new Response(
      JSON.stringify({
        message:
          "Please use the 'api-c.walletlabels.xyz' endpoint instead. We decline your request from this endpoint.",
      }),
      {
        status: 403,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
  } */

  if (!addresses || addresses.length === 0) {
    return new Response(
      JSON.stringify({
        message: "Bad request: 'address' parameter missing or empty",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
  }

  if (addresses.length > 10) {
    return new Response(
      JSON.stringify({
        message: "Bad request: 'address' parameter exceeds the limit of 10",
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
    address: { $in: addresses },
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
      .skip(offset)
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
