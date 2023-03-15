import { E_PostType } from "@/src/interfaces";
import { appColors, Icon_Info, Icon_Listing, Icon_Notice, Icon_Question, Icon_Warning } from "@/src/utils";
import { Stack, Typography } from "@mui/material";
import { FunctionComponent } from "react";

interface PropTypes {
    type: E_PostType;
    title: string;
    content: string;
}

export const PostPageContent: FunctionComponent<PropTypes> = (props) => {
    return (
        <Stack spacing={2} mt={4} mr={{ xs: 5, sm: 4, md: 0 }}>
            <Stack direction="row" spacing={2} alignItems="flex-start">
                {props.type === E_PostType.listing ? (
                    <Icon_Listing sx={{ fill: appColors.secondary }} fontSize="large" />
                ) : null}
                {props.type === E_PostType.question ? (
                    <Icon_Question sx={{ fill: appColors.secondary }} fontSize="large" />
                ) : null}
                {props.type === E_PostType.notice ? (
                    <Icon_Notice sx={{ fill: appColors.secondary }} fontSize="large" />
                ) : null}
                {props.type === E_PostType.warning ? <Icon_Warning sx={{ fill: "salmon" }} fontSize="large" /> : null}
                <Typography
                    variant="h5"
                    sx={{ color: appColors.text.secondary, fontSize: { xs: "1.4rem", sm: "1.5rem", md: "1.6rem" } }}
                >
                    {props.title}
                </Typography>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="flex-start">
                <Icon_Info
                    sx={{ fill: props.type === E_PostType.warning ? "salmon" : appColors.secondary }}
                    fontSize="large"
                />
                <Typography
                    variant="h6"
                    sx={{ color: appColors.text.primary, fontSize: { xs: "1.1rem", sm: "1.2rem", md: "1.3rem" } }}
                >
                    {props.content}
                </Typography>
            </Stack>
        </Stack>
    );
};
