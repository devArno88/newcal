import { appColors, fromNowDate, niceDate } from "@/src/utils";
import { Chip, Paper, Stack, Typography } from "@mui/material";
import { FunctionComponent } from "react";

interface PropTypes {
    number: number;
    title: string;
    state: string;
    body: string;
    created_at: Date;
    updated_at: Date;
    labels: any;
}

export const DevelopmentTicket: FunctionComponent<PropTypes> = (props) => {
    const { number, title, state, body, created_at, updated_at, labels } = props;
    return (
        <Paper sx={{ bgcolor: appColors.card, p: 4, border: `2px solid ${appColors.border}`, borderRadius: "1rem" }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography
                    fontSize={{ xs: 20, sm: 22, md: 24 }}
                    sx={{ color: appColors.admin.secondary }}
                    variant="h5"
                    noWrap
                >
                    {`#${number}: ${title}`}
                </Typography>
                <Chip
                    label={state.toUpperCase()}
                    sx={{ width: "fit-content" }}
                    color={state === "closed" ? "success" : "warning"}
                    style={{ border: `2px solid ${appColors.text.primary}`, borderRadius: "1rem" }}
                />
            </Stack>
            <Typography variant="h6" sx={{ color: appColors.text.secondary, fontSize: { xs: 18, sm: 20, md: 22 } }}>
                <p
                    dangerouslySetInnerHTML={{
                        __html: body.replaceAll("\r\n", "<br/>"),
                    }}
                />
            </Typography>
            <Stack spacing={2}>
                {labels.length ? (
                    <Stack spacing={1}>
                        {labels.map((l) => (
                            <Chip
                                key={l.id}
                                label={`#${l.name}`}
                                sx={{
                                    width: "fit-content",
                                    color: appColors.text.secondary,
                                    border: `1px solid ${appColors.admin.secondary}`,
                                }}
                            />
                        ))}
                    </Stack>
                ) : null}
                <Typography fontSize={{ xs: 16, sm: 18, md: 20 }} sx={{ color: appColors.admin.secondary }}>
                    <i>Created {niceDate(created_at)}</i>
                </Typography>
                <Typography fontSize={{ xs: 16, sm: 18, md: 20 }} sx={{ color: appColors.admin.secondary }}>
                    <i>Last updated {fromNowDate(updated_at)}</i>
                </Typography>
            </Stack>
        </Paper>
    );
};
