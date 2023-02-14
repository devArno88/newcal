import { PageHeader } from "@/src/components";
import { I_GymBooking, I_PoolBooking, I_TableBooking, I_Tickets } from "@/src/interfaces";
import { I_Posts } from "@/src/interfaces/activity";
import { appColors } from "@/src/utils";
import { Stack } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { experimentalStyled as styled } from "@mui/material/styles";
import Link from "next/link";
import { FunctionComponent } from "react";
import { KeyedMutator } from "swr";
import { BookingsPanel } from "./BookingsPanel";
import { MailboxPanel } from "./MailboxPanel";
import { PostsPanel } from "./PostsPanel";
import { TicketsPanel } from "./TicketsPanel";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: appColors.card,
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: appColors.text.primary,
}));

interface DashboardPanel {
    href: string | null;
    element: JSX.Element;
}

interface DashboardData extends I_Posts, I_Tickets {
    mailbox: {
        items: number;
        updated: Date;
    };
    bookings: {
        pool: I_PoolBooking[];
        gym: I_GymBooking[];
        table: I_TableBooking[];
    };
}

interface PropTypes {
    data: DashboardData;
    loading: boolean;
    mutate: KeyedMutator<any>;
}

export const MyCalDashboard: FunctionComponent<PropTypes> = (props) => {
    const {
        data: { bookings, posts, tickets, mailbox },
    } = props;
    const MyCalConfig: DashboardPanel[] = [
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
        { href: null, element: <MailboxPanel mailbox={mailbox} /> },
    ];
    return (
        <Stack gap={4}>
            <PageHeader title="MyCal" subtitle="My NewCal Dashboard" />
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {MyCalConfig.map((x, i) => {
                    const Panel = (
                        <Grid item xs={12} sm={4} md={6} key={x.href ? undefined : i}>
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
