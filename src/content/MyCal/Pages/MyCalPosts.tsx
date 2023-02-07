import { PageHeader } from "@/src/components";
import { PostCard } from "@/src/components/PostCard";
import { I_Post } from "@/src/interfaces";
import { Button, CircularProgress, Stack } from "@mui/material";
import { FunctionComponent, useState } from "react";
import { KeyedMutator } from "swr";
import { PostForm } from "../../Modal/PostForm";

interface PropTypes {
    data: I_Post[];
    loading: boolean;
    mutate: KeyedMutator<any>;
}

export const MyCalPosts: FunctionComponent<PropTypes> = (props) => {
    const [open, setOpen] = useState(false);
    return (
        <Stack gap={4}>
            <PageHeader title="My Posts" subtitle="Residents Space Activity" />
            <Stack sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Button variant="contained" sx={{ width: "fit-content", pl: 6, pr: 6 }} onClick={() => setOpen(true)}>
                    New Post
                </Button>
                <PostForm open={open} handleClose={() => setOpen(false)} mutate={props.mutate} />
                <Stack gap={2} mt={4} sx={{ width: { xs: "100%", sm: "70%", md: "65%" } }}>
                    {props.loading ? (
                        <CircularProgress />
                    ) : (
                        props.data?.map((p) => <PostCard key={p._id.toString()} {...p} />)
                    )}
                </Stack>
            </Stack>
        </Stack>
    );
};
