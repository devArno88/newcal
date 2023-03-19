import { PanelHeader, PanelSubtitle, PanelTitle } from "@/src/components";
import { I_Resident } from "@/src/interfaces";
import { appColors, Icon_Info } from "@/src/utils";
import { Paper, Stack, Tooltip } from "@mui/material";

export const ResidentsPanel = ({ residents }: { residents: I_Resident[] }) => {
    const PanelCard = ({ title, subtitle }) => {
        return (
            <Paper
                sx={{
                    mb: 1,
                    pt: 1,
                    pb: 1,
                    borderRadius: 2,
                    bgcolor: "#22272D",
                    height: "fit-content",
                    border: `1px solid ${appColors.border}`,
                }}
                elevation={5}
            >
                <PanelTitle text={title} />
                <PanelSubtitle text={subtitle} />
            </Paper>
        );
    };
    // const open = residents?.filter((x) => x.open).length;
    // const closed = residents?.filter((x) => !x.open).length;
    // const recent = residents?.filter((x) => within24Hours(new Date(x.date))).length;
    return (
        <>
            <Stack
                ml={-2}
                spacing={1.5}
                direction="row"
                alignItems="center"
                justifyContent="center"
                sx={{ display: { xs: "none", sm: "flex" } }}
            >
                <Tooltip title="You can view this because you are NewCal Management">
                    <Icon_Info sx={{ fill: appColors.secondary, position: "sticky", right: 20 }} />
                </Tooltip>
                <PanelHeader text="Residents" />
            </Stack>
            <Stack spacing={0.5} sx={{ display: { xs: "block", sm: "none" } }}>
                <PanelHeader text="Residents" />
                <PanelSubtitle text="Only viewable to NewCal Management" />
            </Stack>
            <Stack mt={2}>
                {/* <PanelCard title="Recent" subtitle={`${recent || "No"} enquir${recent === 1 ? "y" : "ies"}`} />
                <PanelCard title="Open" subtitle={`${open || "No"} enquir${open === 1 ? "y" : "ies"}`} />
                <PanelCard title="Closed" subtitle={`${closed || "No"} enquir${closed === 1 ? "y" : "ies"}`} /> */}
            </Stack>
        </>
    );
};
