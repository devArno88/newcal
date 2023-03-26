import { config } from "../config";
import { doubleBreak, firstName, mailtoParameters } from "../utils";

const redText = `style="color:#FF4500;"`;

export const bookingEmail = ({ name, flat, start, end, date, type }) => `
    <h3>Hi ${firstName(name)},</h3>
    <h4 ${redText}>A ${type} booking has been confirmed for Flat ${flat} from ${start.slice(0, -3)} - ${end.slice(
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
    <h3>Hi ${firstName(name)},</h3>
    <h4 ${redText}>Your mailbox has just been updated - there ${items === 1 ? "is" : "are"} ${
    items === 6 ? "5+" : items
} item${items === 1 ? "" : "s"} to collect for Flat ${flat}.</h4>
    <h4>Please make your way to reception to collect these at your earliest convenience.</h4>
    <h4>This has been added to your <a href="${
        process.env.NEXTAUTH_URL
    }/mycal">MyCal Dashboard</a> and will be updated once your items have been collected.</h4>
    <h4>Have a great day!</h4>
    <h3>The NewCal Team</h3>
`;

export const warningEmail = ({ name, postID, title, content, author }) => `
    <h3>Hi ${firstName(name)},</h3>
    <h4>A new warning has just been posted:</h4>
    <h2 ${redText}>${title}</h2>
    <h3 ${redText}>${content}</h3>
    <h4 ${redText}>Posted by ${author}</h4>
    <h4>This can be viewed <a href="${
        process.env.NEXTAUTH_URL
    }/post/${postID}">here</a> or found within your <a href="${
    process.env.NEXTAUTH_URL
}/mycal">MyCal Dashboard</a>.</h4>
    <h4>Have a great day!</h4>
    <h3>The NewCal Team</h3>
`;

export const enquiryEmail = ({ id, name, message }) => `
    <h3>Hi ${firstName(name)},</h3>
    <h4>Thank you for interest in New Caledonian Wharf. Your enquiry has been submitted with ID #${id} and a member of our Residence Management Team will be in touch with you very shortly!</h4>
    <h4>Your message:</h4>
    <h3 ${redText}>${message.replaceAll("\n", "<br>")}</h3>
    <h4>Have a great day!</h4>
    <h3>The NewCal Team</h3>
`;

export const newResidentEmail = ({ name, email, flat }) => {
    const { href, target, rel } = mailtoParameters({
        target: config.managementEmail,
        subject: "Incorrect Resident Details",
        body: `Hi,${doubleBreak}My NewCal Resident details are incorrect and should be updated as follows:${doubleBreak}Name:${doubleBreak}Email:${doubleBreak}Flat:${doubleBreak}Kind regards,${doubleBreak}${name} - Flat ${flat}`,
    });
    const managementEmailLink = `<a href="${href}" target="${target}" rel="${rel}">get in touch</a>`;
    return `
        <h3>Hi ${firstName(name)},</h3>
        <h4>You have been registered as a NewCal Resident by a member of the Residence Management team.</h4>
        <h4>Your details are as follows:</h4>
        <h3 ${redText}>Name: ${name}</h3>
        <h3 ${redText}>Email: ${email}</h3>
        <h3 ${redText}>Flat: ${flat}</h3>
        <h4>You should now have access to your <a href="${
            process.env.NEXTAUTH_URL
        }/mycal">MyCal Dashboard</a>, where you can see updates from Management, and create Bookings, Tickets and Posts.</h4>
        <h4>If any of these details are incorrect, please don't hesitate to ${managementEmailLink} to have these updated.</h4>
        <h4>Have a great day!</h4>
        <h3>The NewCal Team</h3>
    `;
};

export const updatedResidentEmail = ({ name, email, flat }) => {
    const { href, target, rel } = mailtoParameters({
        target: config.managementEmail,
        subject: "Incorrect Resident Details",
        body: `Hi,${doubleBreak}My NewCal Resident details are incorrect and should be updated as follows:${doubleBreak}Name:${doubleBreak}Email:${doubleBreak}Flat:${doubleBreak}Kind regards,${doubleBreak}${name} - Flat ${flat}`,
    });
    const managementEmailLink = `<a href="${href}" target="${target}" rel="${rel}">get in touch</a>`;
    return `
        <h3>Hi ${firstName(name)},</h3>
        <h4>Your NewCal Resident details have been updated by a member of the Residence Management team.</h4>
        <h4>Your details are as follows:</h4>
        <h3 ${redText}>Name: ${name}</h3>
        <h3 ${redText}>Email: ${email}</h3>
        <h3 ${redText}>Flat: ${flat}</h3>
        <h4>These details should now be visible within your <a href="${
            process.env.NEXTAUTH_URL
        }/mycal">MyCal Dashboard</a>.</h4>
        <h4>If any of these details are incorrect, please don't hesitate to ${managementEmailLink} to have these updated.</h4>
        <h4>Have a great day!</h4>
        <h3>The NewCal Team</h3>
    `;
};
