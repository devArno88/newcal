import { E_TicketType, I_Ticket } from "@/src/interfaces";
import { appColors, capitalise, fromNowDate, getFlatColor } from "@/src/utils";
import FavoriteIcon from "@mui/icons-material/Favorite";
import QuestionAnswerTwoToneIcon from "@mui/icons-material/QuestionAnswerTwoTone";
import { Avatar, Card, CardActions, CardContent, CardHeader, Chip, Link, Typography } from "@mui/material";
import { FunctionComponent } from "react";

const ChipColors = {
    [E_TicketType.enhancement]: "success",
    [E_TicketType.issue]: "error",
    [E_TicketType.question]: "info",
};

interface PropTypes extends I_Ticket {}

export const TicketCard: FunctionComponent<PropTypes> = (props) => {
    return (
        <Link href={`/ticket/${props._id}`}>
            <Card sx={{ bgcolor: appColors.card, border: `2px solid ${appColors.border}`, pt: 1, pb: 1 }}>
                <CardHeader
                    titleTypographyProps={{ sx: { color: appColors.text.secondary, fontSize: 14 } }}
                    subheaderTypographyProps={{ sx: { color: "gray", fontSize: 12 } }}
                    title={props.resident.name}
                    subheader={fromNowDate(props.date)}
                    action={
                        <Chip
                            variant="filled"
                            color={ChipColors[props.type] as any}
                            sx={{
                                borderRadius: "1rem",
                                fontWeight: 500,
                                letterSpacing: 1,
                                textTransform: "uppercase",
                                mt: 1,
                                mr: 2,
                            }}
                            label={capitalise(props.type)}
                        />
                    }
                    avatar={
                        <Avatar sx={{ bgcolor: getFlatColor() }} aria-label="recipe">
                            {props.resident?.flat}
                        </Avatar>
                    }
                    sx={{ mb: -2 }}
                />
                {/* <CardMedia component="img" height="194" image="/static/images/cards/paella.jpg" alt="Paella dish" /> */}
                <CardContent sx={{ pl: 3, pr: 3, pt: 3, pb: 3 }}>
                    <Typography variant="h6" sx={{ color: appColors.text.secondary }} mb={1}>
                        {props.title}
                    </Typography>
                    <Typography variant="body1" sx={{ color: appColors.text.primary }}>
                        {props.content}
                    </Typography>
                </CardContent>
                {false ? (
                    <CardActions sx={{ justifyContent: "space-between", pl: 2, pr: 2 }}>
                        <FavoriteIcon fontSize="small" sx={{ fill: "lightpink", opacity: 0.75 }} />
                        <QuestionAnswerTwoToneIcon fontSize="small" sx={{ fill: "darkkhaki", opacity: 0.75 }} />
                    </CardActions>
                ) : null}
            </Card>
        </Link>
    );
};
