import { AppError, Loading } from "@/src/components";
import Layout from "@/src/components/Layout";
import { Ticket } from "@/src/content/Ticket";
import { useAlert } from "@/src/context";
import { fetcher } from "@/src/utils";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function Page() {
    const router = useRouter();
    const { setAlert } = useAlert();
    const {
        query: { ticketID },
    } = router;
    const { data: session, status } = useSession();
    const { data: ticket, error, isLoading, mutate } = useSWR(ticketID ? `/api/ticket/${ticketID}` : null, fetcher);
    const loading = isLoading || status === "loading";
    if (error) return <AppError source="Ticket" error={error.message} session={session} />;
    return (
        <>
            <Head>
                <title>Ticket | NewCal</title>
            </Head>

            <Layout session={session}>
                {loading ? (
                    <Loading />
                ) : (
                    <Ticket ticket={ticket} mutate={mutate} session={session} setAlert={setAlert} />
                )}
            </Layout>
        </>
    );
}
