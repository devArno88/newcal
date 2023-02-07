import { PageHeader } from "@/src/components";
import { TicketCard } from "@/src/components/TicketCard";
import { I_Ticket } from "@/src/interfaces";
import { Button, CircularProgress, Stack } from "@mui/material";
import { FunctionComponent, useState } from "react";
import { KeyedMutator } from "swr";
import { TicketForm } from "../../Modal/TicketForm";

interface PropTypes {
    data: I_Ticket[];
    loading: boolean;
    mutate: KeyedMutator<any>;
}

export const MyCalTickets: FunctionComponent<PropTypes> = (props) => {
    const [open, setOpen] = useState(false);
    return (
        <Stack gap={4}>
            <PageHeader title="My Tickets" subtitle="Residents Space Activity" />
            <Stack sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Button variant="contained" sx={{ width: "fit-content", pl: 6, pr: 6 }} onClick={() => setOpen(true)}>
                    New Ticket
                </Button>
                <TicketForm open={open} handleClose={() => setOpen(false)} mutate={props.mutate} />
                <Stack gap={2} mt={4} sx={{ width: { xs: "100%", sm: "70%", md: "65%" } }}>
                    {props.loading ? (
                        <CircularProgress />
                    ) : (
                        props.data?.map((t) => <TicketCard key={t._id.toString()} {...t} />)
                    )}
                </Stack>
            </Stack>
        </Stack>
    );
};
