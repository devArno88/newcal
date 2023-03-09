import { Loading, PageHeader } from "@/src/components";
import { TicketForm } from "@/src/content/Modal";
import { TicketCard } from "@/src/content/Ticket/Card/TicketCard";
import { I_Alerter, I_Mutator, I_Ticket } from "@/src/interfaces";
import { sortArrayByDate } from "@/src/utils";
import { Button, Stack } from "@mui/material";
import Link from "next/link";
import { FunctionComponent, ReactElement, useState } from "react";

interface PropTypes extends I_Mutator, I_Alerter {
    data: I_Ticket[];
    loading: boolean;
}

export const Tickets: FunctionComponent<PropTypes> = (props): ReactElement => {
    const [open, setOpen] = useState(false);
    return (
        <Stack gap={4}>
            <PageHeader title="NewCal Tickets" subtitle="Resident Enquiries" />
            <Stack sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Stack sx={{ gap: 1.5 }}>
                    <Button
                        color="secondary"
                        variant="contained"
                        sx={{ width: { xs: 200, sm: 220, md: 240 }, pl: 1, pr: 1 }}
                        onClick={() => setOpen(true)}
                    >
                        Create New Ticket
                    </Button>
                    <Link href="/mycal/tickets">
                        <Button
                            color="info"
                            variant="contained"
                            sx={{ width: { xs: 200, sm: 220, md: 240 }, pl: 1, pr: 1 }}
                        >
                            View My Tickets
                        </Button>
                    </Link>
                </Stack>
                <TicketForm
                    setAlert={props.setAlert}
                    mutate={props.mutate}
                    open={open}
                    handleClose={() => setOpen(false)}
                />
                <Stack gap={2} mt={4} sx={{ width: { xs: "100%", sm: "70%", md: "65%" } }}>
                    {props.loading ? (
                        <Loading />
                    ) : (
                        props.data?.sort(sortArrayByDate).map((p) => <TicketCard key={p._id.toString()} {...p} />)
                    )}
                </Stack>
            </Stack>
        </Stack>
    );
};
