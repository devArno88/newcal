import { PageHeader } from "@/src/components";
import { Stack } from "@mui/material";

import { FeatureTable } from "./FeatureTable";
import { FeaturesTableData } from "./table-data";

export const Features = () => (
    <Stack spacing={4}>
        <PageHeader title="Features" subtitle="Application User Functionality" />
        {FeaturesTableData.map((table) => (
            <FeatureTable key={table.title} title={table.title} data={table.data} />
        ))}
    </Stack>
);
