import { connectDB } from "@/lib/mongodb"
import { checkOrigin, parseQueryParamsAddresses } from "@/lib/query-params"

export async function GET(request: Request) {
  const { addresses, limit, offset } = parseQueryParamsAddresses(request)

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
    address: { $in: addresses.map((address) => address.toLowerCase()) },
  }

  const projection = {
    address: 1,
    blockchain: 1,
    source_of_blacklisting: 1,
    reason_for_blacklisting: 1,
    date_of_blacklisting: 1,
    last_transaction_date: 1,
    entities: 1,
  }

  try {
    const cursor = db
      .collection(process.env.CLC_NAME_WLBLS_BLACKLIST!)
      .find(queryAtlas, { projection })
      .skip(offset)
      .limit(limit)

    const blacklisted = await cursor.toArray()

    const response = {
      data: blacklisted.map((item) => ({
        address: item.address,
        blockchain: item.blockchain,
        source_of_blacklisting: item.source_of_blacklisting,
        reason_for_blacklisting: item.reason_for_blacklisting,
        date_of_blacklisting: item.date_of_blacklisting,
        last_transaction_date: item.last_transaction_date,
        entities: item.entities,
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
