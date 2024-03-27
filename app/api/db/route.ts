import getHistory from "@lib/get-history";
import { connectToDatabase } from "@lib/mongodb";

export async function GET() {
  let db = await connectToDatabase();
  let labels = await db.db
    .collection(process.env.CLC_NAME_WLBLS!)
    .find()
    .limit(30)
    .toArray();
  labels = labels.map((label) => {
    return {
      _id: label._id,
      address: label.address,
      address_name: label.address_name,
      label_type: label.label_type,
      label_subtype: label.label_subtype,
      label: label.label,
    };
  });

  let response = labels;
  const addresses = response.map((item) => item.address);

  const history = await getHistory(addresses);
  const data = response.map((item, index) => {
    item.balanceHistory = JSON.stringify(history[item["address"]]);
    return item;
  });

  return new Response(
    JSON.stringify({ data: data, revalidate: 60 * 60 * 24 }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
