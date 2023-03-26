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
    development = "development",
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
    flat?: Maybe<number>;
}

export interface I_Residents {
    residents: Maybe<I_Resident[]>;
}

export interface I_User extends I_MongoID {
    name: Maybe<string>;
    email: Maybe<string>;
    role?: Maybe<E_Roles.concierge | E_Roles.development | E_Roles.management>;
    flat?: Maybe<number>;
}

export interface I_Admin extends I_MongoID {
    name: Maybe<string>;
    email: Maybe<string>;
    role?: Maybe<E_Roles.concierge | E_Roles.development | E_Roles.management>;
}

export interface I_Mailbox {
    flat: number;
    pending: boolean;
}

export interface I_Alerter {
    setAlert: ({ type, text }: { type: E_AlertTypes; text: string }) => void;
}

export interface I_Enquiry extends I_MongoID {
    uid: Maybe<string>;
    name: Maybe<string>;
    email: Maybe<string>;
    phone?: Maybe<string>;
    message: Maybe<string>;
    open: Maybe<boolean>;
    date: Maybe<Date>;
}

export interface I_Enquiries {
    enquiries?: I_Enquiry[];
}
