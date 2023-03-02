import { AlertBar, NavBar } from "@/src/components";
import { useAlert } from "@/src/context";
import { I_NewCalSession } from "@/src/interfaces";
import { Box, Container } from "@mui/material";
import { ReactNode } from "react";

interface PropTypes extends I_NewCalSession {
    children: ReactNode;
}

export default function Layout(props: PropTypes) {
    const { alertState, closeAlert } = useAlert();
    const state = { ...alertState, closeAlert };
    return (
        <Box sx={{ bgcolor: "#161b22", height: "100vh" }}>
            <NavBar session={props.session} />
            <Container maxWidth="md" sx={{ pt: 4, pb: 4 }}>
                {props.children}
            </Container>
            <AlertBar {...state} />
        </Box>
    );
}
