import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { useCivilianContext } from '@/lib/CivilianContext';
import { useState } from 'react';
import CivilianForm from './civilianForm';
import { BreadcrumbItem } from '@/types';
// import CivilianForm from '@/components/CivilianForm'; // Import your form component

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Civilian Data',
        href: '/viewCivilianData',
    },
];

const ViewCivilianData = () => {
    const { civilians, deleteCivilian, getCivilian } = useCivilianContext();
    const [editingCivilian, setEditingCivilian] = useState<string | null>(null);
    const [showEditForm, setShowEditForm] = useState(false);

    const handleDelete = (memberId: string) => {
        deleteCivilian(memberId);
    };

    const handleEdit = (memberId: string) => {
        setEditingCivilian(memberId);
        setShowEditForm(true);
    };

    const handleCloseEdit = () => {
        setEditingCivilian(null);
        setShowEditForm(false);
    };

    const currentEditingCivilian = editingCivilian ? getCivilian(editingCivilian) : null;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800">Civilian Data Management</h2>
                
                {/* Edit Form Modal/Section */}
                {showEditForm && currentEditingCivilian && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-white p-6">
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="text-lg font-semibold">Edit Civilian Information</h3>
                                <Button
                                    variant="outline"
                                    onClick={handleCloseEdit}
                                    className="cursor-pointer"
                                >
                                    ✕ Close
                                </Button>
                            </div>
                            <CivilianForm
                                isEdit={true} 
                                current={currentEditingCivilian}
                                onSuccess={handleCloseEdit} // Add this prop to close modal after successful edit
                            />
                        </div>
                    </div>
                )}

                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                {tableHeaders.map((tableHeader, index) => (
                                    <th key={index} className="px-4 py-3 text-left font-medium">
                                        {tableHeader}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {civilians.map((civilian) => (
                                <tr key={civilian.memberId} >
                                    <td className="">
                                        <img src={civilian.image} alt={civilian.name} className="rounded-full" />
                                    </td>
                                    <td className="px-4 py-3">{civilian.memberId}</td>
                                    <td className="px-4 py-3">{civilian.name}</td>
                                    <td className="px-4 py-3">{civilian.husbandOrFatherName}</td>
                                    <td className="px-4 py-3">{civilian.nationality}</td>
                                    <td className="px-4 py-3">{civilian.nidPassport}</td>
                                    <td className="px-4 py-3">{civilian.dob}</td>
                                    <td className="px-4 py-3">{civilian.tin}</td>
                                    <td className="px-4 py-3">{civilian.phoneNumber}</td>
                                    <td className="px-4 py-3">{civilian.email}</td>
                                    <td className="px-4 py-3">{civilian.permanentAddress}</td>
                                    <td className="flex gap-1 px-4 py-3">
                                        <Button
                                            variant="outline"
                                            className="border- hover:text-blue-600text-white cursor-pointer border-blue-600 bg-blue-600 text-white hover:bg-white hover:text-black"
                                            onClick={() => handleEdit(civilian.memberId)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="border- cursor-pointer border-red-600 bg-red-600 text-white hover:bg-white hover:text-black"
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

const tableHeaders = [
    'IMG',
    'ID',
    'Name',
    'Father/Husband Name',
    'Nationality',
    'NID/Passport',
    'DOB',
    'TIN',
    'Phone',
    'Email',
    'Present Add.',
    'Actions',
];