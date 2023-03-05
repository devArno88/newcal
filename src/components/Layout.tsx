import { AlertBar } from "@/src/components";
import { useAlert } from "@/src/context";
import { Box, Container } from "@mui/material";
import { useSession } from "next-auth/react";
import { ReactNode } from "react";
import { appColors } from "../utils";
import { Navigation } from "./Navigation";

interface PropTypes {
    children: ReactNode;
}

export default function Layout(props: PropTypes) {
    const { data: session } = useSession();
    const { alertState, closeAlert } = useAlert();
    const state = { ...alertState, closeAlert };
    return (
        <Box sx={{ bgcolor: appColors.background, height: "100vh" }}>
            {/* <NavBar session={props.session} /> */}
            <Navigation session={session} />
            <Container maxWidth="md" sx={{ pt: 4, pb: 4 }}>
                {props.children}
            </Container>
            <AlertBar {...state} />
        </Box>
    );
}
