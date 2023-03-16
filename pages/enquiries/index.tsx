import { AccessDenied, AppError, Loading, Unauthenticated } from "@/src/components";
import Layout from "@/src/components/Layout";
import { Enquiries } from "@/src/content/Enquiries";
import { fetcher, isAdmin } from "@/src/utils";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function Page() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const {
        data: enquiries,
        error,
        isLoading,
        isValidating,
        mutate,
    } = useSWR(session ? `/api/enquiries` : null, fetcher);
    const loading = isLoading || isValidating || status === "loading";
    if (error) return <AppError source="Enquiries" error={error.message} session={session} />;
    if (!session) return <Unauthenticated status={status} url={router.asPath} />;
    return (
        <>
            <Head>
                <title>Enquiries | NewCal</title>
            </Head>

            <Layout>
                {!isAdmin(session) ? (
                    <AccessDenied />
                ) : loading ? (
                    <Loading />
                ) : (
                    <Enquiries enquiries={enquiries} mutate={mutate} />
                )}
            </Layout>
        </>
    );
}
