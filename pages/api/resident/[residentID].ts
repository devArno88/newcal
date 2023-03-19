import { E_Fetches } from "@/src/interfaces";
import { ResidentSchema } from "@/src/schemas";
import { connectDB } from "@/src/utils";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

const routes = {
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // @routes    PUT api/resident/[residentID]
    // @desc      Update resident information
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async [E_Fetches.put](req, res) {
        try {
            const { ...data } = req.body;
            const resident = await ResidentSchema.findById(req.query.residentID);
            if (!resident) return res.status(500).json({ err: "Invalid resident" });
            await ResidentSchema.findOneAndUpdate(
                { _id: req.query.residentID },
                { $set: { ...data } },
                { returnDocument: "after" }
            );
            res.status(200).json({ msg: "Resident details updated successfully" });
        } catch (err) {
            res.status(500).json({ err: "Resident details could not be updated" });
        }
    },
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // @routes    DELETE api/resident/[residentID]
    // @desc      Delete resident
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async [E_Fetches.delete](req, res) {
        try {
            const resident = await ResidentSchema.findById(req.query.residentID);
            if (!resident) return res.status(500).json({ err: "Invalid resident" });
            await ResidentSchema.findByIdAndDelete(req.query.residentID);
            res.status(200).json({ msg: "Resident deleted successfully" });
        } catch (err) {
            res.status(500).json({ err: "Resident could not be deleted" });
        }
    },
    ///////////////////////////////////////////////////////////
    // @routes    FORBIDDEN
    // @desc      When a forbidden method is requested
    ///////////////////////////////////////////////////////////
    async [E_Fetches.forbidden](req, res) {
        res.status(405).end(`${req.method} Not Allowed`);
    },
};

const handler = async (req, res) => {
    const session = await getServerSession(req, res, authOptions);
    if (session) {
        // if (!isManagement(session)) return res.status(500).json({ err: "Action only available to NewCal Management" });
        const execute = routes[req.method] || routes[E_Fetches.forbidden];
        return execute(req, res, session);
    } else {
        res.status(500).json({ err: "Invalid authentication" });
    }
};

export default connectDB(handler, "/api/resident/[residentID]");
