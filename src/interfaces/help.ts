import { I_Resident, Maybe } from "./app";
import { I_MongoID } from "./mongo";

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

export interface I_Ticket extends I_MongoID {
    type: Maybe<E_TicketType>;
    date: Maybe<Date>;
    resident: Maybe<I_Resident>;
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
