import { Box } from "@mui/material";
import { FunctionComponent, ReactNode } from "react";

export const CenterBox: FunctionComponent<{ children: ReactNode }> = ({ children }) => (
    <Box display="flex" alignItems="center" justifyContent="center">
        {children}
    </Box>
);
