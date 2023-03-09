import React from "react";

import { config } from "@/src/config";
import { Typography } from "@mui/material";
import { Session } from "next-auth";
import { getRandomID } from "../utils";

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

export const AppError: React.FunctionComponent<PropTypes> = (props) => {
    const id = getRandomID();
    const { error, source, session } = props;
    const params = { id, source, error };
    const formattedError = JSON.stringify(params, null, 2);
    const body = `Hi there,${lineBreak}${lineBreak}I have been experiencing this issue on my NewCal.space account${lineBreak}${lineBreak}${formattedError}${lineBreak}${lineBreak}Cheers,${lineBreak}${lineBreak}${session?.user?.name}`;
    return (
        <div style={{ textAlign: "center", marginTop: 40 }}>
            <Typography variant="h3">Oops...</Typography>
            <Typography variant="h4">Something went wrong 😔</Typography>
            <br />
            <span>
                Please{" "}
                <a
                    target="_blank"
                    rel="noreferrer"
                    href={`mailto:${config.supportEmail}?subject=I have an issue&body=${body}`}
                    style={{ color: "red", textDecoration: "none" }}
                >
                    email the site developer
                </a>{" "}
                if this is preventing you from something important.
            </span>
        </div>
    );
};
