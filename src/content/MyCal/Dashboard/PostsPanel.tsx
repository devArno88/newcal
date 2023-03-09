import { PanelHeader, PanelSubtitle, PanelTitle } from "@/src/components";
import { E_PostType } from "@/src/interfaces/post";
import { appColors } from "@/src/utils";
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import NotificationsNoneTwoToneIcon from "@mui/icons-material/NotificationsNoneTwoTone";
import QuizTwoToneIcon from "@mui/icons-material/QuizTwoTone";
import { Paper, Stack } from "@mui/material";

const IconConfig = {
    [E_PostType.listing]: HomeTwoToneIcon,
    [E_PostType.notice]: NotificationsNoneTwoToneIcon,
    [E_PostType.question]: QuizTwoToneIcon,
};

export const PostsPanel = (props) => {
    const PanelCard = ({ type }: { type: E_PostType }) => {
        const Icon = IconConfig[type];
        const title = `${props.posts[type].total || "No"} ${type}${props.posts[type].total === 1 ? "" : "s"}`;
        const subtitle = `You have ${
            props.posts[type].own ? `posted ${props.posts[type].own} ` : "not posted any "
        } ${type}${props.posts[type].own === 1 ? "" : "s"}`;
        return (
            <Paper
                sx={{
                    mb: 1,
                    pt: 2,
                    pb: 2,
                    height: "fit-content",
                    bgcolor: appColors.panel,
                    borderRadius: 2,
                    border: `1px solid ${appColors.border}`,
                }}
                elevation={5}
            >
                <Icon sx={{ fill: appColors.secondary }} fontSize="large" />
                <PanelTitle text={title} />
                <PanelSubtitle text={subtitle} />
            </Paper>
        );
    };
    return (
        <>
            <PanelHeader text="Posts" />
            <Stack mt={2}>
                {[E_PostType.listing, E_PostType.notice, E_PostType.question].map((x) => (
                    <PanelCard key={x} type={x} />
                ))}
            </Stack>
        </>
    );
};
