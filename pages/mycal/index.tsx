import Layout from "@/src/components/Layout";
import { Paper } from "@mui/material";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";

const Index = () => {
    const { data: session } = useSession();
    return (
        <>
            <Head>
                <title>MyCal | NewCal</title>
            </Head>

            <Layout session={session}>
                <h2>MYCAL</h2>
                <Link href="/mycal/mailbox">
                    <Paper sx={{ p: 4 }}>MAILBOX</Paper>
                </Link>
                <Link href="/mycal/bookings">
                    <Paper sx={{ p: 4 }}>BOOKINGS SUMMARY</Paper>
                </Link>
                <Link href="/mycal/posts">
                    <Paper sx={{ p: 4 }}>POSTS SUMMARY</Paper>
                </Link>
                <Link href="/mycal/issues">
                    <Paper sx={{ p: 4 }}>ISSUES SUMMARY</Paper>
                </Link>
            </Layout>
        </>
    );
};

export default Index;
