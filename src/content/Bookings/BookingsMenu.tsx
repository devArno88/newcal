import { PageHeader } from "@/src/components";
import { appColors } from "@/src/utils";
import FitnessCenterTwoToneIcon from "@mui/icons-material/FitnessCenterTwoTone";
import PoolTwoToneIcon from "@mui/icons-material/PoolTwoTone";
import TableBarTwoToneIcon from "@mui/icons-material/TableBarTwoTone";
import { Stack, SvgIconTypeMap, Typography } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import Paper from "@mui/material/Paper";
import Link from "next/link";
import { FunctionComponent, ReactElement } from "react";

const sx = {
    backgroundColor: "#22272D",
    border: `2px solid ${appColors.border}`,
    padding: 1,
    textAlign: "center",
    color: appColors.text.primary,
    borderRadius: "1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    cursor: "pointer",
    width: { xs: "90%", sm: "60%", md: "40%" },
    height: 50,
};

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
    <Stack spacing={4} alignItems="center" justifyContent="center">
        <PageHeader title="NewCal Bookings" subtitle="Residents Booking Suite" />
        {bookingCardData.map((card) => (
            <Link href={card.href} key={card.name}>
                <Paper elevation={5} sx={sx}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <card.icon fontSize="medium" />
                        <Typography variant="h5">{card.name}</Typography>
                        <span>&rarr;</span>
                    </Stack>
                </Paper>
            </Link>
        ))}
    </Stack>
);
