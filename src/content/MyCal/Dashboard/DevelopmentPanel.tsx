import { Loading, PanelHeader, PanelSubtitle, PanelTitle } from "@/src/components";
import { appColors, Icon_Info, within24Hours } from "@/src/utils";
import { Paper, Stack, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";

export const DevelopmentPanel = (props) => {
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        fetch("https://api.github.com/repos/devArno88/newcal-issues/issues?state=open")
            .then((response) => response.json())
            .then((data) => {
                setIssues((x) => [...x, ...data]);
            });
        fetch("https://api.github.com/repos/devArno88/newcal-issues/issues?state=closed")
            .then((response) => response.json())
            .then((data) => {
                setIssues((x) => [...x, ...data]);
                setLoading(false);
            });
    }, [loading]);
    const PanelCard = ({ title, subtitle }) => {
        return (
            <Paper
                sx={{
                    mb: 1,
                    pt: 1,
                    pb: 1,
                    height: "fit-content",
                    bgcolor: "#22272D",
                    borderRadius: 2,
                    border: `1px solid ${appColors.border}`,
                }}
                elevation={5}
            >
                {loading ? (
                    <Loading />
                ) : (
                    <>
                        <PanelTitle text={title} />
                        <PanelSubtitle text={subtitle} />
                    </>
                )}
            </Paper>
        );
    };
    const open = issues?.filter((x) => x.state === "open").length;
    const closed = issues?.filter((x) => x.state === "closed").length;
    const recent = issues?.filter((x) => within24Hours(new Date(x.created_at))).length;
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
                <PanelHeader text="Development" />
            </Stack>
            <Stack spacing={0.5} sx={{ display: { xs: "block", sm: "none" } }}>
                <PanelHeader text="Development" />
                <PanelSubtitle text="Only viewable to NewCal Admins" />
            </Stack>
            <Stack mt={2}>
                <PanelCard title="Recent" subtitle={`${recent || "No"} ticket${recent === 1 ? "" : "s"}`} />
                <PanelCard title="Open" subtitle={`${open || "No"} ticket${open === 1 ? "" : "s"}`} />
                <PanelCard title="Closed" subtitle={`${closed || "No"} ticket${closed === 1 ? "" : "s"}`} />
            </Stack>
        </>
    );
};
