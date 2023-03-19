import { I_Alerter, I_Enquiry, I_Mutator } from "@/src/interfaces";
import { appColors, fromNowDate, Icon_Email, Icon_Phone, Icon_User, niceDate } from "@/src/utils";
import { Button, Paper, Stack, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import { EnquiryStatus } from "./EnquiryStatus";

interface PropTypes extends I_Enquiry, I_Mutator, I_Alerter {}

export const Enquiry: FunctionComponent<PropTypes> = (props) => {
    const { name, email, phone, message, date, open } = props;
    return (
        <Paper sx={{ bgcolor: appColors.card, p: 4, border: `2px solid ${appColors.border}`, borderRadius: "1rem" }}>
            <Stack spacing={2}>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Icon_User sx={{ fill: appColors.secondary }} />
                    <Typography sx={{ color: appColors.text.primary }} variant="h5">
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
                        __html: `"${message}"`.replaceAll("\n", "<br/>"),
                    }}
                />
            </Typography>
            <Typography sx={{ color: appColors.secondary }} mt={2}>
                <i>Sent {`${niceDate(date)} (${fromNowDate(date)})`}</i>
            </Typography>
            <Stack spacing={3} width="fit-content" mt={4}>
                <EnquiryStatus enquiryID={props._id} setAlert={props.setAlert} open={open} mutate={props.mutate} />
                <Button
                    variant="contained"
                    sx={{ px: 2.5, py: 1.5, borderRadius: "0.5rem", fontSize: { xs: 14, sm: 15, md: 16 } }}
                >
                    Send Email
                </Button>
            </Stack>
        </Paper>
    );
};
