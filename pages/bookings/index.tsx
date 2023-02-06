import Layout from "@/src/components/Layout";
import { BookingsMenu } from "@/src/content/Bookings";
import { useSession } from "next-auth/react";
import Head from "next/head";

const Index = () => {
    const { data: session } = useSession();
    return (
        <>
            <Head>
                <title>Bookings | NewCal</title>
            </Head>

            <Layout session={session}>
                <BookingsMenu />
            </Layout>
        </>
    );
};

export default Index;
