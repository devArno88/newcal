import { I_Email } from "@/src/interfaces";
import EmailClient from "@sendgrid/mail";

EmailClient.setApiKey(process.env.EMAIL_SERVER_PASSWORD as string);

export const sendEmail = async (params: I_Email) => {
    try {
        await EmailClient.send({
            ...params,
            from: `NewCal <${process.env.EMAIL_FROM}>`,
        });
    } catch (error) {
        throw new Error("Email could not be sent, please try again later");
    }
};
