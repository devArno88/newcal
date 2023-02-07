import { E_TicketType } from "@/src/interfaces";
import { appColors, capitalise } from "@/src/utils";
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
                <Typography sx={{ color: "greenyellow" }}>Yours: {props.tickets[type].own}</Typography>
                <Typography variant="caption" sx={{ color: "gray" }}>
                    Total: {props.tickets[type].total}
                </Typography>
            </Paper>
        );
    };

    return (
        <>
            <Typography variant="h5">Tickets</Typography>
            <Stack mt={2}>
                <PanelCard type={E_TicketType.enhancement} />
                <PanelCard type={E_TicketType.issue} />
                <PanelCard type={E_TicketType.question} />
            </Stack>
        </>
    );
};
