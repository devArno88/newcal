import { I_NewCalSession } from "@/src/interfaces";
import BusinessTwoToneIcon from "@mui/icons-material/BusinessTwoTone";
import { AppBar, Box, Container, SvgIconTypeMap, Toolbar, Tooltip } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import Link from "next/link";
import { FunctionComponent } from "react";
import { Icon_Booking, Icon_Dashboard, Icon_Posts, Icon_Tickets } from "../utils";
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
        icon: Icon_Dashboard,
    },
    {
        name: "Bookings",
        href: "/bookings",
        icon: Icon_Booking,
    },
    {
        name: "Activity",
        href: "/posts",
        icon: Icon_Posts,
    },
    {
        name: "Tickets",
        href: "/tickets",
        icon: Icon_Tickets,
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
