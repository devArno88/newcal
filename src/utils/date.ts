import dateFormat from "dateformat";

export const getDateString = (date: Date) => date?.toISOString()?.split("T")[0];

export const getDateRange = (date: Date) => {
    const start = new Date(date);
    const end = new Date(start.getTime() + 24 * 60 * 60 * 1000);
    return {
        start: getDateString(start),
        end: getDateString(end),
    };
};

export const getFortnightAway = () => {
    const nowDate = new Date();
    const start = nowDate.getDate() - nowDate.getDay();
    const middle = getDateString(new Date(nowDate.setDate(start + 6)));
    const end = getDateString(new Date(nowDate.setDate(start + 13)));
    // return { start, end };
    return { start, middle, end };
};

export const withinTwoWeeks = (date: Date) => {
    const start = new Date();
    const end = new Date(start.getTime() + 14 * 24 * 60 * 60 * 1000);
    return start <= date && date <= end;
};

export const isToday = (date: Date | string) => {
    const otherDate: any = new Date(date);
    const todayDate: any = new Date();
    if (
        otherDate.getDate() === todayDate.getDate() &&
        otherDate.getMonth() === todayDate.getMonth() &&
        otherDate.getYear() === todayDate.getYear()
    ) {
        return true;
    } else {
        return false;
    }
};
export const shortDate = (date: Date | string) => dateFormat(date, "dddd, mmmm dS");

export const niceDate = (date: Date | string) => dateFormat(date, "dddd, mmmm dS, yyyy");
