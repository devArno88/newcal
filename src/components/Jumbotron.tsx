import { Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import { appColors } from "../utils";

export default function Jumbotron(props: any): JSX.Element {
    const { title, text, image, reverse = false, single = false } = props;

    const textBlock: JSX.Element = (
        <div>
            <Typography
                variant="h6"
                sx={{ color: appColors.secondary, mb: 1, fontSize: { xs: 26, sm: 30, md: 36, xl: 40 } }}
            >
                {title ?? "Llorem ipsum"}
            </Typography>
            <Typography
                letterSpacing={1}
                fontWeight={300}
                sx={{ color: appColors.text.secondary, fontSize: { xs: 18, sm: 20, md: 22, xl: 24 } }}
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

    const Item = styled(Paper)(({ theme }) => ({
        boxShadow: "none",
        textAlign: "start",
        backgroundColor: "transparent",
        color: theme.palette.text.secondary,
    }));

    return (
        <Grid
            container
            // alignItems="center"
            spacing={{ xs: 4, sm: 6 }}
            direction={`row${reverse ? "-reverse" : ""}`}
            sx={{
                boxShadow: 0,
                bgcolor: "transparent",
                justifyContent: "center",
                alignItems: { xs: "start", sm: "start", md: "center", xl: "start" },
            }}
        >
            <Grid xs={12} sm={10} md={6.5} xl={6}>
                <Item>{textBlock}</Item>
            </Grid>

            <Grid xs={12} sm={10} md={5.5} xl={6} spacing={2} direction="column">
                <Item>{imgBlock}</Item>
            </Grid>
        </Grid>
    );
}
