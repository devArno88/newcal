import { Types } from "mongoose";
import { I_User, Maybe } from "./app";
import { I_MongoID } from "./mongo";

export enum E_PostType {
    notice = "notice", // Updates/warnings
    listing = "listing", // Flat availabilities
    question = "question", // Building-wide questions
}

export interface I_Like {
    user: Maybe<I_User>;
    userType: Maybe<"resident" | "admin">;
}

export interface I_Likes {
    likes?: Maybe<I_Like[]>;
}

export interface I_View {
    user: Maybe<Types.ObjectId>;
    userType: Maybe<"resident" | "admin">;
    date?: Maybe<Date>;
}

export interface I_Views {
    views?: Maybe<I_View[]>;
}

export interface I_Comment extends I_MongoID, I_Likes {
    user: Maybe<I_User>;
    userType: Maybe<"resident" | "admin">;
    text: Maybe<string>;
    date?: Maybe<Date>;
}

export interface I_Comments {
    comments?: Maybe<I_Comment[]>;
}

export interface I_Post extends I_MongoID, I_Likes, I_Comments, I_Views {
    type: E_PostType;
    user: Maybe<I_User>;
    userType: Maybe<"resident" | "admin">;
    title: Maybe<string>;
    content: Maybe<string>;
    date: Maybe<Date>;
    // TODO: Incorporate S3 bucket logic
    files: [];
}

export interface I_Posts {
    posts: Maybe<I_Post[]>;
}
