import { Unauthenticated } from "@/src/components";
import Layout from "@/src/components/Layout";
import { Features } from "@/src/content/Features";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Page() {
    const router = useRouter();
    const { data: session, status } = useSession();
    if (!session) return <Unauthenticated status={status} url={router.asPath} />;
    return (
        <>
            <Head>
                <title>Posts | NewCal</title>
            </Head>

            <Layout>
                <Features />
            </Layout>
        </>
    );
}
