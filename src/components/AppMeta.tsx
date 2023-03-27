import Head from "next/head";
import { ReactElement } from "react";

export const AppMeta = (): ReactElement => {
    return (
        <Head>
            <title>NewCal</title>
            <meta name="description" content="The New Caledonian Wharf Platform" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    );
};
