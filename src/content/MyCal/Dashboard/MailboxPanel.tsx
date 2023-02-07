import { appColors } from "@/src/utils";
import MailTwoToneIcon from "@mui/icons-material/MailTwoTone";
import { Paper, Stack, Typography } from "@mui/material";
import moment from "moment";

export const MailboxPanel = (props) => {
    const mailToCollect = props?.mailbox?.items !== 0;
    return (
        <>
            <Typography variant="h5">Mailbox</Typography>
            <Stack>
                <Typography sx={{ color: mailToCollect ? "greenyellow" : "lightseagreen" }} variant="h6" mt={0.5}>
                    {props?.mailbox?.items || "No"} item{!mailToCollect || props?.mailbox?.items > 1 ? "s" : null} to
                    collect
                </Typography>
                <Typography variant="caption" sx={{ color: "gray" }} mt={0.5} mb={2}>
                    Last updated {moment(props?.mailbox?.updated).fromNow()}
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
