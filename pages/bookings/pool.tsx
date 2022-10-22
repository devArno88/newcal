import React from "react";
import Head from "next/head";
import Layout from "@/src/components/Layout";
import { PoolBooker } from "@/src/content/Bookings";

const Index = () => {
    return (
        <>
            <Head>
                <title>Pool | NewCal</title>
            </Head>

            <Layout>
                <PoolBooker />
            </Layout>
        </>
    );
};

export default Index;
