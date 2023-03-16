import { AppError, Unauthenticated } from "@/src/components";
import Layout from "@/src/components/Layout";
import { Tickets } from "@/src/content/Tickets";
import { useAlert } from "@/src/context";
import { fetcher } from "@/src/utils";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function Page() {
    const router = useRouter();
    const { setAlert } = useAlert();
    const { data: session, status } = useSession();
    const { data, error, isLoading, isValidating, mutate } = useSWR(session ? `/api/tickets` : null, fetcher);
    const loading = isLoading || isValidating || status === "loading";
    if (error) return <AppError source="Tickets" error={error.message} session={session} />;
    if (!session) return <Unauthenticated status={status} url={router.asPath} />;
    return (
        <>
            <Head>
                <title>Tickets | NewCal</title>
            </Head>

            <Layout>
                <Tickets setAlert={setAlert} data={data} loading={loading} mutate={mutate} />
            </Layout>
        </>
    );
}
