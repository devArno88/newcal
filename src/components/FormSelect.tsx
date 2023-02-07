import { FormHelperText, Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { appColors, capitalise } from "../utils";

export const FormSelect = ({ options, value, onChange, helperText }) => {
    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <Select
                    required
                    sx={{
                        borderRadius: 1,
                        border: `2px solid ${appColors.border}`,
                        color: "white",
                        fontSize: 18,
                        // "& .MuiOutlinedInput-notchedOutline": {
                        //     borderColor: "gray",
                        // },
                        "& .MuiSvgIcon-root": {
                            color: appColors.text.primary,
                        },
                    }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="type"
                    value={value}
                    onChange={onChange}
                    renderValue={(p) => capitalise(p)}
                >
                    {options.map((o) => (
                        <MenuItem key={o.title} value={o.title}>
                            <Stack>
                                <Typography variant="body1">{capitalise(o.title)}</Typography>
                                <Typography variant="caption">{o.subtitle}</Typography>
                            </Stack>
                        </MenuItem>
                    ))}
                </Select>
                <FormHelperText sx={{ color: "greenyellow" }}>{helperText}</FormHelperText>
            </FormControl>
        </Box>
    );
};
