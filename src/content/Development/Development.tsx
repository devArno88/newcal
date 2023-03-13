import { PageHeader } from "@/src/components";
import { SelectChangeEvent, Stack } from "@mui/material";
import { FunctionComponent, useState } from "react";
import { DevelopmentFilter } from "./DevelopmentFilter";
import { DevelopmentTicket } from "./DevelopmentTicket";

interface PropTypes {
    issues: any[];
}

export const Development: FunctionComponent<PropTypes> = (props) => {
    const [status, setStatus] = useState("");
    const [type, setType] = useState("");
    const handleStatus = (event: SelectChangeEvent) => setStatus(event.target.value);
    const handleType = (event: SelectChangeEvent) => setType(event.target.value);
    return (
        <Stack spacing={4}>
            <PageHeader title="NewCal Development" subtitle="App Development Backlog" />
            <Stack spacing={4}>
                <DevelopmentFilter status={status} handleStatus={handleStatus} type={type} handleType={handleType} />
                {props.issues
                    ?.filter((x) => (status.length ? x.state === status : x))
                    .filter((x) => (type.length ? x.title.includes(`[ ${type.toUpperCase()} ]`) : x))
                    .map((ticket) => (
                        <DevelopmentTicket key={ticket.id} {...ticket} />
                    ))}
            </Stack>
        </Stack>
    );
};
