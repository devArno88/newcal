import { AppError, Loading, Unauthenticated } from "@/src/components";
import Layout from "@/src/components/Layout";
import { MyCalDashboard } from "@/src/content/MyCal/Dashboard";
import { fetcher } from "@/src/utils";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function Page() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const { data, error, isLoading, isValidating, mutate } = useSWR(session ? `/api/mycal` : null, fetcher);
    const loading = isLoading || isValidating || status === "loading";
    if (error) return <AppError source="MyCal Dashboard" error={error.message} session={session} />;
    if (!session) return <Unauthenticated url={router.asPath} />;
    return (
        <>
            <Head>
                <title>MyCal | NewCal</title>
            </Head>

            <Layout>{loading ? <Loading /> : <MyCalDashboard session={session} data={data} mutate={mutate} />}</Layout>
        </>
    );
}
