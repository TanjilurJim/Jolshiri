import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';

import { type BreadcrumbItem } from '@/types';
import PlotAddForm from './plotAddForm';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Add Plot',
        href: '/plotAdd',
    },
];

const plotAdd = () => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <h2 className="mb-3 text-xl font-semibold text-gray-800">Fill-up all the information in Bangla</h2>
            <Card>
                <CardContent>
                    <PlotAddForm isEdit={false} />
                </CardContent>
            </Card>
        </AppLayout>
    );
};

export default plotAdd;
