import { Box, Container } from "@mui/material";
import { ReactNode } from "react";
import NavBar from "./NavBar";

interface Props {
    children: ReactNode;
}

const light: boolean = true;

export default function Layout({ children }: Props) {
    return (
        <Box sx={{ bgcolor: light ? "#fff" : "#1A2027", height: "100vh" }}>
            <NavBar />
            <Container maxWidth="xl" sx={{ pt: 4, pb: 4 }}>
                {children}
            </Container>
        </Box>
    );
}
