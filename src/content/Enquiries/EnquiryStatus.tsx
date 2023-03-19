import { updateEnquiryStatus } from "@/src/actions";
import { E_AlertTypes } from "@/src/context";
import { I_Alerter, I_Mutator } from "@/src/interfaces";
import { appColors } from "@/src/utils";
import { FormHelperText, PropTypes } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Types } from "mongoose";
import { FunctionComponent } from "react";

interface PropTypes extends I_Mutator, I_Alerter {
    open: boolean;
    enquiryID: Types.ObjectId;
}

export const EnquiryStatus: FunctionComponent<PropTypes> = (props) => {
    const { open, enquiryID } = props;
    const handleChange = async () => {
        const res = await updateEnquiryStatus({ enquiryID });
        if (res?.err) props.setAlert({ type: E_AlertTypes.error, text: res?.err });
        if (res?.msg) {
            props.mutate();
            props.setAlert({ type: E_AlertTypes.success, text: res?.msg });
        }
    };
    const inputProps = (status: string) => ({
        "aria-label": `status-filter`,
        sx: {
            borderRadius: 3,
            border: `2px solid ${appColors.border}`,
            color: status === "open" ? "#f39c12" : "lightgreen",
        },
    });
    const sx = { ".MuiSvgIcon-root ": { fill: `${appColors.text.secondary} !important` } };
    return (
        <FormControl>
            <Select
                sx={sx}
                label="Status"
                id="enquiry-status"
                onChange={handleChange}
                labelId="enquiry-status-label"
                inputProps={inputProps(open ? "open" : "closed")}
                value={open ? "open" : "closed"}
            >
                <MenuItem value="open">Open</MenuItem>
                <MenuItem value="closed">Closed</MenuItem>
            </Select>
            <FormHelperText sx={{ color: appColors.text.primary }}>Status</FormHelperText>
        </FormControl>
    );
};
