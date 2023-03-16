import { Avatar, Card, CardContent, CardHeader, Typography } from "@mui/material";
import Link from "next/link";
import { FunctionComponent, ReactElement } from "react";
import { E_PostType, E_TicketType } from "../interfaces";
import { capitalise } from "../utils";

const ChipColors = {
    [E_PostType.listing]: "warning",
    [E_PostType.notice]: "secondary",
    [E_PostType.question]: "info",
    [E_PostType.warning]: "error",
    [E_TicketType.enhancement]: "success",
    [E_TicketType.issue]: "error",
    [E_TicketType.question]: "info",
};

interface PropTypes {}

export const ItemCard: FunctionComponent<PropTypes> = (props): ReactElement => {
    return (
        <Link href={`/post/${props._id}`}>
            <Card
                sx={{
                    pt: 1,
                    pb: 1,
                    cursor: "pointer",
                    bgcolor: appColors.card,
                    border: `2px solid ${appColors.border}`,
                }}
            >
                <CardHeader
                    sx={{ mb: -2 }}
                    title={`${props.userType === "admin" ? "NewCal " : ""}${props.user.name}`}
                    titleTypographyProps={{ sx: { color: appColors.text.secondary, fontSize: 18 } }}
                    subheader={fromNowDate(props.date)}
                    subheaderTypographyProps={{ sx: { color: "gray", fontSize: 14 } }}
                    action={
                        <Chip
                            variant="filled"
                            label={capitalise(props.type)}
                            color={ChipColors[props.type] as any}
                            sx={{
                                mt: 1,
                                mr: 2,
                                fontWeight: 500,
                                letterSpacing: 1,
                                borderRadius: "1rem",
                                textTransform: "uppercase",
                            }}
                        />
                    }
                    avatar={
                        <Avatar sx={{ bgcolor: getFlatColor() }} aria-label="post-chip">
                            {props.user.role && Icon ? <Icon /> : props.user.flat || null}
                        </Avatar>
                    }
                />
                {/* <CardMedia component="img" height="194" image="/static/images/cards/paella.jpg" alt="Paella dish" /> */}
                <CardContent sx={{ pl: 3, pr: 3, pt: 3, pb: 3 }}>
                    <Typography variant="h6" sx={{ color: appColors.text.secondary }} mb={1} noWrap>
                        {props.title}
                    </Typography>
                    <Typography variant="body1" sx={{ color: appColors.text.primary }}>
                        {abbreviate(props.content, 200)}
                    </Typography>
                </CardContent>
                <CardActivity likes={props.likes} comments={props.comments} views={props.views} />
            </Card>
        </Link>
    );
};
