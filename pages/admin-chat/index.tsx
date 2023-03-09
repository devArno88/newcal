import { AccessDenied, AppError, Loading, Unauthenticated } from "@/src/components";
import Layout from "@/src/components/Layout";
import { Chat } from "@/src/content/Chat";
import { useAlert } from "@/src/context";
import { fetcher, isAdmin } from "@/src/utils";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function Page() {
    const router = useRouter();
    const { setAlert } = useAlert();
    const { data: session, status }: any = useSession();
    const {
        data: chat,
        error,
        isLoading,
        mutate,
    } = useSWR(session ? `/api/chat/64039806f432cee69115dd46` : null, fetcher);
    const loading = isLoading || status === "loading";
    if (error) return <AppError source="Chat" error={error.message} session={session} />;
    if (!session) return <Unauthenticated url={router.asPath} />;
    return (
        <>
            <Head>
                <title>Admin Chat | NewCal</title>
            </Head>

            <Layout>
                {!isAdmin(session) ? (
                    <AccessDenied />
                ) : loading ? (
                    <Loading />
                ) : (
                    <Chat setAlert={setAlert} chat={chat} mutate={mutate} session={session} />
                )}
            </Layout>
        </>
    );
}
