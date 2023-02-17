import { AppError } from "@/src/components";
import Layout from "@/src/components/Layout";
import { MyCalBookings } from "@/src/content/MyCal/Pages";
import { fetcher } from "@/src/utils";
import { useSession } from "next-auth/react";
import Head from "next/head";
import useSWR from "swr";

export default function Page() {
    const { data: session, status } = useSession();
    const { data, error, isLoading, isValidating, mutate } = useSWR(`/api/bookings/me`, fetcher);
    const loading = isLoading || isValidating || status === "loading";
    if (error) return <AppError source="MyCal Bookings" error={error.message} session={session} />;
    return (
        <>
            <Head>
                <title>My Bookings | NewCal</title>
            </Head>

            <Layout session={session}>
                <MyCalBookings data={data} loading={loading} mutate={mutate} session={session} />
            </Layout>
        </>
    );
}
