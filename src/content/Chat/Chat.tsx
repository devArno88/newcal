import { createMessage } from "@/src/actions";
import { PageHeader } from "@/src/components";
import { E_AlertTypes } from "@/src/context";
import { I_Alerter, I_Chat, I_Mutator, I_NewCalSession } from "@/src/interfaces";
import { Stack } from "@mui/material";
import { FunctionComponent, KeyboardEvent, useState } from "react";
import { ChatInput } from "./ChatInput";
import { ChatMessages } from "./ChatMessages";

interface PropTypes extends I_Mutator, I_Alerter, I_NewCalSession {
    chat: I_Chat;
}

interface MessageFormData {
    text: string;
}

export const Chat: FunctionComponent<PropTypes> = (props) => {
    const [formData, setFormData] = useState<MessageFormData>({ text: "" });
    const onChange = (e) => setFormData({ text: e.target.value });
    const { text } = formData;
    const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleMessage(formData);
        }
    };
    const handleMessage = async (formData: MessageFormData) => {
        const res = await createMessage({ chatID: props.chat._id, formData });
        if (res?.err) props.setAlert({ type: E_AlertTypes.error, text: res?.err });
        if (res?.msg) {
            props.mutate();
            setFormData({ text: "" });
        }
    };
    const onClick = () => handleMessage(formData);
    return (
        <Stack
            spacing={4}
            sx={{
                height: "85vh",
                position: "relative",
                justifyContent: "space-between",
            }}
        >
            <PageHeader title="Admin Chat" subtitle="NewCal Development, Management and Concierge" />
            <ChatMessages messages={props.chat.messages} session={props.session} />
            <ChatInput text={text} onClick={onClick} onKeyDown={onKeyDown} onChange={onChange} />
        </Stack>
    );
};
