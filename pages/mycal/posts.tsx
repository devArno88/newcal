import Layout from "@/src/components/Layout";
import { MyCalPosts } from "@/src/content/MyCal/Pages";
import { useSession } from "next-auth/react";
import Head from "next/head";

const Index = () => {
    const { data: session } = useSession();
    return (
        <>
            <Head>
                <title>My Posts | NewCal</title>
            </Head>

            <Layout session={session}>
                <MyCalPosts />
            </Layout>
        </>
    );
};

export default Index;
