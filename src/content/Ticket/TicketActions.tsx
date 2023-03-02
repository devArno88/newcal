import { handleTicketLike } from "@/src/actions/ticket";
import { E_AlertTypes } from "@/src/context";
import { E_TicketType, I_Alerter, I_Likes, I_Mutator, I_NewCalSession } from "@/src/interfaces";
import { appColors } from "@/src/utils";
import AddCommentTwoToneIcon from "@mui/icons-material/AddCommentTwoTone";
import FavoriteBorderTwoToneIcon from "@mui/icons-material/FavoriteBorderTwoTone";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import { CircularProgress, Paper, Stack, Typography } from "@mui/material";
import { Types } from "mongoose";
import { FunctionComponent, useState } from "react";
import { CommentForm } from "../Modal";

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

interface PropTypes extends I_Likes, I_NewCalSession, I_Mutator, I_Alerter {
    ticketID: Types.ObjectId;
    type: E_TicketType;
}

export const TicketActions: FunctionComponent<PropTypes> = (props) => {
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const onLike = async () => {
        setLoading(true);
        const res = await handleTicketLike({ ticketID: props.ticketID });
        if (res) {
            setLoading(false);
            if (res?.err)
                props.setAlert({ type: E_AlertTypes.error, text: "Something went wrong, please try again later" });
            if (res?.msg) props.mutate();
        }
    };
    return (
        <Stack direction="row" spacing={2}>
            <Paper sx={sxPaper}>
                <Stack direction="row" spacing={1} alignItems="center">
                    <VisibilityTwoToneIcon sx={sxIcon} />
                    <Typography sx={{ color: appColors.text.primary }}>32 views</Typography>
                </Stack>
            </Paper>
            <Paper sx={{ ...sxPaper, cursor: "pointer" }} onClick={onLike}>
                <Stack direction="row" spacing={1} alignItems="center">
                    {loading ? (
                        <CircularProgress size="small" />
                    ) : props.likes.some((x) => x.toString() === props.session?.id) ? (
                        <FavoriteTwoToneIcon sx={{ ...sxIcon, fill: "greenyellow" }} />
                    ) : (
                        <FavoriteBorderTwoToneIcon sx={sxIcon} />
                    )}
                    {props.likes.length ? (
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
            <CommentForm
                open={open}
                itemType="ticket"
                mutate={props.mutate}
                titleType={props.type}
                itemID={props.ticketID}
                handleClose={() => setOpen(false)}
            />
        </Stack>
    );
};
