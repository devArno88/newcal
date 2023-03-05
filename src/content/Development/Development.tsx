import { PageHeader } from "@/src/components";
import { appColors, fromNowDate, niceDate } from "@/src/utils";
import { Chip, Paper, Stack, Typography } from "@mui/material";
import { FunctionComponent } from "react";

interface PropTypes {
    issues: any[];
}

export const Development: FunctionComponent<PropTypes> = (props) => {
    return (
        <Stack spacing={4}>
            <PageHeader title="NewCal Issues" subtitle="App Development Backlog" />
            <Stack spacing={4}>
                {props.issues &&
                    props.issues?.map((x) => (
                        <Paper
                            key={x.id}
                            sx={{ bgcolor: appColors.card, p: 4, border: `1px solid ${appColors.border}` }}
                        >
                            <Stack spacing={2}>
                                <Stack direction="row" justifyContent="space-between">
                                    <Typography sx={{ color: "greenyellow" }} variant="h5">
                                        {x.title}
                                    </Typography>
                                    <Chip
                                        color={x.state === "closed" ? "success" : "warning"}
                                        sx={{ width: "fit-content" }}
                                        label={x.state.toUpperCase()}
                                    />
                                </Stack>

                                <Typography variant="h6" sx={{ color: appColors.text.primary }}>
                                    <p
                                        dangerouslySetInnerHTML={{
                                            __html: x.body.replaceAll("\r\n", "<br/>"),
                                        }}
                                    />
                                </Typography>
                                <Typography sx={{ color: "darkgrey" }}>
                                    <i>Created {niceDate(x.created_at)}</i>
                                </Typography>
                                <Typography sx={{ color: "darkgrey" }}>
                                    <i>Last updated {fromNowDate(x.updated_at)}</i>
                                </Typography>
                                <Stack direction="row" spacing={2}>
                                    {x.labels.map((l) => (
                                        <Chip
                                            key={l.id}
                                            label={`#${l.name}`}
                                            sx={{
                                                color: appColors.text.secondary,
                                                border: `1px solid greenyellow`,
                                            }}
                                        />
                                    ))}
                                </Stack>
                            </Stack>
                        </Paper>
                    ))}
            </Stack>
        </Stack>
    );
};
