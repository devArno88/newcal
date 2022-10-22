import NavBar from "./NavBar";
import { Box, Container } from "@mui/material";

interface Props {
    children: React.ReactNode;
}

const light: boolean = true;

export default function Layout({ children }: Props) {
    return (
        <Box sx={{ bgcolor: light ? "#fff" : "#1A2027", height: "100vh" }}>
            <NavBar />
            <Container maxWidth="xl" sx={{ mt: 8 }}>
                {children}
            </Container>
        </Box>
    );
}
