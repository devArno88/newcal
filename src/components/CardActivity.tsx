import { CardActions, Stack, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import { I_Comments, I_Likes, I_Views } from "../interfaces";
// import CardMedia from "@mui/material/CardMedia";
import { appColors, Icon_Comment, Icon_Like, Icon_View } from "@/src/utils";

interface PropTypes extends I_Likes, I_Comments, I_Views {
    center?: boolean;
}

export const CardActivity: FunctionComponent<PropTypes> = (props) => {
    return (
        <>
            {props.likes.length || props.comments.length || props.views.length ? (
                <CardActions sx={{ justifyContent: props.center ? "center" : "end", pr: 3 }}>
                    <Stack direction="row" spacing={3}>
                        {props.likes.length ? (
                            <Stack direction="row" spacing={1}>
                                <Icon_Like sx={{ fill: "lightpink", opacity: 0.85 }} />
                                <Typography variant="body1" sx={{ color: appColors.text.primary }}>
                                    {props.likes.length}
                                </Typography>
                            </Stack>
                        ) : null}
                        {props.comments.length ? (
                            <Stack direction="row" spacing={1}>
                                <Icon_Comment sx={{ fill: "yellow", opacity: 0.75 }} />
                                <Typography variant="body1" sx={{ color: appColors.text.primary }}>
                                    {props.comments.length}
                                </Typography>
                            </Stack>
                        ) : null}
                        {props.views.length ? (
                            <Stack direction="row" spacing={1}>
                                <Icon_View sx={{ fill: "cyan", opacity: 0.7 }} />
                                <Typography variant="body1" sx={{ color: appColors.text.primary }}>
                                    {props.views.length}
                                </Typography>
                            </Stack>
                        ) : null}
                    </Stack>
                </CardActions>
            ) : null}
        </>
    );
};
