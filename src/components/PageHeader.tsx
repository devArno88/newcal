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
                    sx={{ color: appColors.text.primary, fontSize: { xs: "1.8rem", sm: "1.9rem", md: "2rem" } }}
                    variant="h4"
                    letterSpacing={1}
                >
                    {props.title}
                </Typography>
            </Stack>
            <Typography
                variant="h5"
                fontFamily="monospace"
                sx={{ color: appColors.secondary, fontSize: { xs: "1.2rem", sm: "1.3rem", md: "1.4rem" } }}
            >
                {props.subtitle}
            </Typography>
        </Stack>
    );
};
