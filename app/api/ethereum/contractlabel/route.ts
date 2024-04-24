import { connectDB } from "@/lib/mongodb";
import { isAllowedApiKey } from "@/lib/utils";
import { parseQueryParamsAddress } from "@/lib/query-params";

export async function GET(request: Request) {
  const { apiKey, address, limit } = parseQueryParamsAddress(request);

  if (!isAllowedApiKey(apiKey)) {
    return new Response(
      JSON.stringify({
        message:
          "Unauthorized: Invalid API key provided. Please provide a valid API key.",
      }),
      {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  if (address === "") {
    return new Response(JSON.stringify({ data: [] }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const db = await connectDB();

  const queryAtlas = {
    address: { $regex: address, $options: "i" },
  };

  const projection = {
    address_name: 1,
    label_type: 1,
    label_subtype: 1,
    address: 1,
    label: 1,
  };

  try {
    const cursor = db
      .collection(process.env.CLC_NAME_SC!)
      .find(queryAtlas, { projection })
      .limit(limit);
    const labels = await cursor.toArray();

    const response = {
      data: labels.map((label) => ({
        address: label.address,
        address_name: label.address_name,
        label_type: label.label_type,
        label_subtype: label.label_subtype,
        label: label.label,
        metadata: label.metadata,
      })),
    };

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
