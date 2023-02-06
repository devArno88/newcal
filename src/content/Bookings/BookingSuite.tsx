import { CustomDatePicker } from "@/src/components/CustomDatePicker";
import { E_BookingType, I_NewCalSession, I_PoolBookings } from "@/src/interfaces";
import { slotStrings } from "@/src/strings";
import { defaultSlotDetails, getDateString, getFortnightAway, isToday } from "@/src/utils";
import FitnessCenterTwoToneIcon from "@mui/icons-material/FitnessCenterTwoTone";
import LockIcon from "@mui/icons-material/Lock";
import PoolTwoToneIcon from "@mui/icons-material/PoolTwoTone";
import TableBarTwoToneIcon from "@mui/icons-material/TableBarTwoTone";
import { CircularProgress, Grid, Paper, Stack, Typography } from "@mui/material";
import { FunctionComponent, useState } from "react";
import { KeyedMutator } from "swr";
import { BookingForm } from "../Modal/BookingForm";

interface PropTypes extends I_PoolBookings, I_NewCalSession {
    date: string;
    isLoading: boolean;
    type: E_BookingType;
    setDate: (x) => void;
    mutate: KeyedMutator<any>;
}

export const IconConfig = {
    [E_BookingType.pool]: PoolTwoToneIcon,
    [E_BookingType.gym]: FitnessCenterTwoToneIcon,
    [E_BookingType.table]: TableBarTwoToneIcon,
};

export const BookingSuite: FunctionComponent<PropTypes> = (props) => {
    const [open, setOpen] = useState<boolean>(false);
    const [currentSlot, setCurrentSlot] = useState<number | null>(null);
    const handleBookingForm = (slot: number) => {
        setCurrentSlot(slot);
        setOpen(true);
    };
    const nowDate = new Date();
    const nowTime = nowDate.toLocaleTimeString();
    const { end } = getFortnightAway();
    const isFortnightAway = getDateString(new Date(props.date)) > end;

    const pendingBookings = props.bookings?.filter((b) => {
        const details = defaultSlotDetails({ type: props.type, slot: b.slot });
        const exists = !(
            details.end < nowTime &&
            b.flat === props.session?.flat &&
            getDateString(nowDate) === props.date
        );
        return exists;
    });

    const pending = pendingBookings ? pendingBookings[0] : null;

    // if (![0, 1].includes(pendingBookings?.length))
    //     return (
    //         <AppError
    //             source="Bookings Suite"
    //             session={props?.session}
    //             error={`Multiple pending bookings exist for ${props?.session?.flat} on ${props.date}`}
    //         />
    //     );

    return (
        <>
            <CustomDatePicker type={props.type} date={props.date} setDate={props.setDate} />
            <BookingForm
                open={open}
                date={props.date}
                setOpen={setOpen}
                pending={pending}
                type={props.type}
                slot={currentSlot}
                mutate={props.mutate}
                session={props.session}
            />
            <Grid container sx={{ alignItems: "center", justifyContent: "center" }}>
                {props.isLoading ? (
                    <CircularProgress />
                ) : (
                    <Grid item xs={10} sm={8} md={4} sx={{ pt: 1, pb: 2 }}>
                        {slotStrings[props.type].map((booking) => {
                            const isBooked = props.bookings?.some((b) => b.slot === booking.slot);
                            const isExpired =
                                (booking.end <= nowTime && isToday(props.date)) ||
                                getDateString(props.date["$d"]) < getDateString(nowDate);
                            const isDisabled = isExpired || isFortnightAway;
                            return (
                                <Paper
                                    elevation={3}
                                    key={booking.slot}
                                    onClick={() => (isExpired ? undefined : handleBookingForm(booking.slot))}
                                    sx={{
                                        mb: 1.5,
                                        padding: "3px 6px",
                                        cursor: isDisabled ? undefined : "pointer",
                                        bgcolor: isDisabled ? "lightgray" : isBooked ? "lightsalmon" : "lightgreen",
                                    }}
                                >
                                    <Stack sx={{ alignItems: "center" }}>
                                        <Stack direction="row" sx={{ alignItems: "center" }}>
                                            {isFortnightAway ? (
                                                <LockIcon sx={{ opacity: 0.6, mt: -0.2, mr: 0.5 }} fontSize="small" />
                                            ) : null}
                                            <Typography variant="h6">
                                                {booking.start.slice(0, -3)} - {booking.end.slice(0, -3)}
                                            </Typography>
                                        </Stack>
                                        <Typography variant="body1">
                                            {isFortnightAway
                                                ? "Unlocks one week prior to date"
                                                : // ? `Unlocks on ${new Date(middle).toDateString()}`
                                                  new Date(props.date).toDateString()}
                                        </Typography>
                                        <Typography variant="caption">
                                            {isFortnightAway
                                                ? null
                                                : isExpired && !isBooked
                                                ? `Expired`
                                                : isBooked
                                                ? `Flat ${
                                                      props.bookings.filter(
                                                          (reserved) => reserved.slot === booking.slot
                                                      )[0].flat
                                                  }`
                                                : "Available"}
                                        </Typography>
                                    </Stack>
                                </Paper>
                            );
                        })}
                    </Grid>
                )}
            </Grid>
        </>
    );
};
