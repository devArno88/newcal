import { Carousel, ImageBox } from "@/src/components";
import Jumbotron from "@/src/components/Jumbotron";
import { landingStrings } from "@/src/strings";
import { Box, Container, Stack, Typography } from "@mui/material";
import { FunctionComponent, ReactElement } from "react";

export const Highlights: FunctionComponent = (): ReactElement => (
    <section id="highlights">
        <ImageBox fade url="/bg/shard-1.jpg">
            <Container maxWidth="xl" sx={{ pt: 8, pb: 30 }}>
                <Typography variant="h3" textAlign="center" mb={4} letterSpacing={1} fontWeight={300}>
                    Highlights
                </Typography>
                <Stack spacing={10} sx={{ p: 4 }}>
                    {landingStrings.highlights.map((x: { title: string; text: string; image: string }, i: number) => (
                        <Jumbotron key={i} reverse={i % 2} title={x.title || ""} text={x.text} image={x.image} />
                    ))}
                </Stack>
                <Box display="flex" alignItems="center" justifyContent="center">
                    <Carousel />
                </Box>
            </Container>
        </ImageBox>
    </section>
);
