import { AlertBar } from "@/src/components/AlertBar";
import Layout from "@/src/components/Layout";
import { useAlert } from "@/src/context";

export default function IndexPage() {
    const { alertState } = useAlert();
    return (
        <Layout>
            <h1>NextAuth.js Example</h1>
            <p>
                This is an example site to demonstrate how to use <a href="https://next-auth.js.org">NextAuth.js</a> for
                authentication.
            </p>
            <AlertBar {...alertState} />
        </Layout>
    );
}
