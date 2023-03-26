import { E_BookingType } from "../interfaces";
import { slotStrings } from "../strings";

export const defaultSlotDetails = ({ type, slot }: { type: E_BookingType; slot: number }) =>
    slotStrings[type].filter((x) => x.slot === slot)[0];

export const sumObjectValues = (obj: { [key: string]: number }) => Object.values(obj).reduce((a, b) => a + b, 0);

export const sortObjectByValues = (obj: { [key: string]: number }) => Object.keys(obj).sort((a, b) => obj[b] - obj[a]);

export const getObjectKeysAboveZero = (obj: { [key: string]: unknown }) => Object.keys(obj).filter((x) => obj[x] > 0);

export const mailtoParameters = ({ target, subject, body }) => ({
    target: "_blank",
    rel: "noreferrer",
    href: `mailto:${target}?subject=${subject}&body=${body}`,
});
