import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { useOfficerContext } from '@/lib/officerContext';
import { useState } from 'react';

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
        <AppLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-800">Officer Data Management</h2>
                    <div className="flex gap-2">
                        <Button
                            variant={viewMode === 'plots' ? 'default' : 'outline'}
                            onClick={() => setViewMode('plots')}
                        >
                            View by Plots
                        </Button>
                        <Button
                            variant={viewMode === 'officers' ? 'default' : 'outline'}
                            onClick={() => setViewMode('officers')}
                        >
                            View All Officers
                        </Button>
                    </div>
                </div>

                {viewMode === 'plots' ? (
                    // Plot-based view
                    <div className="space-y-8">
                        {plots.length === 0 ? (
                            <p className="text-center text-gray-500 py-8">No plots registered yet.</p>
                        ) : (
                            plots.map((plot) => (
                                <div key={plot.plotId} className="border rounded-lg p-6 bg-white shadow-sm">
                                    <div className="flex justify-between items-center mb-4">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800">
                                                Plot ID: {plot.plotId}
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                AHS ID: {plot.ahsID} | Officers: {plot.officers.length}
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
                                                    <th className="px-4 py-3 text-left font-medium border">Image</th>
                                                    <th className="px-4 py-3 text-left font-medium border">Personal Number</th>
                                                    <th className="px-4 py-3 text-left font-medium border">Name</th>
                                                    <th className="px-4 py-3 text-left font-medium border">Father/Husband</th>
                                                    <th className="px-4 py-3 text-left font-medium border">Mother's Name</th>
                                                    <th className="px-4 py-3 text-left font-medium border">DOB</th>
                                                    <th className="px-4 py-3 text-left font-medium border">Religion</th>
                                                    <th className="px-4 py-3 text-left font-medium border">Position</th>
                                                    <th className="px-4 py-3 text-left font-medium border">Phone</th>
                                                    <th className="px-4 py-3 text-left font-medium border">Email</th>
                                                    <th className="px-4 py-3 text-left font-medium border">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {plot.officers.map((officer) => (
                                                    <tr key={officer.personalNumber} className="hover:bg-gray-50">
                                                        <td className="px-4 py-3 border">
                                                            {officer.image ? (
                                                                <img 
                                                                    src={officer.image} 
                                                                    alt={officer.name} 
                                                                    className="h-12 w-12 rounded-full object-cover" 
                                                                />
                                                            ) : (
                                                                <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                                                                    <span className="text-gray-500 text-xs">No Image</span>
                                                                </div>
                                                            )}
                                                        </td>
                                                        <td className="px-4 py-3 border">{officer.personalNumber}</td>
                                                        <td className="px-4 py-3 border font-medium">{officer.name}</td>
                                                        <td className="px-4 py-3 border">{officer.fatherName || officer.husbandName || 'N/A'}</td>
                                                        <td className="px-4 py-3 border">{officer.motherName}</td>
                                                        <td className="px-4 py-3 border">{formatDate(officer.dob)}</td>
                                                        <td className="px-4 py-3 border">{officer.religion}</td>
                                                        <td className="px-4 py-3 border">{officer.position || 'N/A'}</td>
                                                        <td className="px-4 py-3 border">{officer.phoneNumber}</td>
                                                        <td className="px-4 py-3 border">{officer.email}</td>
                                                        <td className="px-4 py-3 border">
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
                            <p className="text-center text-gray-500 py-8">No officers registered yet.</p>
                        ) : (
                            <table className="min-w-full border-collapse text-sm bg-white rounded-lg shadow-sm">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left font-medium border">Image</th>
                                        <th className="px-4 py-3 text-left font-medium border">Plot ID</th>
                                        <th className="px-4 py-3 text-left font-medium border">AHS ID</th>
                                        <th className="px-4 py-3 text-left font-medium border">Personal Number</th>
                                        <th className="px-4 py-3 text-left font-medium border">Name</th>
                                        <th className="px-4 py-3 text-left font-medium border">Father/Husband</th>
                                        <th className="px-4 py-3 text-left font-medium border">Mother's Name</th>
                                        <th className="px-4 py-3 text-left font-medium border">DOB</th>
                                        <th className="px-4 py-3 text-left font-medium border">Religion</th>
                                        <th className="px-4 py-3 text-left font-medium border">Nationality</th>
                                        <th className="px-4 py-3 text-left font-medium border">NID/Passport</th>
                                        <th className="px-4 py-3 text-left font-medium border">TIN</th>
                                        <th className="px-4 py-3 text-left font-medium border">Position</th>
                                        <th className="px-4 py-3 text-left font-medium border">Phone</th>
                                        <th className="px-4 py-3 text-left font-medium border">Email</th>
                                        <th className="px-4 py-3 text-left font-medium border">Permanent Address</th>
                                        <th className="px-4 py-3 text-left font-medium border">Present Address</th>
                                        <th className="px-4 py-3 text-left font-medium border">Office Address</th>
                                        <th className="px-4 py-3 text-left font-medium border">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {officers.map((officer) => (
                                        <tr key={officer.personalNumber} className="hover:bg-gray-50">
                                            <td className="px-4 py-3 border">
                                                {officer.image ? (
                                                    <img 
                                                        src={officer.image} 
                                                        alt={officer.name} 
                                                        className="h-12 w-12 rounded-full object-cover" 
                                                    />
                                                ) : (
                                                    <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                                                        <span className="text-gray-500 text-xs">No Image</span>
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-4 py-3 border font-medium">{officer.plotId}</td>
                                            <td className="px-4 py-3 border">{officer.ahsID}</td>
                                            <td className="px-4 py-3 border">{officer.personalNumber}</td>
                                            <td className="px-4 py-3 border font-medium">{officer.name}</td>
                                            <td className="px-4 py-3 border">{officer.fatherName || officer.husbandName || 'N/A'}</td>
                                            <td className="px-4 py-3 border">{officer.motherName}</td>
                                            <td className="px-4 py-3 border">{formatDate(officer.dob)}</td>
                                            <td className="px-4 py-3 border">{officer.religion}</td>
                                            <td className="px-4 py-3 border">{officer.nationality}</td>
                                            <td className="px-4 py-3 border">{officer.nid || officer.passport || 'N/A'}</td>
                                            <td className="px-4 py-3 border">{officer.tin || 'N/A'}</td>
                                            <td className="px-4 py-3 border">{officer.position || 'N/A'}</td>
                                            <td className="px-4 py-3 border">{officer.phoneNumber}</td>
                                            <td className="px-4 py-3 border">{officer.email}</td>
                                            <td className="px-4 py-3 border max-w-xs truncate" title={officer.permanentAddress}>
                                                {officer.permanentAddress}
                                            </td>
                                            <td className="px-4 py-3 border max-w-xs truncate" title={officer.presentAddress}>
                                                {officer.presentAddress}
                                            </td>
                                            <td className="px-4 py-3 border max-w-xs truncate" title={officer.officeAddress}>
                                                {officer.officeAddress || 'N/A'}
                                            </td>
                                            <td className="px-4 py-3 border">
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
                <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
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