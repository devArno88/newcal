import * as React from "react";
import { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import PoolTwoToneIcon from "@mui/icons-material/PoolTwoTone";

export default function BasicDatePicker() {
    const [value, setValue] = React.useState<Dayjs | null>();

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                label="Please select a date"
                value={value}
                onChange={(newValue) => {
                    setValue(newValue);
                }}
                components={{
                    OpenPickerIcon: PoolTwoToneIcon,
                }}
                onAccept={(value: Dayjs) => {
                    console.log(new Date(value["$d"]).toISOString());
                }}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    );
}
