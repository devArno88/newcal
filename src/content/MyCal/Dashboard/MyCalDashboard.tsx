import { PageHeader } from "@/src/components";
import {
    E_Roles,
    I_GymBooking,
    I_MailBoard,
    I_Mutator,
    I_NewCalSession,
    I_PoolBooking,
    I_TableBooking,
    I_Tickets,
} from "@/src/interfaces";
import { I_Posts } from "@/src/interfaces/post";
import { appColors, isAdmin } from "@/src/utils";
import { Grid, Paper, Stack } from "@mui/material";
import { experimentalStyled as styled } from "@mui/material/styles";
import Link from "next/link";
import { FunctionComponent } from "react";
import { BookingsPanel } from "./BookingsPanel";
import { MailboardPanel } from "./MailboardPanel";
import { PostsPanel } from "./PostsPanel";
import { TicketsPanel } from "./TicketsPanel";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: appColors.card,
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: appColors.text.primary,
    cursor: "pointer",
}));

interface DashboardPanel {
    href: string | null;
    element: JSX.Element;
}

interface DashboardData extends I_Posts, I_Tickets {
    mailboard?: I_MailBoard;
    mailbox?: {
        items: number;
        updated: Date;
    };
    bookings?: {
        pool: I_PoolBooking[];
        gym: I_GymBooking[];
        table: I_TableBooking[];
    };
}

interface PropTypes extends I_NewCalSession, I_Mutator {
    data: DashboardData;
}

export const MyCalDashboard: FunctionComponent<PropTypes> = (props) => {
    const {
        data: { bookings, posts, tickets, mailbox, mailboard },
    } = props;
    const MyCalConfig: { [key in E_Roles]: DashboardPanel[] } = {
        [E_Roles.resident]: [
            {
                href: "/mycal/bookings",
                element: <BookingsPanel bookings={bookings} />,
            },
            {
                href: "/mycal/posts",
                element: <PostsPanel posts={posts} />,
            },
            {
                href: "/mycal/tickets",
                element: <TicketsPanel tickets={tickets} />,
            },
            { href: null, element: <MailboardPanel isAdmin={isAdmin(props.session)} mailbox={mailbox} /> },
        ],
        [E_Roles.management]: [
            {
                href: "/mycal/posts",
                element: <PostsPanel posts={posts} />,
            },
            {
                href: "/mycal/tickets",
                element: <TicketsPanel tickets={tickets} />,
            },
            // {
            //     href: "/admin-chat",
            //     element: <ChatPanel />,
            // },
        ],
        [E_Roles.concierge]: [
            {
                href: "/mailboard",
                element: <MailboardPanel isAdmin={isAdmin(props.session)} mailboard={mailboard} />,
            },
            {
                href: "/mycal/posts",
                element: <PostsPanel posts={posts} />,
            },
            {
                href: "/mycal/tickets",
                element: <TicketsPanel tickets={tickets} />,
            },
            // {
            //     href: "/admin-chat",
            //     element: <ChatPanel />,
            // },
        ],
        [E_Roles.development]: [
            {
                href: "/mycal/posts",
                element: <PostsPanel posts={posts} />,
            },
            {
                href: "/mycal/tickets",
                element: <TicketsPanel tickets={tickets} />,
            },
            // {
            //     href: "/admin-chat",
            //     element: <ChatPanel />,
            // },
        ],
    };
    return (
        <Stack gap={4}>
            <PageHeader title="MyCal" subtitle="My NewCal Dashboard" />
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {MyCalConfig[props.session?.role].map((x, i) => {
                    const Panel = (
                        <Grid
                            item
                            xs={12}
                            sm={isAdmin(props.session) && x.href === "/mailboard" ? 12 : 4}
                            md={isAdmin(props.session) && x.href === "/mailboard" ? 12 : 6}
                            key={x.href ? undefined : i}
                        >
                            <Item>{x.element}</Item>
                        </Grid>
                    );
                    return x.href ? (
                        <Link href={x.href} key={i}>
                            {Panel}
                        </Link>
                    ) : (
                        Panel
                    );
                })}
            </Grid>
        </Stack>
    );
};
