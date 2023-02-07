import Layout from "@/src/components/Layout";
import { MyCalTickets } from "@/src/content/MyCal/Pages";
import { useSession } from "next-auth/react";
import Head from "next/head";

const Index = () => {
    const { data: session } = useSession();
    return (
        <>
            <Head>
                <title>My Tickets | NewCal</title>
            </Head>

            <Layout session={session}>
                <MyCalTickets />
            </Layout>
        </>
    );
};

export default Index;
