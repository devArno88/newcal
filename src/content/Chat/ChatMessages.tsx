import { I_Messages, I_NewCalSession } from "@/src/interfaces";
import { AdminIcons, appColors, sortArrayByDate } from "@/src/utils";
import { Stack } from "@mui/material";
import { FunctionComponent } from "react";
import { Message } from "./Message";

interface PropTypes extends I_Messages, I_NewCalSession {}

export const ChatMessages: FunctionComponent<PropTypes> = (props) => {
    return (
        <Stack
            pt={4}
            pb={4}
            spacing={3}
            height="100%"
            pl={{ xs: 2, sm: 6, md: 10 }}
            pr={{ xs: 2, sm: 6, md: 10 }}
            sx={{
                overflowY: "scroll",
                borderTop: `2px solid ${appColors.border}`,
                borderBottom: `2px solid ${appColors.border}`,
            }}
        >
            {props.messages
                ?.sort(sortArrayByDate)
                .reverse()
                .map((x, i) => {
                    const isAuthor = props.session?.id === x.user._id.toString();
                    const AdminIcon: any = x.userType === "admin" ? AdminIcons[x.user.role] : null;
                    return <Message key={x._id.toString()} message={x} isAuthor={isAuthor} AdminIcon={AdminIcon} />;
                })}
        </Stack>
    );
};
