import { FormHelperText } from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import * as React from "react";
import { appColors } from "../utils";

export const FormSelect = () => {
    const [age, setAge] = React.useState("");

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <Select
                    sx={{
                        color: "white",
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "gray",
                        },
                        "& .MuiSvgIcon-root": {
                            color: appColors.text.primary,
                        },
                    }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    onChange={handleChange}
                >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
                <FormHelperText sx={{ color: "greenyellow" }}>With label + helper text</FormHelperText>
            </FormControl>
        </Box>
    );
};
