import { Loading } from "@/src/components";
import { PageHeader } from "@/src/components/PageHeader";
import { BookingForm } from "@/src/content/Modal";
import { E_BookingType, I_Mutator, I_NewCalSession, I_PoolBookings } from "@/src/interfaces";
import { slotStrings } from "@/src/strings";
import { capitalise, defaultSlotDetails, getDateString, getFortnightAway, isToday, niceDate } from "@/src/utils";
import FitnessCenterTwoToneIcon from "@mui/icons-material/FitnessCenterTwoTone";
import PoolTwoToneIcon from "@mui/icons-material/PoolTwoTone";
import TableBarTwoToneIcon from "@mui/icons-material/TableBarTwoTone";
import { Button, Grid, Stack } from "@mui/material";
import Link from "next/link";
import { FunctionComponent, ReactElement, useState } from "react";
import { BookingCard } from "./BookingCard";
import { BookingDatePicker } from "./BookingDatePicker";

interface PropTypes extends I_PoolBookings, I_NewCalSession, I_Mutator {
    date: string;
    loading: boolean;
    type: E_BookingType;
    setDate: (x) => void;
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
    const isResident = props.session?.role === "resident";

    const pendingBookings = props.bookings?.filter((b) => {
        const details = defaultSlotDetails({ type: props.type, slot: b.slot });
        const isUpcoming = details.end > nowTime;
        const isReserved =
            b.flat === props.session?.flat && getDateString(selectedDate) === getDateString(props.date["$d"]);
        return today ? isUpcoming : isReserved;
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
        <Stack gap={4} alignItems="center" justifyContent="center">
            <PageHeader
                type={props.type}
                title={`${capitalise(props.type)} Bookings`}
                subtitle={today ? "Today" : niceDate(props.date)}
            />
            {isResident ? (
                <Link href="/mycal/bookings">
                    <Button
                        variant="contained"
                        color="info"
                        sx={{ width: { xs: 200, sm: 220, md: 240 }, pl: 1, pr: 1 }}
                    >
                        View My Bookings
                    </Button>
                </Link>
            ) : null}
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
                {props.loading ? (
                    <Loading />
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
                                    isBooked={isBooked}
                                    isExpired={isExpired}
                                    isAdmin={!isResident}
                                    isDisabled={isDisabled}
                                    isFortnightAway={isFortnightAway}
                                    handleBookingForm={handleBookingForm}
                                    slot={slotStrings[props.type].filter((s) => s.slot === slot.slot)[0]}
                                    flat={props.bookings?.filter((reserved) => reserved.slot === slot?.slot)[0]?.flat}
                                />
                            );
                        })}
                    </Grid>
                )}
            </Grid>
        </Stack>
    );
};
