import { config } from "@/src/config";
import { E_Roles, I_NewCalSession } from "@/src/interfaces";
import {
    AdminIcons,
    appColors,
    capitalise,
    doubleBreak,
    firstName,
    Icon_Booking,
    Icon_Chat,
    Icon_Dashboard,
    Icon_Developer,
    Icon_Email,
    Icon_Feature,
    Icon_Login,
    Icon_Logout,
    Icon_Mail,
    Icon_Mailboard,
    Icon_Menu,
    Icon_Posts,
    Icon_Tickets,
    Icon_User,
    isAdmin,
    mailtoParameters,
} from "@/src/utils";
import {
    AppBar,
    Avatar,
    Box,
    Button,
    Container,
    IconButton,
    Menu,
    MenuItem,
    Stack,
    Toolbar,
    Tooltip,
    Typography,
} from "@mui/material";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FunctionComponent, MouseEvent, useState } from "react";

const NavData = {
    [E_Roles.resident]: [
        {
            text: "MyCal",
            href: "/mycal",
            Icon: Icon_Dashboard,
        },
        {
            text: "Bookings",
            href: "/bookings",
            Icon: Icon_Booking,
        },
        {
            text: "Posts",
            href: "/posts",
            Icon: Icon_Posts,
        },
        {
            text: "Tickets",
            href: "/tickets",
            Icon: Icon_Tickets,
        },
    ],
    [E_Roles.concierge]: [
        {
            text: "MyCal",
            href: "/mycal",
            Icon: Icon_Dashboard,
        },
        {
            text: "Mailboard",
            href: "/mailboard",
            Icon: Icon_Mailboard,
        },
        {
            text: "Development",
            href: "/development",
            Icon: Icon_Developer,
        },
        {
            text: "Admin Chat",
            href: "/admin-chat",
            Icon: Icon_Chat,
        },
        {
            text: "Bookings",
            href: "/bookings",
            Icon: Icon_Booking,
        },
        {
            text: "Posts",
            href: "/posts",
            Icon: Icon_Posts,
        },
        {
            text: "Tickets",
            href: "/tickets",
            Icon: Icon_Tickets,
        },
    ],
    [E_Roles.management]: [
        {
            text: "MyCal",
            href: "/mycal",
            Icon: Icon_Dashboard,
        },
        {
            text: "Residents",
            href: "/residents",
            Icon: Icon_User,
        },
        {
            text: "Enquiries",
            href: "/enquiries",
            Icon: Icon_Email,
        },
        {
            text: "Admin Chat",
            href: "/admin-chat",
            Icon: Icon_Chat,
        },
        {
            text: "Development",
            href: "/development",
            Icon: Icon_Developer,
        },
        {
            text: "Posts",
            href: "/posts",
            Icon: Icon_Posts,
        },
        {
            text: "Tickets",
            href: "/tickets",
            Icon: Icon_Tickets,
        },
    ],
    [E_Roles.development]: [
        {
            text: "MyCal",
            href: "/mycal",
            Icon: Icon_Dashboard,
        },
        {
            text: "Development",
            href: "/development",
            Icon: Icon_Developer,
        },
        {
            text: "Admin Chat",
            href: "/admin-chat",
            Icon: Icon_Chat,
        },
        {
            text: "Posts",
            href: "/posts",
            Icon: Icon_Posts,
        },
        {
            text: "Tickets",
            href: "/tickets",
            Icon: Icon_Tickets,
        },
    ],
};

const LandingItems = ["home", "highlights", "features", "information", "transport", "contact"];

