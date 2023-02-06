import { Types } from "mongoose";
import { I_Resident, Maybe } from "./app";
import { I_MongoID } from "./mongo";

export enum E_PostType {
    issue = "issue", // Sent privately
    notice = "notice", // Updates/warnings
    listing = "listing", // Flat availabilities
    question = "question", // Building-wide questions
    suggestion = "suggestion", //
}

export interface I_Likes {
    likes: Maybe<I_Resident[]>;
}

export interface I_Comment extends I_MongoID, I_Likes {
    resident: Maybe<I_Resident>;
    text: Maybe<string>;
    date: Maybe<Date>;
}

export interface I_Comments {
    comments: Maybe<I_Comment[]>;
}

export interface I_Post extends I_MongoID, I_Likes, I_Comments {
    type: E_PostType;
    resident: Maybe<Types.ObjectId>;
    title: Maybe<string>;
    content: Maybe<string>;
    date: Maybe<Date>;
    // files
}
