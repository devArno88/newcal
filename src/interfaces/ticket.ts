import { I_User, Maybe } from "./app";
import { I_MongoID } from "./mongo";
import { I_Comments, I_Likes, I_Views } from "./post";

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

export interface I_Ticket extends I_MongoID, I_Likes, I_Comments, I_Views {
    type: Maybe<E_TicketType>;
    date: Maybe<Date>;
    user: Maybe<I_User>;
    userType: Maybe<"resident" | "admin">;
    title: Maybe<string>;
    content: Maybe<string>;
    status?: Maybe<E_TicketStatus>;
    // TODO: Incorporate S3 bucket logic
    files: [];
}

export interface I_Tickets {
    tickets: Maybe<I_Ticket[]>;
}
