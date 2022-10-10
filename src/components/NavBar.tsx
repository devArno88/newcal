import * as React from "react";
import AppBar from "@mui/material/AppBar";
import { Toolbar, Box, SvgIconTypeMap, Tooltip } from "@mui/material";
import Container from "@mui/material/Container";
import AuthBar from "./AuthBar";
import Link from "next/link";
import { useSession } from "next-auth/react";
import EventAvailableTwoToneIcon from "@mui/icons-material/EventAvailableTwoTone";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import HouseTwoToneIcon from "@mui/icons-material/HouseTwoTone";
import PushPinTwoToneIcon from "@mui/icons-material/PushPinTwoTone";
import ContactSupportTwoToneIcon from "@mui/icons-material/ContactSupportTwoTone";

interface NavItemData {
    name: string;
    href: string;
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
        muiName: string;
    };
}

const navItems: NavItemData[] = [
    // {
    //     name: "Home",
    //     href: "/",
    //     icon: null,
    // },
    {
        name: "Bookings",
        href: "/bookings",
        icon: EventAvailableTwoToneIcon,
    },
    {
        name: "Listings",
        href: "/listings",
        icon: HouseTwoToneIcon,
    },
    {
        name: "Notices",
        href: "/notices",
        icon: PushPinTwoToneIcon,
    },
    {
        name: "Contact",
        href: "/contact",
        icon: ContactSupportTwoToneIcon,
    },
];

export default function NavBar() {
    const { data: session, status } = useSession();

    return (
        <AppBar position="static" sx={{ pt: 2, pb: 2, bgcolor: "blue" }}>
            <Container maxWidth="xl">
                <Toolbar
                    disableGutters
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Link href="/">
                        <img
                            src="/favicon.ico"
                            alt="NewCal"
                            style={{ height: 50, width: 50, cursor: "pointer" }}
                        />
                    </Link>

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-around",
                            width: { xs: 300, sm: 350, md: 400 },
                        }}
                    >
                        {session
                            ? navItems.map((item: any, i: number) => (
                                  <Link href={item.href} key={i}>
                                      <Tooltip title={item.name}>
                                          <item.icon
                                              sx={{ cursor: "pointer" }}
                                              fontSize="large"
                                          />
                                      </Tooltip>
                                  </Link>
                              ))
                            : null}
                    </Box>

                    <AuthBar session={session} />
                </Toolbar>
            </Container>
        </AppBar>
    );
}
