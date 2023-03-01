import { Box, CircularProgress } from "@mui/material";

export const Loading = (props) => {
    return (
        <Box display="flex" alignItems="center" justifyContent="center" sx={{ width: "100%" }}>
            <CircularProgress {...props} />
        </Box>
    );
};
