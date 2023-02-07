import { BookingDatePicker } from "@/src/components/BookingDatePicker";
import { PageHeader } from "@/src/components/PageHeader";
import { E_BookingType, I_NewCalSession, I_PoolBookings } from "@/src/interfaces";
import { slotStrings } from "@/src/strings";
import { capitalise, defaultSlotDetails, getDateString, getFortnightAway, isToday, niceDate } from "@/src/utils";
import FitnessCenterTwoToneIcon from "@mui/icons-material/FitnessCenterTwoTone";
import PoolTwoToneIcon from "@mui/icons-material/PoolTwoTone";
import TableBarTwoToneIcon from "@mui/icons-material/TableBarTwoTone";
import { CircularProgress, Grid, Stack } from "@mui/material";
import { FunctionComponent, ReactElement, useState } from "react";
import { KeyedMutator } from "swr";
import { BookingForm } from "../Modal/BookingForm";
import { BookingCard } from "./BookingCard";

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

export const BookingSuite: FunctionComponent<PropTypes> = (props): ReactElement => {
    const [open, setOpen] = useState<boolean>(false);
    const [currentSlot, setCurrentSlot] = useState<number | null>(null);
    const handleBookingForm = (slot: number) => {
        setCurrentSlot(slot);
        setOpen(true);
    };
    const selectedDate = new Date(props.date);
    const nowTime = new Date().toLocaleTimeString();
    const { end } = getFortnightAway();
    const isFortnightAway = getDateString(new Date(props.date)) > end;
    const today = isToday(props.date);

    const pendingBookings = props.bookings?.filter((b) => {
        const details = defaultSlotDetails({ type: props.type, slot: b.slot });
        const isUpcoming = details.end > nowTime;
        const isReserved =
            b.flat === props.session?.flat && getDateString(selectedDate) === getDateString(props.date["$d"]);
        const exists = today ? isUpcoming : isReserved;
        return exists;
    });

    const pending = pendingBookings ? pendingBookings[0] : null;

    // if (pendingBookings && ![0, 1].includes(pendingBookings.length))
    //     return (
    //         <AppError
    //             source="Bookings Suite"
    //             session={props?.session}
    //             error={`Multiple pending bookings exist for ${props?.session?.flat} on ${props.date}`}
    //         />
    //     );

    return (
        <Stack gap={4}>
            <PageHeader
                type={props.type}
                title={`${capitalise(props.type)} Bookings`}
                subtitle={today ? "Today" : niceDate(props.date)}
            />
            <BookingDatePicker type={props.type} date={props.date} setDate={props.setDate} />
            <BookingForm
                open={open}
                today={today}
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
                        {slotStrings[props.type].map((slot) => {
                            const isBooked = props.bookings?.some((b) => b.slot === slot.slot);
                            const isExpired = today
                                ? slot.end <= nowTime
                                : getDateString(props.date["$d"]) < getDateString(selectedDate);
                            const isDisabled = isExpired || isFortnightAway;
                            return (
                                <BookingCard
                                    key={slot.slot}
                                    flat={props.bookings.filter((reserved) => reserved.slot === slot?.slot)[0]?.flat}
                                    isBooked={isBooked}
                                    isDisabled={isDisabled}
                                    isFortnightAway={isFortnightAway}
                                    isExpired={isExpired}
                                    slot={slotStrings[props.type].filter((s) => s.slot === slot.slot)[0]}
                                    handleBookingForm={handleBookingForm}
                                />
                            );
                        })}
                    </Grid>
                )}
            </Grid>
        </Stack>
    );
};
