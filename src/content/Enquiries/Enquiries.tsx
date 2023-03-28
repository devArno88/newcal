import { PageHeader } from "@/src/components";
import { I_Alerter, I_Enquiries, I_Mutator } from "@/src/interfaces";
import { appColors, sortArrayByDate } from "@/src/utils";
import { FormControl, FormHelperText, MenuItem, Select, SelectChangeEvent, Stack, TextField } from "@mui/material";
import { FunctionComponent, ReactElement, useState } from "react";
import { EnquiryCard } from "./EnquiryCard";

interface PropTypes extends I_Enquiries, I_Mutator, I_Alerter {}

export const Enquiries: FunctionComponent<PropTypes> = (props): ReactElement => {
    const inputProps = {
        "aria-label": `enquiry-status-filter`,
        sx: {
            borderRadius: 3,
            color: appColors.text.primary,
            border: `2px solid ${appColors.border}`,
        },
    };
    const sx = { ".MuiSvgIcon-root ": { fill: `${appColors.text.primary} !important` } };
    const [status, setStatus] = useState<string>("");
    const [search, setSearch] = useState<string>("");
    return (
        <Stack spacing={4}>
            <PageHeader title="NewCal Enquiries" subtitle="External Visitor Questions" />
            <Stack direction={{ xs: "column", sm: "row" }} justifyContent="center" spacing={2}>
                <TextField
                    label="Search"
                    variant="outlined"
                    aria-label="enquiry-search-filter"
                    value={search}
                    helperText="ID / Name / Email / Phone number"
                    onChange={(e) => setSearch(e.target.value)}
                    InputProps={{
                        sx: {
                            color: appColors.text.primary,
                            borderRadius: "0.6rem",
                            border: `1px solid ${appColors.border}`,
                        },
                    }}
                    InputLabelProps={{ sx: { color: appColors.text.primary } }}
                    FormHelperTextProps={{ sx: { color: appColors.secondary } }}
                    sx={{
                        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline, & .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline, ":
                            { borderColor: appColors.border },
                    }}
                />
                <FormControl sx={{ minWidth: 150 }}>
                    <Select
                        sx={sx}
                        displayEmpty
                        value={status}
                        inputProps={inputProps}
                        onChange={(event: SelectChangeEvent) => setStatus(event.target.value)}
                    >
                        <MenuItem value="">
                            <em>All</em>
                        </MenuItem>
                        <MenuItem value="open">Open</MenuItem>
                        <MenuItem value="closed">Closed</MenuItem>
                    </Select>
                    <FormHelperText sx={{ color: appColors.secondary }}>Status</FormHelperText>
                </FormControl>
            </Stack>
            <Stack spacing={2}>
                {props.enquiries
                    .filter((x) => (status === "open" ? x.open : x))
                    .filter((x) => (status === "closed" ? !x.open : x))
                    .filter((x) =>
                        search.length
                            ? x.uid.toLowerCase().includes(search.toLowerCase()) ||
                              x.name.toLowerCase().includes(search.toLowerCase()) ||
                              x.email.toLowerCase().includes(search.toLowerCase()) ||
                              x.phone?.toLowerCase().includes(search.toLowerCase())
                            : x
                    )
                    .sort(sortArrayByDate)
                    .map((enquiry) => (
                        <EnquiryCard
                            key={enquiry._id.toString()}
                            setAlert={props.setAlert}
                            mutate={props.mutate}
                            {...enquiry}
                        />
                    ))}
            </Stack>
        </Stack>
    );
};
