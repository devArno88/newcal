import { CardActivity } from "@/src/components";
import { I_Post } from "@/src/interfaces";
import { appColors, Icon_Warning } from "@/src/utils";
import { Paper, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { FunctionComponent, ReactElement } from "react";

const PanelCard = ({ title, subtitle, href, likes, comments, views }) => {
    return (
        <Link href={href}>
            <Paper
                sx={{
                    mb: 1,
                    py: 3,
                    borderRadius: 2,
                    bgcolor: "#22272D",
                    height: "fit-content",
                    pr: { xs: 3, sm: 6, md: 2 },
                    pl: { xs: 3, sm: 6, md: 2 },
                    border: `1px solid ${appColors.border}`,
                    "&:hover": {
                        border: `1px solid salmon`,
                    },
                }}
                elevation={5}
            >
                <Stack spacing={1.5} justifyContent="center" alignItems="center" width="100%">
                    <Stack spacing={1} direction="row" alignItems="center">
                        <Icon_Warning sx={{ fill: "salmon", mt: -0.1, height: { xs: 24, sm: 28, md: 32 } }} />
                        <Typography
                            noWrap
                            variant="h5"
                            sx={{
                                color: "salmon",
                                maxWidth: { xs: "14rem", sm: "24rem", md: "30rem" },
                                fontSize: { xs: "1.2rem", sm: "1.4rem", md: "1.6rem" },
                            }}
                        >
                            {title.toUpperCase()}
                        </Typography>
                    </Stack>
                    <Typography
                        noWrap
                        variant="h6"
                        sx={{
                            textAlign: "center",
                            alignItems: "center",
                            justifyContent: "center",
                            color: appColors.text.primary,
                            width: { xs: "16rem", sm: "30rem", md: "40rem" },
                            fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
                        }}
                    >
                        {subtitle}
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
