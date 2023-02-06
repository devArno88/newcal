import FitnessCenterTwoToneIcon from "@mui/icons-material/FitnessCenterTwoTone";
import PoolTwoToneIcon from "@mui/icons-material/PoolTwoTone";
import TableBarTwoToneIcon from "@mui/icons-material/TableBarTwoTone";
import { SvgIconTypeMap, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import { FunctionComponent, ReactElement } from "react";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    cursor: "pointer",
}));

interface BookingCard {
    name: string;
    href: string;
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
        muiName: string;
    };
}

const bookingCardData: BookingCard[] = [
    {
        name: "Pool",
        href: "/bookings/pool",
        icon: PoolTwoToneIcon,
    },
    {
        name: "Gym",
        href: "/bookings/gym",
        icon: FitnessCenterTwoToneIcon,
    },
    {
        name: "Tables",
        href: "/bookings/tables",
        icon: TableBarTwoToneIcon,
    },
];

export const BookingsMenu: FunctionComponent = (): ReactElement => (
    <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={4} justifyContent="center" alignItems="center" display="flex">
            {bookingCardData.map((card: any, i: number) => (
                <Grid item xs={12} sm={10} md={4} key={i}>
                    <Link href={card.href}>
                        <Item>
                            <Typography variant="h5">{card.name}</Typography>
                            <card.icon fontSize="large" sx={{ ml: 1 }} />
                        </Item>
                    </Link>
                </Grid>
            ))}
        </Grid>
    </Box>
);
