import { createResident, updateResident } from "@/src/actions";
import { E_AlertTypes } from "@/src/context";
import { I_Alerter, I_Mutator, I_Resident } from "@/src/interfaces";
import { appColors } from "@/src/utils";
import { Button, CircularProgress, FormControl, Modal, Stack, TextField, Typography } from "@mui/material";
import { FunctionComponent, useEffect, useState } from "react";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "70%", sm: "60%", md: 500 },
    border: "1px solid #555",
    boxShadow: 24,
    p: 4,
    bgcolor: "#0d1117",
};

interface PropTypes extends I_Mutator, I_Alerter {
    open: boolean;
    resident?: I_Resident;
    handleClose: () => void;
}

interface I_ResidentFormData {
    name: string;
    email: string;
    flat: string;
}

const initState = {
    name: "",
    email: "",
    flat: "",
};

export const ResidentForm: FunctionComponent<PropTypes> = (props) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState<I_ResidentFormData>(initState);
    useEffect(() => {
        if (props.resident)
            setFormData({
                name: props.resident.name,
                email: props.resident.email,
                flat: `${props.resident.flat}`, // Flat fetched as number
            });
    }, [props.resident]);
    const { name, email, flat } = formData;
    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const cancelForm = () => {
        setFormData(initState);
        props.handleClose();
    };
    const FormConfig = {
        aria: "resident-form",
        items: [
            {
                name: "name",
                helperText: "Resident name",
                value: name,
            },
            {
                name: "email",
                helperText: "Resident email",
                value: email,
            },
            {
                name: "flat",
                helperText: "Resident flat number",
                value: flat,
            },
        ],
        style: {
            InputProps: {
                style: { color: appColors.text.primary, fontSize: 18 },
            },
            FormHelperTextProps: {
                style: { color: appColors.secondary },
            },
            sx: {
                input: {
                    borderRadius: 1,
                    border: "2px solid #555",
                },
            },
        },
    };
    const onSubmit = async () => {
        setLoading(true);
        const res = props.resident
            ? await updateResident({ residentID: props.resident._id, formData })
            : await createResident({ formData });
        if (res) {
            setLoading(false);
            if (res?.err) props.setAlert({ type: E_AlertTypes.error, text: res?.err });
            if (res?.msg) {
                props.mutate();
                props.setAlert({ type: E_AlertTypes.success, text: res?.msg });
            }
        }
    };
    return (
        <Modal
            open={props.open}
            onClose={cancelForm}
            aria-labelledby={`${FormConfig.aria}-title`}
            aria-describedby={`${FormConfig.aria}-description`}
        >
            <FormControl sx={style}>
                <Typography id={`${FormConfig.aria}-title`} variant="h6" component="h2">
                    {props.resident ? "Update" : "Create"} NewCal Resident
                </Typography>
                <Typography id={`${FormConfig.aria}-description`} sx={{ mt: 1, color: "gray" }}>
                    {props.resident ? "Modify an existing" : "Register a new"} application user
                </Typography>
                <Stack spacing={2} mt={3} mb={3}>
                    {FormConfig.items.map((x) => (
                        <TextField
                            key={x.name}
                            name={x.name}
                            value={x.value}
                            variant="outlined"
                            onChange={onChange}
                            helperText={x.helperText}
                            {...FormConfig.style}
                        />
                    ))}
                </Stack>
                <Stack sx={{ justifyContent: "flex-end", gap: 1, mt: 3 }} direction="row">
                    <Button variant="contained" sx={{ bgcolor: "gray" }} onClick={cancelForm}>
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        onClick={onSubmit}
                        variant="contained"
                        sx={{ bgcolor: appColors.primary, color: "#fff" }}
                        disabled={!name.length || !email.length || !flat}
                    >
                        {loading ? <CircularProgress /> : "Submit"}
                    </Button>
                </Stack>
            </FormControl>
        </Modal>
    );
};
