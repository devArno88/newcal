import { ImageBox, LandingHeader } from "@/src/components";
import { appColors } from "@/src/utils";
import DeckTwoToneIcon from "@mui/icons-material/DeckTwoTone";
import DirectionsCarFilledTwoToneIcon from "@mui/icons-material/DirectionsCarFilledTwoTone";
import FitnessCenterTwoToneIcon from "@mui/icons-material/FitnessCenterTwoTone";
import ManageAccountsTwoToneIcon from "@mui/icons-material/ManageAccountsTwoTone";
import RoomServiceTwoToneIcon from "@mui/icons-material/RoomServiceTwoTone";
import WavesTwoToneIcon from "@mui/icons-material/WavesTwoTone";
import { Container, Grid, Paper, Stack, Typography } from "@mui/material";
import { experimentalStyled as styled } from "@mui/material/styles";
import { FunctionComponent, ReactElement } from "react";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: appColors.card,
    ...theme.typography.body2,
    padding: theme.spacing(4),
    textAlign: "center",
    color: theme.palette.text.secondary,
    borderRadius: "2rem",
    border: `3px inset ${appColors.primary}`,
}));

const FeatureData = [
    {
        Icon: RoomServiceTwoToneIcon,
        title: "24/7 Reception",
        text: "An added level of convenience for residents, ensuring that there is always someone available to assist with any needs or concerns.",
    },
    {
        Icon: DeckTwoToneIcon,
        title: "Leisure Area",
        text: "An exclusive courtyard to relax and unwind, with dedicated infant activities, reservable tables and purpose-built barbecues.",
    },
    {
        Icon: ManageAccountsTwoToneIcon,
        title: "Management",
        text: "Overseeing the day-to-day operations of the property, ensuring that everything runs smoothly and efficiently for residents.",
    },
    {
        Icon: WavesTwoToneIcon,
        title: "River Terrace",
        text: "Offering residents stunning views of the River Thames and surrounding landscape, providing an ideal spot to relax and enjoy the outdoors.",
    },
    {
        Icon: FitnessCenterTwoToneIcon,
        title: "Gym and Pool",
        text: "A convenient way for residents to reserve their own hours to stay fit and healthy, without ever having to leave the property",
    },
    {
        Icon: DirectionsCarFilledTwoToneIcon,
        title: "Secure Parking",
        text: "A gated indoor parking area with 24-hour security offers residents peace of mind knowing that their vehicles are safe and protected. ",
    },
];

export const Features: FunctionComponent = (): ReactElement => {
    return (
        <section id="features">
            <ImageBox fade url="/bg/tower-bridge.jpg">
                <Container maxWidth="md">
                    <LandingHeader text="Features" />
                    <Grid
                        container
                        justifyContent="center"
                        spacing={{ xs: 2, md: 4 }}
                        columns={{ xs: 4, sm: 8, md: 12 }}
                        p={2}
                    >
                        {FeatureData.map((x, i) => (
                            <Grid item xs={12} sm={6} md={6} key={i}>
                                <Item>
                                    <Stack
                                        mb={2}
                                        spacing={1}
                                        direction="row"
                                        alignItems="center"
                                        justifyContent="center"
                                    >
                                        <x.Icon sx={{ fill: appColors.secondary }} />
                                        <Typography sx={{ color: appColors.secondary }} variant="h5">
                                            {x.title}
                                        </Typography>
                                    </Stack>
                                    <Typography
                                        letterSpacing={0.5}
                                        sx={{ color: appColors.text.primary, fontSize: { xs: 18, sm: 18, md: 20 } }}
                                    >
                                        {x.text}
                                    </Typography>
                                </Item>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </ImageBox>
        </section>
    );
};
