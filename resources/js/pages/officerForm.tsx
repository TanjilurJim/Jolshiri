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

// Define the officer data structure
interface OfficerData {
    name: string;
    motherName: string;
    dob: string;
    religion: string;
    nationality: string;
    profession: string;
    tin: string;
    email: string;
    permanentAddress: string;
    presentAddress: string;
    image: string;
    plotId: string;
    phoneNumber: string;
    ahsID: string;
    personalNumber: string;
    fatherName: string;
    husbandName: string;
    nid: string;
    passport: string;
    officeAddress: string;
    position: string;
}

const OfficerForm = ({ current, isEdit }: Props) => {
    const { data, setData, post, put, processing, errors } = useForm({
        ahsID: current?.ahsID || '',
        plotId: current?.plotId || '',
        officers: [
            {
                name: current?.name || '',
                motherName: current?.motherName || '',
                dob: current?.dob || '',
                religion: current?.religion || 'Islam',
                nationality: current?.nationality || 'Bangladeshi',
                profession: current?.profession || '',
                tin: current?.tin || '',
                permanentAddress: current?.permanentAddress || '',
                presentAddress: current?.presentAddress || '',
                email: current?.email || '',
                image: current?.image || '',
                personalNumber: current?.personalNumber || '',
                fatherName: current?.fatherName || '',
                husbandName: current?.husbandName || '',
                officeAddress: current?.officeAddress || '',
                position: current?.position || '',
                nid: current?.nid || '',
                passport: current?.passport || '',
                phoneNumber: current?.phoneNumber || '',
                plotId: current?.plotId || '',
                ahsID: current?.ahsID || '',
            },
        ],
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        const url = isEdit ? route('officer.update', current?.personalNumber) : route('officer.store');

        (isEdit ? put : post)(url, {
            onSuccess: () => toast.success('Officer information saved 🎉'),
            onError: () => toast.error('Something went wrong'),
        });
    };

    const handleDateChange = (date: Date | null | undefined, officerIndex: number) => {
        const newOfficers = [...data.officers];
        if (!date) {
            newOfficers[officerIndex].dob = '';
        } else {
            newOfficers[officerIndex].dob = date.toISOString();
        }
        setData('officers', newOfficers);
    };

    const updateOfficerField = (officerIndex: number, fieldName: keyof OfficerData, value: string) => {
        const newOfficers = [...data.officers];
        newOfficers[officerIndex] = {
            ...newOfficers[officerIndex],
            [fieldName]: value,
        };
        setData('officers', newOfficers);
    };

    const addOfficer = () => {
        const newOfficer: OfficerData = {
            image: '',
            name: '',
            motherName: '',
            dob: '',
            religion: 'Islam',
            nationality: 'Bangladeshi',
            profession: '',
            tin: '',
            email: '',
            permanentAddress: '',
            presentAddress: '',
            phoneNumber: '',
            personalNumber: '',
            fatherName: '',
            husbandName: '',
            nid: '',
            passport: '',
            officeAddress: '',
            position: '',
            plotId: '',
            ahsID: '',
        };

        setData('officers', [...data.officers, newOfficer]);
    };

    const removeOfficer = (officerIndex: number) => {
        if (data.officers.length > 1) {
            const newOfficers = data.officers.filter((_, index) => index !== officerIndex);
            setData('officers', newOfficers);
        }
    };

    const renderOfficerForm = (officer: OfficerData, officerIndex: number) => (
        <div key={officerIndex} className="relative rounded-lg border bg-gray-50 p-6">
            {/* Officer Header */}
            <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Officer {officerIndex + 1}</h3>
                {data.officers.length > 1 && (
                    <Button type="button" variant="destructive" size="sm" onClick={() => removeOfficer(officerIndex)} className="text-xs">
                        Remove Officer
                    </Button>
                )}
            </div>

            <div className="space-y-6">
                {/* Image Upload */}
                <ImageUpload
                    fieldName={`officers.${officerIndex}.image`}
                    currentImage={officer.image || ''}
                    setData={(fieldName, value) => updateOfficerField(officerIndex, 'image', value)}
                    errorImage={errors[`officers.${officerIndex}.image` as keyof typeof errors] || ''}
                />

                {/* Personal Number */}
                <InputField
                    label="Personal Number"
                    labelStyle="mb-1 block text-sm font-medium text-gray-700"
                    placeholder="Enter Personal Number"
                    value={officer.personalNumber || ''}
                    errorName={errors[`officers.${officerIndex}.personalNumber` as keyof typeof errors] || ''}
                    errorStyle="mt-1 text-sm text-red-600"
                    fieldName="personalNumber"
                    setData={(fieldName, value) => updateOfficerField(officerIndex, 'personalNumber', value)}
                />

                {/* Name */}
                <InputField
                    label="Name"
                    labelStyle="mb-1 block text-sm font-medium text-gray-700"
                    placeholder="Enter your full name"
                    value={officer.name || ''}
                    errorName={errors[`officers.${officerIndex}.name` as keyof typeof errors] || ''}
                    errorStyle="mt-1 text-sm text-red-600"
                    fieldName="name"
                    setData={(fieldName, value) => updateOfficerField(officerIndex, 'name', value)}
                />

                {/* Father Name, Husband Name and Mother Name */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <InputField
                        label="Father Name"
                        labelStyle="mb-1 block text-sm font-medium text-gray-700"
                        placeholder="Enter Father Name"
                        value={officer.fatherName || ''}
                        errorName={errors[`officers.${officerIndex}.fatherName` as keyof typeof errors] || ''}
                        errorStyle="mt-1 text-sm text-red-600"
                        fieldName="fatherName"
                        setData={(fieldName, value) => updateOfficerField(officerIndex, 'fatherName', value)}
                    />

                    <InputField
                        label="Husband Name (if applicable)"
                        labelStyle="mb-1 block text-sm font-medium text-gray-700"
                        placeholder="Enter Husband Name"
                        value={officer.husbandName || ''}
                        errorName={errors[`officers.${officerIndex}.husbandName` as keyof typeof errors] || ''}
                        errorStyle="mt-1 text-sm text-red-600"
                        fieldName="husbandName"
                        setData={(fieldName, value) => updateOfficerField(officerIndex, 'husbandName', value)}
                    />

                    <InputField
                        label="Mother's Name"
                        labelStyle="mb-1 block text-sm font-medium text-gray-700"
                        placeholder="Enter Mother Name"
                        value={officer.motherName || ''}
                        errorName={errors[`officers.${officerIndex}.motherName` as keyof typeof errors] || ''}
                        errorStyle="mt-1 text-sm text-red-600"
                        fieldName="motherName"
                        setData={(fieldName, value) => updateOfficerField(officerIndex, 'motherName', value)}
                    />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {/* Date of Birth */}
                    <div className="mb-6">
                        <label className="mb-1 block text-sm font-medium text-gray-700">Date of Birth</label>
                        <Datepicker
                            id={`datepicker-${officerIndex}`}
                            value={officer.dob ? new Date(officer.dob) : null}
                            onChange={(date) => handleDateChange(date, officerIndex)}
                            autoHide={true}
                            className={`block w-full rounded-lg border text-sm focus:border-blue-500 ${errors[`officers.${officerIndex}.dob` as keyof typeof errors] ? 'border-red-500' : ''} transition duration-200 ease-in-out`}
                            placeholder="Select date"
                        />
                        {errors[`officers.${officerIndex}.dob` as keyof typeof errors] && (
                            <p className="mt-2 text-sm text-red-600">{errors[`officers.${officerIndex}.dob` as keyof typeof errors]}</p>
                        )}
                    </div>

                    {/* Religion */}
                    <InputField
                        label="Religion"
                        labelStyle="mb-1 block text-sm font-medium text-gray-700"
                        placeholder="Choose Religion"
                        value={officer.religion || ''}
                        errorName={errors[`officers.${officerIndex}.religion` as keyof typeof errors] || ''}
                        errorStyle="mt-1 text-sm text-red-600"
                        fieldName="religion"
                        setData={(fieldName, value) => updateOfficerField(officerIndex, 'religion', value)}
                    />

                    {/* Nationality */}
                    <InputField
                        label="Nationality"
                        labelStyle="mb-1 block text-sm font-medium text-gray-700"
                        placeholder="Enter Nationality"
                        value={officer.nationality || ''}
                        errorName={errors[`officers.${officerIndex}.nationality` as keyof typeof errors] || ''}
                        errorStyle="mt-1 text-sm text-red-600"
                        fieldName="nationality"
                        setData={(fieldName, value) => updateOfficerField(officerIndex, 'nationality', value)}
                    />
                </div>

                {/* Profession and Position */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <InputField
                        label="Profession"
                        labelStyle="mb-1 block text-sm font-medium text-gray-700"
                        placeholder="Enter Profession"
                        value={officer.profession || ''}
                        errorName={errors[`officers.${officerIndex}.profession` as keyof typeof errors] || ''}
                        errorStyle="mt-1 text-sm text-red-600"
                        fieldName="profession"
                        setData={(fieldName, value) => updateOfficerField(officerIndex, 'profession', value)}
                    />

                    <InputField
                        label="Position"
                        labelStyle="mb-1 block text-sm font-medium text-gray-700"
                        placeholder="Enter Position"
                        value={officer.position || ''}
                        errorName={errors[`officers.${officerIndex}.position` as keyof typeof errors] || ''}
                        errorStyle="mt-1 text-sm text-red-600"
                        fieldName="position"
                        setData={(fieldName, value) => updateOfficerField(officerIndex, 'position', value)}
                    />
                </div>

                {/* NID, Passport and TIN */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <InputField
                        label="NID"
                        labelStyle="mb-1 block text-sm font-medium text-gray-700"
                        placeholder="Enter NID Number"
                        value={officer.nid || ''}
                        errorName={errors[`officers.${officerIndex}.nid` as keyof typeof errors] || ''}
                        errorStyle="mt-1 text-sm text-red-600"
                        fieldName="nid"
                        setData={(fieldName, value) => updateOfficerField(officerIndex, 'nid', value)}
                    />

                    <InputField
                        label="Passport"
                        labelStyle="mb-1 block text-sm font-medium text-gray-700"
                        placeholder="Enter Passport Number"
                        value={officer.passport || ''}
                        errorName={errors[`officers.${officerIndex}.passport` as keyof typeof errors] || ''}
                        errorStyle="mt-1 text-sm text-red-600"
                        fieldName="passport"
                        setData={(fieldName, value) => updateOfficerField(officerIndex, 'passport', value)}
                    />

                    <InputField
                        label="TIN"
                        labelStyle="mb-1 block text-sm font-medium text-gray-700"
                        placeholder="Enter TIN"
                        value={officer.tin || ''}
                        errorName={errors[`officers.${officerIndex}.tin` as keyof typeof errors] || ''}
                        errorStyle="mt-1 text-sm text-red-600"
                        fieldName="tin"
                        setData={(fieldName, value) => updateOfficerField(officerIndex, 'tin', value)}
                    />
                </div>

                {/* Phone Number and Email */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <InputField
                        label="Phone Number"
                        labelStyle="mb-1 block text-sm font-medium text-gray-700"
                        placeholder="Enter Phone Number"
                        value={officer.phoneNumber || ''}
                        errorName={errors[`officers.${officerIndex}.phoneNumber` as keyof typeof errors] || ''}
                        errorStyle="mt-1 text-sm text-red-600"
                        fieldName="phoneNumber"
                        setData={(fieldName, value) => updateOfficerField(officerIndex, 'phoneNumber', value)}
                    />

                    <InputField
                        label="Email"
                        labelStyle="mb-1 block text-sm font-medium text-gray-700"
                        placeholder="example@gmail.com"
                        value={officer.email || ''}
                        errorName={errors[`officers.${officerIndex}.email` as keyof typeof errors] || ''}
                        errorStyle="mt-1 text-sm text-red-600"
                        fieldName="email"
                        setData={(fieldName, value) => updateOfficerField(officerIndex, 'email', value)}
                    />
                </div>

                {/* Address Fields */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Permanent Address</label>
                        <TextArea
                            value={officer.permanentAddress || ''}
                            onChange={(e) => updateOfficerField(officerIndex, 'permanentAddress', e.target.value)}
                            className={errors[`officers.${officerIndex}.permanentAddress` as keyof typeof errors] ? 'border-red-500' : ''}
                            rows={5}
                            placeholder="Enter your permanent address here..."
                        />
                        {errors[`officers.${officerIndex}.permanentAddress` as keyof typeof errors] && (
                            <p className="mt-1 text-sm text-red-600">{errors[`officers.${officerIndex}.permanentAddress` as keyof typeof errors]}</p>
                        )}
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Present Address</label>
                        <TextArea
                            value={officer.presentAddress || ''}
                            onChange={(e) => updateOfficerField(officerIndex, 'presentAddress', e.target.value)}
                            className={errors[`officers.${officerIndex}.presentAddress` as keyof typeof errors] ? 'border-red-500' : ''}
                            rows={5}
                            placeholder="Enter your present address here..."
                        />
                        {errors[`officers.${officerIndex}.presentAddress` as keyof typeof errors] && (
                            <p className="mt-1 text-sm text-red-600">{errors[`officers.${officerIndex}.presentAddress` as keyof typeof errors]}</p>
                        )}
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Office Address</label>
                        <TextArea
                            value={officer.officeAddress || ''}
                            onChange={(e) => updateOfficerField(officerIndex, 'officeAddress', e.target.value)}
                            className={errors[`officers.${officerIndex}.officeAddress` as keyof typeof errors] ? 'border-red-500' : ''}
                            rows={5}
                            placeholder="Enter your office address here..."
                        />
                        {errors[`officers.${officerIndex}.officeAddress` as keyof typeof errors] && (
                            <p className="mt-1 text-sm text-red-600">{errors[`officers.${officerIndex}.officeAddress` as keyof typeof errors]}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <form onSubmit={submit}>
            <div className="space-y-6">
                {/* AHS ID and Plot ID (shared among all officers) */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {/* AHS ID */}
                    <InputField
                        label="AHS ID"
                        labelStyle="mb-1 block text-sm font-medium text-gray-700"
                        placeholder="Enter AHS ID"
                        value={data.ahsID || ''}
                        errorName={errors.ahsID || ''}
                        errorStyle="mt-1 text-sm text-red-600"
                        fieldName="ahsID"
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

                {/* Render all officers */}
                {data.officers.map((officer, index) => renderOfficerForm(officer, index))}

                {/* Add Officer Button */}
                <div className="flex items-center justify-center pt-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={addOfficer}
                        className="w-full max-w-xs cursor-pointer border-1 border-[#5691B9] hover:bg-[#5691B9] hover:text-white"
                    >
                        + Add Another Officer
                    </Button>
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
        </form>
    );
};

export default OfficerForm;
