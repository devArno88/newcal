import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { FunctionComponent } from "react";
import { E_BookingType } from "../interfaces";
import { withinTwoWeeks } from "../utils";

interface PropTypes {
    date: string;
    type: E_BookingType;
    setDate: (x) => void;
}

export const CustomDatePicker: FunctionComponent<PropTypes> = (props) => (
    <Box sx={{ textAlign: "center" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                label="Select date"
                value={props.date}
                onChange={(newValue) => {
                    props.setDate(newValue);
                }}
                components={{
                    // OpenPickerIcon: IconConfig[props.type],
                    OpenPickerIcon: ExpandMoreRoundedIcon,
                }}
                onAccept={(value: any) => {
                    console.log({ WITHIN_2_WEEKS: withinTwoWeeks(new Date(value)) });
                    console.log(new Date(value["$d"]).toISOString());
                }}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    </Box>
);
