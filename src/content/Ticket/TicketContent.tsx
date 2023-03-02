import { E_TicketType } from "@/src/interfaces";
import { appColors } from "@/src/utils";
import AutoAwesomeTwoToneIcon from "@mui/icons-material/AutoAwesomeTwoTone";
import InfoTwoToneIcon from "@mui/icons-material/InfoTwoTone";
import QuizTwoToneIcon from "@mui/icons-material/QuizTwoTone";
import ReportProblemTwoToneIcon from "@mui/icons-material/ReportProblemTwoTone";
import { Stack, Typography } from "@mui/material";
import { FunctionComponent } from "react";

interface PropTypes {
    type: E_TicketType;
    title: string;
    content: string;
}

export const TicketContent: FunctionComponent<PropTypes> = (props) => {
    return (
        <Stack spacing={2} mt={4}>
            <Stack direction="row" spacing={2} alignItems="flex-start">
                {props.type === E_TicketType.enhancement ? (
                    <AutoAwesomeTwoToneIcon sx={{ fill: "greenyellow" }} fontSize="large" />
                ) : null}
                {props.type === E_TicketType.question ? (
                    <QuizTwoToneIcon sx={{ fill: "greenyellow" }} fontSize="large" />
                ) : null}
                {props.type === E_TicketType.issue ? (
                    <ReportProblemTwoToneIcon sx={{ fill: "greenyellow" }} fontSize="large" />
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
