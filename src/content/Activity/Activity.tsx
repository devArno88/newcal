import { Loading, PageHeader } from "@/src/components";
import { PostCard } from "@/src/components/PostCard";
import { PostForm } from "@/src/content/Modal";
import { I_Mutator, I_Post } from "@/src/interfaces";
import { sortArrayByDate } from "@/src/utils";
import { Button, Stack } from "@mui/material";
import Link from "next/link";
import { FunctionComponent, ReactElement, useState } from "react";

interface PropTypes extends I_Mutator {
    data: I_Post[];
    loading: boolean;
}

export const Activity: FunctionComponent<PropTypes> = (props): ReactElement => {
    const [open, setOpen] = useState(false);
    return (
        <Stack gap={4}>
            <PageHeader title="NewCal Activity" subtitle="Public Residents Space" />
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
                    <Link href="/mycal/posts">
                        <Button
                            color="info"
                            variant="contained"
                            sx={{ width: { xs: 200, sm: 220, md: 240 }, pl: 1, pr: 1 }}
                        >
                            View My Posts
                        </Button>
                    </Link>
                </Stack>
                <PostForm mutate={props.mutate} open={open} handleClose={() => setOpen(false)} />
                <Stack gap={2} mt={4} sx={{ width: { xs: "100%", sm: "70%", md: "65%" } }}>
                    {props.loading ? (
                        <Loading />
                    ) : (
                        props.data?.sort(sortArrayByDate).map((p) => <PostCard key={p._id.toString()} {...p} />)
                    )}
                </Stack>
            </Stack>
        </Stack>
    );
};