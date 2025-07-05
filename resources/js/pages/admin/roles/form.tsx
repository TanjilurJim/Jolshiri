import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';

interface Props {
    role: { id?: number; name?: string };
    matrix: Record<string, string[]>; // e.g. { post:['view','create'] }
    permissions: { id: number; module: string; ability: string }[];
    selectedIds: number[];
    isEdit: boolean;
}

export default function RoleForm({ role, matrix, permissions, selectedIds, isEdit }: Props) {
    /* ---------- turn selectedIds into a plain array just in case ---------- */
    const initialIds = Array.isArray(selectedIds) ? selectedIds : Object.values(selectedIds);

    const { data, setData, post, put, processing, errors } = useForm<{
        name: string;
        permissionIds: number[];
    }>({
        name: role.name || '',
        permissionIds: initialIds,
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        const url = isEdit ? route('admin.roles.update', role.id) : route('admin.roles.store');
        (isEdit ? put : post)(url);
    };

    /* ---------- fast lookup map ---------- */
    const permIndex = new Map(permissions.map((p) => [`${p.module}.${p.ability}`, p.id] as [string, number]));

    /* ---------- toggle WITHOUT passing a callback ---------- */
    const toggle = (id: number) => {
        const next = data.permissionIds.includes(id) ? data.permissionIds.filter((i) => i !== id) : [...data.permissionIds, id];

        setData('permissionIds', next); // passes VALUE not function
    };

    return (
        <AppLayout>
            <Head title={isEdit ? 'Edit Role' : 'Create Role'} />

            <form onSubmit={submit} className="space-y-6">
                {/* name */}
                <div className="flex items-end gap-4">
                    <label className="text-sm font-medium">Name</label>
                    <Input
                        id="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className={`max-w-xs ${errors.name ? 'border-red-500' : ''}`}
                    />
                </div>
                {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}

                {/* permissions */}
                <Card>
                    <CardContent className="p-0">
                        <Accordion type="multiple" className="divide-y">
                            {Object.entries(matrix).map(([module, abilities]) => (
                                <AccordionItem value={module} key={module}>
                                    <AccordionTrigger className="px-4 py-3 font-medium capitalize">{module}</AccordionTrigger>
                                    <AccordionContent>
                                        <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-3">
                                            {abilities.map((ab) => {
                                                const id = permIndex.get(`${module}.${ab}`)!;
                                                const checked = data.permissionIds.includes(id);
                                                return (
                                                    <label className="flex items-center gap-2" key={id}>
                                                        <Checkbox checked={checked} onCheckedChange={() => toggle(id)} />
                                                        <span className="capitalize">{ab}</span>
                                                    </label>
                                                );
                                            })}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </CardContent>
                </Card>

                <Button type="submit" disabled={processing}>
                    {isEdit ? 'Update' : 'Create'}
                </Button>
                <Link href={route('admin.roles.index')}>
                    <Button variant="ghost" type="button">
                        Cancel
                    </Button>
                </Link>
            </form>
        </AppLayout>
    );
}
