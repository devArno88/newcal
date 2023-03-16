import { deletePost, handlePostLike } from "@/src/actions";
import { ItemActions } from "@/src/components";
import { E_AlertTypes } from "@/src/context";
import { E_PostType, I_Alerter, I_Likes, I_Mutator, I_NewCalSession, I_Views } from "@/src/interfaces";
import { Types } from "mongoose";
import { NextRouter } from "next/router";
import { FunctionComponent, useState } from "react";

interface PropTypes extends I_Likes, I_NewCalSession, I_Mutator, I_Alerter, I_Views {
    postID: Types.ObjectId;
    type: E_PostType;
    router: NextRouter;
    postAuthor: {
        user: Types.ObjectId;
        userType: "admin" | "resident";
    };
}

export const PostPageActions: FunctionComponent<PropTypes> = (props) => {
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const onLike = async () => {
        setLoading(true);
        const res = await handlePostLike({ postID: props.postID });
        if (res) {
            setLoading(false);
            if (res?.err)
                props.setAlert({ type: E_AlertTypes.error, text: "Something went wrong, please try again later" });
            if (res?.msg) props.mutate();
        }
    };
    const onDelete = async () => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            props.router.push("/posts");
            const res = await deletePost({ postID: props.postID });
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
                id: props.postID,
                type: props.type,
                author: {
                    user: props.postAuthor.user,
                    userType: props.postAuthor.userType,
                },
            }}
        />
    );
};
