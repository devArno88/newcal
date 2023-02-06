import { Maybe } from "./app";
import { I_MongoID } from "./mongo";

export enum E_BookingType {
    pool = "pool",
    gym = "gym",
    table = "table",
}

export interface I_PoolBooking extends I_MongoID {
    date: Maybe<Date>;
    flat: Maybe<number>;
    slot: Maybe<number>;
}

export interface I_PoolBookings {
    bookings: Maybe<I_PoolBooking[]>;
}

export interface I_TableBooking extends I_MongoID {
    date: Maybe<Date>;
    flat: Maybe<number>;
    slot: Maybe<number>;
}

export interface I_TableBookings {
    bookings: Maybe<I_TableBooking[]>;
}

export interface I_GymBooking extends I_MongoID {
    date: Maybe<Date>;
    flat: Maybe<number>;
    slot: Maybe<number>;
}

export interface I_PoolBookings {
    bookings: Maybe<I_PoolBooking[]>;
}
