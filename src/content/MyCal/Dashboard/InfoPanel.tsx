import { PanelHeader, PanelSubtitle, PanelTitle } from "@/src/components";
import { appColors, fromNowDate, Icon_Email, Icon_Mailboard, Icon_User } from "@/src/utils";
import { Paper, Stack } from "@mui/material";

export const InfoPanel = (props) => {
    const PanelCard = ({
        title,
        subtitle,
        Icon,
        greenBorder = false,
    }: {
        title: string;
        subtitle: string;
        Icon: any;
        greenBorder?: boolean;
    }) => {
        return (
            <Paper
                elevation={5}
                sx={{
                    mb: 1,
                    py: 1,
                    borderRadius: 2,
                    height: "fit-content",
                    bgcolor: appColors.panel,
                    border: `1px solid ${greenBorder ? "lightseagreen" : appColors.border}`,
                }}
            >
                <Icon sx={{ fill: appColors.primary }} fontSize="large" />
                <PanelTitle text={title} />
                <PanelSubtitle text={subtitle} />
            </Paper>
        );
    };
    const mailToCollect = props?.mailbox?.items !== 0;
    const lastUpdated = `updated ${fromNowDate(props?.mailbox?.updated)}`;
    const itemsToCollect = `${props.mailbox.items || "No"} item${props.mailbox.items === 1 ? "" : "s"} to collect`;
    return (
        <>
            <PanelHeader text="Info" />
            <Stack mt={2}>
                <PanelCard
                    Icon={Icon_User}
                    title="Resident"
                    subtitle={`${props.session.name} (Flat ${props.session.flat})`}
                />
                <PanelCard Icon={Icon_Email} title="Contact" subtitle={props.session.email} />
                <PanelCard
                    title="Mailbox"
                    Icon={Icon_Mailboard}
                    greenBorder={mailToCollect}
                    subtitle={`${itemsToCollect} (${lastUpdated})`}
                />
            </Stack>
        </>
    );
};
