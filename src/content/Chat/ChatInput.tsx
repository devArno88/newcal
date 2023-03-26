import { appColors, Icon_Send } from "@/src/utils";
import { IconButton, Stack, TextField } from "@mui/material";
import { FunctionComponent, KeyboardEvent } from "react";

interface PropTypes {
    text: string;
    onClick: () => void;
    onChange: (e: any) => void;
    onKeyDown: (e: KeyboardEvent<HTMLDivElement>) => void;
}

export const ChatInput: FunctionComponent<PropTypes> = (props) => {
    return (
        <Stack direction="row" alignItems="center" sx={{ height: 60 }}>
            <TextField
                multiline
                maxRows={2}
                value={props.text}
                onChange={props.onChange}
                onKeyDown={props.onKeyDown}
                helperText="⇧ + ⏎ for new line, ⏎ to send"
                InputProps={{
                    sx: {
                        pr: 3,
                        pl: 3,
                        borderRadius: 4,
                        color: appColors.text.primary,
                        borderColor: appColors.primary,
                        border: `1px solid ${appColors.border}`,
                    },
                }}
                InputLabelProps={{ sx: { color: appColors.text.primary } }}
                FormHelperTextProps={{ sx: { color: appColors.secondary } }}
                sx={{ width: "100%" }}
            />
            <IconButton
                disableRipple
                size="large"
                onClick={props.onClick}
                sx={{ mr: 2, ml: 2, bgcolor: appColors.primary, mb: 2 }}
            >
                <Icon_Send fontSize="large" sx={{ fill: appColors.text.primary }} />
            </IconButton>
        </Stack>
    );
};
