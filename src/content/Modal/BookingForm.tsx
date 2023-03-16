import { createPoolBooking, deletePoolBooking } from "@/src/actions";
import { createGymBooking, deleteGymBooking } from "@/src/actions/gym";
import { createTableBooking, deleteTableBooking } from "@/src/actions/table";
import { Loading } from "@/src/components";
import { AppError } from "@/src/components/AppError";
import { E_AlertTypes, useAlert } from "@/src/context";
import {
    E_BookingType,
    I_GymBooking,
    I_Mutator,
    I_NewCalSession,
    I_PoolBooking,
    I_TableBooking,
} from "@/src/interfaces";
import { capitalise, defaultSlotDetails, getErrorMessage, shortDate } from "@/src/utils";
import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import { FunctionComponent, useState } from "react";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -75%)",
    width: 420,
    border: "1px solid #555",
    boxShadow: 24,
    p: 4,
    bgcolor: "#0d1117",
};

interface PropTypes extends I_NewCalSession, I_Mutator {
    slot: number;
    date: string;
    open: boolean;
    today: boolean;
    type: E_BookingType;
    setOpen: (x) => void;
    pending?: I_PoolBooking | I_GymBooking | I_TableBooking | null;
}

const handleActions = (type: E_BookingType) => {
    switch (type) {
        case E_BookingType.pool:
            return { create: createPoolBooking, delete: deletePoolBooking };
            break;
        case E_BookingType.gym:
            return { create: createGymBooking, delete: deleteGymBooking };
            break;
        case E_BookingType.table:
            return { create: createTableBooking, delete: deleteTableBooking };
            break;
        default:
            return null;
    }
};

export const BookingForm: FunctionComponent<PropTypes> = (props) => {
    const { setAlert } = useAlert();
    const [loading, setLoading] = useState<boolean>(false);
    const actions = handleActions(props?.type);
    if (!actions)
        return (
            <AppError
                source="Bookings Modal"
                error={`Booking type does not exist within ${JSON.stringify(Object.values(E_BookingType))}`}
                session={props?.session}
            />
        );

    const handleCreateBooking = async () => {
        setLoading(true);
        const res = await actions.create({
            slot: props.slot,
            date: props.date,
        });

        if (res?.err) {
            setLoading(false);
            setAlert({ type: E_AlertTypes.error, text: res?.err });
        }

        if (res?.msg) {
            setLoading(false);
            props.mutate();
            props.setOpen(false);
            setAlert({ type: E_AlertTypes.success, text: res?.msg });
        }
    };

    const handleDeleteBooking = async () => {
        const res = await actions.delete({
            id: props.pending?._id,
        });

        if (res?.err) {
            setLoading(false);
            setAlert({ type: E_AlertTypes.error, text: res?.err });
        }

        if (res?.msg) {
            setLoading(false);
            props.mutate();
            props.setOpen(false);
            setAlert({ type: E_AlertTypes.success, text: res?.msg });
        }
    };
    const defaultDetails = defaultSlotDetails({ slot: +props.slot, type: props.type });
    const pendingDetails = props.pending ? defaultSlotDetails({ slot: props.pending?.slot, type: props.type }) : null;
    const isOwnPendingBooking = props.slot === props.pending?.slot && props.session?.flat === props.pending?.flat;
    const dateRange = `${defaultDetails?.start?.slice(0, -3)} - ${defaultDetails?.end?.slice(0, -3)}`;
    return (
        <Modal
            open={props.open}
            onClose={() => props.setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{ width: { xs: "100vw", sm: "100%", md: "100%" }, px: { xs: 2, sm: 0 } }}
        >
            <Box sx={style}>
                {isOwnPendingBooking ? null : (
                    <Typography id="modal-modal-title" variant="h5">
                        {props.pending ? getErrorMessage() : `${capitalise(props.type)} Booking`}
                    </Typography>
                )}
                <Typography id="modal-modal-title" variant="h6" sx={{ mt: 1 }}>
                    {isOwnPendingBooking
                        ? "You currently have this slot booked"
                        : props.pending
                        ? "You have a pending booking for this day"
                        : `${props.today ? "Today " : shortDate(props.date)} from ${dateRange}`}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 1 }}>
                    {isOwnPendingBooking
                        ? "What would you like to do?"
                        : props.pending
                        ? `Cancel your ${pendingDetails?.start.slice(0, -3)} - ${pendingDetails?.end.slice(
                              0,
                              -3
                          )} slot to book this one`
                        : "Are you sure you would like to book this slot?"}
                </Typography>
                {isOwnPendingBooking ? (
                    <Stack direction="row" sx={{ justifyContent: "flex-end", gap: 1, mt: 3 }}>
                        <Button variant="contained" sx={{ bgcolor: "gray" }} onClick={() => props.setOpen(false)}>
                            Keep It
                        </Button>
                        <Button variant="contained" color="error" sx={{ width: 120 }} onClick={handleDeleteBooking}>
                            {loading ? <Loading size="small" /> : "Cancel It"}
                        </Button>
                    </Stack>
                ) : props.pending ? null : (
                    <Stack direction="row" sx={{ justifyContent: "flex-end", gap: 1, mt: 3 }}>
                        <Button variant="contained" sx={{ bgcolor: "gray" }} onClick={() => props.setOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="contained" color="primary" sx={{ width: 100 }} onClick={handleCreateBooking}>
                            {loading ? <Loading size="small" /> : "Confirm"}
                        </Button>
                    </Stack>
                )}
            </Box>
        </Modal>
    );
};
