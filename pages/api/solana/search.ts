import { Collection, Db, Document } from 'mongodb'
import { connectToDatabase } from "../../../lib/mongodb"
import type { NextApiRequest, NextApiResponse } from 'next'


let db: Db;

let solana_wallets: Collection<Document>


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    //only allows GET requests to API
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method not allowed" });
    }
    let labels: Label[] | null = null;
    const skip =
        typeof req.query.skip === 'string' ? Number(req.query.skip) : 0;
    const limit =
        typeof req.query.limit === 'string' ? Math.min(Number(req.query.limit), 100) : 20;

    const search =
        typeof req.query.search === 'string' ? req.query.search : undefined;

    const { solana_wallets } = await getSolana({ skip, limit, query: search })
    labels = solana_wallets.map((lbl) => ({
        address: lbl.address,
        address_name: lbl.address_name,
        label_type: lbl.label_type,
        label_subtype: lbl.label_subtype,
        label: lbl.label,
    }));

    const response = {
        data: labels,
    };

    res.status(200).json(response);
}
//decoupled async search query
const getSolana = async ({
    query,
    skip,
    limit
}: {
    query?: string
    skip: number
    limit: number
}) => {
    try {
        if (!solana_wallets) await init()

        const pipeline: PipelineStage[] = [{ $skip: skip }, { $limit: limit }]

        if (query) {
            pipeline.unshift({
                $search: {
                    index: 'search',
                    text: {
                        query,
                        fuzzy: {
                            maxEdits: 1,
                            prefixLength: 3,
                            maxExpansions: 50
                        },
                        path: {
                            wildcard: '*'
                        }
                    }
                }
            })
        }

        const result = await solana_wallets.aggregate(pipeline).toArray()

        return { solana_wallets: result }
    } catch (error) {
        return { error }
    }
}
//connect to db
async function init() {
    try {
        const database = await connectToDatabase();
        db = database.db;

    } catch (error) {
        console.log(error);
        throw new Error("Unable to connect to database");
    }
}


//mongosh query interface
type PipelineStage =
    | {
        $search: {
            index: string
            text: {
                query: string
                fuzzy: {}
                path: {
                    wildcard: string
                }
            }
        }
    }
    | {
        $skip: number
    }
    | {
        $limit: number
    }
//response interface ?
type ResponseData = {
    [key: string]: string | Label[];

}
type Label = {
    address: string,
    address_name: string,
    label_type: string,
    label_subtype: string,
    label: string,
}