import { PageHeader } from "@/src/components";
import { Button, Stack } from "@mui/material";
import { FunctionComponent, useState } from "react";
import { TicketForm } from "../../Modal/TicketForm";

interface PropTypes {}

export const MyCalTickets: FunctionComponent<PropTypes> = (props) => {
    const [open, setOpen] = useState(false);
    return (
        <Stack gap={4}>
            <PageHeader title="My Tickets" subtitle="Management and Development" />

            <Stack sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Button variant="contained" sx={{ width: "fit-content", pl: 6, pr: 6 }} onClick={() => setOpen(true)}>
                    New Ticket
                </Button>
                <TicketForm open={open} handleClose={() => setOpen(false)} />
            </Stack>
        </Stack>
    );
};
