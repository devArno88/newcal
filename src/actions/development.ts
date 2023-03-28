import { developmentIssuesURL } from "@/src/utils";

export const getDevelopmentIssues = async (): Promise<any> => {
    const urls = [developmentIssuesURL("open"), developmentIssuesURL("closed")];
    try {
        let res = await Promise.all(urls.map((e) => fetch(e)));
        let resJson = await Promise.all(res.map((e) => e.json()));
        return resJson.flat();
    } catch (err) {
        console.log(err);
    }
};
