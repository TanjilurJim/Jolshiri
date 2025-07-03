import { Head, Link } from '@inertiajs/react';
import type { PageProps } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Pagination } from '@/components/ui/pagination';
import { Plus } from 'lucide-react';
import type { Role, Paginated } from '@/types/models';

type Props = PageProps & { roles: Paginated<Role> };

export default function RoleIndex({ roles }: Props) {
  return (
    <AppLayout>
      <Head title="Roles" />

      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Roles</h1>

        <Link href={route('admin.roles.create')}>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Role
          </Button>
        </Link>
      </div>

      <Card>
        <CardContent className="p-0">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-muted text-muted-foreground">
              <tr>
                <th className="px-4 py-2 text-left">#</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {roles.data.map((role, i) => (
                <tr key={role.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2">
                    {i + 1 + (roles.current_page - 1) * roles.per_page}
                  </td>
                  <td className="px-4 py-2">{role.name}</td>
                  <td className="space-x-2 px-4 py-2">
                    <Link href={route('admin.roles.edit', role.id)}>
                      <Button size="sm" variant="outline">Edit</Button>
                    </Link>

                    <Link
                      as="button"
                      method="delete"
                      href={route('admin.roles.destroy', role.id)}
                      onBefore={() => confirm('Are you sure?')}
                    >
                      <Button size="sm" variant="destructive">Delete</Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <div className="mt-4">
        <Pagination links={roles.links} />
      </div>
    </AppLayout>
  );
}
