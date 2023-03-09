import Layout from "@/src/components/Layout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Page() {
    const router = useRouter();
    const { data: session } = useSession();
    useEffect(() => {
        if (session && router.asPath !== "/mycal") router.push("/mycal");
    }, [session, router]);
    return (
        <Layout>
            <h1>New Caledonian Wharf</h1>
            <p>Some nice stuff about the building</p>
        </Layout>
    );
}
