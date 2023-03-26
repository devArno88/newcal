import { I_Messages, I_Mutator, I_NewCalSession } from "@/src/interfaces";
import { AdminIcons, appColors, sortArrayByDate } from "@/src/utils";
import { FunctionComponent, useEffect } from "react";
import { Message } from "./Message";

interface PropTypes extends I_Messages, I_NewCalSession, I_Mutator {}

export const ChatMessages: FunctionComponent<PropTypes> = (props) => {
    useEffect(() => {
        var elem = document.getElementById("chatbox");
        elem.scrollTop = elem.scrollHeight;
    }, [props.messages]);
    return (
        <div
            id="chatbox"
            style={{
                paddingLeft: "5%",
                paddingRight: "5%",
                height: "100%",
                paddingTop: 30,
                paddingBottom: 30,
                overflowY: "scroll",
                borderTop: `3px solid ${appColors.secondary}`,
                borderBottom: `3px solid ${appColors.secondary}`,
            }}
        >
            {props.messages
                ?.sort(sortArrayByDate)
                .reverse()
                .map((x) => {
                    const isAuthor = props.session?.id === x.user._id.toString();
                    const AdminIcon: any = x.userType === "admin" ? AdminIcons[x.user.role] : null;
                    return <Message key={x._id.toString()} message={x} isAuthor={isAuthor} AdminIcon={AdminIcon} />;
                })}
        </div>
    );
};
