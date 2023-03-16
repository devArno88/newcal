import { ItemContent } from "@/src/components";
import { E_TicketType } from "@/src/interfaces";
import { FunctionComponent } from "react";

interface PropTypes {
    type: E_TicketType;
    title: string;
    content: string;
}

export const TicketPageContent: FunctionComponent<PropTypes> = (props) => (
    <ItemContent type={props.type} title={props.title} content={props.content} />
);
