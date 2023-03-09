import { AppError } from "@/src/components";
import Layout from "@/src/components/Layout";
import { MyCalTickets } from "@/src/content/MyCal/Pages";
import { useAlert } from "@/src/context";
import { fetcher } from "@/src/utils";
import { useSession } from "next-auth/react";
import Head from "next/head";
import useSWR from "swr";

export default function Page() {
    const { setAlert } = useAlert();
    const { data: session, status } = useSession();
    const { data, error, isLoading, isValidating, mutate } = useSWR(`/api/tickets/me`, fetcher);
    const loading = isLoading || isValidating || status === "loading";
    if (error) return <AppError source="MyCal Tickets" error={error.message} session={session} />;
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
