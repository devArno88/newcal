import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { FunctionComponent } from "react";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "70%", sm: "60%", md: 500 },
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

interface PropTypes {
    open: boolean;
    handleClose: () => void;
}

export const ResidentForm: FunctionComponent<PropTypes> = (props) => {
    return (
        <Modal
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="resident-form-title"
            aria-describedby="resident-form-description"
        >
            <Box sx={style}>
                <Typography id="resident-form-title" variant="h6" component="h2">
                    Text in a modal
                </Typography>
                <Typography id="resident-form-description" sx={{ mt: 2 }}>
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                </Typography>
            </Box>
        </Modal>
    );
};
