import HeadingSmall from '@/components/heading-small';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import MailConfigurationForm from '../MailConfigurationForm';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Mail Configuration settings',
        href: '/settings/mailConfiguration',
    },
];

const Smtp = () => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Mail Configuration settings" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Mail Configuration settings" description="Update your Mail Configuration settings" />
                    <MailConfigurationForm isEdit={false}/>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
};

export default Smtp;
