import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';

import { type BreadcrumbItem } from '@/types';
import OfficerForm from './officerForm';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Officer Plot Registration',
        href: '/officerPlotRegistration',
    },
];

const officerPlotRegistration = () => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <h2 className="mb-3 text-xl font-semibold text-gray-800">Fill-up all the information in Bangla</h2>
            <Card>
                <CardContent>
                    <OfficerForm isEdit={false} />
                </CardContent>
            </Card>
        </AppLayout>
    );
};

export default officerPlotRegistration;
