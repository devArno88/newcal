import Layout from "@/src/components/Layout";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";

const Index = () => {
    const router = useRouter();
    const { data: session, status } = useSession();
    return (
        <>
            <Head>
                <title>Activity | NewCal</title>
            </Head>

            <Layout session={session}>
                <h2>POST {router?.query?.postID}</h2>
            </Layout>
        </>
    );
};

export default Index;
