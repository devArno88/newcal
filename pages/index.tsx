import Layout from "@/src/components/Layout";
import { useSession } from "next-auth/react";

export default function Page() {
    const { data: session } = useSession();
    return (
        <Layout>
            <h1>NextAuth.js Example</h1>
            <p>
                This is an example site to demonstrate how to use <a href="https://next-auth.js.org">NextAuth.js</a> for
                authentication.
            </p>
        </Layout>
    );
}
