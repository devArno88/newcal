import { Box, Button } from "@mui/material";
import { signIn } from "next-auth/react";
import Head from "next/head";
import Layout from "./Layout";
import { PageHeader } from "./PageHeader";

export const Unauthenticated = ({ url }: { url?: string }) => (
    <>
        <Head>
            <title>Log In | NewCal</title>
        </Head>

        <Layout>
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
        </Layout>
    </>
);
