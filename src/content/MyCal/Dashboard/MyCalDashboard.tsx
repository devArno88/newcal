import { PageHeader } from "@/src/components";
import {
    E_Roles,
    I_Chat,
    I_GymBooking,
    I_MailBoard,
    I_Mutator,
    I_NewCalSession,
    I_PoolBooking,
    I_TableBooking,
    I_Tickets,
} from "@/src/interfaces";
import { I_Post, I_Posts } from "@/src/interfaces/post";
import { appColors } from "@/src/utils";
import { Grid, Paper, Stack } from "@mui/material";
import { experimentalStyled as styled } from "@mui/material/styles";
import Link from "next/link";
import { FunctionComponent } from "react";
import { BookingsPanel } from "./BookingsPanel";
import { ChatPanel } from "./ChatPanel";
import { DevelopmentPanel } from "./DevelopmentPanel";
import { MailboardPanel } from "./MailboardPanel";
import { PostsPanel } from "./PostsPanel";
import { TicketsPanel } from "./TicketsPanel";
import { WarningsPanel } from "./WarningsPanel";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: appColors.card,
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: appColors.text.primary,
    cursor: "pointer",
    border: `2px solid ${appColors.border}`,
    borderRadius: "1.5rem",
}));

interface DashboardPanel {
    expand?: boolean;
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
    warnings: I_Post[];
    chat: I_Chat;
}

interface PropTypes extends I_NewCalSession, I_Mutator {
    data: DashboardData;
}

export const MyCalDashboard: FunctionComponent<PropTypes> = (props) => {
    const {
        data: { bookings, posts, tickets, mailbox, mailboard, warnings, chat },
    } = props;
    console.log({ props });
    const MyCalConfig: { [key in E_Roles]: DashboardPanel[] } = {
        [E_Roles.resident]: [
            {
                expand: true,
                href: null,
                element: <WarningsPanel warnings={warnings} />,
            },
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
            { href: null, element: <MailboardPanel session={props.session} mailbox={mailbox} mailboard={mailboard} /> },
        ],
        [E_Roles.management]: [
            {
                expand: true,
                href: null,
                element: <WarningsPanel warnings={warnings} />,
            },
            {
                href: "/development",
                element: <DevelopmentPanel />,
            },
            {
                href: "/admin-chat",
                element: <ChatPanel chat={chat} />,
            },
            {
                href: "/mycal/posts",
                element: <PostsPanel posts={posts} />,
            },
            {
                href: "/mycal/tickets",
                element: <TicketsPanel tickets={tickets} />,
            },
        ],
        [E_Roles.concierge]: [
            {
                expand: true,
                href: null,
                element: <WarningsPanel warnings={warnings} />,
            },
            {
                expand: true,
                href: "/mailboard",
                element: <MailboardPanel session={props.session} mailboard={mailboard} />,
            },
            {
                href: "/admin-chat",
                element: <ChatPanel chat={chat} />,
            },
            {
                href: "/development",
                element: <DevelopmentPanel />,
            },
            {
                href: "/mycal/posts",
                element: <PostsPanel posts={posts} />,
            },
            {
                href: "/mycal/tickets",
                element: <TicketsPanel tickets={tickets} />,
            },
        ],
        [E_Roles.development]: [
            {
                expand: true,
                href: null,
                element: <WarningsPanel warnings={warnings} />,
            },
            {
                href: "/admin-chat",
                element: <ChatPanel chat={chat} />,
            },
            {
                href: "/development",
                element: <DevelopmentPanel />,
            },
            {
                href: "/mycal/posts",
                element: <PostsPanel posts={posts} />,
            },
            {
                href: "/mycal/tickets",
                element: <TicketsPanel tickets={tickets} />,
            },
        ],
    };
    return (
        <Stack gap={4}>
            <PageHeader title="MyCal" subtitle="My NewCal Dashboard" />
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {MyCalConfig[props.session?.role].map((x, i) => {
                    const Panel = (
                        <Grid item xs={12} sm={x.expand ? 12 : 4} md={x.expand ? 12 : 6} key={x.href ? undefined : i}>
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
