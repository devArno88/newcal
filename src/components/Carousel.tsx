import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";
import ArrowForwardTwoToneIcon from "@mui/icons-material/ArrowForwardTwoTone";
import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import SwipeableViews from "react-swipeable-views";
import { autoPlay, bindKeyboard } from "react-swipeable-views-utils";
import { CenterBox } from "./CenterBox";

const AutoPlaySwipeableViews = bindKeyboard(autoPlay(SwipeableViews));

export class Carousel extends React.Component {
    state = { index: 0 };
    handleChangeIndex = (index) => this.setState({ index });
    render() {
        const { index } = this.state;
        return (
            <Stack spacing={2} mt={6} mb={8}>
                <Stack direction="row" spacing={3} justifyContent="center" alignItems="center">
                    <ArrowBackTwoToneIcon sx={{ fill: "#fff", display: { xs: "flex", sm: "flex", md: "none" } }} />
                    <Typography textAlign="center" variant="h4" sx={{ color: "#fff" }}>
                        More Highlights
                    </Typography>
                    <ArrowForwardTwoToneIcon sx={{ fill: "#fff", display: { xs: "flex", sm: "flex", md: "none" } }} />
                </Stack>
                <Stack
                    spacing={3}
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    sx={{ display: { xs: "none", sm: "none", md: "flex" } }}
                >
                    <ArrowBackTwoToneIcon sx={{ fill: "#fff" }} />
                    <Typography variant="h5" sx={{ color: "#fff" }}>
                        Shuffle With Arrow Keys
                    </Typography>
                    <ArrowForwardTwoToneIcon sx={{ fill: "#fff" }} />
                </Stack>
                <CenterBox>
                    <Box
                        sx={{
                            position: "relative",
                            width: { xs: "95%", sm: "80%", md: 800 },
                            height: { xs: 200, sm: 300, md: 500 },
                        }}
                    >
                        <AutoPlaySwipeableViews index={index} onChangeIndex={this.handleChangeIndex} enableMouseEvents>
                            {[4, 6, 7, 8, 9, 10, 11].map((x, i) => (
                                <img
                                    key={i}
                                    src={`/ncw-slide-${x}.png`}
                                    alt={`Slide${i}`}
                                    style={{
                                        width: "100%",
                                        height: "auto",
                                        borderRadius: "1rem",
                                    }}
                                />
                            ))}
                        </AutoPlaySwipeableViews>
                    </Box>
                </CenterBox>
            </Stack>
        );
    }
}
