import Layout from "@/src/components/Layout";
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
                <h2>MYCAL POSTS</h2>
            </Layout>
        </>
    );
};

export default Index;
