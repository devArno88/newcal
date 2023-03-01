import { PageHeader } from "@/src/components";
import {
    E_BookingType,
    I_GymBooking,
    I_Mutator,
    I_NewCalSession,
    I_PoolBooking,
    I_TableBooking,
} from "@/src/interfaces";
import { slotStrings } from "@/src/strings";
import { capitalise, getDateString, isToday, niceDate, sortArrayByDate } from "@/src/utils";
import FitnessCenterTwoToneIcon from "@mui/icons-material/FitnessCenterTwoTone";
import PoolTwoToneIcon from "@mui/icons-material/PoolTwoTone";
import TableBarTwoToneIcon from "@mui/icons-material/TableBarTwoTone";
import { Box, Button, Paper, Stack, Tab, Tabs, Typography } from "@mui/material";
import Link from "next/link";
import { FunctionComponent, ReactNode, SyntheticEvent, useState } from "react";

interface TabPanelProps {
    children?: ReactNode;
    index: number;
    value: number;
}

interface PropTypes extends I_NewCalSession, I_Mutator {
    data: {
        bookings: {
            pool: I_PoolBooking[];
            gym: I_GymBooking[];
            table: I_TableBooking[];
        };
    };
    loading: boolean;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
        sx: { color: "#ccc" },
    };
}

export const MyCalBookings: FunctionComponent<PropTypes> = (props) => {
    const [type, setType] = useState<E_BookingType>(E_BookingType.pool);
    const [value, setValue] = useState(0);
    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
        setType(Object.values(E_BookingType)[newValue]);
    };
    const nowTime = new Date().toLocaleTimeString();
    const today = isToday(nowTime);
    return (
        <Stack gap={4} alignItems="center" justifyContent="center">
            <PageHeader title="My Bookings" subtitle={`${capitalise(type)} Bookings History`} />
            <Link href={`/bookings/${type === E_BookingType.table ? "tables" : type}`}>
                <Button variant="contained" color="info" sx={{ width: { xs: 200, sm: 220, md: 240 }, pl: 1, pr: 1 }}>
                    Find New Booking
                </Button>
            </Link>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab
                        label={
                            <>
                                <PoolTwoToneIcon />
                                Pool
                            </>
                        }
                        {...a11yProps(0)}
                    />
                    <Tab
                        label={
                            <>
                                <FitnessCenterTwoToneIcon />
                                Gym
                            </>
                        }
                        {...a11yProps(1)}
                    />
                    <Tab
                        label={
                            <>
                                <TableBarTwoToneIcon />
                                Tables
                            </>
                        }
                        {...a11yProps(2)}
                    />
                </Tabs>
            </Box>

            <TabPanel value={value} index={0}>
                <Stack gap={4}>
                    <Stack>
                        {props.data?.bookings?.pool.sort(sortArrayByDate).map((x, i) => {
                            const slot = slotStrings.pool.filter((y) => y.slot === x.slot)[0];
                            const isExpired = today
                                ? slot.end <= nowTime
                                : getDateString(new Date(x.date)) < getDateString(new Date());
                            return (
                                <Paper
                                    elevation={3}
                                    key={i}
                                    // onClick={() => (isExpired || isFortnightAway ? undefined : handleBookingForm(slot))}
                                    sx={{
                                        mb: 1.5,
                                        padding: "10px 20px",
                                        // cursor: isExpired ? undefined : "pointer",
                                        bgcolor: isExpired ? "lightgray" : "lightsalmon",
                                    }}
                                >
                                    <Stack sx={{ alignItems: "center" }}>
                                        <Typography variant="h6">
                                            {today ? "Today" : niceDate(new Date(x.date))}
                                        </Typography>
                                        <Typography variant="h6">
                                            {slot.start.slice(0, -3)} - {slot.end.slice(0, -3)}
                                        </Typography>
                                        <Typography variant="body1">
                                            {isExpired ? `Expired` : `Booked by Flat ${x.flat} `}
                                        </Typography>
                                    </Stack>
                                </Paper>
                            );
                        })}
                    </Stack>
                </Stack>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Stack gap={4}>
                    <Stack>
                        {props.data?.bookings?.gym.sort(sortArrayByDate).map((x, i) => {
                            const slot = slotStrings.gym.filter((y) => y.slot === x.slot)[0];
                            const isExpired = today
                                ? slot.end <= nowTime
                                : getDateString(new Date(x.date)) < getDateString(new Date());
                            return (
                                <Paper
                                    elevation={3}
                                    key={i}
                                    // onClick={() => (isExpired || isFortnightAway ? undefined : handleBookingForm(slot))}
                                    sx={{
                                        mb: 1.5,
                                        padding: "10px 20px",
                                        // cursor: isExpired ? undefined : "pointer",
                                        bgcolor: isExpired ? "lightgray" : "lightsalmon",
                                    }}
                                >
                                    <Stack sx={{ alignItems: "center" }}>
                                        <Typography variant="h6">
                                            {today ? "Today" : niceDate(new Date(x.date))}
                                        </Typography>
                                        <Typography variant="h6">
                                            {slot.start.slice(0, -3)} - {slot.end.slice(0, -3)}
                                        </Typography>
                                        <Typography variant="body1">
                                            {isExpired ? `Expired` : `Booked by Flat ${x.flat} `}
                                        </Typography>
                                    </Stack>
                                </Paper>
                            );
                        })}
                    </Stack>
                </Stack>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Stack gap={4}>
                    <Stack>
                        {props.data?.bookings?.table.sort(sortArrayByDate).map((x, i) => {
                            const slot = slotStrings.table.filter((y) => y.slot === x.slot)[0];
                            const isExpired = today
                                ? slot.end <= nowTime
                                : getDateString(new Date(x.date)) < getDateString(new Date());
                            return (
                                <Paper
                                    elevation={3}
                                    key={i}
                                    // onClick={() => (isExpired || isFortnightAway ? undefined : handleBookingForm(slot))}
                                    sx={{
                                        mb: 1.5,
                                        padding: "10px 20px",
                                        // cursor: isExpired ? undefined : "pointer",
                                        bgcolor: isExpired ? "lightgray" : "lightsalmon",
                                    }}
                                >
                                    <Stack sx={{ alignItems: "center" }}>
                                        <Typography variant="h6">
                                            {today ? "Today" : niceDate(new Date(x.date))}
                                        </Typography>
                                        <Typography variant="h6">
                                            {slot.start.slice(0, -3)} - {slot.end.slice(0, -3)}
                                        </Typography>
                                        <Typography variant="body1">
                                            {isExpired ? `Expired` : `Booked by Flat ${x.flat} `}
                                        </Typography>
                                    </Stack>
                                </Paper>
                            );
                        })}
                    </Stack>
                </Stack>
            </TabPanel>
        </Stack>
    );
};
