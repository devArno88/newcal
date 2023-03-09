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
                sx={{ width: "100%" }}
                onChange={props.onChange}
                onKeyDown={props.onKeyDown}
                helperText="⇧ + ⏎ for new line, ⏎ to send"
                FormHelperTextProps={{ sx: { color: appColors.text.primary } }}
                InputProps={{
                    sx: {
                        pr: 3,
                        pl: 3,
                        borderRadius: 4,
                        color: appColors.text.primary,
                        border: `2px solid ${appColors.primary}`,
                    },
                }}
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
