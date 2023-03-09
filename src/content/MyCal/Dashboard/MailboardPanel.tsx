import { PanelHeader, PanelSubtitle } from "@/src/components";
import { E_Roles, I_MailBoard, I_NewCalSession } from "@/src/interfaces";
import {
    appColors,
    fromNowDate,
    getObjectKeysAboveZero,
    Icon_Info,
    sortObjectByValues,
    sumObjectValues,
} from "@/src/utils";
import MailTwoToneIcon from "@mui/icons-material/MailTwoTone";
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
    pt: 1,
    pb: 1,
    backgroundColor: "#22272D",
    borderRadius: 2,
    border: `1px solid ${appColors.border}`,
};

export const MailboardPanel: FunctionComponent<PropTypes> = (props) => {
    const mailToCollect = props?.mailbox?.items !== 0;
    const isConcierge = props.session?.role === E_Roles.concierge;
    let { __v, updated, _id, ...mailboard } = props.mailboard;
    let itemsToCollect: string | number =
        props.mailboard && isConcierge ? sumObjectValues(mailboard) : props?.mailbox?.items;
    itemsToCollect = Object.values(mailboard).some((x) => x === 6) ? `${itemsToCollect}+` : itemsToCollect;
    const highest = sortObjectByValues(mailboard);
    const flatsToCollect = getObjectKeysAboveZero(mailboard).length;
    const others = flatsToCollect > 12 ? flatsToCollect - 12 : null;
    const lastUpdated = `Last updated ${fromNowDate(
        isConcierge ? props?.mailboard?.updated : props?.mailbox?.updated
    )}`;
    return (
        <>
            {isConcierge ? (
                <>
                    <Stack
                        sx={{ display: { xs: "none", sm: "flex" } }}
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={1.5}
                        ml={-2}
                    >
                        <Tooltip title="You can modify this because you are a NewCal Concierge">
                            <Icon_Info sx={{ fill: appColors.secondary, position: "sticky", right: 20 }} />
                        </Tooltip>
                        <PanelHeader text="Mailboard" />
                    </Stack>
                    <Stack spacing={0.5} sx={{ display: { xs: "block", sm: "none" } }}>
                        <PanelHeader text="Mailboard" />
                        <PanelSubtitle text="Only accessible to NewCal Concierge" />
                    </Stack>
                </>
            ) : (
                <PanelHeader text="Mailbox" />
            )}
            <Stack>
                <Typography
                    sx={{ color: mailToCollect ? appColors.secondary : "lightseagreen" }}
                    variant="h6"
                    mt={0.5}
                    mb={0.5}
                >
                    {itemsToCollect || "No"} item{itemsToCollect === 1 ? null : "s"} to collect{" "}
                    {flatsToCollect ? `(${flatsToCollect} flat${flatsToCollect === 1 ? "" : "s"})` : null}
                </Typography>
                <PanelSubtitle text={lastUpdated} />
                {isConcierge ? (
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
                ) : (
                    <Paper
                        elevation={5}
                        sx={{
                            mb: 1,
                            pt: 2,
                            pb: 2,
                            height: "fit-content",
                            bgcolor: appColors.panel,
                            borderRadius: 2,
                            border: `2px solid ${mailToCollect ? "green" : appColors.border}`,
                        }}
                    >
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="center"
                            sx={{ pt: { sm: 5.8, md: 5.2 }, pb: { sm: 5.8, md: 5.2 }, gap: 1 }}
                        >
                            {Array.from(Array(props?.mailbox?.items).keys())
                                .slice(0, 4)
                                .map((_, i) => (
                                    <MailTwoToneIcon
                                        key={i}
                                        sx={{
                                            opacity: 0.9,
                                            width: "auto",
                                            height: { sm: 34, md: 45 },
                                            fill: appColors.text.primary,
                                        }}
                                    />
                                ))}
                            {props?.mailbox?.items > 4 ? (
                                <span style={{ color: appColors.text.primary, fontSize: 24 }}>{"+"}</span>
                            ) : null}
                        </Stack>
                    </Paper>
                )}
            </Stack>
        </>
    );
};
