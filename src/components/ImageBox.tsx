import { Box } from "@mui/material";
import { ReactNode } from "react";

export const ImageBox = ({
    url,
    children,
    fade,
    center,
}: {
    url: string;
    children: ReactNode;
    fade?: boolean;
    center?: boolean;
}) => {
    const gradient = "linear-gradient(to top, transparent -100%, black 150%), ";
    return (
        <Box
            sx={{
                top: 0,
                left: 0,
                width: "100%",
                pt: center ? 0 : 6,
                pb: center ? 0 : 8,
                backgroundSize: "cover",
                backgroundPosition: "center center",
                display: center ? "flex" : undefined,
                alignItems: center ? "center" : undefined,
                justifyContent: center ? "center" : undefined,
                backgroundImage: `${fade ? gradient : ""}url(${url})`,
                height: center ? { xs: 650, sm: 800, md: 850 } : undefined,
            }}
        >
            {children}
        </Box>
    );
};
