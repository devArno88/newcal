import { AccessDenied, AppError, Loading, Unauthenticated } from "@/src/components";
import Layout from "@/src/components/Layout";
import { Residents } from "@/src/content/Residents";
import { useAlert } from "@/src/context";
import { fetcher, isManagement } from "@/src/utils";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function Page() {
    const router = useRouter();
    const { setAlert } = useAlert();
    const { data: session, status } = useSession();
    const {
        data: residents,
        error,
        isLoading,
        isValidating,
        mutate,
    } = useSWR(session ? `/api/residents` : null, fetcher);
    const loading = isLoading || isValidating || status === "loading";
    if (error) return <AppError source="Residents" error={error.message} session={session} />;
    if (!session) return <Unauthenticated status={status} url={router.asPath} />;
    return (
        <>
            <Head>
                <title>Residents | NewCal</title>
            </Head>

            <Layout>
                {!isManagement(session) ? (
                    <AccessDenied />
                ) : loading ? (
                    <Loading />
                ) : (
                    <Residents residents={residents} mutate={mutate} setAlert={setAlert} />
                )}
            </Layout>
        </>
    );
}
