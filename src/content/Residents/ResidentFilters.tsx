import { appColors } from "@/src/utils";
import { TextField } from "@mui/material";
import { FunctionComponent } from "react";

interface PropTypes {
    filter: string;
    setFilter: (x: string) => void;
}

export const ResidentFilters: FunctionComponent<PropTypes> = (props) => (
    <TextField
        label="Search"
        variant="outlined"
        value={props.filter}
        helperText="Name, email or flat number"
        onChange={(e) => props.setFilter(e.target.value)}
        InputProps={{ sx: { color: appColors.text.primary } }}
        InputLabelProps={{ sx: { color: appColors.text.primary } }}
        FormHelperTextProps={{ sx: { color: appColors.secondary } }}
        sx={{
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline, & .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline, ":
                { borderColor: appColors.text.primary },
        }}
    />
);
