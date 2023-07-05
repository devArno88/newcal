import { config } from "@/src/config";
import { getRandomID, mailtoParameters } from "@/src/utils";
import { Typography } from "@mui/material";
import { Session } from "next-auth";
import { FunctionComponent, ReactElement } from "react";

interface PropTypes {
    error: string | object | Error;
    source: string;
    context?: object;
    text?: string;
    location?: string;
    inline?: boolean;
    session: Session;
}

const lineBreak = "%0D%0A";

export const AppError: FunctionComponent<PropTypes> = (props): ReactElement => {
    const id = getRandomID();
    const { error, source, session } = props;
    const params = { id, source, error };
    const formattedError = JSON.stringify(params, null, 2);
    const body = `Hi there,${lineBreak}${lineBreak}I have been experiencing this issue on my NewCal account${lineBreak}${lineBreak}${formattedError}${lineBreak}${lineBreak}Cheers,${lineBreak}${lineBreak}${session?.user?.name}`;
    const mailParams = mailtoParameters({ target: config.developmentEmail, subject: "NewCal App Issue", body });
    return (
        <div style={{ textAlign: "center", marginTop: 40 }}>
            <Typography variant="h3">Oops...</Typography>
            <Typography variant="h4">Something went wrong 😔</Typography>
            <br />
            <span>
                Please{" "}
                <a {...mailParams} style={{ color: "red", textDecoration: "none" }}>
                    email the site developer
                </a>{" "}
                if this is preventing you from something important.
            </span>
        </div>
    );
};
