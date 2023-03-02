import { AppError } from "@/src/components";
import Layout from "@/src/components/Layout";
import { Activity } from "@/src/content/Activity";
import { fetcher } from "@/src/utils";
import { useSession } from "next-auth/react";
import Head from "next/head";
import useSWR from "swr";

export default function Page() {
    const { data: session, status } = useSession();
    const { data, error, isLoading, isValidating, mutate } = useSWR(`/api/posts`, fetcher);
    const loading = isLoading || isValidating || status === "loading";
    if (error) return <AppError source="Activity" error={error.message} session={session} />;
    return (
        <>
            <Head>
                <title>Activity | NewCal</title>
            </Head>

            <Layout session={session}>
                <Activity data={data} loading={loading} mutate={mutate} />
            </Layout>
        </>
    );
}