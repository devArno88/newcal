import { I_Alerter } from "@/src/interfaces";
import { FunctionComponent, ReactElement } from "react";
import { Contact } from "./Contact";
import { Features } from "./Features";
import { Hero } from "./Hero";
import { Highlights } from "./Highlights";
import { Information } from "./Information";
import { Transport } from "./Transport";

export const Landing: FunctionComponent<I_Alerter> = (props): ReactElement => {
    return (
        <>
            <Hero />
            <Highlights />
            <Features />
            <Information />
            <Transport />
            <Contact setAlert={props.setAlert} />
        </>
    );
};
