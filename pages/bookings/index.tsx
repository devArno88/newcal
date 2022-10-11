import React from "react";
import Head from "next/head";
import Layout from "@/src/components/Layout";
import { BookingCards } from "@/src/content/Bookings";

const Index = () => {
    return (
        <>
            <Head>
                <title>Bookings | NewCal</title>
            </Head>

            <Layout>
                <BookingCards />
            </Layout>
        </>
    );
};

export default Index;
