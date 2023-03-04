import { handlePostLike } from "@/src/actions/post";
import { CommentForm } from "@/src/content/Modal";
import { E_AlertTypes } from "@/src/context";
import { E_PostType, I_Alerter, I_Likes, I_Mutator, I_NewCalSession, I_Views } from "@/src/interfaces";
import { appColors } from "@/src/utils";
import AddCommentTwoToneIcon from "@mui/icons-material/AddCommentTwoTone";
import FavoriteBorderTwoToneIcon from "@mui/icons-material/FavoriteBorderTwoTone";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import { CircularProgress, Paper, Stack, Typography } from "@mui/material";
import { Types } from "mongoose";
import { FunctionComponent, useState } from "react";

const sxPaper = {
    p: "12px 16px",
    width: "fit-content",
    textAlign: "center",
    bgcolor: appColors.card,
    borderRadius: "1rem",
    border: `1px solid ${appColors.border}`,
};

const sxIcon = {
    fill: appColors.text.primary,
};

interface PropTypes extends I_Likes, I_NewCalSession, I_Mutator, I_Alerter, I_Views {
    postID: Types.ObjectId;
    type: E_PostType;
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
    const adminLikes = props.likes?.filter((x) => x.user.role).map((x) => x.user.name);
    return (
        <Stack>
            <Stack direction="row" spacing={2} ml={6}>
                <Paper sx={{ ...sxPaper, cursor: "pointer" }} onClick={onLike}>
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
                </Paper>
                <Paper sx={{ ...sxPaper, cursor: "pointer" }} onClick={() => setOpen(true)}>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <AddCommentTwoToneIcon sx={sxIcon} />
                        <Typography sx={{ color: appColors.text.primary }}>Comment</Typography>
                    </Stack>
                </Paper>
                <Paper sx={sxPaper}>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <VisibilityTwoToneIcon sx={sxIcon} />
                        <Typography sx={{ color: appColors.text.primary }}>
                            {props.views.length || "No"} view{props.views.length === 1 ? null : "s"}
                        </Typography>
                    </Stack>
                </Paper>
                <CommentForm
                    open={open}
                    itemType="post"
                    itemID={props.postID}
                    mutate={props.mutate}
                    titleType={props.type}
                    handleClose={() => setOpen(false)}
                />
            </Stack>
            {adminLikes.length ? (
                <Typography ml={7} mt={3} mb={-3} sx={{ color: "greenyellow", opacity: 0.8 }}>
                    {`Liked by NewCal ${
                        adminLikes.length === 1
                            ? adminLikes[0]
                            : adminLikes.length === 2
                            ? adminLikes.join(" and ")
                            : `${adminLikes[0]}, ${adminLikes[1]} and ${adminLikes[2]}`
                    }`}
                </Typography>
            ) : null}
        </Stack>
    );
};
