import { PageHeader } from "@/src/components";
import { PostCard } from "@/src/components/PostCard";
import { I_Post } from "@/src/interfaces";
import { sortArrayByDate } from "@/src/utils";
import { Button, CircularProgress, Stack } from "@mui/material";
import Link from "next/link";
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
            <PageHeader title="My Activity" subtitle="My Residents Space Posts" />
            <Stack sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Stack sx={{ gap: 1.5 }}>
                    <Button
                        color="secondary"
                        variant="contained"
                        sx={{ width: { xs: 200, sm: 220, md: 240 }, pl: 1, pr: 1 }}
                        onClick={() => setOpen(true)}
                    >
                        Create New Post
                    </Button>
                    <Link href="/activity">
                        <Button
                            color="info"
                            variant="contained"
                            sx={{ width: { xs: 200, sm: 220, md: 240 }, pl: 1, pr: 1 }}
                        >
                            View All Posts
                        </Button>
                    </Link>
                </Stack>
                <PostForm open={open} handleClose={() => setOpen(false)} mutate={props.mutate} />
                <Stack gap={2} mt={4} sx={{ width: { xs: "100%", sm: "70%", md: "65%" } }}>
                    {props.loading ? (
                        <CircularProgress />
                    ) : (
                        props.data?.sort(sortArrayByDate).map((p) => <PostCard key={p._id.toString()} {...p} />)
                    )}
                </Stack>
            </Stack>
        </Stack>
    );
};
