import { Db } from 'mongodb'
import { connectToDatabase } from "../../lib/mongodb"
import type { NextApiRequest, NextApiResponse } from 'next'

let db: Db;
const clc_sol = process.env.CLC_NAME_WLBLS_SOLANA;
const clc_eth = process.env.CLC_NAME_WLBLS;
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
        if (isSanitized(req)) {
            // sets the collection name depending on the blockchain
            const clc_name = isEth(req) ? clc_eth : clc_sol;
            // extracts the data from the query
            const adr_list: string[] = isEth(req)
                ? extractAddress(req.query.eth)
                : extractAddress(req.query.sol);
            if (countLabels(adr_list) > 100) return res.status(403).json({ message: "Maximum address limit exceeded" });
            // validate formatting
            adr_list.forEach((address) => {
                if (!isAddressFormatted(address, isEth(req))) {
                    return res.status(403).json({ message: "Invalid address" });
                }
            })
            // db call
            const wallets = await getWallet({ limit: countLabels(adr_list), query: adr_list, clc_name: clc_name, is_eth: isEth(req) });
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
    is_eth,
    clc_name,
}: {
    query: string[],
    limit: number,
    is_eth: Boolean,
    clc_name: string,
}) => {
    try {
        if (!db) await init()
        const queryAtlas =
            is_eth ? { "address": { "$in": query } } : { "ADDRESS": { "$in": query } };
        const projection =
            is_eth ? {
                address_name: 1,
                label_type: 1,
                label_subtype: 1,
                address: 1,
                label: 1,
            } : {
                ADDRESS_NAME: 1,
                LABEL_TYPE: 1,
                LABEL_SUBTYPE: 1,
                ADDRESS: 1,
                LABEL: 1,
            };
        const collation = is_eth ? { locale: 'en', strength: 1 } : { locale: 'en', strength: 2, maxVariable: "punct" }
        const index = "address_1";
        const cursor = await db.collection(clc_name)
            .find(queryAtlas, { projection })
            .collation(collation)
            .hint(index)
            .limit(limit);
        const labels = await cursor.toArray();
        const result = is_eth ? labels.map((label) => ({
            address: label.address,
            address_name: label.address_name,
            label_type: label.label_type,
            label_subtype: label.label_subtype,
            label: label.label,
            score: label.score,
        })) : labels.map((label) => ({
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
        return ((typeof (res.query.sol) === "string" && res.query.eth === undefined && res.query.sol != "") || (res.query.sol === undefined && typeof (res.query.eth) === "string" && res.query.eth != ""));

    } catch (error) {
        console.log(error);
        throw new Error("Unable to assess query blockchain type")
    }
};

//Determine if it's sol or eth
function isEth(res: NextApiRequest): Boolean {
    return typeof (res.query.eth) === "string";
};

//return a list from an array of addresses in string format
function extractAddress(addressArray: string | string[]): string[] {

    // Remove square brackets and split the string into an array
    const adr_list = String(addressArray).split(',');
    return adr_list;

}

//detects if addresses are valid
function isAddressFormatted(adr: string, isEth: Boolean): boolean {
    if (isEth) {
        return (adr.length === 42 && adr.startsWith("0x"));
    } else {
        return (adr.length <= 44 || adr.length >= 32);
    }
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