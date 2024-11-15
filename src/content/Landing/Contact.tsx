import { ImageBox } from "@/src/components";
import { I_Alerter } from "@/src/interfaces";
import { Box, Container, Grid, Typography } from "@mui/material";
import { experimentalStyled as styled } from "@mui/material/styles";
import { FunctionComponent, ReactElement } from "react";
import { EnquiryForm } from "./EnquiryForm";

const Item = styled(Box)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

export const Contact: FunctionComponent<I_Alerter> = (props): ReactElement => {
    return (
        <section id="contact">
            <ImageBox fade url="/ncw-slide-4.png">
                <Container maxWidth="md" sx={{ padding: "100px 0" }}>
                    <Typography variant="h3" textAlign="center" mb={2} letterSpacing={1} fontWeight={300}>
                        Contact
                    </Typography>
                    <Typography pl={8} pr={8} variant="h6" textAlign="center" mb={4} letterSpacing={1} fontWeight={300}>
                        For any questions or enquiries, please don{`'`}t hesitate to get in touch!
                    </Typography>
                    <Grid container spacing={{ xs: 2, md: 2 }} alignItems="start" justifyContent="center">
                        <Grid item xs={12} sm={8} md={6}>
                            <Item>
                                <EnquiryForm setAlert={props.setAlert} />
                            </Item>
                        </Grid>
                        <Grid item xs={12} sm={8} md={6}>
                            <Item>
                                <img
                                    alt="Reception"
                                    src="/ncw-slide-11.png"
                                    style={{ width: "100%", borderRadius: "1rem", border: `2px solid #fff` }}
                                />
                            </Item>
                        </Grid>
                    </Grid>
                </Container>
            </ImageBox>
        </section>
    );
};
