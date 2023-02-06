import { AlertState, useAlert } from "@/context";
// import { capitalise } from "@/utils";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InfoIcon from "@mui/icons-material/Info";
import ReportIcon from "@mui/icons-material/Report";
import WarningIcon from "@mui/icons-material/Warning";
import { Alert, Box, Typography } from "@mui/material";
import { FunctionComponent } from "react";

export const AlertBar: FunctionComponent<AlertState> = (props): JSX.Element => {
    const { closeAlert } = useAlert();
    const { open, title, subtitle, type } = props;

    const icons = {
        success: <CheckCircleIcon />,
        warning: <WarningIcon />,
        danger: <ReportIcon />,
        info: <InfoIcon />,
    };

    const AlertIcon = icons[type ?? "info"];

    return (
        <Box
            sx={{
                pl: 3,
                pr: 4,
                gap: 2,
                width: "100%",
                zIndex: 10000000,
                position: "fixed",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center",
                bottom: { xs: 32, sm: 20 },
                display: open ? "flex" : "none",
            }}
        >
            <Alert
                key={title}
                data-cyid="app-alert"
                sx={{ alignItems: "flex-start" }}
                // startDecorator={cloneElement(AlertIcon, {
                //     fontSize: "xl2",
                //     sx: { mt: "2px", mx: "4px" },
                // })}
                // variant="solid"
                color={type}
                // endDecorator={
                //     <IconButton sx={{ ml: 2 }} variant="solid" size="sm" color={type} onClick={() => closeAlert()}>
                //         <CloseRoundedIcon />
                //     </IconButton>
                // }
            >
                <div>
                    <Typography fontWeight="lg" mt={0.25} sx={{ wordBreak: "break-word" }}>
                        {title ?? type}
                    </Typography>
                    {subtitle ? (
                        <Typography fontSize="sm" sx={{ opacity: 0.8, wordBreak: "break-word" }}>
                            {subtitle}
                        </Typography>
                    ) : null}
                </div>
            </Alert>
        </Box>
    );
};
