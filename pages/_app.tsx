import { AppMeta } from "@/src/components";
import { AlertProvider } from "@/src/context";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import "./styles.css";

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps<{ session: Session }>) {
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
