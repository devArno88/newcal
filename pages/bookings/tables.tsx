import { Unauthenticated } from "@/src/components";
import { AppError } from "@/src/components/AppError";
import Layout from "@/src/components/Layout";
import { BookingSuite } from "@/src/content/Bookings";
import { E_BookingType } from "@/src/interfaces";
import { fetcher, getDateString } from "@/src/utils";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";

export default function Page() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [date, setDate] = useState(getDateString(new Date()));
    const { data: bookings, error, isLoading, mutate } = useSWR(session ? `/api/table/${date}` : null, fetcher);
    const loading = isLoading || status === "loading";
    if (error) return <AppError source="Table Bookings" error={error.message} session={session} />;
    if (!session) return <Unauthenticated url={router.asPath} />;
    return (
        <>
            <Head>
                <title>Table | NewCal</title>
            </Head>

            <Layout>
                <BookingSuite
                    date={date}
                    mutate={mutate}
                    loading={loading}
                    setDate={setDate}
                    session={session}
                    bookings={bookings}
                    type={E_BookingType.table}
                />
            </Layout>
        </>
    );
}
