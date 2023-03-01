import { v4 as uuid } from "uuid";
import { getRandomArrayElement } from "./arr";

// Get random UUID
export const getRandomID = () => uuid();

// Get random success message
export const getSuccessMessage = (): string =>
    getRandomArrayElement(["HOORAY!", "CONGRATS!", "AWESOME!", "YIPEE!", "NICELY DONE!", "HUZZAH!"]);

// Get random error message
export const getErrorMessage = (): string =>
    getRandomArrayElement(["OOPS!", "OH NO!", "OH DEAR!", "HOUSTON, WE HAVE A PROBLEM!"]);

// Capitalise single word
export const capitalise = (s: string) => (typeof s !== "string" ? "" : s.charAt(0).toUpperCase() + s.slice(1));

// Capitalise each word of a sentence
export const capitaliseAll = (sentence: string): string =>
    sentence
        ? sentence
              .split(" ")
              .map((word) => capitalise(word))
              .join(" ")
        : "";

// Abbreviate to set limit
export const abbreviate = (str: string, limit: number): string =>
    str?.length > limit ? `${str.slice(0, limit)}...` : str;

// Pluralise a single word
export const pluralise = (str: string): string => {
    return `${str}${str.slice(-1) === "s" ? `'` : `'s`}`;
};
