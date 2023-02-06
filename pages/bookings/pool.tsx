import { AppError } from "@/src/components/AppError";
import Layout from "@/src/components/Layout";
import { PageHeader } from "@/src/components/PageHeader";
import { BookingSuite } from "@/src/content/Bookings";
import { E_BookingType } from "@/src/interfaces";
import { fetcher, getDateString } from "@/src/utils";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useState } from "react";
import useSWR from "swr";

const Index = () => {
    const { data: session } = useSession();
    const [date, setDate] = useState(getDateString(new Date()));
    const { data: bookings, error, isLoading, mutate } = useSWR(`/api/pool/${date}`, fetcher);
    if (error) return <AppError source="Pool Bookings" error={error.message} session={session} />;
    return (
        <>
            <Head>
                <title>Pool | NewCal</title>
            </Head>

            <Layout>
                <PageHeader title="NewCal Bookings" subtitle="Swimming Pool" />
                <BookingSuite
                    date={date}
                    mutate={mutate}
                    setDate={setDate}
                    session={session}
                    bookings={bookings}
                    isLoading={isLoading}
                    type={E_BookingType.pool}
                />
            </Layout>
        </>
    );
};

export default Index;
