import { Stack, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import { IconConfig } from "../content/Bookings";
import { E_BookingType } from "../interfaces";

interface PropTypes {
    title: string;
    subtitle: string;
    type: E_BookingType;
}

export const PageHeader: FunctionComponent<PropTypes> = (props) => {
    const Icon = IconConfig[props.type];
    return (
        <Stack sx={{ textAlign: "center" }}>
            <Stack direction="row" display="flex" alignItems="center" justifyContent="center" marginBottom={1}>
                <Icon fontSize="large" sx={{ mr: 1 }} />
                <Typography variant="h4">{props.title}</Typography>
            </Stack>
            <Typography variant="h6">{props.subtitle}</Typography>
        </Stack>
    );
};
