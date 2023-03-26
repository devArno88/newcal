import { I_Alerter, I_Enquiry, I_Mutator } from "@/src/interfaces";
import {
    appColors,
    doubleBreak,
    firstName,
    fromNowDate,
    Icon_Email,
    Icon_ID,
    Icon_Phone,
    Icon_User,
    mailtoParameters,
    niceDate,
} from "@/src/utils";
import { Button, Paper, Stack, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import { EnquiryStatus } from "./EnquiryStatus";

interface PropTypes extends I_Enquiry, I_Mutator, I_Alerter {}

export const EnquiryCard: FunctionComponent<PropTypes> = (props) => {
    const { uid, name, email, phone, message, date, open } = props;
    const mailParams = mailtoParameters({
        target: `${name} <${email}>`,
        subject: `New Caledonian Wharf Enquiry #${uid}`,
        body: `Hi ${firstName(name)},${doubleBreak}`,
    });
    return (
        <Paper sx={{ bgcolor: appColors.card, p: 4, border: `2px solid ${appColors.border}`, borderRadius: "1rem" }}>
            <Stack spacing={2}>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Icon_ID sx={{ fill: appColors.secondary }} />
                    <Typography
                        variant="h5"
                        letterSpacing={1}
                        fontFamily="monospace"
                        sx={{ color: appColors.secondary }}
                    >
                        {uid}
                    </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Icon_User sx={{ fill: appColors.secondary }} />
                    <Typography sx={{ color: appColors.text.primary }} variant="h6">
                        {name}
                    </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Icon_Email sx={{ fill: appColors.secondary }} />
                    <Typography sx={{ color: appColors.text.primary }} variant="h6">
                        {email}
                    </Typography>
                </Stack>
                {phone ? (
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Icon_Phone sx={{ fill: appColors.secondary }} />
                        <Typography sx={{ color: appColors.text.primary }} variant="h6">
                            {phone}
                        </Typography>
                    </Stack>
                ) : null}
            </Stack>

            <Typography variant="h6" my={3} sx={{ color: "salmon", fontSize: { xs: 18, sm: 20, md: 22 } }}>
                <i
                    dangerouslySetInnerHTML={{
                        __html: `${message}`.replaceAll("\n", "<br/>"),
                    }}
                />
            </Typography>
            <Typography sx={{ color: appColors.secondary }} mt={2}>
                <i>Sent {`${niceDate(date)} (${fromNowDate(date)})`}</i>
            </Typography>
            <Stack spacing={3} width="fit-content" mt={4}>
                <EnquiryStatus enquiryID={props._id} setAlert={props.setAlert} open={open} mutate={props.mutate} />
                <a {...mailParams}>
                    <Button
                        variant="contained"
                        sx={{ px: 2.5, py: 1.5, borderRadius: "0.5rem", fontSize: { xs: 14, sm: 15, md: 16 } }}
                    >
                        Send Email
                    </Button>
                </a>
            </Stack>
        </Paper>
    );
};
