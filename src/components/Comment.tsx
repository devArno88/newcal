import { I_Comment, I_NewCalSession } from "@/src/interfaces";
import { appColors, fromNowDate, Icon_Delete, Icon_LikeActive, Icon_LikeInactive } from "@/src/utils";
import { Avatar, CircularProgress, IconButton, Paper, Stack, SvgIconTypeMap, Typography } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { Types } from "mongoose";
import { FunctionComponent } from "react";

interface PropTypes extends I_Comment, I_NewCalSession {
    loading: boolean;
    adminLikes: string[];
    onLikeComment: (x: Types.ObjectId) => void;
    onDeleteComment: (x: Types.ObjectId) => void;
    Icon:
        | (OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
              muiName: string;
          })
        | null;
}

export const Comment: FunctionComponent<PropTypes> = (props) => {
    return (
        <Stack
            direction={{ xs: "column", sm: "row", md: "row" }}
            sx={{ px: 4 }}
            alignItems="flex-start"
            spacing={{ xs: 1, sm: 3, md: 3 }}
        >
            <Paper
                sx={{
                    p: { xs: "6px 12px", sm: "8px 12px", md: "10px 16px" },
                    borderRadius: "1rem",
                    bgcolor: appColors.card,
                    border: `1px solid ${appColors.border}`,
                }}
            >
                <Stack direction="row" alignItems="center" spacing={{ xs: 1, sm: 1, md: 1.5 }}>
                    <Avatar
                        src=""
                        alt={props.user.name}
                        sx={{
                            borderRadius: "0.4rem",
                            bgcolor: appColors.primary,
                            width: { xs: 34, sm: 34, md: 38 },
                            height: { xs: 34, sm: 34, md: 38 },
                            fontSize: { xs: "1rem", sm: "1.05rem", md: "1.1rem" },
                        }}
                    >
                        {props.Icon ? <props.Icon /> : props.user.flat || null}
                    </Avatar>
                    <Stack>
                        <Typography
                            noWrap
                            mb={-0.4}
                            sx={{ color: appColors.secondary }}
                            fontSize={{ xs: "0.9rem", sm: "1rem", md: "1.1rem" }}
                        >
                            {props.userType === "admin" ? "NewCal" : null} {props.user.name}
                        </Typography>
                        <Typography
                            variant="caption"
                            fontSize={{ xs: "0.7rem", sm: "0.75rem", md: "0.8rem" }}
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
            <Stack pl={{ xs: 1, sm: 0 }} pt={{ xs: 1, sm: 0 }}>
                <Typography variant="h6" fontSize={{ xs: "1rem", sm: "1.1rem", md: "1.2rem" }}>
                    {props.text}
                </Typography>
                {props.adminLikes.length ? (
                    <Typography mt={1} sx={{ color: appColors.secondary, opacity: 0.8 }}>
                        {`Liked by NewCal ${
                            props.adminLikes.length === 1
                                ? props.adminLikes[0]
                                : props.adminLikes.length === 2
                                ? props.adminLikes.join(" and ")
                                : `${props.adminLikes[0]}, ${props.adminLikes[1]} and ${props.adminLikes[2]}`
                        }`}
                    </Typography>
                ) : null}
                <Stack direction="row" spacing={2} mt={2}>
                    <IconButton
                        onClick={() => props.onLikeComment(props?._id)}
                        sx={{ border: `1px solid ${appColors.border}`, borderRadius: 2 }}
                    >
                        <Stack direction="row" spacing={1} alignItems="center">
                            {props.loading ? (
                                <CircularProgress sx={{ height: 28, width: 28 }} />
                            ) : props.likes.some((x) => x.user._id.toString() === props.session?.id) ? (
                                <Icon_LikeActive sx={{ fill: appColors.secondary }} />
                            ) : (
                                <Icon_LikeInactive sx={{ fill: appColors.text.primary }} />
                            )}
                            {props.loading ? null : props.likes.length ? (
                                <Typography
                                    sx={{
                                        color: appColors.text.primary,
                                        display: { xs: "none", sm: "none", md: "flex" },
                                    }}
                                >
                                    {`${props.likes.length} like${props.likes.length === 1 ? "" : "s"}`}
                                </Typography>
                            ) : null}
                            {props.loading ? null : props.likes.length ? (
                                <Typography
                                    sx={{
                                        color: appColors.text.primary,
                                        display: { xs: "flex", sm: "flex", md: "none" },
                                    }}
                                >
                                    {props.likes.length}
                                </Typography>
                            ) : null}
                        </Stack>
                    </IconButton>
                    {props.user._id.toString() === props.session?.id ? (
                        <IconButton
                            onClick={() => props.onDeleteComment(props?._id)}
                            sx={{ border: `1px solid ${appColors.border}`, borderRadius: 2 }}
                        >
                            <Stack direction="row" spacing={1} alignItems="center">
                                <Icon_Delete sx={{ fill: appColors.text.primary }} />
                            </Stack>
                        </IconButton>
                    ) : null}
                </Stack>
            </Stack>
        </Stack>
    );
};
