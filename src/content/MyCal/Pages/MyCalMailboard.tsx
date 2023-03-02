import { updateMailboard } from "@/src/actions/mailboard";
import { PageHeader } from "@/src/components";
import { MailboxSlider } from "@/src/components/MailboxSlider";
import { E_AlertTypes, useAlert } from "@/src/context";
import { I_MailBoard, I_Mutator } from "@/src/interfaces";
import { appColors, fromNowDate } from "@/src/utils";
import { Button, Grid, Paper, Stack, Typography } from "@mui/material";
import { experimentalStyled as styled } from "@mui/material/styles";
import { FunctionComponent, useState } from "react";

interface PropTypes extends I_Mutator {
    mailboard: I_MailBoard;
}

interface ButtonState {
    text: string;
    color: "inherit" | "warning" | "primary" | "secondary" | "success" | "error" | "info";
    disabled: boolean;
}

const Card = styled(Paper)(({ theme }) => ({
    backgroundColor: appColors.card,
    ...theme.typography.body2,
    textAlign: "center",
    color: theme.palette.text.secondary,
    padding: theme.spacing(3),
    borderRadius: "1rem",
}));

const defaultButtonState: ButtonState = {
    color: "warning",
    text: "No changes to save",
    disabled: true,
};

export const MyCalMailboard: FunctionComponent<PropTypes> = (props) => {
    const { setAlert } = useAlert();
    const [mailboardState, setMailboardState] = useState<I_MailBoard>(props.mailboard);
    const [buttonState, setButtonState] = useState<ButtonState>(defaultButtonState);

    const onUpdateMailbox = ({ key, value }: { key: string; value: number }) => {
        if (buttonState.disabled) {
            setButtonState({
                text: "Save Changes",
                color: "primary",
                disabled: false,
            });
        }
        setMailboardState((previousState: I_MailBoard) => ({ ...previousState, [key]: value }));
    };

    const onUpdateMailboard = async (e) => {
        e.preventDefault();
        const updatedMailboard = await updateMailboard({ mailboard: mailboardState });
        if (updatedMailboard.err) setAlert({ type: E_AlertTypes.error, text: updatedMailboard.err });
        if (updatedMailboard.msg) {
            props.mutate();
            setButtonState({
                color: "success",
                text: "Changes Saved",
                disabled: true,
            });
            setAlert({ type: E_AlertTypes.success, text: updatedMailboard.msg });
            const timeout = setTimeout(() => setButtonState(defaultButtonState), 3000);
            return () => clearTimeout(timeout);
        }
    };

    return (
        <Stack gap={4}>
            <PageHeader
                title="Mailboard"
                subtitle={`Last updated ${fromNowDate(new Date(props.mailboard?.updated))}`}
            />
            <Stack sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Button
                    variant="contained"
                    color={buttonState.color}
                    disableRipple={buttonState.disabled}
                    disableTouchRipple={buttonState.disabled}
                    disableFocusRipple={buttonState.disabled}
                    onClick={buttonState.disabled ? undefined : onUpdateMailboard}
                    sx={{
                        pl: 1,
                        pr: 1,
                        width: { xs: 200, sm: 220, md: 240 },
                        border: `1px solid ${appColors.border}`,
                    }}
                >
                    {buttonState.text}
                </Button>
            </Stack>
            <Grid container spacing={{ xs: 2, md: 3 }}>
                {Object.keys(props.mailboard).map((flat, i) => {
                    return ["_id", "__v", "updated"].includes(flat) ? null : (
                        <Grid item xs={12} sm={6} md={4} key={i}>
                            <Card>
                                <Typography variant="h6" sx={{ color: appColors.text.secondary }}>
                                    {flat.replace("Flat", "Flat ")}
                                </Typography>
                                <MailboxSlider
                                    flat={flat}
                                    value={mailboardState[flat]}
                                    onUpdateMailbox={onUpdateMailbox}
                                />
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </Stack>
    );
};
