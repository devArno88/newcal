import Layout from "@/src/components/Layout";
import { MyCalBookings } from "@/src/content/MyCal/Pages";
import { useSession } from "next-auth/react";
import Head from "next/head";

const Index = () => {
    const { data: session } = useSession();
    return (
        <>
            <Head>
                <title>My Bookings | NewCal</title>
            </Head>

            <Layout session={session}>
                <MyCalBookings />
            </Layout>
        </>
    );
};

export default Index;
