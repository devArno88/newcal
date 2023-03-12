import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";
import ArrowForwardTwoToneIcon from "@mui/icons-material/ArrowForwardTwoTone";
import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import SwipeableViews from "react-swipeable-views";
import { autoPlay, bindKeyboard } from "react-swipeable-views-utils";

const AutoPlaySwipeableViews = bindKeyboard(autoPlay(SwipeableViews));

const imgStyle = {
    width: "100%",
    height: "auto",
    borderRadius: "1rem",
    // boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
};

const slides = [
    "/ncw-slide-4.png",
    "/ncw-slide-6.png",
    "/ncw-slide-7.png",
    "/ncw-slide-8.png",
    "/ncw-slide-9.png",
    "/ncw-slide-10.png",
    "/ncw-slide-11.png",
];

export class Carousel extends React.Component {
    state = { index: 0 };
    handleChangeIndex = (index) => this.setState({ index });
    render() {
        const { index } = this.state;
        return (
            <Stack spacing={2} mt={10}>
                <Typography textAlign="center" variant="h4" sx={{ color: "#fff" }}>
                    More Highlights
                </Typography>
                <Stack
                    justifyContent="center"
                    spacing={3}
                    direction="row"
                    alignItems="center"
                    sx={{ display: { xs: "none", sm: "flex" } }}
                >
                    <ArrowBackTwoToneIcon sx={{ fill: "#fff" }} />
                    <Typography variant="h5" sx={{ color: "#fff" }}>
                        Shuffle With Arrow Keys
                    </Typography>
                    <ArrowForwardTwoToneIcon sx={{ fill: "#fff" }} />
                </Stack>
                <Box
                    sx={{
                        position: "relative",
                        height: { xs: 200, sm: 300, md: 500 },
                        width: { xs: 400, sm: 600, md: 800 },
                    }}
                >
                    <AutoPlaySwipeableViews index={index} onChangeIndex={this.handleChangeIndex} enableMouseEvents>
                        {slides.map((slide, x) => (
                            <img key={x} src={slide} alt={`Slide${x}`} style={imgStyle} />
                        ))}
                    </AutoPlaySwipeableViews>
                </Box>
            </Stack>
        );
    }
}
