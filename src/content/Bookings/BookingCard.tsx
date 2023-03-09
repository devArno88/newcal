import { I_NewCalSession, I_Slot } from "@/src/interfaces";
import LockIcon from "@mui/icons-material/Lock";
import { Paper, Stack, Typography } from "@mui/material";
import { FunctionComponent, ReactElement } from "react";

interface PropTypes extends I_NewCalSession {
    flat: number;
    slot: I_Slot;
    isBooked: boolean;
    isExpired: boolean;
    isAdmin: boolean;
    isDisabled: boolean;
    isFortnightAway: boolean;
    handleBookingForm: (x: number) => void;
}

export const BookingCard: FunctionComponent<PropTypes> = (props): ReactElement => {
    const {
        flat,
        isAdmin,
        isBooked,
        isExpired,
        isDisabled,
        isFortnightAway,
        handleBookingForm,
        slot: { slot, start, end },
    } = props;
    const isUnavailable = isBooked && flat && flat !== props.session?.flat;
    return (
        <Paper
            key={slot}
            elevation={3}
            onClick={() =>
                isUnavailable || isExpired || isFortnightAway || isAdmin ? undefined : handleBookingForm(slot)
            }
            sx={{
                mb: 1.5,
                padding: "3px 6px",
                bgcolor: isDisabled ? "lightgray" : isBooked ? "lightsalmon" : "lightgreen",
                cursor: isUnavailable || isExpired || isFortnightAway || isAdmin || isDisabled ? undefined : "pointer",
            }}
        >
            <Stack sx={{ alignItems: "center" }}>
                <Stack direction="row" sx={{ alignItems: "center" }}>
                    {isFortnightAway ? <LockIcon sx={{ opacity: 0.6, mt: -0.2, mr: 0.5 }} fontSize="small" /> : null}
                    <Typography variant="h6">
                        {start.slice(0, -3)} - {end.slice(0, -3)}
                    </Typography>
                </Stack>
                <Typography variant="body1">
                    {isFortnightAway
                        ? "Unlocks 1 week prior"
                        : isExpired && !isBooked
                        ? `Expired`
                        : isBooked
                        ? `Booked (Flat ${flat})`
                        : "Available"}
                </Typography>
            </Stack>
        </Paper>
    );
};
