import { PageHeader } from "@/src/components";
import { Button, Stack } from "@mui/material";
import { FunctionComponent, useState } from "react";
import { PostForm } from "../../Modal/PostForm";

interface PropTypes {}

export const MyCalPosts: FunctionComponent<PropTypes> = (props) => {
    const [open, setOpen] = useState(false);
    return (
        <Stack gap={4}>
            <PageHeader title="My Posts" subtitle="Residents Space Activity" />

            <Stack sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Button variant="contained" sx={{ width: "fit-content", pl: 6, pr: 6 }} onClick={() => setOpen(true)}>
                    New Post
                </Button>
                <PostForm open={open} handleClose={() => setOpen(false)} />
            </Stack>
        </Stack>
    );
};
