import { E_Roles, I_NewCalSession } from "@/src/interfaces";
import {
    AdminIcons,
    appColors,
    capitalise,
    Icon_Booking,
    Icon_Chat,
    Icon_Dashboard,
    Icon_Developer,
    Icon_Logout,
    Icon_Mailboard,
    Icon_Menu,
    Icon_Posts,
    Icon_Tickets,
    isAdmin,
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
    const [anchorElLanding, setAnchorElLanding] = useState<null | HTMLElement>(null);
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const handleOpenLandingMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElLanding(event.currentTarget);
    };
    const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => setAnchorElNav(event.currentTarget);
    const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => setAnchorElUser(event.currentTarget);
    const handleCloseNavLanding = () => setAnchorElLanding(null);
    const handleCloseNavMenu = () => setAnchorElNav(null);
    const handleCloseUserMenu = () => setAnchorElUser(null);
    return (
        <AppBar position="sticky" sx={{ bgcolor: props.session ? appColors.primary : appColors.dark }}>
            <Container maxWidth="md">
                <Toolbar disableGutters>
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
                    <Box sx={{ flexGrow: 1, display: props.session ? { xs: "flex", md: "none" } : "none" }}>
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
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
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
                                                        height: { md: 30 },
                                                        width: { md: 30 },
                                                        fill: appColors.text.secondary,
                                                    }}
                                                />
                                            </Tooltip>
                                        </IconButton>
                                    </Link>
                                );
                            })}
                    </Stack>
                    {props.session ? (
                        <Box>
                            <Stack direction="row">
                                {adminAccount && Icon ? (
                                    <Avatar
                                        src="/"
                                        onClick={handleOpenUserMenu}
                                        alt={props.session?.role}
                                        sx={{
                                            mr: { xs: 0, sm: 1.2 },
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
                                            mr: { xs: 0, sm: 1.2 },
                                            cursor: "pointer",
                                            border: `2px solid ${appColors.text.secondary}`,
                                        }}
                                        alt={props.session.name}
                                        src={props.session.user?.image ?? "/user.png"}
                                    />
                                )}
                                <Box sx={{ display: { xs: "none", sm: "block", overflow: "none" }, mt: 0.4 }}>
                                    <strong style={{ fontSize: 15 }}>
                                        {adminAccount ? props.session?.name : props.session.name.split(" ")[0]}
                                    </strong>
                                    <br />
                                    <small style={{ fontSize: 13 }}>
                                        {adminAccount ? "NewCal Admin" : `Flat ${props.session.flat}`}
                                    </small>
                                </Box>
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
                            </Menu>
                        </Box>
                    ) : (
                        <>
                            {/* <IconButton
                                color="inherit"
                                aria-haspopup="true"
                                aria-controls="menu-landing"
                                onClick={handleOpenLandingMenu}
                                aria-label="menu-landing"
                                sx={{ border: `2px solid ${appColors.text.secondary}`, bgcolor: appColors.dark }}
                            >
                                <Icon_Menu sx={{ fill: appColors.text.secondary }} />
                            </IconButton>
                            <Menu
                                id="menu-landing"
                                anchorEl={anchorElLanding}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "left",
                                }}
                                open={Boolean(anchorElLanding)}
                                onClose={handleCloseNavLanding}
                                sx={{
                                    display: { xs: "block", md: "none" },
                                }}
                            >
                                {LandingItems.map((x) => (
                                    <Link key={x} href={`#${x}`}>
                                        <MenuItem onClick={handleCloseNavLanding}>
                                            <Stack direction="row" alignItems="center">
                                                <Typography textAlign="center">{capitalise(x)}</Typography>
                                            </Stack>
                                        </MenuItem>
                                    </Link>
                                ))}
                            </Menu> */}
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
                                sx={{ bgcolor: "green", borderRadius: "2rem" }}
                                href={`/api/auth/signin`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    signIn(null, { callbackUrl: `${process.env.NEXTAUTH_URL}/mycal` });
                                }}
                            >
                                Log In
                            </Button>
                        </>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
};
