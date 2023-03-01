import { Loading, PageHeader } from "@/src/components";
import { TicketCard } from "@/src/components/TicketCard";
import { I_Mutator, I_Ticket } from "@/src/interfaces";
import { Button, Stack } from "@mui/material";
import Link from "next/link";
import { FunctionComponent, useState } from "react";
import { TicketForm } from "../../Modal/TicketForm";

interface PropTypes extends I_Mutator {
    data: I_Ticket[];
    loading: boolean;
}

export const MyCalTickets: FunctionComponent<PropTypes> = (props) => {
    const [open, setOpen] = useState(false);
    return (
        <Stack gap={4}>
            <PageHeader title="My Tickets" subtitle="Residents Space Activity" />
            <Stack sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Stack gap={1.5}>
                    <Button
                        color="secondary"
                        variant="contained"
                        sx={{ width: { xs: 200, sm: 220, md: 240 }, pl: 1, pr: 1 }}
                        onClick={() => setOpen(true)}
                    >
                        Create New Ticket
                    </Button>
                    <Link href="/help">
                        <Button
                            color="info"
                            variant="contained"
                            sx={{ width: { xs: 200, sm: 220, md: 240 }, pl: 1, pr: 1 }}
                        >
                            View All Tickets
                        </Button>
                    </Link>
                </Stack>
                <TicketForm open={open} handleClose={() => setOpen(false)} mutate={props.mutate} />
                <Stack gap={2} mt={4} sx={{ width: { xs: "100%", sm: "70%", md: "65%" } }}>
                    {props.loading ? <Loading /> : props.data?.map((t) => <TicketCard key={t._id.toString()} {...t} />)}
                </Stack>
            </Stack>
        </Stack>
    );
};
