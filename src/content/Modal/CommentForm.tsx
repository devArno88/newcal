import { createPostComment } from "@/src/actions/post";
import { E_AlertTypes, useAlert } from "@/src/context";
import { E_PostType, I_Mutator } from "@/src/interfaces";
import { appColors, capitalise } from "@/src/utils";
import { Button, FormControl, Modal, Stack, TextField, Typography } from "@mui/material";
import { Types } from "mongoose";
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
    postID: Types.ObjectId;
    open: boolean;
    type: E_PostType;
    handleClose: () => void;
}

interface CommentFormData {
    text: string;
}

const initState = {
    text: "",
};

export const CommentForm: FunctionComponent<PropTypes> = (props) => {
    const { setAlert } = useAlert();
    const [formData, setFormData] = useState<CommentFormData>(initState);
    const { text } = formData;
    const onSubmit = async (e) => {
        e.preventDefault();
        const res = await createPostComment({ postID: props.postID, formData });
        if (res.err) setAlert({ type: E_AlertTypes.error, text: res.err });
        if (res.msg) {
            props.mutate();
            props.handleClose();
            setAlert({ type: E_AlertTypes.success, text: res.msg });
        }
    };
    return (
        <Modal
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="comment-modal-title"
            aria-describedby="comment-modal-description"
        >
            <FormControl sx={style}>
                <Typography id="comment-modal-title" variant="h6" component="h2" mb={2}>
                    Add {capitalise(props.type)} Comment
                </Typography>
                <TextField
                    variant="outlined"
                    name="text"
                    onChange={(e) => setFormData({ text: e.target.value })}
                    helperText="Please enter your comment here"
                    value={text}
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
                <Stack sx={{ justifyContent: "flex-end", gap: 1, mt: 3 }} direction="row">
                    <Button variant="contained" sx={{ bgcolor: "gray" }} onClick={props.handleClose}>
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        onClick={onSubmit}
                        variant="contained"
                        sx={{ bgcolor: "greenyellow", color: "black" }}
                        disabled={!text.length}
                    >
                        Submit
                    </Button>
                </Stack>
            </FormControl>
        </Modal>
    );
};