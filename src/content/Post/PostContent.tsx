import { E_PostType } from "@/src/interfaces";
import { appColors } from "@/src/utils";
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import InfoTwoToneIcon from "@mui/icons-material/InfoTwoTone";
import NotificationsNoneTwoToneIcon from "@mui/icons-material/NotificationsNoneTwoTone";
import QuizTwoToneIcon from "@mui/icons-material/QuizTwoTone";
import { Stack, Typography } from "@mui/material";
import { FunctionComponent } from "react";

interface PropTypes {
    type: E_PostType;
    title: string;
    content: string;
}

export const PostContent: FunctionComponent<PropTypes> = (props) => {
    return (
        <Stack spacing={2} mt={4}>
            <Stack direction="row" spacing={2} alignItems="flex-start">
                {props.type === E_PostType.listing ? (
                    <HomeTwoToneIcon sx={{ fill: "greenyellow" }} fontSize="large" />
                ) : null}
                {props.type === E_PostType.question ? (
                    <QuizTwoToneIcon sx={{ fill: "greenyellow" }} fontSize="large" />
                ) : null}
                {props.type === E_PostType.notice ? (
                    <NotificationsNoneTwoToneIcon sx={{ fill: "greenyellow" }} fontSize="large" />
                ) : null}
                <Typography variant="h5" sx={{ color: appColors.text.secondary }}>
                    {props.title}
                </Typography>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="flex-start">
                <InfoTwoToneIcon sx={{ fill: "greenyellow" }} fontSize="large" />
                <Typography variant="h6" sx={{ color: appColors.text.primary }}>
                    {props.content}
                </Typography>
            </Stack>
        </Stack>
    );
};
