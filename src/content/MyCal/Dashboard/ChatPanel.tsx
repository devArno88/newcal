import { PanelHeader, PanelSubtitle, PanelTitle } from "@/src/components";
import { abbreviate, AdminIcons, appColors, Icon_Info, within24Hours } from "@/src/utils";
import { Paper, Stack, Tooltip } from "@mui/material";

const PanelCard = ({ title, subtitle, Icon }: { title: string; subtitle: string | JSX.Element; Icon?: any }) => {
    return (
        <Paper
            elevation={5}
            sx={{
                mb: 1,
                py: 1,
                borderRadius: 2,
                height: "fit-content",
                bgcolor: appColors.panel,
                border: `1px solid ${appColors.border}`,
            }}
        >
            <PanelTitle admin text={title} />
            {Icon ? (
                <Stack spacing={1} justifyContent="center" alignItems="center" direction="row">
                    <Icon sx={{ fill: appColors.text.secondary }} />
                    <PanelSubtitle text={subtitle} />
                </Stack>
            ) : (
                <PanelSubtitle text={subtitle} />
            )}
        </Paper>
    );
};

export const ChatPanel = ({ chat }) => {
    const firstMessage = chat?.messages[0];
    const Icon = AdminIcons[firstMessage?.user.role];
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
                <Tooltip title="Only viewable to NewCal Admins">
                    <Icon_Info sx={{ fill: appColors.admin.secondary, position: "sticky", right: 20 }} />
                </Tooltip>
                <PanelHeader admin text="Admin Chat" />
            </Stack>

            <Stack spacing={0.5} sx={{ display: { xs: "block", sm: "none" } }}>
                <PanelHeader admin text="Admin Chat" />
                <PanelSubtitle text="Only viewable to NewCal Admins" />
            </Stack>

            <Stack mt={2}>
                {/* <PanelCard title="History" subtitle={`${chat?.messages?.length} messages`} /> */}
                <PanelCard
                    title="Recent"
                    subtitle={`${chat?.messages?.filter((x) => within24Hours(new Date(x.date))).length} messages`}
                />
                {Icon && firstMessage ? (
                    <PanelCard title="Latest" Icon={Icon} subtitle={<i>{abbreviate(chat?.messages[0].text, 28)}</i>} />
                ) : null}
            </Stack>
        </>
    );
};
