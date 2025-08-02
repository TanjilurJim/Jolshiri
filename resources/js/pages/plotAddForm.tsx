import InputField from '@/components/input-field';
import { Owner, Plot } from '@/types/plotAdd';
import { useForm } from '@inertiajs/react';
import { toast } from 'sonner';

interface Props {
    isEdit: boolean;
    current?: Owner & Plot;
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
    id: string;
    price: number;
}

const PlotAddForm = ({ current, isEdit }: Props) => {
    const { data, setData, post, put, processing, errors } = useForm({
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
                tin: current?.tin,
                presentAddress: current?.presentAddress || '',
                phoneNumber: current?.phoneNumber || '',
                email: current?.email || '',
            },
        ],
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEdit) {
            // Update function will call here
            toast.success('Plot information updated 🎉');
        } else {
            // Add function will call here
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
                        phoneNumber: '',
                        email: '',
                    },
                ],
            });
        }
    };

    const handleDateChange = (date: Date | null | undefined, ownerIndex: number) => {
        const newOwners = [...data.owners];
    }

    return (
        <form onSubmit={submit}>
            <div className="space-y-6">
                {/* Plot id and owner name */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {/* Plot ID */}
                    <InputField
                        label="id"
                        labelStyle="mb-1 block text-sm font-medium text-gray-700"
                        placeholder="Plot ID"
                        value={data.id || ''}
                        errorName={errors.id || ''}
                        errorStyle="mt-1 text-sm text-red-600"
                        fieldName="id"
                        setData={setData}
                    />

                    {/* Owner Name */}
                    <InputField
                        label="ownerName"
                        labelStyle="mb-1 block text-sm font-medium text-gray-700"
                        placeholder="Owner name"
                        value={data.ownerName || ''}
                        errorName={errors.ownerName || ''}
                        errorStyle="mt-1 text-sm text-red-600"
                        fieldName="ownerName"
                        setData={setData}
                    />
                </div>
                {/*Phone Number and email  */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {/* Phone Number */}
                    <InputField
                        label="Phone Number"
                        labelStyle="mb-1 block text-sm font-medium text-gray-700"
                        placeholder="Enter Phone Number"
                        value={data.ownerPhoneNumber || ''}
                        errorName={errors.ownerPhoneNumber || ''}
                        errorStyle="mt-1 text-sm text-red-600"
                        fieldName="ownerPhoneNumber"
                        setData={setData}
                    />

                    {/* Email */}
                    <InputField
                        label="Email"
                        labelStyle="mb-1 block text-sm font-medium text-gray-700"
                        placeholder="example@gmail.com"
                        value={data.ownerEmail || ''}
                        errorName={errors.ownerEmail || ''}
                        errorStyle="mt-1 text-sm text-red-600"
                        fieldName="ownerEmail"
                        setData={setData}
                    />
                </div>
            </div>
        </form>
    );
};

export default PlotAddForm;
