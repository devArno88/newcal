import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Snackbar } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Slide, { SlideProps } from "@mui/material/Slide";
import { forwardRef, FunctionComponent } from "react";
import { E_AlertTypes } from "../context";

type TransitionProps = Omit<SlideProps, "direction">;

interface PropTypes {
    open: boolean;
    text: string;
    type: E_AlertTypes;
    closeAlert: () => void;
}

function TransitionUp(props: TransitionProps) {
    return <Slide {...props} direction="up" />;
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const AlertBar: FunctionComponent<PropTypes> = (props) => {
    const action = (
        <IconButton size="small" aria-label="close" color="inherit" onClick={props.closeAlert}>
            <CloseIcon fontSize="small" />
        </IconButton>
    );

    return (
        <Snackbar
            action={action}
            open={props.open}
            onClose={props.closeAlert}
            autoHideDuration={6000}
            TransitionComponent={TransitionUp}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
            <Alert onClose={props.closeAlert} severity={props.type} sx={{ width: "100%" }}>
                {props.text}
            </Alert>
        </Snackbar>
    );
};
