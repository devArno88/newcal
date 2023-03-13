import { I_Enquiry } from "@/src/interfaces";
import { appColors } from "@/src/utils";
import { Paper } from "@mui/material";
import { FunctionComponent } from "react";

interface PropTypes extends I_Enquiry {}

export const Enquiry: FunctionComponent<PropTypes> = (props) => {
    const { name, email, phone, message, date } = props;
    return (
        <Paper sx={{ bgcolor: appColors.card, p: 4, border: `2px solid ${appColors.border}`, borderRadius: "1rem" }}>
            {/* <Stack direction="row" justifyContent="space-between">
                <Typography sx={{ color: appColors.secondary }} variant="h5" noWrap>
                    {`#${number}: ${title}`}
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
                    // style={{ marginBottom: -3 }}
                />
            </Typography>
            <Stack spacing={2}>
                {labels.length ? (
                    <Stack direction="row" spacing={2}>
                        {labels.map((l) => (
                            <Chip
                                key={l.id}
                                label={`#${l.name}`}
                                sx={{
                                    color: appColors.text.secondary,
                                    border: `1px solid ${appColors.primary}`,
                                }}
                            />
                        ))}
                    </Stack>
                ) : null}
                <Typography sx={{ color: appColors.secondary }}>
                    <i>Created {niceDate(created_at)}</i>
                </Typography>
                <Typography sx={{ color: appColors.secondary }}>
                    <i>Last updated {fromNowDate(updated_at)}</i>
                </Typography>
            </Stack> */}
        </Paper>
    );
};
