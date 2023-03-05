import { E_PostType } from "@/src/interfaces/post";
import { Paper, Stack, Typography } from "@mui/material";

export const ChatPanel = (props) => {
    const PanelCard = ({ type }: { type: E_PostType }) => {
        return (
            <Paper
                sx={{
                    mb: 1,
                    pt: 1,
                    pb: 1,
                    height: "fit-content",
                    bgcolor: "#22272D",
                    borderRadius: 2,
                }}
                elevation={5}
            >
                {/* <Icon sx={{ fill: appColors.text.primary, mr: 1 }} fontSize="large" /> */}
                <Typography sx={{ color: "greenyellow" }}>
                    {props.posts[type].total || "No"} {type}
                    {props.posts[type].total !== 1 ? "s" : null}
                </Typography>
                <Typography variant="caption" sx={{ color: "gray" }}>
                    You have {props.posts[type].own ? `posted ${props.posts[type].own} ` : "not posted any "}
                    {type}
                    {props.posts[type].total !== 1 ? "s" : null}
                </Typography>
            </Paper>
        );
    };
    return (
        <>
            <Typography variant="h5">Chat</Typography>
            <Stack mt={2}>
                {Object.values(E_PostType).map((x) => (
                    <PanelCard key={x} type={x} />
                ))}
            </Stack>
        </>
    );
};
