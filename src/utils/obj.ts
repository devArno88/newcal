import { E_BookingType } from "../interfaces";
import { slotStrings } from "../strings";

export const defaultSlotDetails = ({ type, slot }: { type: E_BookingType; slot: number }) => {
    return slotStrings[type].filter((x) => x.slot === slot)[0];
};
