import { E_TicketType } from "@/src/interfaces";
import { appColors } from "@/src/utils";
import AutoAwesomeTwoToneIcon from "@mui/icons-material/AutoAwesomeTwoTone";
import QuizTwoToneIcon from "@mui/icons-material/QuizTwoTone";
import ReportProblemTwoToneIcon from "@mui/icons-material/ReportProblemTwoTone";
import { Paper, Stack, Typography } from "@mui/material";

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
                <Icon sx={{ fill: appColors.text.primary, mr: 1 }} fontSize="large" />
                <Typography sx={{ color: "greenyellow" }}>
                    {props.tickets[type].total || "No"} {type}
                    {props.tickets[type].total !== 1 ? "s" : null}
                </Typography>
                <Typography variant="caption" sx={{ color: "gray" }}>
                    You have {props.tickets[type].own ? `${action} ${props.tickets[type].own} ` : `not ${action} any `}
                    {type}
                    {props.tickets[type].total !== 1 ? "s" : null}
                </Typography>
            </Paper>
        );
    };

    return (
        <>
            <Typography variant="h5">Tickets</Typography>
            <Stack mt={2}>
                {Object.values(E_TicketType).map((x) => (
                    <PanelCard key={x} type={x} />
                ))}
            </Stack>
        </>
    );
};
