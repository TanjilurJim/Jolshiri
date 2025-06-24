import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PermissionForm from './_form';

export default function PermissionCreate() {
  return (
    <AppLayout>
      <Head title="Create Permission" />

      <Card>
        <CardHeader>
          <CardTitle>Create Permission</CardTitle>
        </CardHeader>
        <CardContent>
          <PermissionForm />
        </CardContent>
      </Card>
    </AppLayout>
  );
}
