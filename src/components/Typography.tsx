import { Typography } from "@mui/material";
import { FunctionComponent } from "react";
import { appColors } from "../utils";

interface PropTypes {
    text: string;
}

export const PanelHeader: FunctionComponent<PropTypes> = ({ text }) => (
    <Typography variant="h5" fontWeight={500} letterSpacing={1.2} sx={{ color: appColors.primary }}>
        {text}
    </Typography>
);

export const PanelTitle: FunctionComponent<PropTypes> = ({ text }) => (
    <Typography variant="h6" sx={{ color: appColors.secondary }} letterSpacing={0.8}>
        {text}
    </Typography>
);

export const PanelSubtitle: FunctionComponent<PropTypes> = ({ text }) => (
    <Typography sx={{ color: appColors.caption }} letterSpacing={0.5}>
        {text}
    </Typography>
);

export const PanelCaption: FunctionComponent<PropTypes> = (props) => <Typography>{props.text}</Typography>;
