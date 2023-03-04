import { PageHeader } from "@/src/components";
import { I_Alerter, I_Mutator, I_NewCalSession, I_Post } from "@/src/interfaces";
import { appColors, capitalise, fromNowDate, sortArrayByDate } from "@/src/utils";
import { Divider, Stack } from "@mui/material";
import { Fragment, FunctionComponent, ReactElement } from "react";
import { PostPageActions } from "./PostPageActions";
import { PostPageComment } from "./PostPageComment";
import { PostPageContent } from "./PostPageContent";

interface PropTypes extends I_Mutator, I_NewCalSession, I_Alerter {
    post: I_Post;
}

export const PostPage: FunctionComponent<PropTypes> = (props): ReactElement => {
    return (
        <Stack gap={4}>
            <PageHeader
                title={`NewCal ${capitalise(props.post.type)}`}
                subtitle={`Posted ${fromNowDate(props.post.date)} by ${props.post.user.name} (Flat)`}
            />
            <PostPageContent title={props.post.title} content={props.post.content} type={props.post.type} />
            <PostPageActions
                mutate={props.mutate}
                type={props.post.type}
                session={props.session}
                postID={props.post?._id}
                likes={props.post.likes}
                views={props.post.views}
                setAlert={props.setAlert}
            />
            <Stack spacing={4} mt={2}>
                <Divider component="hr" sx={{ bgcolor: appColors.border, mt: 2, mb: 2 }} />
                {props.post.comments.sort(sortArrayByDate).map((comment, i) => (
                    <Fragment key={comment._id.toString()}>
                        <PostPageComment
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
