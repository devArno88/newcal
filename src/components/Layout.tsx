import { AlertBar } from "@/src/components";
import { useAlert } from "@/src/context";
import { appColors } from "@/src/utils";
import { Box, Container } from "@mui/material";
import { useSession } from "next-auth/react";
import { ReactNode } from "react";
import { Navigation } from "./Navigation";

export default function Layout({ children }: { children: ReactNode }) {
    const { data: session } = useSession();
    const { alertState, closeAlert } = useAlert();
    const state = { ...alertState, closeAlert };
    return (
        <Box sx={{ bgcolor: appColors.background }}>
            <Navigation session={session} />
            {session ? (
                <Container maxWidth="md" sx={{ pt: 4, pb: 4, height: "100vh" }}>
                    {children}
                </Container>
            ) : (
                children
            )}
            <AlertBar {...state} />
        </Box>
    );
}
