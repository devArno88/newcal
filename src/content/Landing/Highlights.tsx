import { Carousel, ImageBox, LandingHeader } from "@/src/components";
import Jumbotron from "@/src/components/Jumbotron";
import { landingStrings } from "@/src/strings";
import { Box, Container, Stack } from "@mui/material";
import { FunctionComponent, ReactElement } from "react";

export const Highlights: FunctionComponent = (): ReactElement => (
    <section id="highlights">
        <ImageBox fade url="/bg/shard-1.jpg">
            <Container maxWidth="xl">
                <LandingHeader text="Highlights" />
                <Stack spacing={14} pr={{ xs: 0, md: 8 }} pl={{ xs: 0, md: 8 }}>
                    {landingStrings.highlights.map((x: { title: string; text: string; image: string }, i: number) => (
                        <Jumbotron
                            first={i === 0}
                            key={i}
                            reverse={i % 2}
                            title={x.title || ""}
                            text={x.text}
                            image={x.image}
                        />
                    ))}
                </Stack>
                <Box display="flex" alignItems="center" justifyContent="center" pb={10}>
                    <Carousel />
                </Box>
            </Container>
        </ImageBox>
    </section>
);
