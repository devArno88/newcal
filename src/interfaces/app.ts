import { Session } from "next-auth";
import { I_MongoID } from "./mongo";

export type Maybe<T> = T | null | undefined;

export type Exact<T extends { [key: string]: unknown }> = {
    [K in keyof T]: T[K];
};

export enum E_Fetches {
    get = "GET",
    post = "POST",
    put = "PUT",
    delete = "DELETE",
    forbidden = "FORBIDDEN",
}

export interface I_NewCalSession {
    session?: Maybe<Session>;
}

export interface I_Resident extends I_MongoID {
    name: Maybe<string>;
    email: Maybe<string>;
    flat: Maybe<number>;
}

export interface I_Mailbox {
    flat: number;
    pending: boolean;
}
