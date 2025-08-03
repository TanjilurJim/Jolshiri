import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { useOfficerContext } from '@/lib/officerContext';
import { BreadcrumbItem } from '@/types';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Officer Data',
        href: '/viewOfficerData',
    },
];

const ViewOfficerData = () => {
    const { plots, officers, deleteOfficer, deletePlot } = useOfficerContext();
    const [viewMode, setViewMode] = useState<'plots' | 'officers'>('plots');

    const handleDeleteOfficer = (personalNumber: string) => {
        if (confirm('Are you sure you want to delete this officer?')) {
            deleteOfficer(personalNumber);
        }
    };

    const handleDeletePlot = (plotId: string) => {
        if (confirm('Are you sure you want to delete this entire plot and all its officers?')) {
            deletePlot(plotId);
        }
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return 'N/A';
        try {
            return new Date(dateString).toLocaleDateString();
        } catch {
            return dateString;
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-800">Officer Data Management</h2>
                    <div className="flex gap-2">
                        <Button variant={viewMode === 'plots' ? 'default' : 'outline'} onClick={() => setViewMode('plots')}>
                            View by Plots
                        </Button>
                        <Button variant={viewMode === 'officers' ? 'default' : 'outline'} onClick={() => setViewMode('officers')}>
                            View All Officers
                        </Button>
                    </div>
                </div>

                {viewMode === 'plots' ? (
                    // Plot-based view
                    <div className="space-y-8">
                        {plots.length === 0 ? (
                            <p className="py-8 text-center text-gray-500">No plots registered yet.</p>
                        ) : (
                            plots.map((plot) => (
                                <div key={plot.plotId} className="rounded-lg border bg-white p-6 shadow-sm">
                                    <div className="mb-4 flex items-center justify-between">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800">Plot ID: {plot.plotId}</h3>
                                            <p className="text-sm text-gray-600">
                                                AHS ID: {plot.ahsID} | {plot.officers.length > 1 ? 'Officers' : 'Officer'}: {plot.officers.length}
                                            </p>
                                        </div>
                                        <Button
                                            variant="outline"
                                            className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                                            onClick={() => handleDeletePlot(plot.plotId)}
                                        >
                                            Delete Plot
                                        </Button>
                                    </div>

                                    <div className="overflow-x-auto">
                                        <table className="min-w-full border-collapse text-sm">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="border px-4 py-3 text-left font-medium">Image</th>
                                                    <th className="border px-4 py-3 text-left font-medium">Personal Number</th>
                                                    <th className="border px-4 py-3 text-left font-medium">Name</th>
                                                    <th className="border px-4 py-3 text-left font-medium">Father/Husband</th>
                                                    <th className="border px-4 py-3 text-left font-medium">Mother's Name</th>
                                                    <th className="border px-4 py-3 text-left font-medium">DOB</th>
                                                    <th className="border px-4 py-3 text-left font-medium">Religion</th>
                                                    <th className="border px-4 py-3 text-left font-medium">Position</th>
                                                    <th className="border px-4 py-3 text-left font-medium">Phone</th>
                                                    <th className="border px-4 py-3 text-left font-medium">Email</th>
                                                    <th className="border px-4 py-3 text-left font-medium">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {plot.officers.map((officer) => (
                                                    <tr key={officer.personalNumber} className="hover:bg-gray-50">
                                                        <td className="border px-4 py-3">
                                                            {officer.image ? (
                                                                <img
                                                                    src={officer.image}
                                                                    alt={officer.name}
                                                                    className="h-12 w-12 rounded-full object-cover"
                                                                />
                                                            ) : (
                                                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
                                                                    <span className="text-xs text-gray-500">No Image</span>
                                                                </div>
                                                            )}
                                                        </td>
                                                        <td className="border px-4 py-3">{officer.personalNumber}</td>
                                                        <td className="border px-4 py-3 font-medium">{officer.name}</td>
                                                        <td className="border px-4 py-3">{officer.fatherName || officer.husbandName || 'N/A'}</td>
                                                        <td className="border px-4 py-3">{officer.motherName}</td>
                                                        <td className="border px-4 py-3">{formatDate(officer.dob)}</td>
                                                        <td className="border px-4 py-3">{officer.religion}</td>
                                                        <td className="border px-4 py-3">{officer.position || 'N/A'}</td>
                                                        <td className="border px-4 py-3">{officer.phoneNumber}</td>
                                                        <td className="border px-4 py-3">{officer.email}</td>
                                                        <td className="border px-4 py-3">
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                                                                onClick={() => handleDeleteOfficer(officer.personalNumber)}
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
                            ))
                        )}
                    </div>
                ) : (
                    // Officer-based view (all officers in one table)
                    <div className="overflow-x-auto">
                        {officers.length === 0 ? (
                            <p className="py-8 text-center text-gray-500">No officers registered yet.</p>
                        ) : (
                            <table className="min-w-full border-collapse rounded-lg bg-white text-sm shadow-sm">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="border px-4 py-3 text-left font-medium">Image</th>
                                        <th className="border px-4 py-3 text-left font-medium">Plot ID</th>
                                        <th className="border px-4 py-3 text-left font-medium">AHS ID</th>
                                        <th className="border px-4 py-3 text-left font-medium">Personal Number</th>
                                        <th className="border px-4 py-3 text-left font-medium">Name</th>
                                        <th className="border px-4 py-3 text-left font-medium">Father/Husband</th>
                                        <th className="border px-4 py-3 text-left font-medium">Mother's Name</th>
                                        <th className="border px-4 py-3 text-left font-medium">DOB</th>
                                        <th className="border px-4 py-3 text-left font-medium">Religion</th>
                                        <th className="border px-4 py-3 text-left font-medium">Nationality</th>
                                        <th className="border px-4 py-3 text-left font-medium">NID/Passport</th>
                                        <th className="border px-4 py-3 text-left font-medium">TIN</th>
                                        <th className="border px-4 py-3 text-left font-medium">Position</th>
                                        <th className="border px-4 py-3 text-left font-medium">Phone</th>
                                        <th className="border px-4 py-3 text-left font-medium">Email</th>
                                        <th className="border px-4 py-3 text-left font-medium">Permanent Address</th>
                                        <th className="border px-4 py-3 text-left font-medium">Present Address</th>
                                        <th className="border px-4 py-3 text-left font-medium">Office Address</th>
                                        <th className="border px-4 py-3 text-left font-medium">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {officers.map((officer) => (
                                        <tr key={officer.personalNumber} className="hover:bg-gray-50">
                                            <td className="border px-4 py-3">
                                                {officer.image ? (
                                                    <img src={officer.image} alt={officer.name} className="rounded-full object-cover" />
                                                ) : (
                                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
                                                        <span className="text-xs text-gray-500">No Image</span>
                                                    </div>
                                                )}
                                            </td>
                                            <td className="border px-4 py-3 font-medium">{officer.plotId}</td>
                                            <td className="border px-4 py-3">{officer.ahsID}</td>
                                            <td className="border px-4 py-3">{officer.personalNumber}</td>
                                            <td className="border px-4 py-3 font-medium">{officer.name}</td>
                                            <td className="border px-4 py-3">{officer.fatherName || officer.husbandName || 'N/A'}</td>
                                            <td className="border px-4 py-3">{officer.motherName}</td>
                                            <td className="border px-4 py-3">{formatDate(officer.dob)}</td>
                                            <td className="border px-4 py-3">{officer.religion}</td>
                                            <td className="border px-4 py-3">{officer.nationality}</td>
                                            <td className="border px-4 py-3">{officer.nid || officer.passport || 'N/A'}</td>
                                            <td className="border px-4 py-3">{officer.tin || 'N/A'}</td>
                                            <td className="border px-4 py-3">{officer.position || 'N/A'}</td>
                                            <td className="border px-4 py-3">{officer.phoneNumber}</td>
                                            <td className="border px-4 py-3">{officer.email}</td>
                                            <td className="max-w-xs truncate border px-4 py-3" title={officer.permanentAddress}>
                                                {officer.permanentAddress}
                                            </td>
                                            <td className="max-w-xs truncate border px-4 py-3" title={officer.presentAddress}>
                                                {officer.presentAddress}
                                            </td>
                                            <td className="max-w-xs truncate border px-4 py-3" title={officer.officeAddress}>
                                                {officer.officeAddress || 'N/A'}
                                            </td>
                                            <td className="border px-4 py-3">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                                                    onClick={() => handleDeleteOfficer(officer.personalNumber)}
                                                >
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                )}

                {/* Summary */}
                <div className="rounded-lg bg-gray-50 p-4">
                    <div className="grid grid-cols-1 gap-4 text-center md:grid-cols-3">
                        <div>
                            <p className="text-2xl font-bold text-blue-600">{plots.length}</p>
                            <p className="text-sm text-gray-600">Total Plots</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-green-600">{officers.length}</p>
                            <p className="text-sm text-gray-600">Total Officers</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-purple-600">
                                {officers.length > 0 ? (officers.length / plots.length).toFixed(1) : '0'}
                            </p>
                            <p className="text-sm text-gray-600">Avg Officers per Plot</p>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default ViewOfficerData;
