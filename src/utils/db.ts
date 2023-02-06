import * as mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";

const MONGODB_URI = process.env.MONGODB_URI;

export const connectDB =
    (handler: any, source = undefined) =>
    async (req: NextApiRequest, res: NextApiResponse) => {
        if (mongoose.connections[0].readyState) {
            console.info(`${new Date().toLocaleTimeString()}: New Mongo connection ${source ? `for ${source}` : ""}`);
            return handler(req, res);
        }

        const options: any = {
            useUnifiedTopology: true,
            // useFindAndModify: false,
            // useCreateIndex: true,
            useNewUrlParser: true,
        };

        // Use new db connection
        mongoose.set("strictQuery", false);
        await mongoose.connect(MONGODB_URI, options);
        console.info(`${new Date().toLocaleTimeString()}: Reconnecting to MongoDB ${source ? `for ${source}` : ""}`);
        return handler(req, res);
    };
