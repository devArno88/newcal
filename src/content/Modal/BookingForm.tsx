import { createPoolBooking, deletePoolBooking } from "@/src/actions";
import { createGymBooking, deleteGymBooking } from "@/src/actions/gym";
import { createTableBooking, deleteTableBooking } from "@/src/actions/table";
import { AppError } from "@/src/components/AppError";
import { useAlert } from "@/src/context";
import { E_BookingType, I_GymBooking, I_NewCalSession, I_PoolBooking, I_TableBooking } from "@/src/interfaces";
import { capitalise, defaultSlotDetails, getErrorMessage } from "@/src/utils";
import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import { KeyedMutator } from "swr";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

interface PropTypes extends I_NewCalSession {
    slot: number;
    date: string;
    open: boolean;
    type: E_BookingType;
    setOpen: (x) => void;
    mutate: KeyedMutator<any>;
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
        const res = await actions.create({
            slot: props.slot,
            date: props.date,
        });

        console.log({ res });

        props.setOpen(false);

        // if (res?.err) {
        //     setAlert({ type: E_AlertTypes.error, subtitle: "COCK" });
        // } else {
        props.mutate();
        //     setAlert({ type: E_AlertTypes.success, subtitle: "AND BALLS" });
        // }
    };

    const handleDeleteBooking = async () => {
        const res = await actions.delete({
            id: props.pending?._id,
        });

        console.log({ res });

        props.setOpen(false);

        // if (res?.err) {
        //     setAlert({ type: E_AlertTypes.error, subtitle: "COCK" });
        // } else {
        props.mutate();
        //     setAlert({ type: E_AlertTypes.success, subtitle: "AND BALLS" });
        // }
    };
    const defaultDetails = defaultSlotDetails({ slot: props.slot, type: props.type });
    const pendingDetails = props.pending ? defaultSlotDetails({ slot: props.pending?.slot, type: props.type }) : null;
    const isOwnPendingBooking = props.slot === props.pending?.slot && props.session?.flat === props.pending?.flat;

    return (
        <Modal
            open={props.open}
            onClose={() => props.setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
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
                        : `${defaultDetails?.start?.slice(0, -3)} - ${defaultDetails?.end?.slice(0, -3)} on ${new Date(
                              props.date
                          ).toDateString()}`}
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
                        <Button variant="contained" color="error" onClick={handleDeleteBooking}>
                            Cancel It
                        </Button>
                    </Stack>
                ) : props.pending ? null : (
                    <Stack direction="row" sx={{ justifyContent: "flex-end", gap: 1, mt: 3 }}>
                        <Button variant="contained" sx={{ bgcolor: "gray" }} onClick={() => props.setOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleCreateBooking}>
                            Confirm
                        </Button>
                    </Stack>
                )}
            </Box>
        </Modal>
    );
};
