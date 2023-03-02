import { deletePostComment, handlePostCommentLike, handlePostLike } from "@/src/actions/post";
import { PageHeader } from "@/src/components";
import { CommentForm } from "@/src/content/Modal";
import { E_AlertTypes, useAlert } from "@/src/context";
import { E_PostType, I_Mutator, I_NewCalSession, I_Post } from "@/src/interfaces";
import { appColors, capitalise, fromNowDate, getFlatColor, sortArrayByDate } from "@/src/utils";
import AddCommentTwoToneIcon from "@mui/icons-material/AddCommentTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import FavoriteBorderTwoToneIcon from "@mui/icons-material/FavoriteBorderTwoTone";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import InfoTwoToneIcon from "@mui/icons-material/InfoTwoTone";
import NotificationsNoneTwoToneIcon from "@mui/icons-material/NotificationsNoneTwoTone";
import QuizTwoToneIcon from "@mui/icons-material/QuizTwoTone";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import { Avatar, CircularProgress, Divider, IconButton, Paper, Stack, Typography } from "@mui/material";
import { Types } from "mongoose";
import { Fragment, FunctionComponent, ReactElement, useState } from "react";

interface PropTypes extends I_Mutator, I_NewCalSession {
    post: I_Post;
}

const sxPaper = {
    p: "16px 24px",
    width: "fit-content",
    textAlign: "center",
    bgcolor: appColors.card,
    borderRadius: "1rem",
    border: `1px solid ${appColors.border}`,
};

const sxIcon = {
    fill: appColors.text.primary,
};

