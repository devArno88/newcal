import BusinessTwoToneIcon from "@mui/icons-material/BusinessTwoTone";
import ContactSupportTwoToneIcon from "@mui/icons-material/ContactSupportTwoTone";
import EventAvailableTwoToneIcon from "@mui/icons-material/EventAvailableTwoTone";
import HouseTwoToneIcon from "@mui/icons-material/HouseTwoTone";
import PushPinTwoToneIcon from "@mui/icons-material/PushPinTwoTone";
import { Box, SvgIconTypeMap, Toolbar, Tooltip } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { useSession } from "next-auth/react";
import Link from "next/link";
import AuthBar from "./AuthBar";

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
        <AppBar position="static" sx={{ bgcolor: "#333" }}>
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
                        <BusinessTwoToneIcon fontSize="large" sx={{ cursor: "pointer" }} />
                        {/* <img src="/favicon.ico" alt="NewCal" style={{ height: 50, width: 50, cursor: "pointer" }} /> */}
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
                                          <item.icon sx={{ cursor: "pointer", color: "gree" }} fontSize="large" />
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
