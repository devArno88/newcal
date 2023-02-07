import { FormSelect } from "@/src/components/FormSelect";
import { appColors } from "@/src/utils";
import { Box, Button, Modal, Stack, TextField, Typography } from "@mui/material";
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

interface PropTypes {
    open: boolean;
    handleClose: () => void;
}

export const TicketForm: FunctionComponent<PropTypes> = (props) => {
    const [formData, setFormData] = useState({
        title: "",
        content: "",
    });
    const { title, content } = formData;
    const onChange = (e) => setFormData((x) => ({ ...x, [e.target.name]: e.target.value }));
    return (
        <Modal
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="ticket-modal-title"
            aria-describedby="ticket-modal-description"
        >
            <Box sx={style}>
                <Typography id="ticket-modal-title" variant="h5">
                    New Ticket
                </Typography>
                <Typography id="ticket-modal-description" sx={{ mt: 1, color: "gray" }}>
                    Submit a ticket to NewCal Management
                </Typography>
                <Stack spacing={2} mt={3} mb={3}>
                    <FormSelect />
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
                                borderRadius: 2,
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
                                borderRadius: 2,
                                border: "2px solid #555",
                            },
                        }}
                    />
                </Stack>
                <Stack sx={{ justifyContent: "flex-end", gap: 1, mt: 3 }} direction="row">
                    <Button variant="contained" sx={{ bgcolor: "gray" }}>
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        sx={{ bgcolor: "greenyellow", color: "black" }}
                        onClick={() => console.log({ formData })}
                    >
                        Submit
                    </Button>
                </Stack>
            </Box>
        </Modal>
    );
};
