import { E_Fetches } from "@/src/interfaces";

export const fetcherPrep = ({ method, body = null }: { method: E_Fetches; body?: any }): any => ({
    method,
    body: body ? JSON.stringify(body) : undefined,
    headers: { "Content-Type": "application/json" },
});

export const fetcher = async (...args: Parameters<typeof fetch>) => {
    const res = await fetch(...args);

    if (!res.ok) {
        console.error({ error: await res.json(), status: res.status });
        throw new Error("ERROR (SWR > FETCHER)");
    }

    return res.json();
};
