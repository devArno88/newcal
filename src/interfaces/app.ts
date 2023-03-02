import { Session } from "next-auth";
import { KeyedMutator } from "swr";
import { E_AlertTypes } from "../context";
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

export enum E_Roles {
    resident = "resident",
    management = "management",
    concierge = "concierge",
}

export interface I_NewCalSession {
    session?: Maybe<Session>;
}

export interface I_Mutator {
    mutate: KeyedMutator<any>;
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

export interface I_Alerter {
    setAlert: ({ type, text }: { type: E_AlertTypes; text: string }) => void;
}
