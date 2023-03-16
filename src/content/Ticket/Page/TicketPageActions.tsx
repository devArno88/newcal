import { deleteTicket, handleTicketLike } from "@/src/actions";
import { ItemActions } from "@/src/components";
import { E_AlertTypes } from "@/src/context";
import { E_TicketType, I_Alerter, I_Likes, I_Mutator, I_NewCalSession, I_Views } from "@/src/interfaces";
import { Types } from "mongoose";
import { NextRouter } from "next/router";
import { FunctionComponent, useState } from "react";

interface PropTypes extends I_Likes, I_NewCalSession, I_Mutator, I_Alerter, I_Views {
    ticketID: Types.ObjectId;
    type: E_TicketType;
    router: NextRouter;
    ticketAuthor: {
        user: Types.ObjectId;
        userType: "admin" | "resident";
    };
}

export const TicketPageActions: FunctionComponent<PropTypes> = (props) => {
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const onLike = async () => {
        setLoading(true);
        const res = await handleTicketLike({ ticketID: props.ticketID });
        if (res) {
            setLoading(false);
            if (res?.err)
                props.setAlert({ type: E_AlertTypes.error, text: "Something went wrong, please try again later" });
            if (res?.msg) props.mutate();
        }
    };
    const onDelete = async () => {
        if (window.confirm("Are you sure you want to delete this ticket?")) {
            props.router.push("/tickets");
            const res = await deleteTicket({ ticketID: props.ticketID });
            if (res?.err) props.setAlert({ type: E_AlertTypes.error, text: res.err });
            if (res?.msg) {
                props.mutate();
                props.setAlert({ type: E_AlertTypes.success, text: res?.msg });
            }
        }
    };
    const adminLikes = props.likes?.filter((x) => x.user.role).map((x) => x.user.name);
    return (
        <ItemActions
            mutate={props.mutate}
            open={open}
            setOpen={setOpen}
            loading={loading}
            onLike={onLike}
            onDelete={onDelete}
            session={props.session}
            adminLikes={adminLikes}
            likes={props.likes}
            views={props.views}
            setAlert={props.setAlert}
            item={{
                id: props.ticketID,
                type: props.type,
                author: {
                    user: props.ticketAuthor.user,
                    userType: props.ticketAuthor.userType,
                },
            }}
        />
    );
};
