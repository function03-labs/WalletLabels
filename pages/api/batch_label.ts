import { Db } from 'mongodb'
import { connectToDatabase } from "../../lib/mongodb"
import type { NextApiRequest, NextApiResponse } from 'next'

let db: Db;
const clc_name = process.env.CLC_NAME_WLBLS;
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {

    //only allows GET requests to API
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method not allowed" });
    }
    let labels: Label[] | null = null;
    try {
        // asserts if addresses is empty
        if (isSanitized(req)) {
            // extracts the data from the query
            const adr_list: string[] = extractAddress(req.query.addresses)
            if (countLabels(adr_list) > 100) return res.status(403).json({ message: "Maximum address limit exceeded" });
            // validate formatting
            adr_list.forEach((address) => {
                if (!isAddressFormatted(address)) {
                    return res.status(403).json({ message: "Invalid address detected : " + address });
                }
            })
            // db call
            const wallets = await getWallet({ limit: countLabels(adr_list), query: adr_list, clc_name: clc_name });
            // decoupling responses

            const response = {
                "data": wallets,
            };

            res.status(200).json(response);

        } else return res.status(403).json({ message: "Pass eth/sol argument" })
    } catch (error) { console.log(error); throw new Error("error") }





}
//decoupled async search query
const getWallet = async ({
    query,
    limit,
    clc_name,
}: {
    query: string[],
    limit: number,
    clc_name: string,
}) => {
    try {
        if (!db) await init()
        const queryAtlas = { "address": { "$in": query } };
        const projection =
        {
            address_name: 1,
            label_type: 1,
            label_subtype: 1,
            address: 1,
            label: 1,
        }
        const collation = { locale: 'en', strength: 1 };
        const index = "address_1";
        const cursor = await db.collection(clc_name)
            .find(queryAtlas, { projection })
            .collation(collation)
            .hint(index)
            .limit(limit);
        const labels = await cursor.toArray();
        const result = labels.map((label) => ({
            address: label.address,
            address_name: label.address_name,
            label_type: label.label_type,
            label_subtype: label.label_subtype,
            label: label.label,
            score: label.score,
        }));
        return { batch_result: result }
    } catch (error) {
        return { error }
    }
};

//connect to db
async function init() {
    try {
        const database = await connectToDatabase();
        db = database.db;

    } catch (error) {
        console.log(error);
        throw new Error("Unable to connect to database");
    }
    return db;
};

//Type check on req (no empty address)
function isSanitized(res: NextApiRequest): Boolean {
    try {
        return typeof (res.query.addresses) === "string" && res.query.addresses != ""
    } catch (error) {
        console.log(error);
        throw new Error("Unable to assess query blockchain type")
    }
};


//return a list from an array of addresses in string format
function extractAddress(addressArray: string | string[]): string[] {

    // Remove square brackets and split the string into an array
    const adr_list = String(addressArray).split(',');
    return adr_list;

}

//detects if addresses are valid
function isAddressFormatted(adr: string): boolean {

    return (adr.length === 42 && adr.startsWith("0x"));

};

//label counter
function countLabels(adr_list: string[]): number {
    return adr_list.length;
}

//response interface ?
type ResponseData = {
    [key: string]: any;

}
type Label = {
    address: string,
    address_name: string,
    label_type: string,
    label_subtype: string,
    label: string,
}