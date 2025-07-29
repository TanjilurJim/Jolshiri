import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { useCivilianContext } from '@/lib/CivilianContext';

const ViewCivilianData = () => {
    const { civilians, deleteCivilian } = useCivilianContext(); // Access context

    const handleDelete = (memberId: string) => {
        deleteCivilian(memberId);
    };

    return (
        <AppLayout>
            <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800">Civilian Data Management</h2>
                <div className="overflow-x-auto">
                    {' '}
                    {/* Add scroll container */}
                    <table className="min-w-full border-collapse text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left font-medium">IMG</th>
                                <th className="px-4 py-3 text-left font-medium">ID</th>
                                <th className="px-4 py-3 text-left font-medium">Name</th>
                                <th className="px-4 py-3 text-left font-medium">Father/Husband Name</th>
                                <th className="px-4 py-3 text-left font-medium">Mother's Name</th>
                                <th className="px-4 py-3 text-left font-medium">DOB</th>
                                <th className="px-4 py-3 text-left font-medium">Religion</th>
                                <th className="px-4 py-3 text-left font-medium">Nationality</th>
                                <th className="px-4 py-3 text-left font-medium">NID/Passport</th>
                                <th className="px-4 py-3 text-left font-medium">TIN</th>
                                <th className="px-4 py-3 text-left font-medium">Phone</th>
                                <th className="px-4 py-3 text-left font-medium">Email</th>
                                <th className="px-4 py-3 text-left font-medium">Permanent Add.</th>
                                <th className="px-4 py-3 text-left font-medium">Present Add.</th>
                                <th className="px-4 py-3 text-left font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {civilians.map((civilian) => (
                                <tr key={civilian.memberId}>
                                    <td className="">
                                        <img src={civilian.image} alt={civilian.name} className="h-50% w-50% rounded-full" />
                                    </td>
                                    <td className="px-4 py-3">{civilian.memberId}</td>
                                    <td className="px-4 py-3">{civilian.name}</td>
                                    <td className="px-4 py-3">{civilian.husbandOrFatherName}</td>
                                    <td className="px-4 py-3">{civilian.motherName}</td>
                                    <td className="px-4 py-3">{civilian.dob}</td>
                                    <td className="px-4 py-3">{civilian.religion}</td>
                                    <td className="px-4 py-3">{civilian.nationality}</td>
                                    <td className="px-4 py-3">{civilian.nidPassport}</td>
                                    <td className="px-4 py-3">{civilian.tin}</td>
                                    <td className="px-4 py-3">{civilian.phoneNumber}</td>
                                    <td className="px-4 py-3">{civilian.email}</td>
                                    <td className="px-4 py-3">{civilian.permanentAddress}</td>
                                    <td className="px-4 py-3">{civilian.presentAddress}</td>
                                    <td className="px-4 py-3">
                                        <Button
                                            variant="outline"
                                            className="border- cursor-pointer border-red-600 hover:bg-red-600"
                                            onClick={() => handleDelete(civilian.memberId)}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
};

export default ViewCivilianData;
