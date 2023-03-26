import { PanelHeader, PanelSubtitle, PanelTitle } from "@/src/components";
import { I_Resident } from "@/src/interfaces";
import { appColors, Icon_Info, uniqueArray } from "@/src/utils";
import { Paper, Stack, Tooltip } from "@mui/material";

export const ResidentsPanel = ({ residents }: { residents: I_Resident[] }) => {
    const PanelCard = ({ title, subtitle }) => {
        return (
            <Paper
                sx={{
                    mb: 1,
                    py: 1,
                    borderRadius: 2,
                    bgcolor: "#22272D",
                    height: "fit-content",
                    border: `1px solid ${appColors.border}`,
                }}
                elevation={5}
            >
                <PanelTitle admin text={title} />
                <PanelSubtitle text={subtitle} />
            </Paper>
        );
    };
    const flats = uniqueArray(residents.map((x) => x.flat));
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
                <Tooltip title="Only viewable to NewCal Management">
                    <Icon_Info sx={{ fill: appColors.admin.secondary, position: "sticky", right: 20 }} />
                </Tooltip>
                <PanelHeader admin text="Residents" />
            </Stack>
            <Stack spacing={0.5} sx={{ display: { xs: "block", sm: "none" } }}>
                <PanelHeader admin text="Residents" />
                <PanelSubtitle text="Only viewable to NewCal Management" />
            </Stack>
            <Stack mt={2}>
                <PanelCard
                    title="Total"
                    subtitle={`${residents.length || "No"} resident${residents.length === 1 ? "" : "s"}`}
                />
                <PanelCard title="Flats" subtitle={`${flats.length || "No"} flat${flats.length === 1 ? "" : "s"}`} />
            </Stack>
        </>
    );
};
