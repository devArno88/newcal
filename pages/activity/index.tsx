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
                <title>Activity | NewCal</title>
            </Head>

            <Layout session={session}>
                <h2>ACTIVITY</h2>
                <Link href="/activity/h2jkhjkl456kl34hj">
                    <Paper sx={{ p: 4 }}>TEST POST</Paper>
                </Link>
            </Layout>
        </>
    );
};

export default Index;