export const Post: FunctionComponent<PropTypes> = (props): ReactElement => {
    const { setAlert } = useAlert();
    const [open, setOpen] = useState<boolean>(false);
    const [loadingPost, setLoadingPost] = useState<boolean>(false);
    const [loadingComment, setLoadingComment] = useState<boolean>(false);
    const handleLikePost = async () => {
        setLoadingPost(true);
        const res = await handlePostLike({ postID: props.post._id });
        if (res) {
            setLoadingPost(false);
            if (res?.err) setAlert({ type: E_AlertTypes.error, text: "Something went wrong, please try again later" });
            if (res?.msg) {
                props.mutate();
                // setAlert({ type: E_AlertTypes.success, text: res?.msg });
            }
        }
    };
    const handleLikeComment = async (commentID: Types.ObjectId) => {
        setLoadingComment(true);
        const res = await handlePostCommentLike({ postID: props.post._id, commentID });
        if (res) {
            setLoadingComment(false);

            if (res?.err) setAlert({ type: E_AlertTypes.error, text: "Something went wrong, please try again later" });
            if (res?.msg) {
                props.mutate();
                // setAlert({ type: E_AlertTypes.success, text: res?.msg });
            }
        }
    };
    const handleDeleteComment = async (commentID: Types.ObjectId) => {
        if (window.confirm("Are you sure you want to delete this comment?")) {
            const res = await deletePostComment({ postID: props.post._id, commentID });
            if (res?.err) setAlert({ type: E_AlertTypes.error, text: res?.err });
            if (res?.msg) {
                props.mutate();
                setAlert({ type: E_AlertTypes.success, text: res?.msg });
            }
        }
    };
    return (
        <>
            <Stack gap={4}>
                <PageHeader
                    title={`NewCal ${capitalise(props.post.type)}`}
                    subtitle={`Posted ${fromNowDate(props.post.date)} by ${props.post.resident.name} (Flat ${
                        props.post.resident.flat
                    }) `}
                />
                <Stack spacing={2} mt={4}>
                    <Stack direction="row" spacing={2} alignItems="flex-start">
                        {props.post.type === E_PostType.listing ? (
                            <HomeTwoToneIcon sx={{ fill: "greenyellow" }} fontSize="large" />
                        ) : null}
                        {props.post.type === E_PostType.question ? (
                            <QuizTwoToneIcon sx={{ fill: "greenyellow" }} fontSize="large" />
                        ) : null}
                        {props.post.type === E_PostType.notice ? (
                            <NotificationsNoneTwoToneIcon sx={{ fill: "greenyellow" }} fontSize="large" />
                        ) : null}
                        <Typography variant="h5" sx={{ color: appColors.text.secondary }}>
                            {props.post.title}
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={2} alignItems="flex-start">
                        <InfoTwoToneIcon sx={{ fill: "greenyellow" }} fontSize="large" />
                        <Typography variant="h6" sx={{ color: appColors.text.primary }}>
                            {props.post.content}
                        </Typography>
                    </Stack>
                </Stack>
                <Stack direction="row" spacing={2}>
                    <Paper sx={sxPaper}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <VisibilityTwoToneIcon sx={sxIcon} />
                            <Typography sx={{ color: appColors.text.primary }}>32 views</Typography>
                        </Stack>
                    </Paper>
                    <Paper sx={{ ...sxPaper, cursor: "pointer" }} onClick={handleLikePost}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            {loadingPost ? (
                                <CircularProgress />
                            ) : props.post.likes.some((x) => x.toString() === props.session?.id) ? (
                                <FavoriteTwoToneIcon sx={{ ...sxIcon, fill: "greenyellow" }} />
                            ) : (
                                <FavoriteBorderTwoToneIcon sx={sxIcon} />
                            )}
                            {props.post.likes.length ? (
                                <Typography sx={{ color: appColors.text.primary }}>
                                    {`${props.post.likes.length} like${props.post.likes.length === 1 ? "" : "s"}`}
                                </Typography>
                            ) : null}
                        </Stack>
                    </Paper>
                    <Paper sx={{ ...sxPaper, cursor: "pointer" }} onClick={() => setOpen(true)}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <AddCommentTwoToneIcon sx={sxIcon} />
                            <Typography sx={{ color: appColors.text.primary }}>Comment</Typography>
                        </Stack>
                    </Paper>
                </Stack>
                <Stack spacing={4} mt={2}>
                    <Divider component="hr" sx={{ bgcolor: appColors.border }} />
                    {props.post.comments.sort(sortArrayByDate).map((comment, i) => (
                        <Fragment key={comment._id.toString()}>
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
                                        <Avatar src="" alt={comment.resident.name} sx={{ bgcolor: getFlatColor() }}>
                                            {comment.resident.flat}
                                        </Avatar>
                                        <Stack>
                                            <Typography
                                                noWrap
                                                sx={{
                                                    color: appColors.text.secondary,
                                                }}
                                            >
                                                {comment.resident.name}
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                noWrap
                                                sx={{
                                                    color: appColors.text.primary,
                                                }}
                                            >
                                                {fromNowDate(comment.date)}
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                </Paper>
                                <Stack>
                                    <Typography variant="h6">{comment.text}</Typography>
                                    <Stack direction="row" spacing={2} mt={2}>
                                        <IconButton
                                            onClick={() => handleLikeComment(comment?._id)}
                                            sx={{ border: `1px solid ${appColors.border}`, borderRadius: 2 }}
                                        >
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                {loadingComment ? (
                                                    <CircularProgress />
                                                ) : comment.likes.some((x) => x.toString() === props.session?.id) ? (
                                                    <FavoriteTwoToneIcon sx={{ ...sxIcon, fill: "greenyellow" }} />
                                                ) : (
                                                    <FavoriteBorderTwoToneIcon sx={sxIcon} />
                                                )}
                                                {comment.likes.length ? (
                                                    <Typography sx={{ color: appColors.text.primary }}>
                                                        {`${comment.likes.length} like${
                                                            comment.likes.length === 1 ? "" : "s"
                                                        }`}
                                                    </Typography>
                                                ) : null}
                                            </Stack>
                                        </IconButton>
                                        {comment.resident._id.toString() === props.session?.id ? (
                                            <IconButton
                                                onClick={() => handleDeleteComment(comment?._id)}
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
                            {i !== props.post.comments.length - 1 ? (
                                <Divider component="hr" sx={{ bgcolor: appColors.border }} />
                            ) : null}
                        </Fragment>
                    ))}
                </Stack>
            </Stack>
            <CommentForm
                open={open}
                mutate={props.mutate}
                type={props.post.type}
                postID={props.post._id}
                handleClose={() => setOpen(false)}
            />
        </>
    );
};
