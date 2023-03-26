// import { E_Roles, I_Chat, I_Enquiry, I_GymBooking, I_MailBoard, I_Mutator, I_NewCalSession, I_PoolBooking, I_Post, I_Posts, I_Resident, I_TableBooking, I_Tickets } from "@/src/interfaces";
// import { BookingsPanel } from "./BookingsPanel";
// import { ChatPanel } from "./ChatPanel";
// import { DevelopmentPanel } from "./DevelopmentPanel";
// import { EnquiriesPanel } from "./EnquiriesPanel";
// import { MailboardPanel } from "./MailboardPanel";
// import { PostsPanel } from "./PostsPanel";
// import { ResidentsPanel } from "./ResidentsPanel";
// import { TicketsPanel } from "./TicketsPanel";
// import { WarningsPanel } from "./WarningsPanel";

// interface DashboardPanel {
//     expand?: boolean;
//     href: string | null;
//     element: JSX.Element;
// }

// interface DashboardData extends I_Posts, I_Tickets {
//     mailboard?: I_MailBoard;
//     mailbox?: {
//         items: number;
//         updated: Date;
//     };
//     bookings?: {
//         pool: I_PoolBooking[];
//         gym: I_GymBooking[];
//         table: I_TableBooking[];
//     };
//     warnings: I_Post[];
//     chat: I_Chat;
//     enquiries: I_Enquiry[];
//     residents: I_Resident[];
// }

// interface PropTypes extends I_NewCalSession, I_Mutator {
//     data: DashboardData;
// }

// export const MyCalConfig = (props: PropTypes): { [key in E_Roles]: DashboardPanel[] } => ({
//     [E_Roles.resident]: [
//         {
//             expand: true,
//             href: null,
//             element: <WarningsPanel warnings={props.warnings} />,
//         },
//         {
//             expand: false,
//             href: "/mycal/bookings",
//             element: <BookingsPanel bookings={props.bookings} />,
//         },
//         {
//             expand: false,
//             href: "/mycal/posts",
//             element: <PostsPanel posts={props.posts} />,
//         },
//         {
//             expand: false,
//             href: "/mycal/tickets",
//             element: <TicketsPanel tickets={props.tickets} />,
//         },
//         { href: null, element: <MailboardPanel session={props.session} mailbox={props.mailbox} mailboard={props.mailboard} /> },
//     ],
//     [E_Roles.management]: [
//         {
//             expand: true,
//             href: null,
//             element: <WarningsPanel warnings={props.warnings} />,
//         },
//         {
//             expand: false,
//             href: "/residents",
//             element: <ResidentsPanel residents={props.residents} />,
//         },
//         {
//             expand: false,
//             href: "/enquiries",
//             element: <EnquiriesPanel enquiries={props.enquiries} />,
//         },
//         {
//             expand: false,
//             href: "/admin-chat",
//             element: <ChatPanel chat={props.chat} />,
//         },
//         {
//             expand: false,
//             href: "/development",
//             element: <DevelopmentPanel />,
//         },
//         {
//             expand: false,
//             href: "/mycal/posts",
//             element: <PostsPanel posts={props.posts} />,
//         },
//         {
//             expand: false,
//             href: "/mycal/tickets",
//             element: <TicketsPanel tickets={props.tickets} />,
//         },
//     ],
//     [E_Roles.concierge]: [
//         {
//             expand: true,
//             href: null,
//             element: <WarningsPanel warnings={props.warnings} />,
//         },
//         {
//             expand: true,
//             href: "/mailboard",
//             element: <MailboardPanel session={props.props.session} mailboard={props.mailboard} />,
//         },
//         {
//             expand: false,
//             href: "/admin-chat",
//             element: <ChatPanel chat={props.chat} />,
//         },
//         {
//             expand: false,
//             href: "/development",
//             element: <DevelopmentPanel />,
//         },
//         {
//             expand: false,
//             href: "/mycal/posts",
//             element: <PostsPanel posts={props.posts} />,
//         },
//         {
//             expand: false,
//             href: "/mycal/tickets",
//             element: <TicketsPanel tickets={props.tickets} />,
//         },
//     ],
//     [E_Roles.development]: [
//         {
//             expand: true,
//             href: null,
//             element: <WarningsPanel warnings={props.warnings} />,
//         },
//         {
//             expand: false,
//             href: "/admin-chat",
//             element: <ChatPanel chat={props.chat} />,
//         },
//         {
//             expand: false,
//             href: "/development",
//             element: <DevelopmentPanel />,
//         },
//         {
//             expand: false,
//             href: "/mycal/posts",
//             element: <PostsPanel posts={props.posts} />,
//         },
//         {
//             expand: false,
//             href: "/mycal/tickets",
//             element: <TicketsPanel tickets={props.tickets} />,
//         },
//     ],
// });

export default {};
