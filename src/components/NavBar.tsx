import BusinessTwoToneIcon from "@mui/icons-material/BusinessTwoTone";
import DashboardTwoToneIcon from "@mui/icons-material/DashboardTwoTone";
import EventAvailableTwoToneIcon from "@mui/icons-material/EventAvailableTwoTone";
import WarningTwoToneIcon from "@mui/icons-material/WarningTwoTone";
import WhatshotTwoToneIcon from "@mui/icons-material/WhatshotTwoTone";
import { Box, SvgIconTypeMap, Toolbar, Tooltip } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import Link from "next/link";
import { FunctionComponent } from "react";
import { I_NewCalSession } from "../interfaces";
import AuthBar from "./AuthBar";

interface NavItemData {
    name: string;
    href: string;
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
        muiName: string;
    };
}

const navItems: NavItemData[] = [
    {
        name: "MyCal",
        href: "/mycal",
        icon: DashboardTwoToneIcon,
    },
    {
        name: "Bookings",
        href: "/bookings",
        icon: EventAvailableTwoToneIcon,
    },
    {
        name: "Activity",
        href: "/posts",
        icon: WhatshotTwoToneIcon,
    },
    {
        name: "Tickets",
        href: "/tickets",
        icon: WarningTwoToneIcon,
    },
];

interface PropTypes extends I_NewCalSession {}

export const NavBar: FunctionComponent<PropTypes> = (props) => {
    return (
        <AppBar position="sticky" sx={{ bgcolor: "#0d1117" }}>
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
                    </Link>

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-around",
                            width: { xs: 300, sm: 350, md: 400 },
                        }}
                    >
                        {props.session
                            ? navItems.map((item) => {
                                  return (
                                      <Link href={item.href} key={item.href}>
                                          <Tooltip title={item.name}>
                                              <item.icon sx={{ cursor: "pointer", color: "gree" }} fontSize="large" />
                                          </Tooltip>
                                      </Link>
                                  );
                              })
                            : null}
                    </Box>

                    <AuthBar session={props.session} />
                </Toolbar>
            </Container>
        </AppBar>
    );
};
