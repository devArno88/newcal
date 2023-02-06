import { I_Slot } from "@/src/interfaces";
import LockIcon from "@mui/icons-material/Lock";
import { Paper, Stack, Typography } from "@mui/material";
import { FunctionComponent, ReactElement } from "react";

interface PropTypes {
    flat: number;
    slot: I_Slot;
    isBooked: boolean;
    isExpired: boolean;
    isDisabled: boolean;
    isFortnightAway: boolean;
    handleBookingForm: (x: number) => void;
}

export const BookingCard: FunctionComponent<PropTypes> = (props): ReactElement => {
    const {
        slot: { slot, start, end },
        isExpired,
        isFortnightAway,
        isDisabled,
        isBooked,
        handleBookingForm,
        flat,
    } = props;
    return (
        <Paper
            elevation={3}
            key={slot}
            onClick={() => (isExpired || isFortnightAway ? undefined : handleBookingForm(slot))}
            sx={{
                mb: 1.5,
                padding: "3px 6px",
                cursor: isDisabled ? undefined : "pointer",
                bgcolor: isDisabled ? "lightgray" : isBooked ? "lightsalmon" : "lightgreen",
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
                        ? "Unlocked 1 week before"
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
