import { Typography } from "@mui/material";
import { FunctionComponent } from "react";
import { appColors } from "../utils";

interface PropTypes {
    text: string | JSX.Element;
    admin?: boolean;
}

export const PanelHeader: FunctionComponent<PropTypes> = ({ text, admin = false }) => (
    <Typography
        variant="h5"
        fontWeight={500}
        letterSpacing={1.2}
        sx={{ color: admin ? appColors.admin.primary : appColors.primary }}
    >
        {text}
    </Typography>
);

export const PanelTitle: FunctionComponent<PropTypes> = ({ text, admin = false }) => (
    <Typography
        variant="h6"
        sx={{ color: admin ? appColors.admin.secondary : appColors.secondary }}
        letterSpacing={0.8}
    >
        {text}
    </Typography>
);

export const PanelSubtitle: FunctionComponent<PropTypes> = ({ text }) => (
    <Typography sx={{ color: appColors.caption }} letterSpacing={0.5}>
        {text}
    </Typography>
);

export const PanelCaption: FunctionComponent<PropTypes> = (props) => <Typography>{props.text}</Typography>;

export const LandingHeader: FunctionComponent<PropTypes> = ({ text }) => (
    <Typography mt={8} mb={8} variant="h3" textAlign="center" letterSpacing={1} fontWeight={300}>
        {text}
    </Typography>
);
