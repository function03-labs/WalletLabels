import { Db } from 'mongodb'
import { connectToDatabase } from "../../../lib/mongodb"
import type { NextApiRequest, NextApiResponse } from 'next'

let db: Db;
const clc_name = process.env.CLC_NAME_WLBLS_SOLANA;
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
            const adr_list: string[] = extractAddress(req.query.addresses);
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

        } else return res.status(403).json({ message: "Pass addresses argument" })
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
        const queryAtlas = { "ADDRESS": { "$in": query } };
        const projection =
        {
            ADDRESS_NAME: 1,
            LABEL_TYPE: 1,
            LABEL_SUBTYPE: 1,
            ADDRESS: 1,
            LABEL: 1,
        };
        const collation = { locale: 'en', strength: 2, maxVariable: "punct" }
        const index = "address_1";
        const cursor = await db.collection(clc_name)
            .find(queryAtlas, { projection })
            .collation(collation)
            .hint(index)
            .limit(limit);
        const labels = await cursor.toArray();
        const result = labels.map((label) => ({
            address: label.ADDRESS,
            address_name: label.ADDRESS_NAME,
            label_type: label.LABEL_TYPE,
            label_subtype: label.LABEL_SUBTYPE,
            label: label.LABEL,
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
        throw new Error("addresses parameter required")
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

    return (adr.length <= 44 || adr.length >= 32);

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