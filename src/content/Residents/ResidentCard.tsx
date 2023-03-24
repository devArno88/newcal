import { deleteResident } from "@/src/actions";
import { E_AlertTypes } from "@/src/context";
import { I_Alerter, I_Mutator, I_Resident } from "@/src/interfaces";
import { appColors, Icon_Delete, Icon_Email, Icon_Flat, Icon_User } from "@/src/utils";
import { Button, Grid, Paper, Stack, Tooltip, Typography } from "@mui/material";
import { FunctionComponent, ReactElement } from "react";

interface PropTypes extends I_Resident, I_Mutator, I_Alerter {
    onClick: () => void;
}

export const ResidentCard: FunctionComponent<PropTypes> = (props): ReactElement => {
    const onDelete = async () => {
        if (window.confirm("Are you sure you want to delete this resident?")) {
            const res = await deleteResident({ residentID: props._id });
            if (res) {
                if (res?.err) props.setAlert({ type: E_AlertTypes.error, text: res?.err });
                if (res?.msg) {
                    props.mutate();
                    props.setAlert({ type: E_AlertTypes.success, text: res?.msg });
                }
            }
        }
    };
    return (
        <Grid item xs={12} sm={6} md={6}>
            <Paper
                sx={{
                    m: 1,
                    p: 4,
                    borderRadius: "1rem",
                    bgcolor: appColors.card,
                    border: `1px solid ${appColors.border}`,
                }}
            >
                <Stack spacing={2}>
                    <Stack direction="row" alignItems="center" spacing={1.5}>
                        <Icon_User sx={{ fill: appColors.secondary }} />
                        <Typography variant="h5" sx={{ color: appColors.secondary }} noWrap>
                            {props.name}
                        </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={1.5}>
                        <Icon_Email sx={{ fill: appColors.secondary }} />
                        <Typography variant="h6" sx={{ color: appColors.text.primary }} noWrap>
                            {props.email}
                        </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={1.5}>
                        <Icon_Flat sx={{ fill: appColors.secondary }} />
                        <Typography variant="h6" sx={{ color: appColors.text.primary }} noWrap>
                            Flat {props.flat}
                        </Typography>
                    </Stack>
                </Stack>
                <Stack spacing={1.5} sx={{ mt: 3 }} direction={{ xs: "row", sm: "column", md: "row" }}>
                    {/* <a
                        {...mailtoParameters({
                            target: props.email,
                            subject: "NewCal: [ - SUBJECT - ]",
                            body: `Hi ${
                                props.name.split(" ")[0]
                            },${doubleBreak}I hope this email finds you well.${doubleBreak}[ - ANY ADDITIONAL INFORMATION - ]${doubleBreak}Have a great day!${doubleBreak}Kind regards,${doubleBreak}NewCal Management`,
                        })}
                    >
                        <Tooltip title="Email Resident">
                            <Button
                                color="secondary"
                                variant="contained"
                                sx={{
                                    borderRadius: "1rem",
                                    width: { xs: 80, sm: "100%", md: 80 },
                                }}
                            >
                                <Icon_Mail />
                            </Button>
                        </Tooltip>
                    </a> */}
                    <Tooltip title="Edit Resident">
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={props.onClick}
                            sx={{ borderRadius: "1rem", width: { xs: 80, sm: "100%", md: 80 } }}
                        >
                            {/* <Icon_Edit /> */}
                        </Button>
                    </Tooltip>
                    <Tooltip title="Delete Resident">
                        <Button
                            color="error"
                            onClick={onDelete}
                            variant="contained"
                            sx={{ borderRadius: "1rem", width: { xs: 80, sm: "100%", md: 80 } }}
                        >
                            <Icon_Delete />
                        </Button>
                    </Tooltip>
                </Stack>
            </Paper>
        </Grid>
    );
};
