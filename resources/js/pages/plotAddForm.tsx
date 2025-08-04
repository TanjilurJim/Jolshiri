import ImageUpload from '@/components/image-upload';
import InputField from '@/components/input-field';
import { Button } from '@/components/ui/button';
import { usePlotContext } from '@/lib/addPlotContext';
import { Owner, Plot } from '@/types/plotAdd';
import { useForm } from '@inertiajs/react';
import { TextArea } from '@radix-ui/themes';
import { Datepicker } from 'flowbite-react';
import { useEffect } from 'react';
import { toast } from 'sonner';

interface Props {
    isEdit: boolean;
    current?: Owner & Plot;
    id?: string;
}

// Define the owner data structure
interface OwnerData {
    image: string;
    name: string;
    dob: string;
    religion: string;
    nationality: string;
    profession: string;
    tin: string;
    email: string;
    permanentAddress: string;
    presentAddress: string;
    phoneNumber: string;
}

const PlotAddForm = ({ current, isEdit, id }: Props) => {
    const{addPlotWithOwners, updatePlot, getPlot} = usePlotContext();

    const { data, setData, post, put, processing, errors, reset } = useForm({
        id: current?.id || '',
        price: current?.price || 0,
        owners: [
            {
                image: current?.image || '',
                name: current?.name || '',
                dob: current?.dob || '',
                religion: current?.religion || '',
                nationality: current?.nationality || '',
                profession: current?.profession || '',
                tin: current?.tin || '',
                presentAddress: current?.presentAddress || '',
                permanentAddress: current?.permanentAddress || '',
                phoneNumber: current?.phoneNumber || '',
                email: current?.email || '',
            },
        ],
    });

    // Load existing plot data if editing
    useEffect(() => {
        if(isEdit && id){
            const existingPlot = getPlot(id);
            if(existingPlot){
                setData({
                    id: existingPlot.id,
                    price: existingPlot.price,
                    owners: existingPlot.owners,
                })
            }
        }
    }, [isEdit, id, getPlot, setData]);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        try{
            const plotData = {
                id: data.id,
                price: data.price,
                owners: data.owners,
            }

            if (isEdit && id) {
                updatePlot(id, plotData);
                toast.success('Plot information updated 🎉');
            } 
            else {
                // Add function will call here
                addPlotWithOwners(plotData);
                toast.success('Plot information saved 🎉');
                setData({
                    id: '',
                    price: 0,
                    owners: [
                        {
                            image: '',
                            name: '',
                            dob: '',
                            religion: '',
                            nationality: '',
                            profession: '',
                            tin: '',
                            presentAddress: '',
                            permanentAddress: '',
                            phoneNumber: '',
                            email: '',
                        },
                    ],
                });
            }
        }
        catch(error){
            if(error instanceof Error){
                toast.error(error.message);
            }
            else{
                toast.error('An error occurred while saving the plot');
            }
        }

        
    };

    const handleDateChange = (date: Date | null | undefined, ownerIndex: number) => {
        const newOwners = [...data.owners];
        if (!date) {
            newOwners[ownerIndex].dob = '';
        } else {
            newOwners[ownerIndex].dob = date.toISOString();
        }
        setData('owners', newOwners);
    };

    const updateOwnerField = (ownerIndex: number, field: keyof OwnerData, value: string) => {
        const newOwners = [...data.owners]
        newOwners[ownerIndex] = {
            ...newOwners[ownerIndex],
            [field]: value,
        };
        setData('owners', newOwners);
    }

    const addNewOwner = () => {
        if (data.owners.length >= 5) {
            toast.error("Owner can't be greater than 5 for a single plot!");
        } else {
            const newOwner: OwnerData = {
                image: '',
                name: '',
                dob: '',
                religion: '',
                nationality: '',
                profession: '',
                tin: '',
                email: '',
                permanentAddress: '',
                presentAddress: '',
                phoneNumber: '',
            };
            setData('owners', [...data.owners, newOwner]);
        }
    };

    // Remove owner function will call here
    const removeOwner = (ownerIndex: number) => {
        if (data.owners.length > 1) {
            const newOwners = data.owners.filter((_, index) => index !== ownerIndex);
            setData('owners', newOwners);
        }
    };

    const renderOwnerForm = (owner: OwnerData, ownerIndex: number) => (
        <div key={ownerIndex} className="relative rounded-lg border bg-gray-50 p-6">
            {/* Officer Header */}
            <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Owner {ownerIndex + 1}</h3>
                {data.owners.length > 1 && (
                    <Button type="button" variant="destructive" size="sm" onClick={() => removeOwner(ownerIndex)} className="cursor-pointer text-xs">
                        Remove Owner
                    </Button>
                )}
            </div>

            <div className="space-y-6">
                {/* Image Upload */}
                <ImageUpload
                    fieldName={`owners.${ownerIndex}.image`}
                    currentImage={owner.image || ''}
                    setData={(fieldName, value) => updateOwnerField(ownerIndex, 'image', value)}
                    errorImage={errors[`owners.${ownerIndex}.image` as keyof typeof errors] || ''}
                />

                {/* Name and nationality */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {/* Name */}
                    <InputField
                        label="Name"
                        labelStyle="mb-1 block text-sm font-medium text-gray-700"
                        placeholder="Enter your full name"
                        value={owner.name || ''}
                        errorName={errors[`owners.${ownerIndex}.name` as keyof typeof errors] || ''}
                        errorStyle="mt-1 text-sm text-red-600"
                        fieldName="name"
                        setData={(fieldName, value) => updateOwnerField(ownerIndex, 'name', value)}
                    />

                    {/* Nationality */}
                    <InputField
                        label="Nationality"
                        labelStyle="mb-1 block text-sm font-medium text-gray-700"
                        placeholder="Enter Nationality"
                        value={owner.nationality || ''}
                        errorName={errors[`owners.${ownerIndex}.nationality` as keyof typeof errors] || ''}
                        errorStyle="mt-1 text-sm text-red-600"
                        fieldName="nationality"
                        setData={(fieldName, value) => updateOwnerField(ownerIndex, 'nationality', value)}
                    />
                </div>

                {/* DOB and religion */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {/* Date of Birth */}
                    <div className="">
                        <label className="mb-1 block text-sm font-medium text-gray-700">Date of Birth</label>
                        <Datepicker
                            id={`datepicker-${ownerIndex}`}
                            value={owner.dob ? new Date(owner.dob) : null}
                            onChange={(date) => handleDateChange(date, ownerIndex)}
                            autoHide={true}
                            className={`block w-full rounded-lg border text-sm focus:border-blue-500 ${errors[`officers.${ownerIndex}.dob` as keyof typeof errors] ? 'border-red-500' : ''} transition duration-200 ease-in-out`}
                            placeholder="Select date"
                        />
                        {errors[`owners.${ownerIndex}.dob` as keyof typeof errors] && (
                            <p className="mt-2 text-sm text-red-600">{errors[`owners.${ownerIndex}.dob` as keyof typeof errors]}</p>
                        )}
                    </div>

                    {/* Religion */}
                    <InputField
                        label="Religion"
                        labelStyle="mb-1 block text-sm font-medium text-gray-700"
                        placeholder="Choose Religion"
                        value={owner.religion || ''}
                        errorName={errors[`owners.${ownerIndex}.religion` as keyof typeof errors] || ''}
                        errorStyle="mt-1 text-sm text-red-600"
                        fieldName="religion"
                        setData={(fieldName, value) => updateOwnerField(ownerIndex, 'religion', value)}
                    />
                </div>

                {/* Profession and TIN */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <InputField
                        label="Profession"
                        labelStyle="mb-1 block text-sm font-medium text-gray-700"
                        placeholder="Enter Profession"
                        value={owner.profession || ''}
                        errorName={errors[`owners.${ownerIndex}.profession` as keyof typeof errors] || ''}
                        errorStyle="mt-1 text-sm text-red-600"
                        fieldName="profession"
                        setData={(fieldName, value) => updateOwnerField(ownerIndex, 'profession', value)}
                    />

                    <InputField
                        label="TIN"
                        labelStyle="mb-1 block text-sm font-medium text-gray-700"
                        placeholder="Enter TIN"
                        value={owner.tin || ''}
                        errorName={errors[`owners.${ownerIndex}.tin` as keyof typeof errors] || ''}
                        errorStyle="mt-1 text-sm text-red-600"
                        fieldName="tin"
                        setData={(fieldName, value) => updateOwnerField(ownerIndex, 'tin', value)}
                    />
                </div>

                {/* Phone Number and Email */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <InputField
                        label="Phone Number"
                        labelStyle="mb-1 block text-sm font-medium text-gray-700"
                        placeholder="Enter Phone Number"
                        value={owner.phoneNumber || ''}
                        errorName={errors[`owners.${ownerIndex}.phoneNumber` as keyof typeof errors] || ''}
                        errorStyle="mt-1 text-sm text-red-600"
                        fieldName="phoneNumber"
                        setData={(fieldName, value) => updateOwnerField(ownerIndex, 'phoneNumber', value)}
                    />

                    <InputField
                        label="Email"
                        labelStyle="mb-1 block text-sm font-medium text-gray-700"
                        placeholder="example@gmail.com"
                        value={owner.email || ''}
                        errorName={errors[`owners.${ownerIndex}.email` as keyof typeof errors] || ''}
                        errorStyle="mt-1 text-sm text-red-600"
                        fieldName="email"
                        setData={(fieldName, value) => updateOwnerField(ownerIndex, 'email', value)}
                    />
                </div>

                {/* Address Fields */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Permanent Address</label>
                        <TextArea
                            value={owner.permanentAddress || ''}
                            onChange={(e) => updateOwnerField(ownerIndex, 'permanentAddress', e.target.value)}
                            className={errors[`owners.${ownerIndex}.permanentAddress` as keyof typeof errors] ? 'border-red-500' : ''}
                            rows={5}
                            placeholder="Enter your permanent address here..."
                        />
                        {errors[`owners.${ownerIndex}.permanentAddress` as keyof typeof errors] && (
                            <p className="mt-1 text-sm text-red-600">{errors[`owners.${ownerIndex}.permanentAddress` as keyof typeof errors]}</p>
                        )}
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">Present Address</label>
                        <TextArea
                            value={owner.presentAddress || ''}
                            onChange={(e) => updateOwnerField(ownerIndex, 'presentAddress', e.target.value)}
                            className={errors[`owners.${ownerIndex}.presentAddress` as keyof typeof errors] ? 'border-red-500' : ''}
                            rows={5}
                            placeholder="Enter your present address here..."
                        />
                        {errors[`owners.${ownerIndex}.presentAddress` as keyof typeof errors] && (
                            <p className="mt-1 text-sm text-red-600">{errors[`owners.${ownerIndex}.presentAddress` as keyof typeof errors]}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <form onSubmit={submit}>
            <div className="space-y-6">
                {/* Plot ID (shared among all owners) and Price */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {/* Plot ID */}
                    <InputField
                        label="Plot ID"
                        labelStyle="mb-1 block text-sm font-medium text-gray-700"
                        placeholder="Enter Plot ID"
                        value={data.id || ''}
                        errorName={errors.id || ''}
                        errorStyle="mt-1 text-sm text-red-600"
                        fieldName="id"
                        setData={setData}
                    />

                    {/* Plot price */}
                    <InputField
                        label="Plot Sell Price"
                        labelStyle="mb-1 block text-sm font-medium text-gray-700"
                        placeholder="Enter the price of your plot"
                        value={data.price || 0}
                        errorName={errors.id || ''}
                        errorStyle="mt-1 text-sm text-red-600"
                        fieldName="price"
                        setData={setData}
                    />
                </div>

                {/* Render all owner */}
                {data.owners.map((owner, index) => renderOwnerForm(owner, index))}

                {/* Add Owner Button */}
                <div className="flex items-center justify-center pt-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={addNewOwner}
                        className="w-full max-w-xs cursor-pointer border-1 border-[#5691B9] hover:bg-[#5691B9] hover:text-white"
                    >
                        + Add Another Owner
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

export default PlotAddForm;
