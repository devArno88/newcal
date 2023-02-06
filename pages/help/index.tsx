import Layout from "@/src/components/Layout";
import { Paper } from "@mui/material";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";

const Index = () => {
    const { data: session, status } = useSession();
    return (
        <>
            <Head>
                <title>Help | NewCal</title>
            </Head>

            <Layout session={session}>
                <h2>HELP</h2>
                <Link href="/help/h2jkhjkl456kl34hj">
                    <Paper sx={{ p: 4 }}>TEST ISSUE</Paper>
                </Link>
            </Layout>
        </>
    );
};

export default Index;
