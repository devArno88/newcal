import { E_TicketType } from "@/src/interfaces";
import { appColors, Icon_Enhancement, Icon_Issue, Icon_Question } from "@/src/utils";
import { Stack, Typography } from "@mui/material";
import { FunctionComponent } from "react";

interface PropTypes {
    type: E_TicketType;
    title: string;
    content: string;
}

export const TicketPageContent: FunctionComponent<PropTypes> = (props) => {
    return (
        <Stack spacing={2} mt={4}>
            <Stack direction="row" spacing={2} alignItems="flex-start">
                {props.type === E_TicketType.enhancement ? (
                    <Icon_Enhancement sx={{ fill: appColors.secondary }} fontSize="large" />
                ) : null}
                {props.type === E_TicketType.question ? (
                    <Icon_Question sx={{ fill: appColors.secondary }} fontSize="large" />
                ) : null}
                {props.type === E_TicketType.issue ? (
                    <Icon_Issue sx={{ fill: appColors.secondary }} fontSize="large" />
                ) : null}
                <Typography variant="h5" sx={{ color: appColors.text.secondary }}>
                    {props.title}
                </Typography>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="flex-start">
                <Icon_Issue sx={{ fill: appColors.secondary }} fontSize="large" />
                <Typography variant="h6" sx={{ color: appColors.text.primary }}>
                    {props.content}
                </Typography>
            </Stack>
        </Stack>
    );
};
