import { PanelHeader, PanelSubtitle } from "@/src/components";
import { I_MailBoard, I_NewCalSession } from "@/src/interfaces";
import {
    appColors,
    fromNowDate,
    getObjectKeysAboveZero,
    Icon_Info,
    sortObjectByValues,
    sumObjectValues,
} from "@/src/utils";
import { Grid, Paper, Stack, Tooltip, Typography } from "@mui/material";
import { FunctionComponent } from "react";

interface PropTypes extends I_NewCalSession {
    mailboard?: I_MailBoard;
    mailbox?: {
        items: number;
        updated: Date;
    };
}

const mailboardStyle = {
    py: 1,
    borderRadius: 2,
    backgroundColor: "#22272D",
    border: `1px solid ${appColors.border}`,
};

export const MailboardPanel: FunctionComponent<PropTypes> = (props) => {
    let { __v, updated, _id, ...mailboard } = props.mailboard;
    let itemsToCollect: string | number = sumObjectValues(mailboard);
    itemsToCollect = Object.values(mailboard).some((x) => x === 6) ? `${itemsToCollect}+` : itemsToCollect;
    const highest = sortObjectByValues(mailboard);
    const flatsToCollect = getObjectKeysAboveZero(mailboard).length;
    const others = flatsToCollect > 12 ? flatsToCollect - 12 : null;
    const lastUpdated = `Last updated ${fromNowDate(props?.mailboard?.updated)}`;
    return (
        <>
            <Stack
                ml={-2}
                spacing={1.5}
                direction="row"
                alignItems="center"
                justifyContent="center"
                sx={{ display: { xs: "none", sm: "flex" } }}
            >
                <Tooltip title="Only viewable to NewCal Concierge">
                    <Icon_Info sx={{ fill: appColors.secondary, position: "sticky", right: 20 }} />
                </Tooltip>
                <PanelHeader text="Mailboard" />
            </Stack>
            <Stack spacing={0.5} sx={{ display: { xs: "block", sm: "none" } }}>
                <PanelHeader text="Mailboard" />
                <PanelSubtitle text="Only viewable to NewCal Concierge" />
            </Stack>
            <Stack>
                <Typography sx={{ color: appColors.secondary }} variant="h6" mt={0.5} mb={0.5}>
                    {itemsToCollect || "No"} item{itemsToCollect === 1 ? null : "s"} to collect{" "}
                    {flatsToCollect ? `(${flatsToCollect} flat${flatsToCollect === 1 ? "" : "s"})` : null}
                </Typography>
                <PanelSubtitle text={lastUpdated} />
                <Stack mt={2}>
                    <Grid container spacing={{ xs: 2, md: 3 }}>
                        {highest.slice(0, 12).map((x, i) => {
                            return (
                                <Grid item xs={6} sm={4} md={3} key={i}>
                                    <Paper sx={mailboardStyle}>
                                        <Stack>
                                            <Typography sx={{ color: appColors.text.secondary }} variant="h6">
                                                {x.replace("Flat", "Flat ")}
                                            </Typography>
                                            <Typography sx={{ color: appColors.secondary }}>
                                                {`${mailboard[x] === 6 ? "5+" : mailboard[x] || "No"} item${
                                                    mailboard[x] === 1 ? "" : "s"
                                                }`}
                                            </Typography>
                                        </Stack>
                                    </Paper>
                                </Grid>
                            );
                        })}
                    </Grid>
                    {others ? (
                        <Typography mt={2}>
                            and {others} other{others === 1 ? "" : "s"}
                        </Typography>
                    ) : null}
                </Stack>
            </Stack>
        </>
    );
};
