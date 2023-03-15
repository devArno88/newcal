import { Stack, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import { IconConfig } from "../content/Bookings";
import { E_BookingType } from "../interfaces";
import { appColors } from "../utils";

interface PropTypes {
    title: string;
    subtitle?: string;
    type?: E_BookingType;
}

export const PageHeader: FunctionComponent<PropTypes> = (props) => {
    const Icon = props.type ? IconConfig[props.type] : null;
    return (
        <Stack sx={{ textAlign: "center", mt: 3 }}>
            <Stack direction="row" display="flex" alignItems="center" justifyContent="center" marginBottom={1}>
                {Icon ? <Icon fontSize="large" sx={{ mr: 1 }} /> : null}
                <Typography
                    sx={{ color: appColors.text.primary, fontSize: { xs: 26, sm: 28, md: 30 } }}
                    variant="h4"
                    letterSpacing={1}
                >
                    {props.title}
                </Typography>
            </Stack>
            <Typography
                variant="h5"
                fontFamily="monospace"
                sx={{ color: appColors.secondary, fontSize: { xs: 18, sm: 20, md: 22 } }}
            >
                {props.subtitle}
            </Typography>
        </Stack>
    );
};
