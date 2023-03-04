import { addTicketView } from "@/src/actions/ticket";
import { AppError, Loading } from "@/src/components";
import Layout from "@/src/components/Layout";
import { TicketPage } from "@/src/content/Ticket";
import { useAlert } from "@/src/context";
import { fetcher } from "@/src/utils";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
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
    useEffect(() => {
        async function handleView(id) {
            await addTicketView({ ticketID: id });
        }
        if (ticket) handleView(ticket?._id);
    }, [ticket]);
    return (
        <>
            <Head>
                <title>Ticket | NewCal</title>
            </Head>

            <Layout session={session}>
                {loading ? (
                    <Loading />
                ) : (
                    <TicketPage ticket={ticket} mutate={mutate} session={session} setAlert={setAlert} />
                )}
            </Layout>
        </>
    );
}