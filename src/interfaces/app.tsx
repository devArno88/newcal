import { Session } from "next-auth";

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
    session: Session;
}
