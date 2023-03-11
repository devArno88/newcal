import { Carousel, ImageBox } from "@/src/components";
import Jumbotron from "@/src/components/Jumbotron";
import { landingStrings } from "@/src/strings";
import { Box, Container, Paper, Stack } from "@mui/material";
import { experimentalStyled as styled } from "@mui/material/styles";
import { FunctionComponent, ReactElement } from "react";

export const Highlights: FunctionComponent = (): ReactElement => {
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        ...theme.typography.body2,
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary,
    }));

    return (
        <section id="highlights">
            <ImageBox fade url="/bg/shard-1.jpg">
                <Container maxWidth="xl" sx={{ pt: 4, pb: 30 }}>
                    <Stack spacing={10} sx={{ p: 4 }}>
                        {landingStrings.highlights.map((x, i) => (
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
};
