import { appColors, fromNowDate, niceDate } from "@/src/utils";
import { Chip, Paper, Stack, Typography } from "@mui/material";
import { FunctionComponent } from "react";

interface PropTypes {
    title: string;
    state: string;
    body: string;
    created_at: Date;
    updated_at: Date;
    labels: any;
}

export const DevelopmentTicket: FunctionComponent<PropTypes> = (props) => {
    const { title, state, body, created_at, updated_at, labels } = props;
    return (
        <Paper sx={{ bgcolor: appColors.card, p: 4, border: `1px solid ${appColors.border}` }}>
            <Stack spacing={2}>
                <Stack direction="row" justifyContent="space-between">
                    <Typography sx={{ color: "greenyellow" }} variant="h5">
                        {title}
                    </Typography>
                    <Chip
                        label={state.toUpperCase()}
                        sx={{ width: "fit-content" }}
                        color={state === "closed" ? "success" : "warning"}
                        style={{ border: `2px solid ${appColors.text.primary}`, borderRadius: "1rem" }}
                    />
                </Stack>
                <Typography variant="h6" sx={{ color: appColors.text.primary }}>
                    <p
                        dangerouslySetInnerHTML={{
                            __html: body.replaceAll("\r\n", "<br/>"),
                        }}
                    />
                </Typography>
                <Typography sx={{ color: "darkgrey" }}>
                    <i>Created {niceDate(created_at)}</i>
                </Typography>
                <Typography sx={{ color: "darkgrey" }}>
                    <i>Last updated {fromNowDate(updated_at)}</i>
                </Typography>
                <Stack direction="row" spacing={2}>
                    {labels.map((l) => (
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
    );
};
