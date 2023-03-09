import { AppError, Unauthenticated } from "@/src/components";
import Layout from "@/src/components/Layout";
import { MyCalBookings } from "@/src/content/MyCal/Pages";
import { fetcher } from "@/src/utils";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function Page() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const { data, error, isLoading, isValidating, mutate } = useSWR(session ? `/api/bookings/me` : null, fetcher);
    const loading = isLoading || isValidating || status === "loading";
    if (error) return <AppError source="MyCal Bookings" error={error.message} session={session} />;
    if (!session) return <Unauthenticated url={router.asPath} />;
    return (
        <>
            <Head>
                <title>My Bookings | NewCal</title>
            </Head>

            <Layout>
                <MyCalBookings data={data} loading={loading} mutate={mutate} session={session} />
            </Layout>
        </>
    );
}