export const Navigation: FunctionComponent<I_NewCalSession> = (props) => {
    const adminAccount = isAdmin(props.session);
    const Icon = adminAccount ? AdminIcons[props.session.role] : null;
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => setAnchorElNav(event.currentTarget);
    const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => setAnchorElUser(event.currentTarget);
    const handleCloseNavMenu = () => setAnchorElNav(null);
    const handleCloseUserMenu = () => setAnchorElUser(null);
    return (
        <AppBar position="fixed" sx={{ bgcolor: props.session ? appColors.primary : appColors.dark }}>
            <Container maxWidth="md">
                <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
                    <Link href={props.session ? "/mycal" : "/"}>
                        <Box
                            sx={{
                                display: { xs: props.session ? "none" : "flex", md: "flex" },
                                cursor: "pointer",
                                mr: 2,
                            }}
                        >
                            <Image src="/favicon.ico" height={40} width={40} alt="Logo" />
                        </Box>
                    </Link>
                    <Box sx={{ display: props.session ? { xs: "flex", md: "none" } : "none" }}>
                        <IconButton
                            color="inherit"
                            aria-haspopup="true"
                            aria-controls="menu-appbar"
                            onClick={handleOpenNavMenu}
                            aria-label="account of current user"
                            sx={{ border: `2px solid ${appColors.text.secondary}`, bgcolor: appColors.dark }}
                        >
                            <Icon_Menu sx={{ fill: appColors.text.secondary }} />
                        </IconButton>
                        <Menu
                            keepMounted
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: "block", md: "none" } }}
                            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                            transformOrigin={{ vertical: "top", horizontal: "left" }}
                        >
                            {props.session &&
                                NavData[props.session?.role].map((x) => (
                                    <Link key={x.text} href={x.href}>
                                        <MenuItem onClick={handleCloseNavMenu}>
                                            <Stack direction="row" alignItems="center">
                                                <x.Icon fontSize="small" sx={{ mr: 1 }} />
                                                <Typography textAlign="center">{x.text}</Typography>
                                            </Stack>
                                        </MenuItem>
                                    </Link>
                                ))}
                        </Menu>
                    </Box>
                    <Stack direction="row" spacing={3} ml={2} sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                        {props.session &&
                            NavData[props.session?.role].slice(1).map((x) => {
                                return (
                                    <Link href={x.href} key={x.text}>
                                        <IconButton onClick={handleCloseNavMenu}>
                                            <Tooltip title={x.text}>
                                                <x.Icon
                                                    sx={{
                                                        width: { md: 30 },
                                                        height: { md: 30 },
                                                        fill: appColors.text.secondary,
                                                    }}
                                                />
                                            </Tooltip>
                                        </IconButton>
                                    </Link>
                                );
                            })}
                    </Stack>
                    <Stack direction="row">
                        <Stack direction="row">
                            {props.session ? (
                                <Box
                                    sx={{
                                        mt: 0.4,
                                        textAlign: "right",
                                        mr: { xs: 1, sm: 1.2 },
                                    }}
                                >
                                    <strong style={{ fontSize: 15 }}>
                                        {adminAccount ? props.session?.name : firstName(props.session.name)}
                                    </strong>
                                    <br />
                                    <small style={{ fontSize: 13 }}>
                                        {adminAccount ? "NewCal Admin" : `Flat ${props.session.flat}`}
                                    </small>
                                </Box>
                            ) : null}
                            {!props.session ? (
                                <IconButton
                                    color="inherit"
                                    aria-haspopup="true"
                                    aria-controls="menu-appbar"
                                    onClick={handleOpenUserMenu}
                                    aria-label="logged out user menu"
                                    sx={{
                                        display: { xs: "flex", sm: "flex", md: "none" },
                                        border: `2px solid ${appColors.text.secondary}`,
                                        bgcolor: appColors.dark,
                                    }}
                                >
                                    <Icon_Menu sx={{ fill: appColors.text.secondary }} />
                                </IconButton>
                            ) : adminAccount && Icon ? (
                                <Avatar
                                    src="/"
                                    onClick={handleOpenUserMenu}
                                    alt={props.session?.role}
                                    sx={{
                                        cursor: "pointer",
                                        bgcolor: appColors.dark,
                                        border: `2px solid ${appColors.text.secondary}`,
                                    }}
                                >
                                    <Icon sx={{ fill: appColors.text.secondary }} />
                                </Avatar>
                            ) : (
                                <Avatar
                                    onClick={handleOpenUserMenu}
                                    sx={{
                                        cursor: "pointer",
                                        bgcolor: appColors.dark,
                                        border: `2px solid ${appColors.text.secondary}`,
                                    }}
                                    alt={props.session.name}
                                    // src={props.session.user?.image ?? "/user.png"}
                                    src=""
                                />
                            )}
                        </Stack>
                        <Menu
                            keepMounted
                            id="menu-appbar"
                            sx={{ mt: "45px" }}
                            anchorEl={anchorElUser}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                            anchorOrigin={{ vertical: "top", horizontal: "right" }}
                            transformOrigin={{ vertical: "top", horizontal: "right" }}
                        >
                            {props.session && props.session.role === E_Roles.resident ? (
                                <a
                                    style={{ textDecoration: "none", color: appColors.dark }}
                                    {...mailtoParameters({
                                        target: config.managementEmail,
                                        subject: "NewCal Enquiry",
                                        body: `Hi,${doubleBreak}[- ANY ADDITIONAL INFORMATION -]${doubleBreak}Kind regards,${doubleBreak}${props.session.name} - Flat ${props.session.flat}`,
                                    })}
                                >
                                    <MenuItem onClick={handleCloseUserMenu}>
                                        <Stack direction="row" alignItems="center">
                                            <Icon_Mail fontSize="small" sx={{ mr: 1 }} />
                                            <Typography textAlign="center">Contact Management</Typography>
                                        </Stack>
                                    </MenuItem>
                                </a>
                            ) : null}

                            {props.session ? (
                                <Link href="/features">
                                    <MenuItem onClick={handleCloseUserMenu}>
                                        <Stack direction="row" alignItems="center">
                                            <Icon_Feature fontSize="small" sx={{ mr: 1 }} />
                                            <Typography textAlign="center">App Features</Typography>
                                        </Stack>
                                    </MenuItem>
                                </Link>
                            ) : null}

                            {props.session ? (
                                <MenuItem
                                    onClick={(e) => {
                                        e.preventDefault();
                                        signOut({ callbackUrl: "/" });
                                    }}
                                >
                                    <Stack direction="row" alignItems="center">
                                        <Icon_Logout fontSize="small" sx={{ mr: 1 }} />
                                        <Typography textAlign="center">Log Out</Typography>
                                    </Stack>
                                </MenuItem>
                            ) : (
                                LandingItems.map((x) => (
                                    <Link key={x} href={`#${x}`} scroll={false}>
                                        <MenuItem onClick={handleCloseUserMenu}>
                                            <Stack direction="row" alignItems="center">
                                                <Typography textAlign="center">{capitalise(x)}</Typography>
                                            </Stack>
                                        </MenuItem>
                                    </Link>
                                ))
                            )}
                        </Menu>
                        {!props.session ? (
                            <>
                                <Stack
                                    mr={2.5}
                                    spacing={3}
                                    direction="row"
                                    alignItems="center"
                                    display={{ xs: "none", sm: "none", md: "flex" }}
                                >
                                    {LandingItems.map((x) => (
                                        <Link scroll={false} key={x} href={`#${x}`}>
                                            <span style={{ cursor: "pointer" }}>{capitalise(x)}</span>
                                        </Link>
                                    ))}
                                </Stack>
                                <Button
                                    variant="contained"
                                    sx={{
                                        bgcolor: "green",
                                        borderRadius: "2rem",
                                        border: `2px solid ${appColors.text.secondary}`,
                                        display: { xs: "none", sm: "none", md: "flex" },
                                        ml: 1,
                                    }}
                                    href={`/api/auth/signin`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        signIn(null, { callbackUrl: `${process.env.NEXTAUTH_URL}/mycal` });
                                    }}
                                >
                                    Log In
                                </Button>
                                <IconButton
                                    sx={{
                                        bgcolor: "green",
                                        border: `2px solid ${appColors.text.secondary}`,
                                        display: { xs: "flex", sm: "flex", md: "none" },
                                        ml: 1,
                                    }}
                                    href={`/api/auth/signin`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        signIn(null, { callbackUrl: `${process.env.NEXTAUTH_URL}/mycal` });
                                    }}
                                >
                                    <Icon_Login sx={{ fill: appColors.text.secondary }} />
                                </IconButton>
                            </>
                        ) : null}
                    </Stack>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
