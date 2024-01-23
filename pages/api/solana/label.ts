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
                address: address,
            };

            const projection = {
                address_name: 1,
                label_type: 1,
                label_subtype: 1,
                address: 1,
                label: 1,
            };

            const cursor = await db.collection(clc_name).find(queryAtlas, { projection }).collation(
                { locale: 'en', strength: 1 }
            )
                .limit(limit);
            labels = await cursor.toArray();
        } else if (!!label) {
            // Adjust the MongoDB query to search by 'label'
            const queryAtlas = {
                label: label,
            };

            const projection = {
                address_name: 1,
                label_type: 1,
                label_subtype: 1,
                address: 1,
                label: 1,
            };

            const cursor = await db.collection(clc_name).find(queryAtlas, { projection }).collation(
                { locale: 'en', strength: 1 }
            )
                .limit(limit);
            labels = await cursor.toArray();
        }

        labels = labels.map((lbl) => ({
            address: lbl.address,
            address_name: lbl.address_name,
            label_type: lbl.label_type,
            label_subtype: lbl.label_subtype,
            label: lbl.label,
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
