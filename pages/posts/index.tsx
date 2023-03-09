import { AppError } from "@/src/components";
import Layout from "@/src/components/Layout";
import { Posts } from "@/src/content/Posts";
import { useAlert } from "@/src/context";
import { fetcher } from "@/src/utils";
import { useSession } from "next-auth/react";
import Head from "next/head";
import useSWR from "swr";

export default function Page() {
    const { setAlert } = useAlert();
    const { data: session, status } = useSession();
    const { data, error, isLoading, isValidating, mutate } = useSWR(`/api/posts`, fetcher);
    const loading = isLoading || isValidating || status === "loading";
    if (error) return <AppError source="Posts" error={error.message} session={session} />;
    console.log({ data });
    return (
        <>
            <Head>
                <title>Posts | NewCal</title>
            </Head>

            <Layout>
                <Posts session={session} data={data} loading={loading} mutate={mutate} setAlert={setAlert} />
            </Layout>
        </>
    );
}
