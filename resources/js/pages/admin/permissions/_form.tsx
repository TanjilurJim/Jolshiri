import { useForm } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface Props {
  permission?: {
    name: string;
    guard_name: string;
  };
}

export default function PermissionForm({ permission }: Props) {
  const { data, setData, post, processing, errors } = useForm({
    name: permission?.name ?? '',
    guard_name: permission?.guard_name ?? 'web',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('admin.permissions.store'));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Permission Name</Label>
        <Input
          id="name"
          value={data.name}
          onChange={(e) => setData('name', e.target.value)}
          className={errors.name ? 'border-red-500' : ''}
        />
        {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
      </div>

      <div>
        <Label htmlFor="guard_name">Guard Name</Label>
        <Input
          id="guard_name"
          value={data.guard_name}
          onChange={(e) => setData('guard_name', e.target.value)}
          className={errors.guard_name ? 'border-red-500' : ''}
        />
        {errors.guard_name && <div className="text-red-500 text-sm">{errors.guard_name}</div>}
      </div>

      <Button type="submit" disabled={processing}>
        Save
      </Button>
    </form>
  );
}
