import { addTicketView } from "@/src/actions/ticket";
import { AppError, Loading, Unauthenticated } from "@/src/components";
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
    const {
        data: ticket,
        error,
        isLoading,
        mutate,
    } = useSWR(session && ticketID ? `/api/ticket/${ticketID}` : null, fetcher);
    const loading = isLoading || status === "loading";
    useEffect(() => {
        async function handleView(id) {
            await addTicketView({ ticketID: id });
        }
        if (ticket) handleView(ticket?._id);
    }, [ticket]);
    if (error) return <AppError source={`Ticket ${ticketID}`} error={error.message} session={session} />;
    if (!session) return <Unauthenticated url={router.asPath} />;
    return (
        <>
            <Head>
                <title>Ticket | NewCal</title>
            </Head>

            <Layout>
                {loading ? (
                    <Loading />
                ) : ticket ? (
                    <TicketPage router={router} ticket={ticket} mutate={mutate} session={session} setAlert={setAlert} />
                ) : null}
            </Layout>
        </>
    );
}
