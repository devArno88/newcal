import { E_BookingType } from "@/src/interfaces";
import { slotStrings } from "@/src/strings";
import { appColors, isToday } from "@/src/utils";
import { Paper, Stack, Typography } from "@mui/material";

import { IconConfig } from "../../Bookings";

export const BookingsPanel = (props) => {
    const handleTodaySlot = (type: E_BookingType) => {
        const exists = props.bookings[type].some((x) => isToday(x.date));
        const slot = exists ? props.bookings[type].filter((x) => isToday(x.date))[0].slot : null;
        const details = slot ? slotStrings[type].filter((s) => s.slot === slot)[0] : null;
        return details ? (
            <Typography variant="caption" sx={{ color: "gray" }}>
                Today: {`${details.start.slice(0, -3)} - ${details.end.slice(0, -3)}`}
            </Typography>
        ) : null;
    };
    const PanelCard = ({ type }: { type: E_BookingType }) => {
        const Icon = IconConfig[type];
        return (
            <Paper
                sx={{
                    mb: 1,
                    pt: 1,
                    pb: 1,
                    cursor: "pointer",
                    height: "fit-content",
                    bgcolor: "#22272D",
                    borderRadius: 2,
                }}
                elevation={5}
            >
                <Stack direction="row" justifyContent="center" alignItems="center">
                    <Icon sx={{ fill: appColors.text.primary }} fontSize="large" />
                </Stack>
                <Typography sx={{ color: "greenyellow" }}>
                    {props.bookings[type].length || "No"} {type} booking{props.bookings[type].length !== 1 ? "s" : null}
                </Typography>
                {handleTodaySlot(type)}
            </Paper>
        );
    };
    return (
        <>
            <Typography variant="h5">Bookings</Typography>
            <Stack mt={2}>
                {Object.values(E_BookingType).map((x) => (
                    <PanelCard key={x} type={x} />
                ))}
            </Stack>
        </>
    );
};
