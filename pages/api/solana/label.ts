import middlewares, { middlewares_special } from "@/lib/rateLimits"
import { connectToDatabase } from "../../../lib/mongodb"

export default async function handler(req, res) {
    // Database connection setup
    let db;
    let address, limit, label;
    try {
        const database = await connectToDatabase();
        db = database.db;
    } catch (error) {
        console.log(error);
        throw new Error("Unable to connect to database");
    }

    // Validate 'address' query parameter
    if (req.query.address === undefined && req.query.label === undefined) {
        return res.status(400).json({ message: "Bad request: 'address'/'label' parameter missing" });
    }

    if (req.query.address === "" || req.query.address === undefined) {
        address = "";
    } else {
        address = req.query.address;
    }
    if (req.query.label === "" || req.query.label === undefined) {
        label = "";
    } else {
        label = req.query.label;
    }

    if (req.query.limit === "" || req.query.limit === undefined) {
        limit = 20;
    } else {
        limit = Number(req.query.limit);
    }

    if (limit > 100) {
        limit = 100;
    }

    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const clc_name = process.env.CLC_NAME_WLBLS_SOLANA;
    let labels = null;

    try {
        if (address === "" && label === "") {
            labels = await db.collection(clc_name).find().limit(limit).toArray();
        } else if (!!address) {
            // Adjust the MongoDB query to search by 'address'
            const queryAtlas = {
                ADDRESS: address,
            };

            const projection = {
                ADDRESS_NAME: 1,
                LABEL_TYPE: 1,
                LABEL_SUBTYPE: 1,
                ADDRESS: 1,
                LABEL: 1,
            };

            const cursor = await db.collection(clc_name).find(queryAtlas, { projection },).collation(
                { locale: 'en', strength: 2, maxVariable: "punct" }
            ).hint("ADDRESS_1")
                .limit(limit);
            labels = await cursor.toArray();

            console.log("solana label address :" + address.toString);
        } else if (!!label) {
            // Adjust the MongoDB query to search by 'label'
            const queryAtlas = {
                LABEL: label,
            };

            const projection = {
                ADDRESS_NAME: 1,
                LABEL_TYPE: 1,
                LABEL_SUBTYPE: 1,
                ADDRESS: 1,
                LABEL: 1,
            };

            const cursor = await db.collection(clc_name).find(queryAtlas, { projection }).collation(
                { locale: 'en', strength: 2 }
            ).hint("LABEL_1")
                .limit(limit);
            labels = await cursor.toArray();

            console.log("solana label query :" + label.toString);
        }

        labels = labels.map((lbl) => ({
            ADDRESS: lbl.ADDRESS,
            ADDRESS_NAME: lbl.ADDRESS_NAME,
            LABEL_TYPE: lbl.LABEL_TYPE,
            LABEL_SUBTYPE: lbl.LABEL_SUBTYPE,
            LABEL: lbl.LABEL,
        }));

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }

    const response = {
        data: labels,
    };

    res.status(200).json(response);
}
