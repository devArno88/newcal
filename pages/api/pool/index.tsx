import { getSession } from "next-auth/react";

import type { NextApiRequest, NextApiResponse } from "next";

import PoolBooking from "@/src/schemas/PoolBooking";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({ req });

    if (session) {
        switch (req.method) {
            case "GET":
                {
                    const bookings = await PoolBooking.find({ date: new Date().toISOString() });
                    return res.send({ bookings });
                }

                break;
        }
    }

    res.send({
        error: "You must be signed in to view the protected content on this page.",
    });
}
