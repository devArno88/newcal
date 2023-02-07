import { I_Resident, Maybe } from "./app";
import { I_MongoID } from "./mongo";

export enum E_PostType {
    notice = "notice", // Updates/warnings
    listing = "listing", // Flat availabilities
    question = "question", // Building-wide questions
}

export interface I_Likes {
    likes?: Maybe<I_Resident[]>;
}

export interface I_Comment extends I_MongoID, I_Likes {
    resident: Maybe<I_Resident>;
    text: Maybe<string>;
    date: Maybe<Date>;
}

export interface I_Comments {
    comments?: Maybe<I_Comment[]>;
}

export interface I_Post extends I_MongoID, I_Likes, I_Comments {
    type: E_PostType;
    resident: Maybe<I_Resident>;
    title: Maybe<string>;
    content: Maybe<string>;
    date: Maybe<Date>;
    // TODO: Incorporate S3 bucket logic
    files: [];
}

export interface I_Posts {
    posts: Maybe<I_Post[]>;
}
