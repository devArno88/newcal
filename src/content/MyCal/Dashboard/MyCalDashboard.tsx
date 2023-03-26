import { PageHeader } from "@/src/components";
import {
    E_Roles,
    I_Chat,
    I_Enquiry,
    I_GymBooking,
    I_MailBoard,
    I_Mutator,
    I_NewCalSession,
    I_PoolBooking,
    I_Resident,
    I_TableBooking,
    I_Tickets,
} from "@/src/interfaces";
import { I_Post, I_Posts } from "@/src/interfaces/post";
import { appColors, capitalise, isAdmin } from "@/src/utils";
import { Grid, Paper, Stack } from "@mui/material";
import { experimentalStyled as styled } from "@mui/material/styles";
import Link from "next/link";
import { FunctionComponent } from "react";
import { BookingsPanel } from "./BookingsPanel";
import { ChatPanel } from "./ChatPanel";
import { DevelopmentPanel } from "./DevelopmentPanel";
import { EnquiriesPanel } from "./EnquiriesPanel";
import { InfoPanel } from "./InfoPanel";
import { MailboardPanel } from "./MailboardPanel";
import { PostsPanel } from "./PostsPanel";
import { ResidentsPanel } from "./ResidentsPanel";
import { TicketsPanel } from "./TicketsPanel";
import { WarningsPanel } from "./WarningsPanel";

const Item = styled(Paper)(() => ({
    padding: 16,
    textAlign: "center",
    borderRadius: "1.5rem",
    color: appColors.text.primary,
    backgroundColor: appColors.card,
    border: `2px solid ${appColors.border}`,
}));

interface DashboardPanel {
    id: string;
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
    enquiries: I_Enquiry[];
    residents: I_Resident[];
}

interface PropTypes extends I_NewCalSession, I_Mutator {
    data: DashboardData;
}

export const MyCalDashboard: FunctionComponent<PropTypes> = (props) => {
    const {
        data: { bookings, posts, tickets, mailbox, mailboard, warnings, chat, enquiries, residents },
    } = props;
    const MyCalConfig: { [key in E_Roles]: DashboardPanel[] } = {
        [E_Roles.resident]: [
            {
                id: "resident_warnings",
                expand: true,
                href: null,
                element: <WarningsPanel warnings={warnings} />,
            },
            {
                id: "resident_info",
                expand: false,
                href: null,
                element: <InfoPanel session={props.session} mailbox={mailbox} />,
            },
            {
                id: "resident_bookings",
                expand: false,
                href: "/mycal/bookings",
                element: <BookingsPanel bookings={bookings} />,
            },
            {
                id: "resident_posts",
                expand: false,
                href: "/mycal/posts",
                element: <PostsPanel posts={posts} />,
            },
            {
                id: "resident_tickets",
                expand: false,
                href: "/mycal/tickets",
                element: <TicketsPanel tickets={tickets} />,
            },
            // { href: null, element: <MailboardPanel session={props.session} mailbox={mailbox} mailboard={mailboard} /> },
        ],
        [E_Roles.management]: [
            {
                id: "management_warnings",
                expand: true,
                href: null,
                element: <WarningsPanel warnings={warnings} />,
            },
            {
                id: "management_residents",
                expand: false,
                href: "/residents",
                element: <ResidentsPanel residents={residents} />,
            },
            {
                id: "management_enquiries",
                expand: false,
                href: "/enquiries",
                element: <EnquiriesPanel enquiries={enquiries} />,
            },
            {
                id: "management_chat",
                expand: false,
                href: "/admin-chat",
                element: <ChatPanel chat={chat} />,
            },
            {
                id: "management_development",
                expand: false,
                href: "/development",
                element: <DevelopmentPanel />,
            },
            {
                id: "management_posts",
                expand: false,
                href: "/mycal/posts",
                element: <PostsPanel posts={posts} />,
            },
            {
                id: "management_tickets",
                expand: false,
                href: "/mycal/tickets",
                element: <TicketsPanel tickets={tickets} />,
            },
        ],
        [E_Roles.concierge]: [
            {
                id: "concierge_warnings",
                expand: true,
                href: null,
                element: <WarningsPanel warnings={warnings} />,
            },
            {
                id: "concierge_mailboard",
                expand: true,
                href: "/mailboard",
                element: <MailboardPanel session={props.session} mailboard={mailboard} />,
            },
            {
                id: "concierge_chat",
                expand: false,
                href: "/admin-chat",
                element: <ChatPanel chat={chat} />,
            },
            {
                id: "concierge_development",
                expand: false,
                href: "/development",
                element: <DevelopmentPanel />,
            },
            {
                id: "concierge_posts",
                expand: false,
                href: "/mycal/posts",
                element: <PostsPanel posts={posts} />,
            },
            {
                id: "concierge_tickets",
                expand: false,
                href: "/mycal/tickets",
                element: <TicketsPanel tickets={tickets} />,
            },
        ],
        [E_Roles.development]: [
            {
                id: "development_warnings",
                expand: true,
                href: null,
                element: <WarningsPanel warnings={warnings} />,
            },
            {
                id: "development_chat",
                expand: false,
                href: "/admin-chat",
                element: <ChatPanel chat={chat} />,
            },
            {
                id: "development_development",
                expand: false,
                href: "/development",
                element: <DevelopmentPanel />,
            },
            {
                id: "development_posts",
                expand: false,
                href: "/mycal/posts",
                element: <PostsPanel posts={posts} />,
            },
            {
                id: "development_tickets",
                expand: false,
                href: "/mycal/tickets",
                element: <TicketsPanel tickets={tickets} />,
            },
        ],
    };
    return (
        <Stack gap={4}>
            <PageHeader
                title="MyCal"
                subtitle={`${isAdmin(props.session) ? capitalise(props.session?.role) : "My NewCal"} Dashboard`}
            />
            <Grid columns={{ xs: 4, sm: 8, md: 12 }} container spacing={{ xs: 2, md: 3 }}>
                {MyCalConfig[props.session?.role].map((x) => {
                    const expand = x.id.includes("warnings") || x.id.includes("mailboard");
                    const Panel = (
                        <Grid item xs={12} sm={expand ? 12 : 4} md={expand ? 12 : 6} key={x.href ? undefined : x.id}>
                            <Item
                                sx={{
                                    "&:hover": {
                                        border: `2px solid ${appColors[x.href ? "primary" : "border"]}`,
                                    },
                                    cursor: x.id === "resident_info" ? undefined : "pointer",
                                }}
                            >
                                {x.element}
                            </Item>
                        </Grid>
                    );
                    return x.href ? (
                        <Link href={x.href} key={x.id}>
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
