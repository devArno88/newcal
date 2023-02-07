import { Types } from "mongoose";
import { Maybe } from "./app";

export enum E_TicketStatus {
    received = "received",
    working = "working",
    resolved = "resolved",
    dismissed = "dismissed",
}

export enum E_TicketType {
    issue = "issue",
    enhancement = "enhancement",
    question = "question",
}

export interface I_Ticket {
    type: Maybe<E_TicketType>;
    date: Maybe<Date>;
    resident: Maybe<Types.ObjectId>;
    title: Maybe<string>;
    content: Maybe<string>;
    review: {
        status: Maybe<E_TicketStatus>;
        comment: Maybe<string>;
    };
}

export interface I_Tickets {
    tickets: Maybe<I_Ticket[]>;
}
