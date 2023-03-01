import { appColors } from "@/src/utils";
import { Box, Slider, Typography } from "@mui/material";
import { FunctionComponent } from "react";

interface PropTypes {
    flat: string;
    value: number;
    onUpdateMailbox: ({ key, value }: { key: string; value: number }) => void;
}

// const marks = [
//     { value: 0, label: "0" },
//     { value: 0, label: "0" },
//     { value: 4, label: "4" },
//     { value: 8, label: "8" },
//     { value: 11, label: "10+" },
// ];

export const MailboxSlider: FunctionComponent<PropTypes> = (props) => {
    return (
        <Box sx={{ width: "100%" }}>
            <Typography sx={{ color: appColors.text.primary }}>
                {props.value === 6 ? "5+" : props.value || "No"} item{props.value === 1 ? "" : "s"} to collect
            </Typography>
            <Slider
                marks
                min={0}
                max={6}
                step={1}
                value={props.value}
                name={props.flat}
                valueLabelDisplay="auto"
                aria-label="Small steps"
                onChange={(event, value, activeThumb) =>
                    props.onUpdateMailbox({ key: props.flat, value: value as number })
                }
            />
        </Box>
    );
};
