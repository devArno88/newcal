import Layout from "@/src/components/Layout";
import { BookingsMenu } from "@/src/content/Bookings";
import { useSession } from "next-auth/react";
import Head from "next/head";

export default function Page() {
    const { data: session } = useSession();
    return (
        <>
            <Head>
                <title>Bookings | NewCal</title>
            </Head>

            <Layout>
                <BookingsMenu />
            </Layout>
        </>
    );
}
