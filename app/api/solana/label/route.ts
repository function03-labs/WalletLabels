import { connectDB } from "@/lib/mongodb"
import { checkOrigin, parseQueryParamsAddress } from "@/lib/query-params"

export async function GET(request: Request) {
  const { address, limit, offset } = parseQueryParamsAddress(request)

  if (checkOrigin(request) === false) {
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
  }

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
    ADDRESS: address,
  }

  const projection = {
    ADDRESS_NAME: 1,
    LABEL_TYPE: 1,
    LABEL_SUBTYPE: 1,
    ADDRESS: 1,
    LABEL: 1,
  }

  try {
    const cursor = db
      .collection(process.env.CLC_NAME_WLBLS_SOLANA!)
      .find(queryAtlas, { projection })
      .collation({ locale: "en", strength: 2, maxVariable: "punct" })
      .hint("ADDRESS_1")
      .skip(offset)
      .limit(limit)

    const labels = await cursor.toArray()

    const response = {
      data: labels.map((label) => ({
        address: label.ADDRESS,
        address_name: label.ADDRESS_NAME,
        label_type: label.LABEL_TYPE,
        label_subtype: label.LABEL_TYPE,
        label: label.LABEL,
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
