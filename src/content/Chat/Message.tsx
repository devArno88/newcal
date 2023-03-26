import { I_Message } from "@/src/interfaces";
import { appColors, capitalise, fromNowDate } from "@/src/utils";
import { Avatar, Paper, Stack, Tooltip, Typography } from "@mui/material";
import { FunctionComponent } from "react";

interface PropTypes {
    isAuthor: boolean;
    message: I_Message;
    AdminIcon: any;
}

export const Message: FunctionComponent<PropTypes> = (props) => {
    return (
        <Stack alignItems={props.isAuthor ? "end" : "start"} mb={2}>
            <Stack direction={props.isAuthor ? "row-reverse" : "row"} spacing={2} alignItems="end">
                {props.message.userType === "admin" && props.AdminIcon ? (
                    <Tooltip title={capitalise(props.message.user.role)}>
                        <Avatar
                            src="/"
                            alt={props.message.user.name}
                            sx={{
                                bgcolor: appColors.dark,
                                border: `2px solid ${appColors.text.secondary}`,
                            }}
                        >
                            <props.AdminIcon />
                        </Avatar>
                    </Tooltip>
                ) : null}
                <Paper
                    elevation={4}
                    sx={{
                        p: 2,
                        maxWidth: "60%",
                        borderRadius: 6,
                        alignItems: "end",
                        width: "fit-content",
                        borderTopLeftRadius: "1rem",
                        borderTopRightRadius: "1rem",
                        borderBottomLeftRadius: props.isAuthor ? "1rem" : 0,
                        borderBottomRightRadius: props.isAuthor ? 0 : "1rem",
                        bgcolor: props.isAuthor ? appColors.primary : appColors.text.secondary,
                    }}
                >
                    <Stack>
                        <span
                            style={{
                                lineHeight: 1.5,
                                color: props.isAuthor ? appColors.text.secondary : appColors.dark,
                            }}
                            dangerouslySetInnerHTML={{
                                __html: props.message.text.replaceAll("\n", "<br/>"),
                            }}
                        />
                        <Typography
                            variant="caption"
                            mt={1}
                            sx={{ color: props.isAuthor ? appColors.text.primary : "grey" }}
                        >
                            {fromNowDate(new Date(props.message.date))}
                        </Typography>
                    </Stack>
                </Paper>
            </Stack>
        </Stack>
    );
};
