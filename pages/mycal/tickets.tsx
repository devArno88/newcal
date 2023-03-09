import { AppError, Unauthenticated } from "@/src/components";
import Layout from "@/src/components/Layout";
import { MyCalTickets } from "@/src/content/MyCal/Pages";
import { useAlert } from "@/src/context";
import { fetcher } from "@/src/utils";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function Page() {
    const router = useRouter();
    const { setAlert } = useAlert();
    const { data: session, status } = useSession();
    const { data, error, isLoading, isValidating, mutate } = useSWR(session ? `/api/tickets/me` : null, fetcher);
    const loading = isLoading || isValidating || status === "loading";
    if (error) return <AppError source="MyCal Tickets" error={error.message} session={session} />;
    if (!session) return <Unauthenticated url={router.asPath} />;
    return (
        <>
            <Head>
                <title>My Posts | NewCal</title>
            </Head>

            <Layout>
                <MyCalTickets setAlert={setAlert} data={data} loading={loading} mutate={mutate} />
            </Layout>
        </>
    );
}
