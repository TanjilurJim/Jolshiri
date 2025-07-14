import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import CivilianForm from './civilianForm';

import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Plot registration form for Civilian',
        href: '/civilianPlotRegistration',
    },
];

const civilianPlotRegistration = () => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Card>
                <CardHeader>
                    <CardTitle>Fill-up all the information in Bangla</CardTitle>
                </CardHeader>
                <CardContent>
                    <CivilianForm isEdit={false} />
                </CardContent>
            </Card>
        </AppLayout>
    );
};

export default civilianPlotRegistration;
