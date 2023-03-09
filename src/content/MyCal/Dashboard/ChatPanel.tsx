import { PanelHeader, PanelSubtitle, PanelTitle } from "@/src/components";
import { abbreviate, appColors, capitalise, Icon_Info, within24Hours } from "@/src/utils";
import { Paper, Stack, Tooltip } from "@mui/material";

export const ChatPanel = ({ chat }) => {
    const PanelCard = ({ title, subtitle }) => {
        return (
            <Paper
                elevation={5}
                sx={{
                    mb: 1,
                    pt: 1,
                    pb: 1,
                    borderRadius: 2,
                    height: "fit-content",
                    bgcolor: appColors.panel,
                    border: `1px solid ${appColors.border}`,
                }}
            >
                <PanelTitle text={title} />
                <PanelSubtitle text={subtitle} />
            </Paper>
        );
    };
    return (
        <>
            <Stack
                sx={{ display: { xs: "none", sm: "flex" } }}
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={1.5}
                ml={-2}
            >
                <Tooltip title="You can view this because you are a NewCal Admin">
                    <Icon_Info sx={{ fill: appColors.secondary, position: "sticky", right: 20 }} />
                </Tooltip>
                <PanelHeader text="Admin Chat" />
            </Stack>

            <Stack spacing={0.5} sx={{ display: { xs: "block", sm: "none" } }}>
                <PanelHeader text="Admin Chat" />
                <PanelSubtitle text="Only viewable to NewCal Admins" />
            </Stack>

            <Stack mt={2}>
                <PanelCard title="History" subtitle={`${chat?.messages?.length} messages`} />
                <PanelCard
                    title="Recent"
                    subtitle={`${chat?.messages?.filter((x) => within24Hours(new Date(x.date))).length} messages`}
                />
                <PanelCard
                    title="Latest"
                    subtitle={
                        <>
                            {capitalise(chat?.messages[0].user.role)}: <i>"{abbreviate(chat?.messages[0].text, 20)}"</i>
                        </>
                    }
                />
            </Stack>
        </>
    );
};
