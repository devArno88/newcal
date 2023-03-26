const url = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://newcal.space";

export const config = {
    baseUrl: url,
    apiUrl: `${url}/api`,
    developmentEmail: "NewCal Development <alex@devarno.com>",
    managementEmail: "NewCal Management <management@newcal.space>",
};
