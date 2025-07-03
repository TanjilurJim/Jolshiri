import { Head, useForm, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';

interface User {
  id: number;
  name: string;
  designation: string;
}

interface PageProps {
  users: User[];
  designations: string[];
}

export default function UserIndex({ users, designations }: PageProps) {
  const [editingId, setEditingId] = useState<number | null>(null);

  const { data, setData, reset, post, put, delete: destroy, processing } = useForm({
    name: '',
    designation: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      put(route('users.update', editingId), {
        onSuccess: () => {
          reset();
          setEditingId(null);
        },
      });
    } else {
      post(route('users.store'), {
        onSuccess: () => reset(),
      });
    }
  };

  const handleEdit = (user: User) => {
    setEditingId(user.id);
    setData({
      name: user.name,
      designation: user.designation,
    });
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure?')) {
      destroy(route('users.destroy', id));
    }
  };

  return (
    <AppLayout>
      <Head title="User Management" />

      <div className="max-w-3xl mx-auto mt-8 space-y-6">
        {/* User Form */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={data.name}
                  onChange={(e) => setData('name', e.target.value)}
                  required
                />
              </div>

              <div>
                <Label>Designation</Label>
                <Select
                  value={data.designation}
                  onValueChange={(value) => setData('designation', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select designation" />
                  </SelectTrigger>
                  <SelectContent>
                    {designations.map((des) => (
                      <SelectItem key={des} value={des}>
                        {des}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" disabled={processing}>
                {editingId ? 'Update User' : 'Create User'}
              </Button>

              {editingId && (
                <Button type="button" variant="secondary" onClick={() => { reset(); setEditingId(null); }}>
                  Cancel
                </Button>
              )}
            </form>
          </CardContent>
        </Card>

        {/* User List */}
        <Card>
          <CardContent className="p-6 space-y-3">
            {users.length === 0 ? (
              <p>No users available.</p>
            ) : (
              users.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between border-b py-2"
                >
                  <div>
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.designation}</p>
                  </div>
                  <div className="space-x-2">
                    <Button size="sm" onClick={() => handleEdit(user)}>
                      Edit
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(user.id)}>
                      Delete
                    </Button>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
