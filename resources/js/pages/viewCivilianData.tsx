import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { useCivilianContext } from '@/lib/CivilianContext';

const ViewCivilianData = () => {
    const { civilians, deleteCivilian } = useCivilianContext(); // Access context

    const handleDelete = (memberId: string) => {
        deleteCivilian(memberId); // Delete civilian data from context and localStorage
    };

    return (
        <AppLayout>
            <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800">Civilian Data</h2>
                <table className="min-w-full border-collapse text-sm">
                    <thead className="bg-muted text-muted-foreground">
                        <tr>
                            <th className="px-4 py-3 text-left font-medium">ID</th>
                            <th className="px-4 py-3 text-left font-medium">Name</th>
                            <th className="px-4 py-3 text-left font-medium">Email</th>
                            <th className="px-4 py-3 text-left font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {civilians.map((civilian) => (
                            <tr key={civilian.memberId}>
                                <td className="px-4 py-3">{civilian.memberId}</td>
                                <td className="px-4 py-3">{civilian.name}</td>
                                <td className="px-4 py-3">{civilian.email}</td>
                                <td className="px-4 py-3">
                                    <Button variant="outline" onClick={() => handleDelete(civilian.memberId)}>
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AppLayout>
    );
};

export default ViewCivilianData;
