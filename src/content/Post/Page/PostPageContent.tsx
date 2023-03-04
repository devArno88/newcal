import { E_PostType } from "@/src/interfaces";
import { appColors, Icon_Info, Icon_Listing, Icon_Notice, Icon_Question } from "@/src/utils";
import { Stack, Typography } from "@mui/material";
import { FunctionComponent } from "react";

interface PropTypes {
    type: E_PostType;
    title: string;
    content: string;
}

export const PostPageContent: FunctionComponent<PropTypes> = (props) => {
    return (
        <Stack spacing={2} mt={4}>
            <Stack direction="row" spacing={2} alignItems="flex-start">
                {props.type === E_PostType.listing ? (
                    <Icon_Listing sx={{ fill: "greenyellow" }} fontSize="large" />
                ) : null}
                {props.type === E_PostType.question ? (
                    <Icon_Question sx={{ fill: "greenyellow" }} fontSize="large" />
                ) : null}
                {props.type === E_PostType.notice ? (
                    <Icon_Notice sx={{ fill: "greenyellow" }} fontSize="large" />
                ) : null}
                <Typography variant="h5" sx={{ color: appColors.text.secondary }}>
                    {props.title}
                </Typography>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="flex-start">
                <Icon_Info sx={{ fill: "greenyellow" }} fontSize="large" />
                <Typography variant="h6" sx={{ color: appColors.text.primary }}>
                    {props.content}
                </Typography>
            </Stack>
        </Stack>
    );
};