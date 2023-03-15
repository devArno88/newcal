import { CardActivity } from "@/src/components";
import { I_Post } from "@/src/interfaces";
import { abbreviate, appColors, Icon_Warning } from "@/src/utils";
import { Paper, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { FunctionComponent, ReactElement } from "react";

const PanelCard = ({ title, subtitle, href, likes, comments, views }) => {
    return (
        <Link href={href}>
            <Paper
                sx={{
                    mb: 1,
                    pt: 3,
                    pb: 3,
                    pr: { xs: 3, sm: 6, md: 2 },
                    pl: { xs: 3, sm: 6, md: 2 },
                    height: "fit-content",
                    bgcolor: "#22272D",
                    borderRadius: 2,
                    border: `1px solid ${appColors.border}`,
                }}
                elevation={5}
            >
                <Stack spacing={1.5}>
                    <Stack spacing={1} direction="row" justifyContent="center" alignItems="center">
                        <Icon_Warning fontSize="large" sx={{ fill: "salmon", mt: -0.1 }} />
                        <Typography variant="h5" sx={{ color: "salmon" }} noWrap>
                            {title.toUpperCase()}
                        </Typography>
                    </Stack>
                    <Typography variant="h6" sx={{ color: appColors.text.primary }}>
                        {abbreviate(subtitle, 30)}
                    </Typography>
                    <CardActivity center likes={likes} comments={comments} views={views} />
                </Stack>
            </Paper>
        </Link>
    );
};

export const WarningsPanel: FunctionComponent<{ warnings: I_Post[] }> = ({ warnings }): ReactElement => (
    <>
        <Typography variant="h5" letterSpacing={1.2} sx={{ color: "red" }}>
            Warnings
        </Typography>
        <Stack mt={2}>
            {warnings?.length ? (
                warnings?.map((x) => (
                    <PanelCard
                        key={x._id.toString()}
                        title={x.title}
                        subtitle={x.content}
                        href={`/post/${x._id.toString()}`}
                        likes={x.likes}
                        comments={x.comments}
                        views={x.views}
                    />
                ))
            ) : (
                <PanelCard href="#" subtitle="No warnings to show" title="" likes={[]} comments={[]} views={[]} />
            )}
        </Stack>
    </>
);
