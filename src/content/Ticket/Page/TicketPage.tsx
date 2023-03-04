import { PageHeader } from "@/src/components";
import { I_Alerter, I_Mutator, I_NewCalSession, I_Ticket } from "@/src/interfaces";
import { appColors, capitalise, fromNowDate, sortArrayByDate } from "@/src/utils";
import { Divider, Stack } from "@mui/material";
import { Fragment, FunctionComponent, ReactElement } from "react";
import { TicketPageActions } from "./TicketPageActions";
import { TicketPageComment } from "./TicketPageComment";
import { TicketPageContent } from "./TicketPageContent";

interface PropTypes extends I_Mutator, I_NewCalSession, I_Alerter {
    ticket: I_Ticket;
}

export const TicketPage: FunctionComponent<PropTypes> = (props): ReactElement => {
    return (
        <Stack gap={4}>
            <PageHeader
                title={`NewCal ${capitalise(props.ticket.type)}`}
                subtitle={`Created ${fromNowDate(props.ticket.date)} by ${props.ticket.user.name} (Flat`}
            />
            <TicketPageContent title={props.ticket.title} content={props.ticket.content} type={props.ticket.type} />
            <TicketPageActions
                setAlert={props.setAlert}
                mutate={props.mutate}
                type={props.ticket.type}
                session={props.session}
                ticketID={props.ticket?._id}
                likes={props.ticket.likes}
                views={props.ticket.views}
            />
            <Stack spacing={4} mt={2}>
                <Divider component="hr" sx={{ bgcolor: appColors.border }} />
                {props.ticket.comments.sort(sortArrayByDate).map((comment, i) => (
                    <Fragment key={comment._id.toString()}>
                        <TicketPageComment
                            {...comment}
                            mutate={props.mutate}
                            session={props.session}
                            ticketID={props.ticket._id}
                            setAlert={props.setAlert}
                        />
                        {i !== props.ticket.comments.length - 1 ? (
                            <Divider component="hr" sx={{ bgcolor: appColors.border }} />
                        ) : null}
                    </Fragment>
                ))}
            </Stack>
        </Stack>
    );
};
