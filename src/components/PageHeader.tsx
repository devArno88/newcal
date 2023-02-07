import { Stack, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import { IconConfig } from "../content/Bookings";
import { E_BookingType } from "../interfaces";

interface PropTypes {
    title: string;
    subtitle?: string;
    type?: E_BookingType;
}

export const PageHeader: FunctionComponent<PropTypes> = (props) => {
    const Icon = props.type ? IconConfig[props.type] : null;
    return (
        <Stack sx={{ textAlign: "center" }}>
            <Stack direction="row" display="flex" alignItems="center" justifyContent="center" marginBottom={1}>
                {Icon ? <Icon fontSize="large" sx={{ mr: 1 }} /> : null}
                <Typography variant="h4">{props.title}</Typography>
            </Stack>
            <Typography variant="h6">{props.subtitle}</Typography>
        </Stack>
    );
};
