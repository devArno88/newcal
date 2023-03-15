import { ImageBox } from "@/src/components";
import { appColors } from "@/src/utils";
import { Box, Container, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { experimentalStyled as styled } from "@mui/material/styles";
import { FunctionComponent, ReactElement } from "react";

const Item = styled(Box)(({ theme }) => ({
    backgroundColor: "transparent",
    padding: theme.spacing(2),
    textAlign: "center",
    color: "#fff",
}));

const items = [
    {
        image: "/ncw-bus.png",
        title: "Bus",
        bullets: ["381: Waterloo / Peckham", "C10: Canada Water"],
    },
    {
        image: "/ncw-tube.png",
        title: "Tube",
        bullets: ["Canada Water: Jubilee / Overground", "Surrey Quays: Overground", "Rotherhithe: Overground"],
    },
    {
        image: "/ncw-boat.png",
        title: "River",
        bullets: ["Thames Clippers every 10 minutes at Greenland Pier and Hilton DoubleTree Pier"],
    },
    {
        image: "/ncw-city.png",
        title: "Other",
        bullets: [
            "Cabs: 020 7237 2626",
            "Starcars: 020 7237 (7777 / 8888)",
            "Thames Path Riverwalk",
            "TFL / National Cycle Paths",
        ],
    },
];

export const Transport: FunctionComponent = (): ReactElement => {
    return (
        <section id="transport">
            <ImageBox fade url="/bg/uber.jpg">
                <Container maxWidth="md" sx={{ padding: "100px 0" }}>
                    <Typography variant="h3" textAlign="center" mb={4} letterSpacing={1} fontWeight={300}>
                        Transport
                    </Typography>
                    <Grid
                        container
                        spacing={{ xs: 2, sm: 3, md: 5 }}
                        sx={{ p: 4, alignItems: "start", justifyContent: "center" }}
                    >
                        {items.map((x, i) => (
                            <Grid item xs={12} sm={8} md={6} key={i}>
                                <Item>
                                    <Stack>
                                        <img
                                            src={x.image}
                                            alt={`Transport${i}`}
                                            style={{
                                                width: "100%",
                                                height: "auto",
                                                border: `2px solid #fff`,
                                                borderRadius: "1rem",
                                            }}
                                        />
                                        <Typography
                                            mt={2}
                                            letterSpacing={1}
                                            sx={{ color: appColors.secondary }}
                                            fontWeight={400}
                                            variant="h4"
                                        >
                                            {x.title}
                                        </Typography>
                                        <Stack spacing={1} mt={1}>
                                            {x.bullets.map((s, j) => (
                                                <Typography key={j} variant="h6" fontWeight={400}>
                                                    {s}
                                                </Typography>
                                            ))}
                                        </Stack>
                                    </Stack>
                                </Item>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </ImageBox>
        </section>
    );
};
