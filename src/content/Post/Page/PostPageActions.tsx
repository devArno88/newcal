import { deletePost, handlePostLike } from "@/src/actions/post";
import { CommentForm } from "@/src/content/Modal";
import { E_AlertTypes } from "@/src/context";
import { E_PostType, I_Alerter, I_Likes, I_Mutator, I_NewCalSession, I_Views } from "@/src/interfaces";
import { appColors, Icon_AddComment, Icon_Delete, Icon_LikeActive, Icon_LikeInactive, Icon_View } from "@/src/utils";
import { CircularProgress, Paper, Stack, Typography } from "@mui/material";
import { Types } from "mongoose";
import { NextRouter } from "next/router";
import { FunctionComponent, useState } from "react";

const sxPaper = {
    p: "12px 16px",
    display: "flex",
    alignItems: "center",
    borderRadius: "1rem",
    bgcolor: appColors.card,
    justifyContent: "center",
    border: `1px solid ${appColors.border}`,
    width: { xs: 50, sm: 50, md: "fit-content" },
};

interface PropTypes extends I_Likes, I_NewCalSession, I_Mutator, I_Alerter, I_Views {
    postID: Types.ObjectId;
    type: E_PostType;
    router: NextRouter;
    postAuthor: {
        user: Types.ObjectId;
        userType: "admin" | "resident";
    };
}

export const PostPageActions: FunctionComponent<PropTypes> = (props) => {
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const onLike = async () => {
        setLoading(true);
        const res = await handlePostLike({ postID: props.postID });
        if (res) {
            setLoading(false);
            if (res?.err)
                props.setAlert({ type: E_AlertTypes.error, text: "Something went wrong, please try again later" });
            if (res?.msg) props.mutate();
        }
    };
    const onDelete = async () => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            props.router.push("/posts");
            const res = await deletePost({ postID: props.postID });
            if (res?.err) props.setAlert({ type: E_AlertTypes.error, text: res.err });
            if (res?.msg) {
                props.mutate();
                props.setAlert({ type: E_AlertTypes.success, text: res?.msg });
            }
        }
    };
    const adminLikes = props.likes?.filter((x) => x.user.role).map((x) => x.user.name);
    return (
        <Stack>
            {adminLikes.length ? (
                <Typography ml={7} mt={-1} mb={3} sx={{ color: appColors.secondary, opacity: 0.8 }}>
                    {`Liked by NewCal ${
                        adminLikes.length === 1
                            ? adminLikes[0]
                            : adminLikes.length === 2
                            ? adminLikes.join(" and ")
                            : `${adminLikes[0]}, ${adminLikes[1]} and ${adminLikes[2]}`
                    }`}
                </Typography>
            ) : null}
            <Stack direction="row" spacing={2} ml={6}>
                <Paper sx={{ ...sxPaper, cursor: "pointer" }} onClick={onLike}>
                    <Stack direction="row" spacing={1} alignItems="center">
                        {loading ? (
                            <CircularProgress sx={{ height: 28, width: 28 }} />
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
                <Paper sx={{ ...sxPaper, cursor: "pointer" }} onClick={() => setOpen(true)}>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Icon_AddComment sx={{ fill: appColors.text.primary }} />
                        <Typography
                            sx={{ color: appColors.text.primary, display: { xs: "none", sm: "none", md: "flex" } }}
                        >
                            Comment
                        </Typography>
                    </Stack>
                </Paper>
                {props.postAuthor.user.toString() === props.session?.id ? (
                    <Paper sx={{ ...sxPaper, cursor: "pointer" }} onClick={onDelete}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Icon_Delete sx={{ fill: "salmon" }} />
                            <Typography sx={{ color: "salmon" }}>Delete</Typography>
                        </Stack>
                    </Paper>
                ) : null}
                <CommentForm
                    open={open}
                    itemType="post"
                    itemID={props.postID}
                    mutate={props.mutate}
                    titleType={props.type}
                    handleClose={() => setOpen(false)}
                />
            </Stack>
        </Stack>
    );
};
