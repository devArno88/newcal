import { PanelHeader, PanelSubtitle, PanelTitle } from "@/src/components";
import { E_TicketType } from "@/src/interfaces";
import { appColors } from "@/src/utils";
import AutoAwesomeTwoToneIcon from "@mui/icons-material/AutoAwesomeTwoTone";
import QuizTwoToneIcon from "@mui/icons-material/QuizTwoTone";
import ReportProblemTwoToneIcon from "@mui/icons-material/ReportProblemTwoTone";
import { Paper, Stack } from "@mui/material";

const IconConfig = {
    [E_TicketType.enhancement]: AutoAwesomeTwoToneIcon,
    [E_TicketType.issue]: ReportProblemTwoToneIcon,
    [E_TicketType.question]: QuizTwoToneIcon,
};

export const TicketsPanel = (props) => {
    const PanelCard = ({ type }: { type: E_TicketType }) => {
        const Icon = IconConfig[type];
        const strings = {
            [E_TicketType.enhancement]: "suggested",
            [E_TicketType.issue]: "reported",
            [E_TicketType.question]: "asked",
        };
        const action = strings[type];
        const title = `${props.tickets[type].total || "No"} ${type}${props.tickets[type].total === 1 ? "" : "s"}`;
        const subtitle = `You have ${
            props.tickets[type].own ? `${action} ${props.tickets[type].own} ` : `not ${action} any `
        }${type}${props.tickets[type].own === 1 ? "" : "s"}`;
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
                <Icon sx={{ fill: appColors.primary }} fontSize="large" />
                <PanelTitle text={title} />
                <PanelSubtitle text={subtitle} />
            </Paper>
        );
    };
    return (
        <>
            <PanelHeader text="Tickets" />
            <Stack mt={2}>
                {Object.values(E_TicketType).map((x) => (
                    <PanelCard key={x} type={x} />
                ))}
            </Stack>
        </>
    );
};
