import { E_BookingType } from "@/src/interfaces";
import { slotStrings } from "@/src/strings";
import { appColors, capitalise, isToday } from "@/src/utils";
import { Paper, Stack, Typography } from "@mui/material";

import { IconConfig } from "../Bookings";

export const BookingsPanel = (props) => {
    const handleTodaySlot = (type: E_BookingType) => {
        const exists = props.bookings[type].some((x) => isToday(x.date));
        const slot = exists ? props.bookings[type].filter((x) => isToday(x.date))[0].slot : null;
        const details = slot ? slotStrings[type].filter((s) => s.slot === slot)[0] : null;
        return details ? (
            <Typography sx={{ color: "greenyellow" }}>
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
                    <Icon sx={{ fill: appColors.text.primary, mr: 1 }} />
                    <Typography variant="h6" sx={{ color: appColors.text.primary }}>
                        {capitalise(type)}
                    </Typography>
                </Stack>
                {handleTodaySlot(type)}
                <Typography variant="caption" sx={{ color: "gray" }}>
                    {props.bookings[type].length || "No"} upcoming booking
                    {props.bookings[type].length !== 1 ? "s" : null}
                </Typography>
            </Paper>
        );
    };
    return (
        <>
            <Typography variant="h5">Bookings</Typography>
            <Stack mt={2}>
                <PanelCard type={E_BookingType.pool} />
                <PanelCard type={E_BookingType.gym} />
                <PanelCard type={E_BookingType.table} />
            </Stack>
        </>
    );
};
