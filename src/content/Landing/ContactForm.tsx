import { Box, Button, FormControl, Stack, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";

interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    message: string;
}

const initState = {
    name: "",
    email: "",
    phone: "",
    message: "",
};

export const ContactForm = () => {
    const [formData, setFormData] = useState<ContactFormData>(initState);
    const onChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
        setFormData((previousState: ContactFormData) => ({ ...previousState, [e.target.name]: e.target.value }));
    const { name, email, phone, message } = formData;
    return (
        <FormControl sx={{ width: "100%" }}>
            <Stack spacing={1}>
                <TextField
                    required
                    name="name"
                    label="Name"
                    value={name}
                    variant="outlined"
                    onChange={onChange}
                    helperText="Name is required"
                    FormHelperTextProps={{ sx: { color: "white" } }}
                    InputProps={{
                        sx: { borderRadius: 4, backgroundColor: "white" },
                    }}
                />
                <TextField
                    required
                    name="email"
                    label="Email"
                    value={email}
                    variant="outlined"
                    onChange={onChange}
                    helperText="Email is required"
                    FormHelperTextProps={{ sx: { color: "white" } }}
                    InputProps={{ sx: { borderRadius: 4, backgroundColor: "white" } }}
                />
                <TextField
                    name="phone"
                    value={phone}
                    variant="outlined"
                    onChange={onChange}
                    label="Phone number"
                    helperText="Phone number is optional"
                    FormHelperTextProps={{ sx: { color: "white" } }}
                    InputProps={{ sx: { borderRadius: 4, backgroundColor: "white" } }}
                />
                <TextField
                    multiline
                    maxRows={2}
                    name="message"
                    label="Message"
                    value={message}
                    variant="outlined"
                    onChange={onChange}
                    FormHelperTextProps={{ sx: { color: "white" } }}
                    helperText="Please enter your message (⇧ + ⏎ for new line)"
                    InputProps={{ sx: { borderRadius: 4, backgroundColor: "white" } }}
                />
            </Stack>
            <Box alignItems={{ xs: "center", sm: "center", md: "start" }} width="100%">
                <Button
                    size="large"
                    onClick={() => console.log({ formData })}
                    variant="contained"
                    disabled={!name.length || !email.length || !message.length}
                    sx={{
                        mt: 3,
                        bgcolor: "#AA4A44",
                        width: "fit-content",
                        p: "12px 36px",
                        fontSize: 18,
                        borderRadius: "2rem",
                    }}
                >
                    Submit
                </Button>
            </Box>
        </FormControl>
    );
};
