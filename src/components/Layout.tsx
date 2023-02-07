import { Box, Container } from "@mui/material";
import { ReactNode } from "react";
import { I_NewCalSession } from "../interfaces";
import { NavBar } from "./NavBar";

interface PropTypes extends I_NewCalSession {
    children: ReactNode;
}

const light: boolean = true;

export default function Layout(props: PropTypes) {
    // const { alertState } = useAlert();
    return (
        <Box sx={{ bgcolor: "#161b22", height: "100vh" }}>
            <NavBar session={props.session} />
            {/* <AlertBar {...alertState} /> */}
            <Container maxWidth="md" sx={{ pt: 4, pb: 4 }}>
                {props.children}
            </Container>
        </Box>
    );
}
