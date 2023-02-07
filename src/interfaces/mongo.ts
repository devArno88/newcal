import { Types } from "mongoose";
import { Maybe } from "./app";

export enum E_MongoCollection {
    admin = "admin",
    gymbooking = "gymbooking",
    poolbooking = "poolbooking",
    resident = "resident",
    tablebooking = "tablebooking",
    ticket = "ticket",
    post = "post",
    mailboard = "mailboard",
}

export interface I_MongoID {
    _id: Maybe<Types.ObjectId>;
}
