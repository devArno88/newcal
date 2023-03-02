import { I_MailBoard } from "@/src/interfaces";
import { appColors, fromNowDate } from "@/src/utils";
import MailTwoToneIcon from "@mui/icons-material/MailTwoTone";
import { Paper, Stack, Typography } from "@mui/material";
import { FunctionComponent } from "react";

interface PropTypes {
    isAdmin: boolean;
    mailboard?: I_MailBoard;
    mailbox?: {
        items: number;
        updated: Date;
    };
}

export const MailboardPanel: FunctionComponent<PropTypes> = (props) => {
    const mailToCollect = props?.mailbox?.items !== 0;
    return (
        <>
            <Typography letterSpacing={1} variant="h5">
                Mailbo{props.isAdmin ? "ard" : "x"}
            </Typography>
            <Stack>
                <Typography sx={{ color: mailToCollect ? "greenyellow" : "lightseagreen" }} variant="h6" mt={0.5}>
                    {props?.mailbox?.items || "No"} item{props?.mailbox?.items === 1 ? null : "s"} to collect
                </Typography>
                <Typography variant="caption" sx={{ color: "gray" }} mt={0.5} mb={2}>
                    Last updated {fromNowDate(props?.mailbox?.updated)}
                </Typography>
                <Paper
                    sx={{
                        mb: 1,
                        height: "100%",
                        border: `2px solid ${mailToCollect ? "green" : appColors.border}`,
                        bgcolor: appColors.background,
                    }}
                    elevation={5}
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
            </Stack>
        </>
    );
};
