import { E_Roles } from "@/src/interfaces";
import { appColors, capitalise } from "@/src/utils";
import {
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import { FunctionComponent, ReactElement, ReactNode } from "react";

interface PropTypes {
    title: string;
    data: any;
}

// Reorder roles enum
const roles = [E_Roles.resident, E_Roles.concierge, E_Roles.management, E_Roles.development];

const CustomCell = ({ children, blue }: { children: ReactNode; blue?: boolean }): ReactElement => (
    <TableCell align="center" sx={{ color: blue ? appColors.secondary : appColors.text.primary }}>
        <Typography variant="h6" fontSize={{ xs: 16, sm: 18, md: 20 }}>
            {children}
        </Typography>
    </TableCell>
);

export const FeatureTable: FunctionComponent<PropTypes> = (props) => (
    <Stack spacing={2}>
        <Typography variant="h5" textAlign="center" fontWeight={{ xs: 500, sm: 600 }} letterSpacing={2}>
            {props.title}
        </Typography>
        <TableContainer component={Paper}>
            <Table
                aria-label="simple table"
                sx={{
                    bgcolor: appColors.panel,
                    color: appColors.text.primary,
                    border: `2px solid ${appColors.border}`,
                }}
            >
                <TableHead>
                    <TableRow>
                        <TableCell />
                        {roles.map((role) => (
                            <CustomCell blue key={role}>
                                {capitalise(role)}
                            </CustomCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.data.map((row) => (
                        <TableRow
                            key={row.feature}
                            sx={{
                                "&:last-child td, &:last-child th": {
                                    border: 0,
                                },
                            }}
                        >
                            <TableCell sx={{ color: appColors.text.primary }} align="left" component="th" scope="row">
                                <Typography variant="h6" fontSize={{ xs: 16, sm: 18, md: 20 }}>
                                    {row.feature}
                                </Typography>
                            </TableCell>
                            {roles.map((role) => (
                                <CustomCell key={`${row.name}-${role}`}>{row[role]}</CustomCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </Stack>
);
