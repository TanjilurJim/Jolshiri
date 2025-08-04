import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { usePlotContext } from '@/lib/addPlotContext';
import { BreadcrumbItem } from '@/types';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Plots Data',
        href: '/viewAddedPlots',
    },
];

const ViewAddedPlots = () => {
    const { plots, owners, deleteOwner, deletePlot } = usePlotContext();
    const [viewMode, setViewMode] = useState<'plots' | 'owners'>('plots');

    const handleDeleteOwner = (ownerId: string) => {
        if (confirm('Are you sure you want to delete this owner?')) {
            deleteOwner(ownerId);
        }
    };

    const handleDeletePlot = (plotId: string) => {
        if (confirm('Are you sure you want to delete this entire plot and all its owners?')) {
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

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-BD', {
            style: 'currency',
            currency: 'BDT',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-800">Plot Data Management</h2>
                    <div className="flex gap-2">
                        <Button variant={viewMode === 'plots' ? 'default' : 'outline'} onClick={() => setViewMode('plots')}>
                            View by Plots
                        </Button>
                        <Button variant={viewMode === 'owners' ? 'default' : 'outline'} onClick={() => setViewMode('owners')}>
                            View All Owners
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
                                <div key={plot.id} className="rounded-lg border bg-white p-6 shadow-sm">
                                    <div className="mb-4 flex items-center justify-between">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800">Plot ID: {plot.id}</h3>
                                            <p className="text-sm text-gray-600">
                                                Price: {formatCurrency(plot.price)} | {plot.owners.length > 1 ? 'Owners' : 'Owner'}:{' '}
                                                {plot.owners.length}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                Created: {formatDate(plot.createdAt)} | Updated: {formatDate(plot.updatedAt)}
                                            </p>
                                        </div>
                                        <Button
                                            variant="outline"
                                            className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                                            onClick={() => handleDeletePlot(plot.id)}
                                        >
                                            Delete Plot
                                        </Button>
                                    </div>

                                    <div className="overflow-x-auto">
                                        <table className="min-w-full border-collapse text-sm">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="border px-4 py-3 text-left font-medium">Image</th>
                                                    <th className="border px-4 py-3 text-left font-medium">Name</th>
                                                    
                                                    <th className="border px-4 py-3 text-left font-medium">DOB</th>
                                                    <th className="border px-4 py-3 text-left font-medium">Religion</th>
                                                    <th className="border px-4 py-3 text-left font-medium">Profession</th>
                                                    <th className="border px-4 py-3 text-left font-medium">Phone</th>
                                                    <th className="border px-4 py-3 text-left font-medium">Email</th>
                                                    <th className="border px-4 py-3 text-left font-medium">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {plot.owners.map((owner) => (
                                                    <tr key={owner.email} className="hover:bg-gray-50">
                                                        <td className="border px-4 py-3">
                                                            {owner.image ? (
                                                                <img
                                                                    src={owner.image}
                                                                    alt={owner.name}
                                                                    className="h-12 w-12 rounded-full object-cover"
                                                                />
                                                            ) : (
                                                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
                                                                    <span className="text-xs text-gray-500">No Image</span>
                                                                </div>
                                                            )}
                                                        </td>
                                                        <td className="border px-4 py-3 font-medium">{owner.name}</td>

                                                        <td className="border px-4 py-3">{formatDate(owner.dob)}</td>
                                                        <td className="border px-4 py-3">{owner.religion}</td>
                                                        <td className="border px-4 py-3">{owner.profession || 'N/A'}</td>
                                                        <td className="border px-4 py-3">{owner.phoneNumber}</td>
                                                        <td className="border px-4 py-3">{owner.email}</td>
                                                        <td className="border px-4 py-3">
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                                                                onClick={() => handleDeleteOwner(owner.email)}
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
                    // Owner-based view (all owners in one table)
                    <div className="overflow-x-auto">
                        {owners.length === 0 ? (
                            <p className="py-8 text-center text-gray-500">No owners registered yet.</p>
                        ) : (
                            <table className="min-w-full border-collapse rounded-lg bg-white text-sm shadow-sm">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="border px-4 py-3 text-left font-medium">Image</th>
                                        {/* <th className="border px-4 py-3 text-left font-medium">Plot ID</th> */}
                                        {/* <th className="border px-4 py-3 text-left font-medium">Plot Price</th> */}
                                        <th className="border px-4 py-3 text-left font-medium">Name</th>
                                        <th className="border px-4 py-3 text-left font-medium">DOB</th>
                                        <th className="border px-4 py-3 text-left font-medium">Religion</th>
                                        <th className="border px-4 py-3 text-left font-medium">Nationality</th>
                                        <th className="border px-4 py-3 text-left font-medium">NID/Passport</th>
                                        <th className="border px-4 py-3 text-left font-medium">TIN</th>
                                        <th className="border px-4 py-3 text-left font-medium">Profession</th>
                                        <th className="border px-4 py-3 text-left font-medium">Phone</th>
                                        <th className="border px-4 py-3 text-left font-medium">Email</th>
                                        <th className="border px-4 py-3 text-left font-medium">Permanent Address</th>
                                        <th className="border px-4 py-3 text-left font-medium">Present Address</th>
                                        <th className="border px-4 py-3 text-left font-medium">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {owners.map((owner, index) => (
                                        <tr key={`${index}-${owner.email}`} className="hover:bg-gray-50">
                                            <td className="border px-4 py-3">
                                                {owner.image ? (
                                                    <img src={owner.image} alt={owner.name} className="h-12 w-12 rounded-full object-cover" />
                                                ) : (
                                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
                                                        <span className="text-xs text-gray-500">No Image</span>
                                                    </div>
                                                )}
                                            </td>
                                            <td className="border px-4 py-3 font-medium">{owner.name}</td>

                                            <td className="border px-4 py-3">{formatDate(owner.dob)}</td>
                                            <td className="border px-4 py-3">{owner.religion}</td>
                                            <td className="border px-4 py-3">{owner.nationality}</td>

                                            <td className="border px-4 py-3">{owner.tin || 'N/A'}</td>
                                            <td className="border px-4 py-3">{owner.profession || 'N/A'}</td>
                                            <td className="border px-4 py-3">{owner.phoneNumber}</td>
                                            <td className="border px-4 py-3">{owner.email}</td>
                                            <td className="max-w-xs truncate border px-4 py-3" title={owner.permanentAddress}>
                                                {owner.permanentAddress}
                                            </td>
                                            <td className="max-w-xs truncate border px-4 py-3" title={owner.presentAddress}>
                                                {owner.presentAddress}
                                            </td>
                                            <td className="border px-4 py-3">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                                                    onClick={() => handleDeleteOwner(owner.email)}
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
                    <div className="grid grid-cols-1 gap-4 text-center md:grid-cols-4">
                        <div>
                            <p className="text-2xl font-bold text-blue-600">{plots.length}</p>
                            <p className="text-sm text-gray-600">Total Plots</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-green-600">{owners.length}</p>
                            <p className="text-sm text-gray-600">Total Owners</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-purple-600">
                                {owners.length > 0 && plots.length > 0 ? (owners.length / plots.length).toFixed(1) : '0'}
                            </p>
                            <p className="text-sm text-gray-600">Avg Owners per Plot</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-orange-600">
                                {plots.length > 0
                                    ? formatCurrency(plots.reduce((sum, plot) => sum + plot.price, 0) / plots.length)
                                    : formatCurrency(0)}
                            </p>
                            <p className="text-sm text-gray-600">Avg Plot Price</p>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default ViewAddedPlots;
