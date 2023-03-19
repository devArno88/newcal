import { PageHeader } from "@/src/components";
import { I_Alerter, I_Enquiries, I_Mutator } from "@/src/interfaces";
import { Stack } from "@mui/material";
import { FunctionComponent, ReactElement } from "react";
import { Enquiry } from "./Enquiry";

interface PropTypes extends I_Enquiries, I_Mutator, I_Alerter {}

export const Enquiries: FunctionComponent<PropTypes> = (props): ReactElement => {
    return (
        <Stack spacing={4}>
            <PageHeader title="NewCal Enquiries" subtitle="External Visitor Questions" />
            <Stack spacing={2}>
                {props.enquiries.map((enquiry) => (
                    <Enquiry
                        key={enquiry._id.toString()}
                        setAlert={props.setAlert}
                        mutate={props.mutate}
                        {...enquiry}
                    />
                ))}
            </Stack>
        </Stack>
    );
};
