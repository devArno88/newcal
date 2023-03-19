import { Box, Button } from "@mui/material";
import { signIn } from "next-auth/react";
import Head from "next/head";
import { ReactElement } from "react";
import Layout from "./Layout";
import { Loading } from "./Loading";
import { PageHeader } from "./PageHeader";

const LoadingBlock = (): ReactElement => (
    <>
        <PageHeader title="SIT TIGHT" subtitle="We're just checking your login credentials..." />
        <Box sx={{ pt: "2rem" }} />
        <Loading />
    </>
);

const UnauthenticatedBlock = ({ url }): ReactElement => (
    <>
        <PageHeader title="OH DEAR!" subtitle="You need to be logged in to view this page" />
        <Box textAlign="center" mt={3}>
            <Button
                variant="contained"
                onClick={(e) => {
                    e.preventDefault();
                    signIn(null, { callbackUrl: `${process.env.NEXTAUTH_URL}${url || ""}` });
                }}
            >
                Log In To NewCal
            </Button>
        </Box>
    </>
);

export const Unauthenticated = ({
    url,
    status,
}: {
    url?: string;
    status: "authenticated" | "unauthenticated" | "loading";
}) => (
    <>
        <Head>
            <title>Log In | NewCal</title>
        </Head>

        <Layout>
            <Box sx={{ pt: "5rem" }} />
            {status === "loading" ? (
                <LoadingBlock />
            ) : status === "unauthenticated" ? (
                <UnauthenticatedBlock url={url} />
            ) : null}
        </Layout>
    </>
);
