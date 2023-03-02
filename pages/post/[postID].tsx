import { AppError, Loading } from "@/src/components";
import Layout from "@/src/components/Layout";
import { Post } from "@/src/content/Post";
import { fetcher } from "@/src/utils";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function Page() {
    const router = useRouter();
    const {
        query: { postID },
    } = router;
    const { data: session, status } = useSession();
    const { data: post, error, isLoading, mutate } = useSWR(postID ? `/api/post/${postID}` : null, fetcher);
    const loading = isLoading || status === "loading";
    if (error) return <AppError source="Post" error={error.message} session={session} />;
    return (
        <>
            <Head>
                <title>Post | NewCal</title>
            </Head>

            <Layout session={session}>
                {loading ? <Loading /> : <Post post={post} mutate={mutate} session={session} />}
            </Layout>
        </>
    );
}