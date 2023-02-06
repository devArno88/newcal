import { Stack, Typography } from "@mui/material";
import { FunctionComponent } from "react";

interface PropTypes {
    title: string;
    subtitle: string;
}

export const PageHeader: FunctionComponent<PropTypes> = (props) => {
    return (
        <Stack sx={{ textAlign: "center", mb: 4 }}>
            <Typography variant="h4">{props.title}</Typography>
            <Typography variant="h5">{props.subtitle}</Typography>
        </Stack>
    );
};
