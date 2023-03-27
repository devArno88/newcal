import { appColors } from "@/src/utils";
import { FormControl, FormHelperText, MenuItem, Select, SelectChangeEvent, Stack } from "@mui/material";
import { FunctionComponent } from "react";

interface PropTypes {
    status: string;
    type: string;
    handleStatus: (e: SelectChangeEvent) => void;
    handleType: (e: SelectChangeEvent) => void;
}

export const DevelopmentFilters: FunctionComponent<PropTypes> = (props) => {
    const inputProps = (x: string) => ({
        "aria-label": `${x}Filter`,
        sx: {
            borderRadius: 3,
            color: appColors.text.primary,
            border: `2px solid ${appColors.border}`,
        },
    });
    const sx = { ".MuiSvgIcon-root ": { fill: `${appColors.text.primary} !important` } };
    return (
        <Stack direction={{ xs: "column", sm: "row" }} justifyContent="center" spacing={2}>
            <FormControl sx={{ minWidth: 150 }}>
                <Select
                    sx={sx}
                    displayEmpty
                    value={props.status}
                    onChange={props.handleStatus}
                    inputProps={inputProps("status")}
                >
                    <MenuItem value="">
                        <em>All</em>
                    </MenuItem>
                    <MenuItem value="open">Open</MenuItem>
                    <MenuItem value="closed">Closed</MenuItem>
                </Select>
                <FormHelperText sx={{ color: appColors.admin.secondary }}>Status</FormHelperText>
            </FormControl>
            <FormControl sx={{ minWidth: 150 }}>
                <Select
                    sx={sx}
                    displayEmpty
                    value={props.type}
                    onChange={props.handleType}
                    inputProps={inputProps("type")}
                >
                    <MenuItem value="">
                        <em>All</em>
                    </MenuItem>
                    <MenuItem value="functionality">Functionality</MenuItem>
                    <MenuItem value="feature">Feature</MenuItem>
                    <MenuItem value="bug">Bug</MenuItem>
                    <MenuItem value="ui">Interface</MenuItem>
                </Select>
                <FormHelperText sx={{ color: appColors.admin.secondary }}>Type</FormHelperText>
            </FormControl>
        </Stack>
    );
};
