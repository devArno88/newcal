import { Types } from "mongoose";
import { Maybe } from "./app";

export enum E_TicketStatus {
    received = "received",
    working = "working",
    resolved = "resolved",
    dismissed = "dismissed",
}

export interface I_Issue {
    date: Maybe<Date>;
    resident: Maybe<Types.ObjectId>;
    content: Maybe<string>;
    review: {
        status: Maybe<E_TicketStatus>;
        comment: Maybe<string>;
    };
}
