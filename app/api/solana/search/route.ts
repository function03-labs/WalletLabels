import { connectDB } from "@/lib/mongodb";
import { isAllowedApiKey } from "@/lib/utils";
import { parseQueryParamsSearch } from "@/lib/query-params";

import { PipelineStage } from "@/types";

export async function GET(request: Request) {
  const { apiKey, search, limit } = parseQueryParamsSearch(request);

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
    );
  }

  const db = await connectDB();

  const pipeline: PipelineStage[] = [{ $limit: limit }];

  pipeline.unshift({
    $search: {
      index: "dynamic",
      text: {
        query: search,
        fuzzy: {
          maxEdits: 1,
          prefixLength: 3,
          maxExpansions: 50,
        },
        path: {
          wildcard: "*",
        },
      },
    },
  });

  try {
    const cursor = db
      .collection(process.env.CLC_NAME_WLBLS_SOLANA!)
      .aggregate(pipeline);

    const labels = await cursor.toArray();

    const response = {
      data: labels.map((label) => ({
        address: label.ADDRESS,
        address_name: label.ADDRESS_NAME,
        label_type: label.LABEL_TYPE,
        label_subtype: label.LABEL_TYPE,
        label: label.LABEL,
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
