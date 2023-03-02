import { PageHeader } from "@/src/components";
import { I_Alerter, I_Mutator, I_NewCalSession, I_Post } from "@/src/interfaces";
import { appColors, capitalise, fromNowDate, sortArrayByDate } from "@/src/utils";
import { Divider, Stack } from "@mui/material";
import { Fragment, FunctionComponent, ReactElement } from "react";
import { PostActions } from "./PostActions";
import { PostComment } from "./PostComment";
import { PostContent } from "./PostContent";

interface PropTypes extends I_Mutator, I_NewCalSession, I_Alerter {
    post: I_Post;
}

export const Post: FunctionComponent<PropTypes> = (props): ReactElement => {
    return (
        <Stack gap={4}>
            <PageHeader
                title={`NewCal ${capitalise(props.post.type)}`}
                subtitle={`Posted ${fromNowDate(props.post.date)} by ${props.post.resident.name} (Flat ${
                    props.post.resident.flat
                }) `}
            />
            <PostContent title={props.post.title} content={props.post.content} type={props.post.type} />
            <PostActions
                setAlert={props.setAlert}
                mutate={props.mutate}
                type={props.post.type}
                session={props.session}
                postID={props.post?._id}
                likes={props.post.likes}
            />
            <Stack spacing={4} mt={2}>
                <Divider component="hr" sx={{ bgcolor: appColors.border }} />
                {props.post.comments.sort(sortArrayByDate).map((comment, i) => (
                    <Fragment key={comment._id.toString()}>
                        <PostComment
                            {...comment}
                            mutate={props.mutate}
                            session={props.session}
                            postID={props.post._id}
                            setAlert={props.setAlert}
                        />
                        {i !== props.post.comments.length - 1 ? (
                            <Divider component="hr" sx={{ bgcolor: appColors.border }} />
                        ) : null}
                    </Fragment>
                ))}
            </Stack>
        </Stack>
    );
};
