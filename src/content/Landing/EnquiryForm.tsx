import { createEnquiry } from "@/src/actions";
import { E_AlertTypes } from "@/src/context";
import { I_Alerter } from "@/src/interfaces";
import { Box, Button, CircularProgress, FormControl, Stack, TextField } from "@mui/material";
import { ChangeEvent, FunctionComponent, MouseEvent, ReactElement, useState } from "react";

export interface EnquiryFormData {
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

export const EnquiryForm: FunctionComponent<I_Alerter> = (props): ReactElement => {
    const [loading, setLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState<EnquiryFormData>(initState);
    const onChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
        setFormData((previousState: EnquiryFormData) => ({ ...previousState, [e.target.name]: e.target.value }));
    const { name, email, phone, message } = formData;
    const onSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setLoading(true);
        const res = await createEnquiry({ formData });
        if (res?.err) {
            props.setAlert({ type: E_AlertTypes.error, text: res?.err });
            setLoading(false);
        }
        if (res?.msg) {
            setLoading(false);
            setFormData(initState);
            props.setAlert({ type: E_AlertTypes.success, text: res?.msg });
        }
    };
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
                    required
                    maxRows={3}
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
                    onClick={onSubmit}
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
                    {loading ? <CircularProgress /> : "Submit"}
                </Button>
            </Box>
        </FormControl>
    );
};
