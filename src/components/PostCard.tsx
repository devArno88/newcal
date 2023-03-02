import FavoriteIcon from "@mui/icons-material/Favorite";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
// import CardMedia from "@mui/material/CardMedia";
import QuestionAnswerTwoToneIcon from "@mui/icons-material/QuestionAnswerTwoTone";
import { Chip } from "@mui/material";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { FunctionComponent } from "react";
import { E_PostType, I_Post } from "../interfaces";
import { appColors, capitalise, fromNowDate, getFlatColor } from "../utils";

interface PropTypes extends I_Post {}

const ChipColors = {
    [E_PostType.listing]: "warning",
    [E_PostType.notice]: "secondary",
    [E_PostType.question]: "info",
};

export const PostCard: FunctionComponent<PropTypes> = (props) => {
    return (
        <Link href={`/post/${props._id}`}>
            <Card
                sx={{
                    bgcolor: appColors.card,
                    border: `2px solid ${appColors.border}`,
                    pt: 1,
                    pb: 1,
                    cursor: "pointer",
                }}
            >
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
