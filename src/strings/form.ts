import { E_PostType, E_TicketType } from "@/src/interfaces";

interface Option {
    title: string;
    subtitle: string;
}

export const S_TicketOptions: Option[] = [
    {
        title: E_TicketType.enhancement,
        subtitle: "Any improvement suggestions for website or the management team",
    },
    {
        title: E_TicketType.issue,
        subtitle: "Any ongoing issues with website, properties or the management team",
    },
    {
        title: E_TicketType.question,
        subtitle: "Any questions directed to the management team or website developer",
    },
];

export const S_PostOptions: Option[] = [
    {
        title: E_PostType.warning,
        subtitle: "Important updates displayed to residents upon login",
    },
    {
        title: E_PostType.notice,
        subtitle: "Any notification or warning of building-related activities",
    },
    {
        title: E_PostType.listing,
        subtitle: "Any content related to a NewCal property",
    },
    {
        title: E_PostType.question,
        subtitle: "Any questions directed to other residents",
    },
];
