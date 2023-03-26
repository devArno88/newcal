function createData(feature: string, resident: string, concierge: string, management: string, development: string) {
    return { feature, resident, concierge, management, development };
}

// ✅ ❌

export const FeaturesTableData = [
    {
        title: "Bookings",
        data: [
            createData("Read", "✅", "✅", "❌", "❌"),
            createData("Create", "✅", "❌", "❌", "❌"),
            createData("Delete", "✅", "❌", "❌", "❌"),
        ],
    },
    {
        title: "Posts",
        data: [
            createData("Read", "✅", "✅", "✅", "✅"),
            createData("Create", "✅", "✅", "✅", "✅"),
            createData("Delete", "✅", "✅", "✅", "✅"),
            createData("Like", "✅", "✅", "✅", "✅"),
            createData("Comment", "✅", "✅", "✅", "✅"),
            createData("Like Comment", "✅", "✅", "✅", "✅"),
        ],
    },
    {
        title: "Tickets",
        data: [
            createData("Read", "✅", "✅", "✅", "✅"),
            createData("Create", "✅", "✅", "✅", "✅"),
            createData("Delete", "✅", "✅", "✅", "✅"),
            createData("Like", "✅", "✅", "✅", "✅"),
            createData("Comment", "✅", "✅", "✅", "✅"),
            createData("Like Comment", "✅", "✅", "✅", "✅"),
        ],
    },
    {
        title: "Warnings",
        data: [
            createData("Read", "✅", "✅", "✅", "✅"),
            createData("Create", "❌", "❌", "✅", "✅"),
            createData("Delete", "❌", "❌", "✅", "✅"),
            createData("Like", "✅", "✅", "✅", "✅"),
            createData("Comment", "✅", "✅", "✅", "✅"),
            createData("Like Comment", "✅", "✅", "✅", "✅"),
        ],
    },
    {
        title: "Resident Management",
        data: [createData("Read", "❌", "❌", "✅", "❌"), createData("Update", "❌", "❌", "✅", "❌")],
    },
    {
        title: "Enquiry Management",
        data: [createData("Read", "❌", "❌", "✅", "❌"), createData("Update", "❌", "❌", "✅", "❌")],
    },
    {
        title: "Development Backlog",
        data: [createData("Read", "❌", "❌", "✅", "❌"), createData("Update", "❌", "❌", "✅", "❌")],
    },
    {
        title: "Chat",
        data: [
            createData("Send Message", "❌", "✅", "✅", "✅"),
            createData("Delete Message", "❌", "✅", "✅", "✅"),
        ],
    },
    {
        title: "Mailbox",
        data: [createData("Read", "✅", "✅", "❌", "❌"), createData("Update", "❌", "✅", "❌", "❌")],
    },
    {
        title: "Email Notifications",
        data: [
            createData("Booking Confirmed", "✅", "❌", "❌", "❌"),
            createData("Mailbox Updated", "✅", "❌", "❌", "❌"),
            createData("Warning Posted", "✅", "✅", "✅", "✅"),
            createData("Enquiry Submitted", "❌", "❌", "✅", "❌"),
            createData("Resident Registered", "✅", "❌", "❌", "❌"),
            createData("Resident Updated", "✅", "❌", "❌", "❌"),
        ],
    },
];
