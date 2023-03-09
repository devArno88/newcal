export const bookingEmail = ({ name, flat, start, end, date, type }) => `
    <h3>Hi ${name.split(" ")[0]},</h3>
    <h4>A ${type} booking has been confirmed for Flat ${flat} from ${start.slice(0, -3)} - ${end.slice(
    0,
    -3
)} on ${date}.</h4>
    <h4>This slot can be found within your <a href="${
        process.env.NEXTAUTH_URL
    }/mycal/bookings">MyCal Bookings Page</a> alongside your other bookings.</h4>
    <h4>If you no longer require this booking, this can be cancelled within the <a href="${
        process.env.NEXTAUTH_URL
    }/bookings/${type}">NewCal Pool Bookings Page</a> for this particular date.</h4>
    <h4>Have a great day!</h4>
    <h3>The NewCal Team</h3>
`;

export const mailboardEmail = ({ name, flat, items }) => `
    <h3>Hi ${name.split(" ")[0]},</h3>
    <h4>Your mailbox has just been updated - there ${items === 1 ? "is" : "are"} ${items === 6 ? "5+" : items} item${
    items === 1 ? "" : "s"
} to collect for Flat ${flat}</h4>
    <h4>Please make your way to reception to collect these at your earliest convenience.</h4>
    <h4>This has been added to your <a href="${
        process.env.NEXTAUTH_URL
    }/mycal">MyCal Dashboard</a> and will be updated once your items have been collected.</h4>
    <h4>Have a great day!</h4>
    <h3>The NewCal Team</h3>
`;

export const warningEmail = ({ name, postID, title, content, author }) => `
    <h3>Hi ${name.split(" ")[0]},</h3>
    <h4>A new warning has just been posted:</h4>
    <h2>${title}</h2>
    <h3>${content}</h3>
    <h4>Posted by ${author}</h4>
    <h4>This can be viewed <a href="${
        process.env.NEXTAUTH_URL
    }/post/${postID}">here</a> or found within your <a href="${
    process.env.NEXTAUTH_URL
}/mycal">MyCal Dashboard</a>.</h4>
    <h4>Have a great day!</h4>
    <h3>The NewCal Team</h3>
`;
