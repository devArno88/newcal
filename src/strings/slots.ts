interface Booking {
    slot: number;
    start: string;
    end: string;
}

const pool: Booking[] = [
    { slot: 1, start: "05:00:00", end: "05:45:00" },
    { slot: 2, start: "05:45:00", end: "06:30:00" },
    { slot: 3, start: "06:30:00", end: "07:15:00" },
    { slot: 4, start: "07:15:00", end: "08:00:00" },
    { slot: 5, start: "08:00:00", end: "08:45:00" },
    { slot: 6, start: "08:45:00", end: "09:30:00" },
    { slot: 7, start: "09:30:00", end: "10:15:00" },
    { slot: 8, start: "10:15:00", end: "11:00:00" },
    { slot: 9, start: "11:00:00", end: "11:45:00" },
    { slot: 10, start: "11:45:00", end: "12:30:00" },
    { slot: 11, start: "12:30:00", end: "13:15:00" },
    { slot: 12, start: "13:15:00", end: "14:00:00" },
    { slot: 13, start: "14:00:00", end: "14:45:00" },
    { slot: 14, start: "14:45:00", end: "15:30:00" },
    { slot: 15, start: "15:30:00", end: "16:15:00" },
    { slot: 16, start: "16:15:00", end: "17:00:00" },
    { slot: 17, start: "17:00:00", end: "17:45:00" },
    { slot: 18, start: "17:45:00", end: "18:30:00" },
    { slot: 19, start: "18:30:00", end: "19:15:00" },
    { slot: 20, start: "19:15:00", end: "20:00:00" },
    { slot: 21, start: "20:00:00", end: "20:45:00" },
    { slot: 22, start: "20:45:00", end: "21:30:00" },
    { slot: 23, start: "21:30:00", end: "22:15:00" },
    // ---------------------------------------------
    { slot: 24, start: "22:15:00", end: "23:00:00" },
    { slot: 25, start: "23:00:00", end: "23:45:00" },
];

const gym: Booking[] = [
    { slot: 1, start: "05:00:00", end: "06:00:00" },
    { slot: 2, start: "06:00:00", end: "07:00:00" },
    { slot: 3, start: "07:00:00", end: "08:00:00" },
    { slot: 4, start: "08:00:00", end: "09:00:00" },
    { slot: 5, start: "09:00:00", end: "10:00:00" },
    { slot: 6, start: "10:00:00", end: "11:00:00" },
    { slot: 7, start: "11:00:00", end: "12:00:00" },
    { slot: 8, start: "12:00:00", end: "13:00:00" },
    { slot: 9, start: "13:00:00", end: "14:00:00" },
    { slot: 10, start: "14:00:00", end: "15:00:00" },
    { slot: 11, start: "15:00:00", end: "16:00:00" },
    { slot: 12, start: "16:00:00", end: "17:00:00" },
    { slot: 13, start: "17:00:00", end: "18:00:00" },
    { slot: 14, start: "18:00:00", end: "19:00:00" },
    { slot: 15, start: "19:00:00", end: "20:00:00" },
    { slot: 16, start: "20:00:00", end: "21:00:00" },
    { slot: 17, start: "21:00:00", end: "22:00:00" },
    { slot: 18, start: "22:00:00", end: "23:00:00" },
];

const table: Booking[] = [
    { slot: 1, start: "05:00:00", end: "06:00:00" },
    { slot: 2, start: "06:00:00", end: "07:00:00" },
    { slot: 3, start: "07:00:00", end: "08:00:00" },
    { slot: 4, start: "08:00:00", end: "09:00:00" },
    { slot: 5, start: "09:00:00", end: "10:00:00" },
    { slot: 6, start: "10:00:00", end: "11:00:00" },
    { slot: 7, start: "11:00:00", end: "12:00:00" },
    { slot: 8, start: "12:00:00", end: "13:00:00" },
    { slot: 9, start: "13:00:00", end: "14:00:00" },
    { slot: 10, start: "14:00:00", end: "15:00:00" },
    { slot: 11, start: "15:00:00", end: "16:00:00" },
    { slot: 12, start: "16:00:00", end: "17:00:00" },
    { slot: 13, start: "17:00:00", end: "18:00:00" },
    { slot: 14, start: "18:00:00", end: "19:00:00" },
    { slot: 15, start: "19:00:00", end: "20:00:00" },
    { slot: 16, start: "20:00:00", end: "21:00:00" },
    { slot: 17, start: "21:00:00", end: "22:00:00" },
    { slot: 18, start: "22:00:00", end: "23:00:00" },
];

export const slotStrings = {
    pool,
    gym,
    table,
};
