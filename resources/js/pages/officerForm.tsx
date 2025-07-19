import ImageUpload from '@/components/image-upload';
import InputField from '@/components/input-field';
import { Button } from '@/components/ui/button';
import { ForAll, Officer } from '@/types/plotRegistration';
import { useForm } from '@inertiajs/react';
import { TextArea } from '@radix-ui/themes';
import { Datepicker } from 'flowbite-react';
import React from 'react';
import { toast } from 'sonner';

interface Props {
    isEdit: boolean;
    current?: ForAll & Officer;
}

const OfficerForm = ({ current, isEdit }: Props) => {
    const { data, setData, post, put, processing, errors } = useForm({
        ahsId: current?.ahsID || '',
        plotId: current?.plotId || '',
        personalNumber: current?.personalNumber || '',
        position: current?.position || '',
        image: current?.image || '',

        name: current?.name || '',
        husbandName: current?.husbandName || '',
        motherName: current?.motherName || '',
        dob: current?.dob || '',
        religion: current?.religion || 'Islam',
        profession: current?.profession || '',
        nationality: current?.nationality || 'Bangladeshi',
        tin: current?.tin || '',
        nid: current?.nid || '',
        passport: current?.passport || '',
        email: current?.email || '',
        permanentAddress: current?.permanentAddress || '',
        presentAddress: current?.presentAddress || '',
    });

    const handleDateChange = (date: Date | null) => {
        if (date) {
            setData('dob', date.toISOString());
        } else {
            setData('dob', '');
        }
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        const url = isEdit ? route('officer.update', current?.memberId) : route('officer.store');

        (isEdit ? put : post)(url, {
            onSuccess: () => toast.success('Officer information saved 🎉'),
            onError: () => toast.error('Something went wrong'),
        });
    };

    return (
        <div>
            <div className="space-y-6">
                {/* Image Upload */}
                <ImageUpload fieldName="image" currentImage={current?.image || ''} setData={setData} errorImage={errors.image || ''} />

                {/* AHS id and plot id */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {/* AHS ID */}
                    <InputField
                        label="AHS ID"
                        labelStyle="mb-1 block text-sm font-medium text-gray-700"
                        placeholder="Enter AHS ID"
                        value={data.ahsId || ''}
                        errorName={errors.ahsId || ''}
                        errorStyle="mt-1 text-sm text-red-600"
                        fieldName="ahsId"
                        setData={setData}
                    />

                    {/* Plot ID */}
                    <InputField
                        label="Plot ID"
                        labelStyle="mb-1 block text-sm font-medium text-gray-700"
                        placeholder="Enter Plot ID"
                        value={data.plotId || ''}
                        errorName={errors.plotId || ''}
                        errorStyle="mt-1 text-sm text-red-600"
                        fieldName="plotId"
                        setData={setData}
                    />
                </div>

                {/* Personal number and Position */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {/* Personal number */}
                    <InputField
                        label="Personal Number"
                        labelStyle="mb-1 block text-sm font-medium text-gray-700"
                        placeholder="Enter your personal number"
                        value={data.personalNumber || ''}
                        errorName={errors.personalNumber || ''}
                        errorStyle="mt-1 text-sm text-red-600"
                        fieldName="personalNumber"
                        setData={setData}
                    />

                    {/* position */}
                    <InputField
                        label="Position"
                        labelStyle="mb-1 block text-sm font-medium text-gray-700"
                        placeholder="Enter the name of your position"
                        value={data.position || ''}
                        errorName={errors.position || ''}
                        errorStyle="mt-1 text-sm text-red-600"
                        fieldName="position"
                        setData={setData}
                    />
                </div>

                {/* Name */}
                <InputField
                    label="Name"
                    labelStyle="mb-1 block text-sm font-medium text-gray-700"
                    placeholder="Enter your full name"
                    value={data.name || ''}
                    errorName={errors.name || ''}
                    errorStyle="mt-1 text-sm text-red-600"
                    fieldName="name"
                    setData={setData}
                />

                {/* Husband and Mother Name */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {/* Husband/Father Name */}
                    <InputField
                        label="Husband Name (only female)"
                        labelStyle="mb-1 block text-sm font-medium text-gray-700"
                        placeholder="Enter your husband name"
                        value={data.husbandName || ''}
                        errorName={errors.husbandName || ''}
                        errorStyle="mt-1 text-sm text-red-600"
                        fieldName="husbandName"
                        setData={setData}
                    />

                    {/* Mother Name */}
                    <InputField
                        label="Mother's Name"
                        labelStyle="mb-1 block text-sm font-medium text-gray-700"
                        placeholder="Enter Mother Name"
                        value={data.motherName || ''}
                        errorName={errors.motherName || ''}
                        errorStyle="mt-1 text-sm text-red-600"
                        fieldName="motherName"
                        setData={setData}
                    />

                    {/* Date of Birth */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Date of Birth</label>
                        <Datepicker
                            id="default-datepicker"
                            value={data.dob ? new Date(data.dob) : null}
                            onChange={handleDateChange}
                            autoHide={true}
                            className={`block w-full rounded-lg border text-sm focus:border-blue-500 ${errors.dob ? 'border-red-500' : ''} transition duration-200 ease-in-out`}
                            placeholder="Select date"
                        />
                        {errors.dob && <p className="mt-1 text-sm text-red-600">{errors.dob}</p>}
                    </div>
                </div>

                {/* Religion, Profession and Nationality */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {/* Religion */}
                    <InputField
                        label="Religion"
                        labelStyle="mb-1 block text-sm font-medium text-gray-700"
                        placeholder="Choose Religion"
                        value={data.religion || ''}
                        errorName={errors.religion || ''}
                        errorStyle="mt-1 text-sm text-red-600"
                        fieldName="religion"
                        setData={setData}
                    />

                    {/* Profession */}
                    <InputField
                        label="Profession"
                        labelStyle="mb-1 block text-sm font-medium text-gray-700"
                        placeholder="Write your profession"
                        value={data.profession || ''}
                        errorName={errors.profession || ''}
                        errorStyle="mt-1 text-sm text-red-600"
                        fieldName="profession"
                        setData={setData}
                    />

                    {/* Nationality */}
                    <InputField
                        label="Nationality"
                        labelStyle="mb-1 block text-sm font-medium text-gray-700"
                        placeholder="Enter Nationality"
                        value={data.nationality || ''}
                        errorName={errors.nationality || ''}
                        errorStyle="mt-1 text-sm text-red-600"
                        fieldName="nationality"
                        setData={setData}
                    />
                </div>

                {/* NID, TIN and Passport  */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {/* NID */}
                    <InputField
                        label="NID"
                        labelStyle="mb-1 block text-sm font-medium text-gray-700"
                        placeholder="Enter NID Number"
                        value={data.nid || ''}
                        errorName={errors.nid || ''}
                        errorStyle="mt-1 text-sm text-red-600"
                        fieldName="nid"
                        setData={setData}
                    />

                    {/* TIN */}
                    <InputField
                        label="TIN"
                        labelStyle="mb-1 block text-sm font-medium text-gray-700"
                        placeholder="Enter TIN"
                        value={data.tin || ''}
                        errorName={errors.tin || ''}
                        errorStyle="mt-1 text-sm text-red-600"
                        fieldName="tin"
                        setData={setData}
                    />

                    {/* Passport */}
                    <InputField
                        label="Passport"
                        labelStyle="mb-1 block text-sm font-medium text-gray-700"
                        placeholder="Enter Passport Number"
                        value={data.passport || ''}
                        errorName={errors.passport || ''}
                        errorStyle="mt-1 text-sm text-red-600"
                        fieldName="passport"
                        setData={setData}
                    />
                </div>

                {/* Number and email  */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {/* Personal Number */}
                    <InputField
                        label="Personal Number"
                        labelStyle="mb-1 block text-sm font-medium text-gray-700"
                        placeholder="Enter Personal Number"
                        value={data.personalNumber || ''}
                        errorName={errors.personalNumber || ''}
                        errorStyle="mt-1 text-sm text-red-600"
                        fieldName="personalNumber"
                        setData={setData}
                    />

                    {/* Email */}
                    <InputField
                        label="Email"
                        labelStyle="mb-1 block text-sm font-medium text-gray-700"
                        placeholder="example@gmail.com"
                        value={data.email || ''}
                        errorName={errors.email || ''}
                        errorStyle="mt-1 text-sm text-red-600"
                        fieldName="email"
                        setData={setData}
                    />
                </div>

                {/* Address Fields */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {/* Permanent Address */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Permanent Address</label>
                        <TextArea
                            value={data.permanentAddress || ''}
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
                            value={data.presentAddress || ''}
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

export default OfficerForm;

const religions = ['Islam', 'Hinduism', 'Christianity', 'Buddhism'];
