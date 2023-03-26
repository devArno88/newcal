import { PageHeader } from "@/src/components";
import { ResidentForm } from "@/src/content/Modal";
import { I_Alerter, I_Mutator, I_Resident, I_Residents } from "@/src/interfaces";
import { residentFilter } from "@/src/utils";
import { Button, Grid, Stack } from "@mui/material";
import { FunctionComponent, ReactElement, useState } from "react";
import { ResidentCard } from "./ResidentCard";
import { ResidentFilters } from "./ResidentFilters";

interface PropTypes extends I_Residents, I_Mutator, I_Alerter {}

export const Residents: FunctionComponent<PropTypes> = (props): ReactElement => {
    const [filter, setFilter] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);
    const [resident, setResident] = useState<I_Resident | undefined>(undefined);
    const handleEdit = (resident: I_Resident) => {
        setResident(resident);
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setResident(undefined);
    };
    return (
        <Stack spacing={4} justifyContent="center" alignItems="center">
            <PageHeader title="NewCal Residents" subtitle="Resident Management Page" />
            <Button onClick={() => setOpen(true)} variant="contained" sx={{ width: "fit-content", px: 2, py: 1.5 }}>
                Create New Resident
            </Button>
            <ResidentFilters filter={filter} setFilter={setFilter} />
            <ResidentForm
                setAlert={props.setAlert}
                mutate={props.mutate}
                resident={resident}
                open={open}
                handleClose={handleClose}
            />
            <Grid container>
                {props.residents
                    .filter((resident) => residentFilter({ resident, filter }))
                    .map((resident) => (
                        <ResidentCard
                            {...resident}
                            mutate={props.mutate}
                            setAlert={props.setAlert}
                            key={resident._id.toString()}
                            onClick={() => handleEdit(resident)}
                        />
                    ))}
            </Grid>
        </Stack>
    );
};
