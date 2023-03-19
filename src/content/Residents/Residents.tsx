import { PageHeader } from "@/src/components";
import { I_Alerter, I_Mutator, I_Residents } from "@/src/interfaces";
import { appColors, Icon_Email, Icon_Flat, Icon_User } from "@/src/utils";
import { Button, Grid, Stack, Typography } from "@mui/material";
// import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { FunctionComponent, ReactElement, useState } from "react";
import { ResidentForm } from "../Modal/ResidentForm";
import { ResidentFilters } from "./ResidentFilters";

interface PropTypes extends I_Residents, I_Mutator, I_Alerter {}

export const Residents: FunctionComponent<PropTypes> = (props): ReactElement => {
    const [filter, setFilter] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);
    return (
        <Stack spacing={4} justifyContent="center" alignItems="center">
            <PageHeader title="NewCal Residents" subtitle="Resident Management Page" />
            <Button onClick={() => setOpen(true)} variant="contained" sx={{ width: "fit-content", px: 2, py: 1.5 }}>
                Add New Resident
            </Button>
            <ResidentFilters filter={filter} setFilter={setFilter} />
            <ResidentForm open={open} handleClose={() => setOpen(false)} />
            <Grid container>
                {props.residents
                    .filter((x) =>
                        filter.length
                            ? x.name.toLowerCase().includes(filter.toLowerCase()) ||
                              x.email.toLowerCase().includes(filter.toLowerCase()) ||
                              x.flat.toString().includes(filter.toLowerCase())
                            : x
                    )
                    .map(({ _id, name, email, flat }) => (
                        <Grid item xs={12} sm={6} md={6} key={_id.toString()}>
                            <Paper
                                sx={{
                                    px: 4,
                                    py: 4,
                                    m: 1,
                                    borderRadius: "1rem",
                                    bgcolor: appColors.card,
                                    border: `1px solid ${appColors.border}`,
                                }}
                            >
                                <Stack spacing={2}>
                                    <Stack direction="row" alignItems="center" spacing={1.5}>
                                        <Icon_User sx={{ fill: appColors.secondary }} />
                                        <Typography variant="h6" sx={{ color: appColors.text.primary }} noWrap>
                                            {name}
                                        </Typography>
                                    </Stack>
                                    <Stack direction="row" alignItems="center" spacing={1.5}>
                                        <Icon_Email sx={{ fill: appColors.secondary }} />
                                        <Typography variant="h6" sx={{ color: appColors.text.primary }} noWrap>
                                            {email}
                                        </Typography>
                                    </Stack>
                                    <Stack direction="row" alignItems="center" spacing={1.5}>
                                        <Icon_Flat sx={{ fill: appColors.secondary }} />
                                        <Typography variant="h6" sx={{ color: appColors.text.primary }} noWrap>
                                            Flat {flat}
                                        </Typography>
                                    </Stack>
                                </Stack>
                            </Paper>
                        </Grid>
                    ))}
            </Grid>
        </Stack>
    );
};
