import { AppError } from "@/src/components";
import Layout from "@/src/components/Layout";
import { MyCalDashboard } from "@/src/content/MyCal";
import { fetcher } from "@/src/utils";
import { CircularProgress } from "@mui/material";
import { useSession } from "next-auth/react";
import Head from "next/head";
import useSWR from "swr";

const Index = () => {
    const { data: session } = useSession();
    const { data, error, isLoading } = useSWR(`/api/mycal`, fetcher);
    if (error) return <AppError source="MyCal Dashboard" error={error.message} session={session} />;
    return (
        <>
            <Head>
                <title>MyCal | NewCal</title>
            </Head>

            <Layout session={session}>{isLoading ? <CircularProgress /> : <MyCalDashboard data={data} />}</Layout>
        </>
    );
};

export default Index;
