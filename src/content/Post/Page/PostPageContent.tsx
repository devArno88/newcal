import { ItemContent } from "@/src/components";
import { E_PostType } from "@/src/interfaces";
import { FunctionComponent } from "react";

interface PropTypes {
    type: E_PostType;
    title: string;
    content: string;
}

export const PostPageContent: FunctionComponent<PropTypes> = (props) => (
    <ItemContent type={props.type} title={props.title} content={props.content} />
);
