import { E_PostType, E_TicketType } from "@/src/interfaces";
import { appColors } from "@/src/utils";
// import {
//     appColors,
//     Icon_Enhancement,
//     Icon_Info,
//     Icon_Issue,
//     Icon_Listing,
//     Icon_Notice,
//     Icon_Question,
//     Icon_Warning,
// } from "@/src/utils";
import { Stack, Typography } from "@mui/material";
import { FunctionComponent, ReactElement } from "react";

interface PropTypes {
    type: E_PostType | E_TicketType;
    title: string;
    content: string;
}

// const handleIcon = (type: E_PostType | E_TicketType) => {
//     const iconProps: any = {
//         sx: { fill: type === E_PostType.warning ? "salmon" : appColors.secondary, display: { xs: "none", sm: "flex" } },
//         fontSize: "large",
//     };
//     switch (type) {
//         case E_PostType.listing:
//             return <Icon_Listing {...iconProps} />;
//         case E_PostType.question:
//             return <Icon_Question {...iconProps} />;
//         case E_PostType.notice:
//             return <Icon_Notice {...iconProps} />;
//         case E_PostType.warning:
//             return <Icon_Warning {...iconProps} />;
//         case E_TicketType.enhancement:
//             <Icon_Enhancement {...iconProps} />;
//         case E_TicketType.question:
//             <Icon_Question {...iconProps} />;
//         case E_TicketType.issue:
//             <Icon_Issue {...iconProps} />;
//         default:
//             return <Icon_Info {...iconProps} />;
//     }
// };

export const ItemContent: FunctionComponent<PropTypes> = (props): ReactElement => {
    return (
        <Stack spacing={2} mt={4}>
            <Stack direction="row" spacing={2}>
                {/* {handleIcon(props.type)} */}
                <Typography
                    variant="h5"
                    sx={{ color: appColors.text.secondary, fontSize: { xs: "1.4rem", sm: "1.5rem", md: "1.6rem" } }}
                >
                    {props.title}
                </Typography>
            </Stack>
            <Stack direction="row" spacing={2}>
                {/* <Icon_Info
                    sx={{
                        display: { xs: "none", sm: "flex" },
                        fill: props.type === E_PostType.warning ? "salmon" : appColors.secondary,
                    }}
                    fontSize="large"
                /> */}
                <Typography
                    variant="h6"
                    sx={{ color: appColors.text.primary, fontSize: { xs: "1.1rem", sm: "1.2rem", md: "1.3rem" } }}
                >
                    {props.content}
                </Typography>
            </Stack>
        </Stack>
    );
};
