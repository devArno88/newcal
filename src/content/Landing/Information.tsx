import { ImageBox } from "@/src/components";
import { appColors } from "@/src/utils";
import ConstructionTwoToneIcon from "@mui/icons-material/ConstructionTwoTone";
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import MenuBookTwoToneIcon from "@mui/icons-material/MenuBookTwoTone";
import WifiTwoToneIcon from "@mui/icons-material/WifiTwoTone";
import { Container, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { experimentalStyled as styled } from "@mui/material/styles";
import { FunctionComponent, ReactElement } from "react";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "transparent",
    padding: theme.spacing(4),
    textAlign: "center",
    borderRadius: "2rem",
    border: "2px solid #fff",
    color: "#fff",
    "&:hover": {
        border: `2px solid ${appColors.secondary}`,
    },
}));

const docs = [
    {
        title: "Handbook",
        subtitle: "Download the New Caledonian Wharf residents handbook",
        href: "https://newcaledonianwharf.com/pdf/Handbook.pdf",
        Icon: MenuBookTwoToneIcon,
    },
    {
        title: "Broadband",
        subtitle: "We are on Hyperoptic! Find out more info here",
        href: "https://newcaledonianwharf.com/pdf/Broadband.pdf",
        Icon: WifiTwoToneIcon,
    },
    {
        title: "Alterations",
        subtitle: "Learn how to gain approval to make alterations on your property",
        href: "https://newcaledonianwharf.com/pdf/License-To-Alter.pdf",
        Icon: ConstructionTwoToneIcon,
    },
    {
        title: "Listings",
        subtitle: "Download our current portfolio of available properties",
        href: "https://newcaledonianwharf.com/pdf/Handbook.pdf",
        Icon: HomeTwoToneIcon,
    },
];

export const Information: FunctionComponent = (): ReactElement => {
    return (
        <section id="information">
            <style>
                {`
                    .infoLink:hover {
                        color: ${appColors.secondary}
                    }
                `}
            </style>
            <ImageBox fade url="/bg/canary.jpg">
                <Container maxWidth="md" sx={{ padding: "100px 0" }}>
                    <Typography variant="h3" textAlign="center" mb={4} letterSpacing={1} fontWeight={300}>
                        Information
                    </Typography>
                    <Grid
                        container
                        spacing={{ xs: 2, sm: 3, md: 5 }}
                        sx={{ p: 4, alignItems: "center", justifyContent: "center" }}
                    >
                        {docs.map((x, i) => (
                            <Grid item xs={12} sm={8} md={6} key={i}>
                                <a
                                    style={{ textDecoration: "none", color: "#fff" }}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="infoLink"
                                    href={x.href}
                                >
                                    <Item>
                                        <Stack
                                            direction="row"
                                            alignItems="center"
                                            mb={1.5}
                                            spacing={1.5}
                                            justifyContent="center"
                                        >
                                            <x.Icon fontSize="large" />
                                            <Typography variant="h5">{x.title}</Typography>
                                        </Stack>

                                        <Typography variant="h6">{x.subtitle}</Typography>
                                    </Item>
                                </a>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </ImageBox>
        </section>
    );
};
