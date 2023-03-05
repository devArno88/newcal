import { deleteTicketComment, handleTicketCommentLike } from "@/src/actions/ticket";
import { E_AlertTypes } from "@/src/context";
import { I_Alerter, I_Comment, I_Mutator, I_NewCalSession } from "@/src/interfaces";
import { AdminIcons, appColors, fromNowDate, getFlatColor } from "@/src/utils";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import FavoriteBorderTwoToneIcon from "@mui/icons-material/FavoriteBorderTwoTone";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import { Avatar, CircularProgress, IconButton, Paper, Stack, Typography } from "@mui/material";
import { Types } from "mongoose";
import { FunctionComponent, useState } from "react";

interface PropTypes extends I_Comment, I_Mutator, I_NewCalSession, I_Alerter {
    ticketID: Types.ObjectId;
}

const sxIcon = {
    fill: appColors.text.primary,
};

export const TicketPageComment: FunctionComponent<PropTypes> = (props) => {
    const [loading, setLoading] = useState<boolean>(false);
    const onLikeComment = async (commentID: Types.ObjectId) => {
        setLoading(true);
        const res = await handleTicketCommentLike({ ticketID: props.ticketID, commentID });
        if (res) {
            setLoading(false);
            if (res?.err)
                props.setAlert({ type: E_AlertTypes.error, text: "Something went wrong, please try again later" });
            if (res?.msg) props.mutate();
        }
    };
    const onDeleteComment = async (commentID: Types.ObjectId) => {
        if (window.confirm("Are you sure you want to delete this comment?")) {
            const res = await deleteTicketComment({ ticketID: props.ticketID, commentID });
            if (res?.err) props.setAlert({ type: E_AlertTypes.error, text: res?.err });
            if (res?.msg) {
                props.mutate();
                props.setAlert({ type: E_AlertTypes.success, text: res?.msg });
            }
        }
    };
    const Icon = props.userType === "admin" ? AdminIcons[props.user.role] : null;
    const adminLikes = props.likes?.filter((x) => x.user.role).map((x) => x.user.name);
    return (
        <Stack direction="row" alignItems="flex-start" spacing={3}>
            <Paper
                sx={{
                    p: "10px 16px",
                    borderRadius: "2rem",
                    bgcolor: appColors.card,
                    border: `1px solid ${appColors.border}`,
                }}
            >
                <Stack direction="row" alignItems="center" spacing={1.5}>
                    <Avatar src="" alt={props.user.name} sx={{ bgcolor: getFlatColor() }}>
                        {Icon ? <Icon /> : props.user.flat || null}
                    </Avatar>
                    <Stack>
                        <Typography noWrap sx={{ color: appColors.text.secondary }}>
                            {props.userType === "admin" ? "NewCal" : null} {props.user.name}
                        </Typography>
                        <Typography
                            variant="caption"
                            noWrap
                            sx={{
                                color: appColors.text.primary,
                            }}
                        >
                            {fromNowDate(props.date)}
                        </Typography>
                    </Stack>
                </Stack>
            </Paper>
            <Stack>
                <Typography variant="h6">{props.text}</Typography>
                {adminLikes.length ? (
                    <Typography mt={1} sx={{ color: "greenyellow", opacity: 0.8 }}>
                        {`Liked by NewCal ${
                            adminLikes.length === 1
                                ? adminLikes[0]
                                : adminLikes.length === 2
                                ? adminLikes.join(" and ")
                                : `${adminLikes[0]}, ${adminLikes[1]} and ${adminLikes[2]}`
                        }`}
                    </Typography>
                ) : null}

                <Stack direction="row" spacing={2} mt={2}>
                    <IconButton
                        onClick={() => onLikeComment(props?._id)}
                        sx={{ border: `1px solid ${appColors.border}`, borderRadius: 2 }}
                    >
                        <Stack direction="row" spacing={1} alignItems="center">
                            {loading ? (
                                <CircularProgress sx={{ height: 28, width: 28 }} />
                            ) : props.likes.some((x) => x.user._id.toString() === props.session?.id) ? (
                                <FavoriteTwoToneIcon sx={{ ...sxIcon, fill: "greenyellow" }} />
                            ) : (
                                <FavoriteBorderTwoToneIcon sx={sxIcon} />
                            )}
                            {loading ? null : props.likes.length ? (
                                <Typography sx={{ color: appColors.text.primary }}>
                                    {`${props.likes.length} like${props.likes.length === 1 ? "" : "s"}`}
                                </Typography>
                            ) : null}
                        </Stack>
                    </IconButton>
                    {props.user._id.toString() === props.session?.id ? (
                        <IconButton
                            onClick={() => onDeleteComment(props?._id)}
                            sx={{ border: `1px solid ${appColors.border}`, borderRadius: 2 }}
                        >
                            <Stack direction="row" spacing={1} alignItems="center">
                                <DeleteTwoToneIcon sx={sxIcon} />
                            </Stack>
                        </IconButton>
                    ) : null}
                </Stack>
            </Stack>
        </Stack>
    );
};
