import { Head, Link } from '@inertiajs/react';
import type { PageProps } from '@/types';
import AppLayout from '@/layouts/app-layout';            // ✅ add layout
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Pagination } from '@/components/ui/pagination';
import type { Permission, Paginated } from '@/types/models';
import { Plus } from 'lucide-react';

// Page-specific props come under PageProps generic
type Props = PageProps<{ permissions: Paginated<Permission> }>;

export default function PermissionIndex({ permissions }: Props) {
  return (
    <AppLayout> {/* ← wraps everything */}
      <Head title="Permissions" />

      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Permissions</h1>

        <Link href={route('admin.permissions.create')}>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Permission
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
                <th className="px-4 py-2 text-left">Guard</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {permissions.data.map((perm, i) => (
                <tr key={perm.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2">
                    {i + 1 + (permissions.current_page - 1) * permissions.per_page}
                  </td>
                  <td className="px-4 py-2">{perm.name}</td>
                  <td className="px-4 py-2">{perm.guard_name}</td>
                  <td className="space-x-2 px-4 py-2">
                    <Link href={route('admin.permissions.edit', perm.id)}>
                      <Button size="sm" variant="outline">Edit</Button>
                    </Link>

                    <Link
                      as="button"
                      method="delete"
                      href={route('admin.permissions.destroy', perm.id)}
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
        {/* uses your reusable Pagination component */}
        <Pagination links={permissions.links} />
      </div>
    </AppLayout>
  );
}
