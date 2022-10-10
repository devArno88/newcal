import { SessionProvider } from "next-auth/react";
import "./styles.css";
import type { AppProps } from "next/app";
import AppMeta from "src/components/AppMeta";

export default function App({
    Component,
    pageProps: { session, ...pageProps },
}: AppProps<{ session: any }>) {
    return (
        <>
            <AppMeta />

            <SessionProvider session={session}>
                <Component {...pageProps} />
            </SessionProvider>
        </>
    );
}
