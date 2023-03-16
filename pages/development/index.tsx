import { AccessDenied, Loading, Unauthenticated } from "@/src/components";
import Layout from "@/src/components/Layout";
import { Development } from "@/src/content/Development";
import { isAdmin } from "@/src/utils";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Page() {
    const router = useRouter();
    const { data: session, status }: any = useSession();
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {
        fetch("https://api.github.com/repos/devArno88/newcal-issues/issues?state=open")
            .then((response) => response.json())
            .then((data) => {
                setIssues((x) => [...x, ...data]);
            });
        fetch("https://api.github.com/repos/devArno88/newcal-issues/issues?state=closed")
            .then((response) => response.json())
            .then((data) => {
                setIssues((x) => [...x, ...data]);
                setLoading(false);
            });
    }, []);
    // TODO: Handle error
    // if (error) return <AppError source="Mailboard" error={error.message} session={session} />;
    if (!session) return <Unauthenticated status={status} url={router.asPath} />;
    return (
        <>
            <Head>
                <title>Issues | NewCal</title>
            </Head>

            <Layout>
                {!isAdmin(session) ? <AccessDenied /> : loading ? <Loading /> : <Development issues={issues} />}
            </Layout>
        </>
    );
}
