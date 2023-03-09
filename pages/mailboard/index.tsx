import { AccessDenied, AppError, Loading } from "@/src/components";
import Layout from "@/src/components/Layout";
import { Mailboard } from "@/src/content/Mailboard";
import { fetcher, isAdmin } from "@/src/utils";
import { useSession } from "next-auth/react";
import Head from "next/head";
import useSWR from "swr";

export default function Page() {
    const { data: session, status }: any = useSession();
    const { data: mailboard, error, isLoading, mutate } = useSWR("/api/mailboard", fetcher);
    const loading = isLoading || status === "loading";
    if (error) return <AppError source="Mailboard" error={error.message} session={session} />;
    return (
        <>
            <Head>
                <title>Mailboard | NewCal</title>
            </Head>

            <Layout>
                {!isAdmin(session) ? (
                    <AccessDenied />
                ) : loading ? (
                    <Loading />
                ) : (
                    <Mailboard mailboard={mailboard} mutate={mutate} />
                )}
            </Layout>
        </>
    );
}
