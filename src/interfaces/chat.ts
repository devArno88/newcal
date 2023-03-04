import { Types } from "mongoose";
import { Maybe } from "./app";
import { I_MongoID } from "./mongo";

export interface I_Message extends I_MongoID {
    author: Maybe<Types.ObjectId>;
    role: Maybe<"resident" | "admin">;
    text: Maybe<string>;
    date?: Maybe<Date>;
}

export interface I_Messages {
    messages: Maybe<I_Message[]>;
}

export interface I_Chat extends I_MongoID, I_Messages {
    participants: {
        user: Maybe<Types.ObjectId>;
        role: Maybe<"resident" | "admin">;
    }[];
}
