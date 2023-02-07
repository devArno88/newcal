import { PageHeader } from "@/src/components";
import { PostCard } from "@/src/components/PostCard";
import { I_Post, I_Posts } from "@/src/interfaces";
import { Button, CircularProgress, Stack } from "@mui/material";
import { FunctionComponent, ReactElement, useState } from "react";
import { KeyedMutator } from "swr";
import { PostForm } from "../Modal/PostForm";

interface Data extends I_Posts {}

interface PropTypes {
    data: I_Post[];
    loading: boolean;
    mutate: KeyedMutator<any>;
}

export const Activity: FunctionComponent<PropTypes> = (props): ReactElement => {
    const [open, setOpen] = useState(false);
    return (
        <Stack gap={4}>
            <PageHeader title="Activity" subtitle="NewCal Residents Space" />

            <Stack sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Button variant="contained" sx={{ width: "fit-content", pl: 6, pr: 6 }} onClick={() => setOpen(true)}>
                    New Post
                </Button>
                <PostForm mutate={props.mutate} open={open} handleClose={() => setOpen(false)} />
                <Stack gap={2} mt={4} sx={{ width: { xs: "100%", sm: "70%", md: "65%" } }}>
                    {props.loading ? (
                        <CircularProgress />
                    ) : (
                        props.data?.reverse().map((p) => <PostCard key={p._id.toString()} {...p} />)
                    )}
                </Stack>
            </Stack>
        </Stack>
    );
};
