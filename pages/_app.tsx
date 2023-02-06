import AppMeta from "@/src/components/AppMeta";
import AlertProvider from "@/src/context/AlertProvider";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import "./styles.css";

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps<{ session: any }>) {
    return (
        <>
            <AppMeta />

            <SessionProvider session={session}>
                <AlertProvider>
                    <Component {...pageProps} />
                </AlertProvider>
            </SessionProvider>
        </>
    );
}
