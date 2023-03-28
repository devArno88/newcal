import ShortUniqueID from "short-unique-id";
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

// "Liked by NewCal X, Y and Z"
export const adminLikeString = (adminLikes: string[]) =>
    `Liked by NewCal ${
        adminLikes.length === 1
            ? adminLikes[0]
            : adminLikes.length === 2
            ? adminLikes.join(" and ")
            : `${adminLikes[0]}, ${adminLikes[1]} and ${adminLikes[2]}`
    }`;

// Mail body linebreaks
export const lineBreak = "%0D%0A";
export const doubleBreak = `${lineBreak}${lineBreak}`;

export const isNumericString = (str: string) => /^\d+$/.test(str);

export const firstName = (name: string) => name.split(" ")[0];

export const shortID = () => new ShortUniqueID({ length: 6 })().toUpperCase();

export const developmentIssuesURL = (state: "open" | "closed") =>
    `https://api.github.com/repos/devArno88/newcal-issues/issues?state=${state}`;
