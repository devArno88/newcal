import Layout from "@/src/components/Layout";
import { Landing } from "@/src/content/Landing";
import { useAlert } from "@/src/context";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Page() {
    const { setAlert } = useAlert();
    const router = useRouter();
    const { data: session } = useSession();
    useEffect(() => {
        if (session && router.asPath !== "/mycal") router.push("/mycal");
    }, [session, router]);
    return (
        <Layout>
            <Landing setAlert={setAlert} />
        </Layout>
    );
}
