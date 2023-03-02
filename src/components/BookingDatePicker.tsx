import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { Box, createTheme, ThemeProvider } from "@mui/material";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { FunctionComponent } from "react";
import { E_BookingType } from "../interfaces";

interface PropTypes {
    date: string;
    type: E_BookingType;
    setDate: (x) => void;
}

export const BookingDatePicker: FunctionComponent<PropTypes> = (props) => {
    const theme = createTheme({
        components: {
            MuiIconButton: {
                styleOverrides: {
                    sizeMedium: {
                        color: "#fff",
                    },
                },
            },
            MuiOutlinedInput: {
                styleOverrides: {
                    root: {
                        color: "#fff",
                    },
                },
            },
            MuiInputLabel: {
                styleOverrides: {
                    root: {
                        color: "#fff",
                    },
                },
            },
        },
    });

    return (
        <Box sx={{ textAlign: "center" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="Select date"
                    value={props.date}
                    onChange={(newValue) => props.setDate(newValue)}
                    components={{ OpenPickerIcon: ExpandMoreRoundedIcon }}
                    renderInput={(params) => (
                        <ThemeProvider theme={theme}>
                            <TextField
                                {...params}
                                sx={{
                                    fieldset: { borderColor: "#ccc" },
                                }}
                            />
                        </ThemeProvider>
                    )}
                />
            </LocalizationProvider>
        </Box>
    );
};
