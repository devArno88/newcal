import { CardActivity } from "@/src/components";
import { E_TicketType, I_Ticket } from "@/src/interfaces";
import { abbreviate, AdminIcons, appColors, capitalise, fromNowDate, getFlatColor } from "@/src/utils";
import { Avatar, Card, CardContent, CardHeader, Chip, Link, Typography } from "@mui/material";
import { FunctionComponent } from "react";

const ChipColors = {
    [E_TicketType.enhancement]: "success",
    [E_TicketType.issue]: "error",
    [E_TicketType.question]: "info",
};

interface PropTypes extends I_Ticket {}

export const TicketCard: FunctionComponent<PropTypes> = (props) => {
    const Icon = props.user.role ? AdminIcons[props.user.role] : null;
    return (
        <Link href={`/ticket/${props._id}`}>
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
                    title={props.user.name}
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
                        <Avatar sx={{ bgcolor: getFlatColor() }} aria-label="recipe">
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
