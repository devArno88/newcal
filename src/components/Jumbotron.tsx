import { appColors } from "@/src/utils";
import { Grid, Typography } from "@mui/material";

export default function Jumbotron(props: any): JSX.Element {
    const { title, text, image, reverse = false } = props;

    const textBlock: JSX.Element = (
        <div>
            <Typography
                variant="h6"
                sx={{ color: appColors.secondary, mb: 1, fontSize: { xs: 26, sm: 30, md: 32, xl: 40 } }}
            >
                {title ?? "Llorem ipsum"}
            </Typography>
            <Typography
                fontWeight={400}
                letterSpacing={1.2}
                sx={{ color: appColors.text.secondary, fontSize: { xs: 17, sm: 18, md: 19, xl: 24 } }}
            >
                {text}
            </Typography>
        </div>
    );

    const imgBlock: JSX.Element = (
        <img
            src={image}
            alt="Image"
            style={{
                width: "100%",
                height: "100%",
                borderRadius: "0.8rem",
                boxShadow: `0px 0px 12px 4px ${appColors.secondary}`,
            }}
        />
    );

    return (
        <Grid
            container
            direction={`row${reverse ? "-reverse" : ""}`}
            sx={{
                p: 2,
                gap: 4,
                alignItems: "start",
                bgcolor: "transparent",
                justifyContent: "center",
            }}
        >
            <Grid xs={12} sm={10} md={6}>
                {textBlock}
            </Grid>

            <Grid
                xs={12}
                sm={10}
                md={5}
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{ mt: { md: 1, sm: 0 } }}
            >
                {imgBlock}
            </Grid>
        </Grid>
    );
}
