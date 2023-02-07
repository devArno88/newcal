import { E_PostType } from "@/src/interfaces/activity";
import { appColors, capitalise } from "@/src/utils";
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import NotificationsNoneTwoToneIcon from "@mui/icons-material/NotificationsNoneTwoTone";
import QuizTwoToneIcon from "@mui/icons-material/QuizTwoTone";
import { Paper, Stack, Typography } from "@mui/material";

const IconConfig = {
    [E_PostType.listing]: HomeTwoToneIcon,
    [E_PostType.notice]: NotificationsNoneTwoToneIcon,
    [E_PostType.question]: QuizTwoToneIcon,
};

export const PostsPanel = (props) => {
    const PanelCard = ({ type }: { type: E_PostType }) => {
        const Icon = IconConfig[type];
        return (
            <Paper
                sx={{
                    mb: 1,
                    pt: 1,
                    pb: 1,
                    cursor: "pointer",
                    height: "fit-content",
                    bgcolor: "#22272D",
                    borderRadius: 2,
                }}
                elevation={5}
            >
                <Stack direction="row" justifyContent="center" alignItems="center">
                    <Icon sx={{ fill: appColors.text.primary, mr: 1 }} />
                    <Typography variant="h6" sx={{ color: appColors.text.primary }}>
                        {capitalise(type)}s
                    </Typography>
                </Stack>
                <Typography sx={{ color: "greenyellow" }}>Yours: {props.posts[type].own}</Typography>
                <Typography variant="caption" sx={{ color: "gray" }}>
                    Total: {props.posts[type].total}
                </Typography>
            </Paper>
        );
    };
    return (
        <>
            <Typography variant="h5">Posts</Typography>
            <Stack mt={2}>
                <PanelCard type={E_PostType.notice} />
                <PanelCard type={E_PostType.listing} />
                <PanelCard type={E_PostType.question} />
            </Stack>
        </>
    );
};
