import { PanelHeader, PanelSubtitle, PanelTitle } from "@/src/components";
import { I_Enquiry } from "@/src/interfaces";
import { appColors, Icon_Info, within24Hours } from "@/src/utils";
import { Paper, Stack, Tooltip } from "@mui/material";

export const EnquiriesPanel = ({ enquiries }: { enquiries: I_Enquiry[] }) => {
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
    const open = enquiries?.filter((x) => x.open).length;
    const closed = enquiries?.filter((x) => !x.open).length;
    const recent = enquiries?.filter((x) => within24Hours(new Date(x.date))).length;
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
                <Tooltip title="Only viewable to NewCal Management">
                    <Icon_Info sx={{ fill: appColors.admin.secondary, position: "sticky", right: 20 }} />
                </Tooltip>
                <PanelHeader admin text="Enquiries" />
            </Stack>
            <Stack spacing={0.5} sx={{ display: { xs: "block", sm: "none" } }}>
                <PanelHeader admin text="Enquiries" />
                <PanelSubtitle text="Only viewable to NewCal Management" />
            </Stack>
            <Stack mt={2}>
                <PanelCard title="Recent" subtitle={`${recent || "No"} enquir${recent === 1 ? "y" : "ies"}`} />
                <PanelCard title="Status" subtitle={`${open} open - ${closed} closed`} />
            </Stack>
        </>
    );
};
