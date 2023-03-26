import heroImg from "@/public/ncw-main.png";
import { ImageBox } from "@/src/components";
import { appColors } from "@/src/utils";
import { Button, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { FunctionComponent, ReactElement } from "react";

export const Hero: FunctionComponent = (): ReactElement => {
    return (
        <section id="home">
            <ImageBox center url={heroImg.src}>
                <Stack alignItems="center" justifyContent="center" spacing={6}>
                    <Typography
                        variant="h1"
                        textAlign="center"
                        fontWeight={500}
                        sx={{ color: "#fff" }}
                        letterSpacing={1}
                        fontSize={{ xs: "3rem", sm: "3.5rem", md: "4.5rem" }}
                    >
                        New
                        <br />
                        Caledonian
                        <br />
                        Wharf
                    </Typography>

                    <Typography
                        pl={2}
                        pr={2}
                        variant="h4"
                        fontWeight={400}
                        textAlign="center"
                        sx={{ color: appColors.text.secondary }} //"#26d0e2" }}
                        fontSize={{ xs: "1rem", sm: "1.2rem", md: "1.4rem" }}
                    >
                        OFFERING PANORAMIC VIEWS OF LONDON AND THE RIVER THAMES
                    </Typography>

                    <Link href="#highlights" scroll={false}>
                        <Button
                            variant="outlined"
                            size="large"
                            sx={{
                                color: "white",
                                p: "12px 28px",
                                borderRadius: "2rem",
                                width: "fit-content",
                                border: "1px solid white",
                                "&:hover": {
                                    backgroundColor: appColors.primary,
                                    color: "#fff",
                                    border: `1px solid ${appColors.primary}`,
                                },
                            }}
                        >
                            Read More
                        </Button>
                    </Link>
                </Stack>
            </ImageBox>
        </section>
    );
};
