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
}

export const MyCalDashboard: FunctionComponent<PropTypes> = (props) => {
    const MyCalConfig: DashboardPanel[] = [
        {
            href: "/mycal/bookings",
            element: <BookingsPanel bookings={props.data.bookings} />,
        },
        {
            href: "/mycal/posts",
            element: <PostsPanel posts={props.data.posts} />,
        },
        {
            href: "/mycal/tickets",
            element: <TicketsPanel tickets={props.data.tickets} />,
        },
        { href: null, element: <MailboxPanel mailbox={props.data.mailbox} /> },
    ];

    return (
        <Stack gap={4}>
            <PageHeader title="MyCal" />
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {MyCalConfig.map((x, i) => {
                    const Panel: JSX.Element = (
                        <Grid item xs={12} sm={4} md={6} key={i}>
                            <Item>{x.element}</Item>
                        </Grid>
                    );
                    return x.href ? (
                        <Link href={x.href} key={x.href}>
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
