import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from '@inertiajs/react';
import { TextArea } from '@radix-ui/themes';
import { Upload, User, X } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';

interface Props {
    isEdit: boolean;
    current?: {
        image: string;
        memberId: string;
        plotId: string;
        name: string;
        husbandOrFatherName: string;
        motherName: string;
        dob: string;
        religion: string;
        nationality: string;
        nidPassport: string;
        tin: string;
        personalNumber: string;
        email: string;
        permanentAddress: string;
        presentAddress: string;
    };
}

const CivilianForm = ({ current, isEdit }: Props) => {
    const [imagePreview, setImagePreview] = useState(current?.image || '');
    const [isDragOver, setIsDragOver] = useState(false);

    const { data, setData, post, put, processing, errors } = useForm({
        image: current?.image || '',
        memberId: current?.memberId || '',
        plotId: current?.plotId || '',
        name: current?.name || '',
        husbandOrFatherName: current?.husbandOrFatherName || '',
        motherName: current?.motherName || '',
        dob: current?.dob || '',
        religion: current?.religion || 'Islam',
        nationality: current?.nationality || 'Bangladeshi',
        nidPassport: current?.nidPassport || '',
        tin: current?.tin || '',
        personalNumber: current?.personalNumber || '',
        email: current?.email || '',
        permanentAddress: current?.permanentAddress || '',
        presentAddress: current?.presentAddress || '',
    });

    const handleImageChange = (file: File) => {
        if (file) {
            // Validate file type
            const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
            if (!validTypes.includes(file.type)) {
                toast.error('Please select a valid image file (JPEG, PNG, or GIF)');
                return;
            }

            // Validate file size (5MB limit)
            if (file.size > 5 * 1024 * 1024) {
                toast.error('Image size should be less than 5MB');
                return;
            }

            const imageUrl = URL.createObjectURL(file);
            setImagePreview(imageUrl);
            setData('image', imageUrl);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file) {
            handleImageChange(file);
        }
    };

    const removeImage = () => {
        setImagePreview('');
        setData('image', '');
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        const url = isEdit ? route('civilian.update', current?.memberId) : route('civilian.store');

        (isEdit ? put : post)(url, {
            onSuccess: () => toast.success('Civilian information saved 🎉'),
            onError: () => toast.error('Something went wrong'),
        });
    };

    return (
        <div>
            <div className="space-y-6">
                {/* Image Upload */}
                <div>
                    <label className="mb-3 block text-sm font-medium text-gray-700">Profile Image</label>

                    {/* Image Preview or Upload Area */}
                    <div className="relative">
                        {imagePreview ? (
                            /* Image Preview */
                            <div className="group relative">
                                <div className="mx-auto h-32 w-32 overflow-hidden rounded-full border-4 border-gray-200 shadow-md">
                                    <img src={imagePreview} alt="Profile preview" className="h-full w-full object-cover" />
                                </div>
                                <button
                                    type="button"
                                    onClick={removeImage}
                                    className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white shadow-md transition-colors hover:bg-red-600"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ) : (
                            /* Upload Area */
                            <div
                                className={`relative rounded-lg border-2 border-dashed p-6 text-center transition-all duration-200 ${
                                    isDragOver
                                        ? 'border-blue-400 bg-blue-50'
                                        : errors.image
                                          ? 'border-red-300 bg-red-50'
                                          : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                                }`}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                            >
                                <div className="space-y-3">
                                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                                        <User size={32} className="text-gray-400" />
                                    </div>
                                    <div>
                                        <Upload size={24} className="mx-auto mb-2 text-gray-400" />
                                        <p className="text-sm text-gray-600">
                                            <span className="font-medium text-blue-600 hover:text-blue-500">Click to upload</span> or drag and drop
                                        </p>
                                        <p className="mt-1 text-xs text-gray-400">PNG, JPG, GIF up to 5MB</p>
                                    </div>
                                </div>

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            handleImageChange(file);
                                        }
                                    }}
                                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                                />
                            </div>
                        )}
                    </div>

                    {errors.image && (
                        <p className="mt-2 flex items-center text-sm text-red-600">
                            <span className="mr-1">⚠️</span>
                            {errors.image}
                        </p>
                    )}
                </div>

                {/* Member id and plot id */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {/* Member ID */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Member ID</label>
                        <Input
                            value={data.memberId}
                            onChange={(e) => setData('memberId', e.target.value)}
                            className={errors.memberId ? 'border-red-500' : ''}
                            placeholder="Enter Member ID"
                        />
                        {errors.memberId && <p className="mt-1 text-sm text-red-600">{errors.memberId}</p>}
                    </div>

                    {/* Plot ID */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Plot ID</label>
                        <Input
                            value={data.plotId}
                            onChange={(e) => setData('plotId', e.target.value)}
                            className={errors.plotId ? 'border-red-500' : ''}
                            placeholder="Enter Plot ID"
                        />
                        {errors.plotId && <p className="mt-1 text-sm text-red-600">{errors.plotId}</p>}
                    </div>
                </div>

                {/* Name */}
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Name</label>
                    <Input
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className={errors.name ? 'border-red-500' : ''}
                        placeholder="Enter your full name"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>

                <div className="grid-col-1 grid gap-4 md:grid-cols-2">
                    {/* Husband/Father Name */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Husband/Father Name</label>
                        <Input
                            value={data.husbandOrFatherName}
                            onChange={(e) => setData('husbandOrFatherName', e.target.value)}
                            className={errors.husbandOrFatherName ? 'border-red-500' : ''}
                            placeholder="Enter Husband/Father Name"
                        />
                        {errors.husbandOrFatherName && <p className="mt-1 text-sm text-red-600">{errors.husbandOrFatherName}</p>}
                    </div>

                    {/* Mother Name */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Mother's Name</label>
                        <Input
                            value={data.motherName}
                            onChange={(e) => setData('motherName', e.target.value)}
                            className={errors.motherName ? 'border-red-500' : ''}
                            placeholder="Enter mother name"
                        />
                        {errors.motherName && <p className="mt-1 text-sm text-red-600">{errors.motherName}</p>}
                    </div>
                </div>

                {/* Date of Birth */}
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Date of Birth</label>
                    <input
                        type="date"
                        value={data.dob}
                        onChange={(e) => setData('dob', e.target.value)}
                        className={`w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                            errors.dob ? 'border-red-500' : ''
                        }`}
                    />
                    {errors.dob && <p className="mt-1 text-sm text-red-600">{errors.dob}</p>}
                </div>

                {/* Religion */}
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Religion</label>
                    <Select value={data.religion} onValueChange={(v) => setData('religion', v)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Choose religion" />
                        </SelectTrigger>
                        <SelectContent>
                            {religions.map((r) => (
                                <SelectItem key={r} value={r}>
                                    {r}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.religion && <p className="mt-1 text-sm text-red-600">{errors.religion}</p>}
                </div>

                {/* Nationality */}
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Nationality</label>
                    <Input
                        value={data.nationality}
                        onChange={(e) => setData('nationality', e.target.value)}
                        className={errors.nationality ? 'border-red-500' : ''}
                    />
                    {errors.nationality && <p className="mt-1 text-sm text-red-600">{errors.nationality}</p>}
                </div>

                {/* NID / Passport */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {/* NID/Passport */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">NID/Passport</label>
                        <Input
                            value={data.nidPassport}
                            onChange={(e) => setData('nidPassport', e.target.value)}
                            className={errors.nidPassport ? 'border-red-500' : ''}
                            placeholder="Enter NID/Passport Number"
                        />
                        {errors.nidPassport && <p className="mt-1 text-sm text-red-600">{errors.nidPassport}</p>}
                    </div>

                    {/* TIN */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">TIN</label>
                        <Input
                            value={data.tin}
                            onChange={(e) => setData('tin', e.target.value)}
                            className={errors.tin ? 'border-red-500' : ''}
                            placeholder="Enter TIN"
                        />
                        {errors.tin && <p className="mt-1 text-sm text-red-600">{errors.tin}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {/* Personal Number */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Personal Number</label>
                        <Input
                            value={data.personalNumber}
                            onChange={(e) => setData('personalNumber', e.target.value)}
                            className={errors.personalNumber ? 'border-red-500' : ''}
                            placeholder="Enter personal number"
                        />
                        {errors.personalNumber && <p className="mt-1 text-sm text-red-600">{errors.personalNumber}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
                        <Input
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className={errors.email ? 'border-red-500' : ''}
                            placeholder="example@gmail.com"
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {/* Permanent Address */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Permanent Address</label>
                        <TextArea
                            value={data.permanentAddress}
                            onChange={(e) => setData('permanentAddress', e.target.value)}
                            className={errors.permanentAddress ? 'border-red-500' : ''}
                            rows={5}
                            placeholder="Enter your permanent address here..."
                        />
                        {errors.permanentAddress && <p className="mt-1 text-sm text-red-600">{errors.permanentAddress}</p>}
                    </div>

                    {/* Present Address */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Present Address</label>
                        <TextArea
                            value={data.presentAddress}
                            onChange={(e) => setData('presentAddress', e.target.value)}
                            className={errors.presentAddress ? 'border-red-500' : ''}
                            rows={5}
                            placeholder="Enter your present address here..."
                        />
                        {errors.presentAddress && <p className="mt-1 text-sm text-red-600">{errors.presentAddress}</p>}
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex items-center justify-center pt-4">
                    <Button type="submit" disabled={processing} className="w-full cursor-pointer">
                        {processing ? (
                            <>
                                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
                                {isEdit ? 'Updating...' : 'Saving...'}
                            </>
                        ) : (
                            <>{isEdit ? 'Update' : 'Save'}</>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CivilianForm;

const religions = ['Islam', 'Hinduism', 'Christianity', 'Buddhism'];
