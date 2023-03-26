import { CommentForm } from "@/src/content/Modal";
import { E_PostType, E_TicketType, I_Alerter, I_Likes, I_Mutator, I_NewCalSession, I_Views } from "@/src/interfaces";
import {
    adminLikeString,
    appColors,
    Icon_AddComment,
    Icon_Delete,
    Icon_LikeActive,
    Icon_LikeInactive,
    Icon_View,
} from "@/src/utils";
import { CircularProgress, Paper, Stack, Typography } from "@mui/material";
import { Types } from "mongoose";
import { FunctionComponent } from "react";

interface PropTypes extends I_Likes, I_NewCalSession, I_Mutator, I_Alerter, I_Views {
    open: boolean;
    loading: boolean;
    onLike: () => void;
    adminLikes: string[];
    onDelete: () => void;
    setOpen: (x: boolean) => void;
    item: {
        id: Types.ObjectId;
        type: E_PostType | E_TicketType;
        author: {
            user: Types.ObjectId;
            userType: "admin" | "resident";
        };
    };
}

const sxPaper = {
    p: "12px 16px",
    display: "flex",
    alignItems: "center",
    borderRadius: "1rem",
    bgcolor: appColors.card,
    justifyContent: "center",
    border: `1px solid ${appColors.border}`,
    width: { xs: 100, sm: 100, md: 200 },
};

export const ItemActions: FunctionComponent<PropTypes> = (props) => {
    return (
        <Stack>
            {props.adminLikes.length ? (
                <Typography my={3} sx={{ color: appColors.secondary, opacity: 0.9 }}>
                    {adminLikeString(props.adminLikes)}
                </Typography>
            ) : null}
            <Stack direction="row" spacing={2}>
                <Paper sx={{ ...sxPaper, cursor: "pointer" }} onClick={props.onLike}>
                    <Stack direction="row" spacing={1} alignItems="center">
                        {props.loading ? (
                            <CircularProgress sx={{ height: 20, width: 20 }} />
                        ) : props.likes.some((x) => x.user._id.toString() === props.session?.id) ? (
                            <Icon_LikeActive sx={{ fill: appColors.secondary }} />
                        ) : (
                            <Icon_LikeInactive sx={{ fill: appColors.text.primary }} />
                        )}
                        <Typography
                            sx={{ color: appColors.text.primary, display: { xs: "none", sm: "none", md: "flex" } }}
                        >
                            {props.likes.length || "No"} like{props.likes.length === 1 ? null : "s"}
                        </Typography>
                        {props.likes.length ? (
                            <Typography
                                sx={{ color: appColors.text.primary, display: { xs: "flex", sm: "flex", md: "none" } }}
                            >
                                {props.likes.length}
                            </Typography>
                        ) : null}
                    </Stack>
                </Paper>
                <Paper sx={sxPaper}>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Icon_View sx={{ fill: appColors.text.primary }} />
                        <Typography
                            sx={{ color: appColors.text.primary, display: { xs: "none", sm: "none", md: "flex" } }}
                        >
                            {props.views.length || "No"} view{props.views.length === 1 ? null : "s"}
                        </Typography>
                        {props.views.length ? (
                            <Typography
                                sx={{ color: appColors.text.primary, display: { xs: "flex", sm: "flex", md: "none" } }}
                            >
                                {props.views.length}
                            </Typography>
                        ) : null}
                    </Stack>
                </Paper>
                <Paper sx={{ ...sxPaper, cursor: "pointer" }} onClick={() => props.setOpen(true)}>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Icon_AddComment sx={{ fill: appColors.text.primary }} />
                        <Typography
                            sx={{ color: appColors.text.primary, display: { xs: "none", sm: "none", md: "flex" } }}
                        >
                            Comment
                        </Typography>
                    </Stack>
                </Paper>
                {props.item.author.user.toString() === props.session?.id ? (
                    <Paper sx={{ ...sxPaper, cursor: "pointer" }} onClick={props.onDelete}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Icon_Delete sx={{ fill: "salmon" }} />
                            <Typography sx={{ color: "salmon" }}>Delete</Typography>
                        </Stack>
                    </Paper>
                ) : null}
                <CommentForm
                    itemType="post"
                    open={props.open}
                    mutate={props.mutate}
                    itemID={props.item.id}
                    titleType={props.item.type}
                    handleClose={() => props.setOpen(false)}
                />
            </Stack>
        </Stack>
    );
};
