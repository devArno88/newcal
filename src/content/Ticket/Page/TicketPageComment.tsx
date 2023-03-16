import { deleteTicketComment, handleTicketCommentLike } from "@/src/actions/ticket";
import { ItemComment } from "@/src/components";
import { E_AlertTypes } from "@/src/context";
import { I_Alerter, I_Comment, I_Mutator, I_NewCalSession } from "@/src/interfaces";
import { AdminIcons } from "@/src/utils";
import { Types } from "mongoose";
import { FunctionComponent, useState } from "react";

interface PropTypes extends I_Comment, I_Mutator, I_NewCalSession, I_Alerter {
    ticketID: Types.ObjectId;
}

export const TicketPageComment: FunctionComponent<PropTypes> = (props) => {
    const [loading, setLoading] = useState<boolean>(false);
    const onLikeComment = async (commentID: Types.ObjectId) => {
        setLoading(true);
        const res = await handleTicketCommentLike({ ticketID: props.ticketID, commentID });
        if (res) {
            setLoading(false);
            if (res?.err)
                props.setAlert({ type: E_AlertTypes.error, text: "Something went wrong, please try again later" });
            if (res?.msg) props.mutate();
        }
    };
    const onDeleteComment = async (commentID: Types.ObjectId) => {
        if (window.confirm("Are you sure you want to delete this comment?")) {
            const res = await deleteTicketComment({ ticketID: props.ticketID, commentID });
            if (res?.err) props.setAlert({ type: E_AlertTypes.error, text: res?.err });
            if (res?.msg) {
                props.mutate();
                props.setAlert({ type: E_AlertTypes.success, text: res?.msg });
            }
        }
    };
    const Icon = props.userType === "admin" ? AdminIcons[props.user.role] : null;
    const adminLikes = props.likes?.filter((x) => x.user.role).map((x) => x.user.name);
    return (
        <ItemComment
            {...props}
            Icon={Icon}
            loading={loading}
            adminLikes={adminLikes}
            onLikeComment={onLikeComment}
            onDeleteComment={onDeleteComment}
        />
    );
};
