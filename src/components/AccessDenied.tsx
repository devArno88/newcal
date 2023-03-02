import { Box, Button } from "@mui/material";
import Link from "next/link";
import { PageHeader } from "./PageHeader";

export default function AccessDenied() {
    return (
        <>
            <PageHeader title="STOP!" subtitle="You do not have permission to view this page" />
            <Box textAlign="center" mt={3}>
                <Link href="/mycal">
                    <Button variant="contained">Take Me Back</Button>
                </Link>
            </Box>
        </>
    );
}
