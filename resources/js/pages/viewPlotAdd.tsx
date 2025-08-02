import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { type BreadcrumbItem } from '@/types';
import PlotAddForm from './plotAddForm';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Civilian Plot Registration',
        href: '/civilianPlotRegistration',
    },
];

const viewPlotAdd = () => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Card>
                <CardHeader>
                    <CardTitle>Fill-up all the information in Bangla</CardTitle>
                </CardHeader>
                <CardContent>
                    <PlotAddForm isEdit={false} />
                </CardContent>
            </Card>
        </AppLayout>
    );
};

export default viewPlotAdd;
