import { addPostView } from "@/src/actions/post";
import { AppError, Loading, Unauthenticated } from "@/src/components";
import Layout from "@/src/components/Layout";
import { PostPage } from "@/src/content/Post";
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
        query: { postID },
    } = router;
    const { data: session, status } = useSession();
    const { data: post, error, isLoading, mutate } = useSWR(session && postID ? `/api/post/${postID}` : null, fetcher);
    const loading = isLoading || status === "loading";
    useEffect(() => {
        async function handleView(id) {
            await addPostView({ postID: id });
        }
        if (post) handleView(post?._id);
    }, [post]);
    if (error) return <AppError source={`Post ${postID}`} error={error.message} session={session} />;
    if (!session) return <Unauthenticated status={status} url={router.asPath} />;
    return (
        <>
            <Head>
                <title>Post | NewCal</title>
            </Head>

            <Layout>
                {loading ? (
                    <Loading />
                ) : post ? (
                    <PostPage router={router} post={post} mutate={mutate} session={session} setAlert={setAlert} />
                ) : null}
            </Layout>
        </>
    );
}
