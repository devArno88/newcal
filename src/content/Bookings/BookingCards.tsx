import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import PoolTwoToneIcon from "@mui/icons-material/PoolTwoTone";
import FitnessCenterTwoToneIcon from "@mui/icons-material/FitnessCenterTwoTone";
import TableBarTwoToneIcon from "@mui/icons-material/TableBarTwoTone";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap, Typography } from "@mui/material";
import Link from "next/link";

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

export const BookingCards = () => {
    const gridSizing = {
        xs: 12,
        sm: 10,
        md: 4,
        xl: 4,
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid
                container
                spacing={4}
                justifyContent="center"
                alignItems="center"
                display="flex"
            >
                {bookingCardData.map((card: any, i: number) => (
                    <Grid item {...gridSizing} key={i}>
                        <Link href={card.href}>
                            <Item>
                                <Typography variant="h5">
                                    {card.name}
                                </Typography>
                                <card.icon fontSize="large" sx={{ ml: 1 }} />
                            </Item>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};
