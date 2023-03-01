import { createTicket } from "@/src/actions/ticket";
import { FormSelect } from "@/src/components/FormSelect";
import { E_TicketType, I_Mutator } from "@/src/interfaces";
import { S_TicketOptions } from "@/src/strings";
import { appColors } from "@/src/utils";
import { Button, FormControl, Modal, Stack, TextField, Typography } from "@mui/material";
import { FunctionComponent, useState } from "react";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    border: "1px solid #555",
    boxShadow: 24,
    p: 4,
    bgcolor: "#0d1117",
};

interface PropTypes extends I_Mutator {
    open: boolean;
    handleClose: () => void;
}

export interface TicketFormData {
    type: E_TicketType;
    title: string;
    content: string;
}

const initState = {
    type: "" as E_TicketType,
    title: "",
    content: "",
};

export const TicketForm: FunctionComponent<PropTypes> = (props) => {
    const [formData, setFormData] = useState<TicketFormData>(initState);
    const { type, title, content } = formData;
    const onChange = (e) => setFormData((x) => ({ ...x, [e.target.name]: e.target.value }));
    const onSubmit = async (e) => {
        e.preventDefault();
        const res = await createTicket({ formData });
        if (res.error) {
        } else {
            // Success
            props.mutate();
            props.handleClose();
        }
    };
    return (
        <Modal
            open={props.open}
            onClose={() => {
                props.handleClose();
                setFormData(initState);
            }}
            aria-labelledby="ticket-modal-title"
            aria-describedby="ticket-modal-description"
        >
            <FormControl sx={style}>
                <Typography id="ticket-modal-title" variant="h5">
                    New Ticket
                </Typography>
                <Typography id="ticket-modal-description" sx={{ mt: 1, color: "gray" }}>
                    Submit a ticket to NewCal Management
                </Typography>
                <Stack spacing={2} mt={3} mb={3}>
                    <FormSelect
                        value={type}
                        onChange={onChange}
                        options={S_TicketOptions}
                        helperText="What type of ticket is this?"
                    />
                    <TextField
                        variant="outlined"
                        name="title"
                        onChange={onChange}
                        helperText="Why are you submitting this ticket?"
                        value={title}
                        InputProps={{
                            style: { color: appColors.text.primary, fontSize: 18 },
                        }}
                        FormHelperTextProps={{
                            style: { color: "greenyellow" },
                        }}
                        sx={{
                            input: {
                                borderRadius: 1,
                                border: "2px solid #555",
                            },
                        }}
                    />
                    <TextField
                        variant="outlined"
                        name="content"
                        onChange={onChange}
                        helperText="Please provide any details that may help us"
                        value={content}
                        InputProps={{
                            style: { color: appColors.text.primary, fontSize: 18 },
                        }}
                        FormHelperTextProps={{
                            style: { color: "greenyellow" },
                        }}
                        sx={{
                            input: {
                                borderRadius: 1,
                                border: "2px solid #555",
                            },
                        }}
                    />
                </Stack>
                <Stack sx={{ justifyContent: "flex-end", gap: 1, mt: 3 }} direction="row">
                    <Button variant="contained" sx={{ bgcolor: "gray" }} onClick={props.handleClose}>
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        onClick={onSubmit}
                        variant="contained"
                        sx={{ bgcolor: "greenyellow", color: "black" }}
                        disabled={!type.length || !title.length || !content.length}
                    >
                        Submit
                    </Button>
                </Stack>
            </FormControl>
        </Modal>
    );
};
