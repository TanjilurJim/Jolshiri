import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import CivilianForm from './civilianForm';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Civilian Plot Registration',
        href: '/civilianPlotRegistration',
    },
];

const civilianPlotRegistration = () => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <h2 className="mb-3 text-xl font-semibold text-gray-800">Fill-up all the information in Bangla</h2>
            <Card>
                <CardContent>
                    <CivilianForm isEdit={false} />
                </CardContent>
            </Card>
        </AppLayout>
    );
};

export default civilianPlotRegistration;
