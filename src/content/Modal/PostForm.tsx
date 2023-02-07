import { FormSelect } from "@/src/components/FormSelect";
import { appColors } from "@/src/utils";
import { Button, Stack, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
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

export const PostForm: FunctionComponent<PropTypes> = (props) => {
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
            aria-labelledby="post-modal-title"
            aria-describedby="post-modal-description"
        >
            <Box sx={style}>
                <Typography id="post-modal-title" variant="h5">
                    New Post
                </Typography>
                <Typography id="post-modal-description" sx={{ mt: 1, color: "gray" }}>
                    Create a new post for the NewCal residents space
                </Typography>
                <Stack spacing={2} mt={3} mb={3}>
                    <FormSelect />
                    <TextField
                        variant="outlined"
                        name="title"
                        onChange={onChange}
                        helperText="Why are you creating this post?"
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
                        helperText="Please provide any additional details"
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
