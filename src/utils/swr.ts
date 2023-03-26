import { E_Fetches } from "@/src/interfaces";

export const fetchParams = ({ method, body = null }: { method: E_Fetches; body?: any }): any => ({
    method,
    body: body ? JSON.stringify(body) : undefined,
    headers: { "Content-Type": "application/json" },
});

export const fetcher = async (...args: Parameters<typeof fetch>) => {
    const res = await fetch(...args);

    // if (!res.ok) {
    // const errRes = await res.json();
    // console.error({ error: errRes.err, status: res.status });
    // return errorRes;
    // throw new Error(errRes.err);
    // }

    return res.json();
};
