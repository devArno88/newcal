import { AppError, Loading } from "@/src/components";
import Layout from "@/src/components/Layout";
import { MyCalDashboard } from "@/src/content/MyCal/Dashboard";
import { fetcher } from "@/src/utils";
import { useSession } from "next-auth/react";
import Head from "next/head";
import useSWR from "swr";

export default function Page() {
    const { data: session, status } = useSession();
    const { data, error, isLoading, isValidating, mutate } = useSWR(`/api/mycal`, fetcher);
    const loading = isLoading || isValidating || status === "loading";
    if (error) return <AppError source="MyCal Dashboard" error={error.message} session={session} />;
    return (
        <>
            <Head>
                <title>MyCal | NewCal</title>
            </Head>

            <Layout session={session}>
                {loading ? <Loading /> : <MyCalDashboard session={session} data={data} mutate={mutate} />}
            </Layout>
        </>
    );
}
