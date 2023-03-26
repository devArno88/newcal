import { PanelHeader, PanelSubtitle, PanelTitle } from "@/src/components";
import { E_BookingType } from "@/src/interfaces";
import { slotStrings } from "@/src/strings";
import { appColors, isToday } from "@/src/utils";
import { Paper, Stack } from "@mui/material";

import { IconConfig } from "../../Bookings";

export const BookingsPanel = (props) => {
    const handleTodaySlot = (type: E_BookingType) => {
        const exists = props.bookings[type].some((x) => isToday(x.date));
        const slot = exists ? props.bookings[type].filter((x) => isToday(x.date))[0].slot : null;
        const details = slot ? slotStrings[type].filter((s) => s.slot === slot)[0] : null;
        return details ? `Today: ${details.start.slice(0, -3)} - ${details.end.slice(0, -3)}` : "No bookings today";
    };
    const PanelCard = ({ type }: { type: E_BookingType }) => {
        const Icon = IconConfig[type];
        const title = `${props.bookings[type].length || "No"} ${type} booking${
            props.bookings[type].length === 1 ? "" : "s"
        }`;
        const subtitle = handleTodaySlot(type);
        return (
            <Paper
                elevation={5}
                sx={{
                    mb: 1,
                    py: 2,
                    borderRadius: 2,
                    height: "fit-content",
                    bgcolor: appColors.panel,
                    border: `1px solid ${appColors.border}`,
                }}
            >
                <Icon sx={{ fill: appColors.primary }} fontSize="large" />
                <PanelTitle text={title} />
                <PanelSubtitle text={subtitle} />
            </Paper>
        );
    };
    return (
        <>
            <PanelHeader text="Bookings" />
            <Stack mt={2}>
                {Object.values(E_BookingType).map((x) => (
                    <PanelCard key={x} type={x} />
                ))}
            </Stack>
        </>
    );
};
