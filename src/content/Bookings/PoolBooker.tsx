import React from "react";
import CustomDatePicker from "@/components/CustomDatePicker";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

interface PoolBookerProps {}

interface Booking {
    slot: number;
    time: string;
}

const poolTimes: Booking[] = [
    { slot: 1, time: "05:00 - 05:45" },
    { slot: 2, time: "05:45 - 06:30" },
    { slot: 3, time: "06:30 - 07:15" },
    { slot: 4, time: "07:15 - 08:00" },
    { slot: 5, time: "08:00 - 08:45" },
    { slot: 6, time: "08:45 - 09:30" },
    { slot: 7, time: "09:30 - 10:15" },
    { slot: 8, time: "10:15 - 11:00" },
    { slot: 9, time: "11:00 - 11:45" },
    { slot: 10, time: "11:45 - 12:30" },
    { slot: 11, time: "12:30 - 13:15" },
    { slot: 12, time: "13:15 - 14:00" },
    { slot: 13, time: "14:00 - 14:45" },
    { slot: 14, time: "14:45 - 15:30" },
    { slot: 15, time: "15:30 - 16:15" },
    { slot: 16, time: "16:15 - 17:00" },
    { slot: 17, time: "17:00 - 17:45" },
    { slot: 18, time: "17:45 - 18:30" },
    { slot: 19, time: "18:30 - 19:15" },
    { slot: 20, time: "19:15 - 20:00" },
    { slot: 21, time: "20:00 - 20:45" },
    { slot: 22, time: "20:45 - 21:30" },
    { slot: 23, time: "21:30 - 22:15" },
];

export const PoolBooker: React.FunctionComponent<PoolBookerProps> = (props) => {
    React.useEffect(() => {
        async function fetchIt() {
            await fetch(`/api/pool`)
                .then((response) => response.json())
                .then((data) => console.log(data));
        }

        fetchIt();
    }, []);

    const gridSys: any = {
        xs: 12,
        sm: 12,
        md: 6,
        xl: 6,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
    };

    return (
        <>
            <Box sx={{ textAlign: "center", mb: 8 }}>
                <Typography variant="h4">NewCal Bookings</Typography>
                <Typography variant="h5">Swimming Pool</Typography>
            </Box>

            <Grid container spacing={4}>
                <Grid item {...gridSys}>
                    <CustomDatePicker />
                </Grid>
                <Grid item {...gridSys}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",
                            // overflowY: "scroll",
                            // height: 600,
                        }}
                    >
                        {poolTimes.map((booking: Booking, i: number) => (
                            <Paper sx={{ p: 2, mb: 2, cursor: "pointer" }} key={i}>
                                <Typography>{booking.time}</Typography>
                            </Paper>
                        ))}
                    </Box>
                </Grid>
            </Grid>
        </>
    );
};
