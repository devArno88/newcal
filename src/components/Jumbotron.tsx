import { appColors } from "@/src/utils";
import { Box, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

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
                letterSpacing={1}
                fontWeight={300}
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
                borderRadius: "0.8rem",
                height: "100%",
                width: "100%",
                boxShadow: `0px 0px 12px 4px ${appColors.secondary}`,
            }}
        />
    );

    const Item = styled(Box)(({ theme }) => ({
        textAlign: "start",
        backgroundColor: "transparent",
        color: theme.palette.text.secondary,
    }));

    return (
        <Grid
            container
            // spacing={{ xs: 4, sm: 6, md: 6 }}
            direction={`row${reverse ? "-reverse" : ""}`}
            sx={{
                bgcolor: "transparent",
                justifyContent: "center",
                alignItems: "start",
                p: 2,
                gap: 4,
            }}
        >
            <Grid xs={12} sm={10} md={6}>
                <Item>{textBlock}</Item>
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
                <Item>{imgBlock}</Item>
            </Grid>
        </Grid>
    );
}
