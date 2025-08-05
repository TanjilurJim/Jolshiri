import InputError from '@/components/input-error';
import InputField from '@/components/input-field';
import { Button } from '@/components/ui/button';
import { MailSettings } from '@/types/smtp';
import { useForm } from '@inertiajs/react';
import React from 'react';
import { toast } from 'sonner';

interface Props {
    isEdit: boolean;
    current?: MailSettings;
    onSuccess?: () => void;
}

const MailConfigurationForm = ({ current, isEdit, onSuccess }: Props) => {
    const { data, setData, post, put, processing, errors } = useForm({
        email: current?.email || '',
        mailHost: current?.mailHost || '',
        mailEncrypt: current?.mailEncrypt || '',
        password: current?.password || '',
        fromName: current?.fromName,
        mailDriver: current?.mailDriver || '',
        mailPort: current?.mailPort || '',
        mailUserName: current?.mailUserName || '',
        mailForm: current?.mailForm || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        

        if (isEdit) {
            toast.success('Mail information updated 🎉');

            // Call onSuccess callback to close modal if provided
            if (onSuccess) {
                onSuccess();
            }
        } else {
            toast.success('Mail information saved 🎉');
            console.log(data);
            setData({
                email: '',
                mailHost: '',
                mailEncrypt: '',
                password: '',
                fromName: '',
                mailDriver: '',
                mailPort: '',
                mailUserName: '',
                mailForm: '',
            });
            // Call onSuccess callback if provided
            if (onSuccess) {
                onSuccess();
            }
        }
    };

    return (
        <div>
            <form onSubmit={submit} className="space-y-6">
                <div className="grid gap-2">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {/* Email Input */}
                        <InputField
                            label="Email"
                            labelStyle="mb-1 block text-sm font-medium text-gray-700"
                            value={data.email || ''}
                            errorName={errors.email || ''}
                            errorStyle="mt-1 text-sm text-red-600"
                            placeholder="Current email"
                            fieldName="email"
                            setData={setData}
                        />

                        {/* Mail Host Input */}
                        <InputField
                            label="Mail Host"
                            labelStyle="mb-1 block text-sm font-medium text-gray-700"
                            value={data.mailHost || ''}
                            errorName={errors.mailHost || ''}
                            errorStyle="mt-1 text-sm text-red-600"
                            placeholder="Mail Host"
                            fieldName="mailHost"
                            setData={setData}
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {/* Mail Encrypt Input */}
                        <div className="grid grid-cols-1 gap-4">
                            <InputField
                                label="Mail Encryption"
                                labelStyle="mb-1 block text-sm font-medium text-gray-700"
                                value={data.mailEncrypt || ''}
                                errorName={errors.mailEncrypt || ''}
                                errorStyle="mt-1 text-sm text-red-600"
                                placeholder="Encryption method (e.g., SSL/TLS)"
                                fieldName="mailEncrypt"
                                setData={setData}
                            />
                        </div>

                        {/* Password Input */}
                        <div className="grid grid-cols-1 gap-4">
                            <InputField
                                label="Password"
                                labelStyle="mb-1 block text-sm font-medium text-gray-700"
                                value={data.password || ''}
                                errorName={errors.password || ''}
                                errorStyle="mt-1 text-sm text-red-600"
                                placeholder="Enter password"
                                fieldName="password"
                                setData={setData}
                                // type="password" // Use password type for sensitive data
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="grid grid-cols-1 gap-4">
                            <InputField
                                label="From Name"
                                labelStyle="mb-1 block text-sm font-medium text-gray-700"
                                value={data.fromName || ''}
                                errorName={errors.fromName || ''}
                                errorStyle="mt-1 text-sm text-red-600"
                                placeholder="Enter sender name"
                                fieldName="fromName"
                                setData={setData}
                            />
                        </div>

                        {/* Mail Driver Input */}
                        <div className="grid grid-cols-1 gap-4">
                            <InputField
                                label="Mail Driver"
                                labelStyle="mb-1 block text-sm font-medium text-gray-700"
                                value={data.mailDriver || ''}
                                errorName={errors.mailDriver || ''}
                                errorStyle="mt-1 text-sm text-red-600"
                                placeholder="Mail driver (e.g., SMTP)"
                                fieldName="mailDriver"
                                setData={setData}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {/* Mail Port Input */}
                        <div className="grid grid-cols-1 gap-4">
                            <InputField
                                label="Mail Port"
                                labelStyle="mb-1 block text-sm font-medium text-gray-700"
                                value={data.mailPort || ''}
                                errorName={errors.mailPort || ''}
                                errorStyle="mt-1 text-sm text-red-600"
                                placeholder="Mail port (e.g., 587)"
                                fieldName="mailPort"
                                setData={setData}
                            />
                        </div>

                        {/* Mail Username Input */}
                        <div className="grid grid-cols-1 gap-4">
                            <InputField
                                label="Mail Username"
                                labelStyle="mb-1 block text-sm font-medium text-gray-700"
                                value={data.mailUserName || ''}
                                errorName={errors.mailUserName || ''}
                                errorStyle="mt-1 text-sm text-red-600"
                                placeholder="Mail Username"
                                fieldName="mailUserName"
                                setData={setData}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        <InputField
                            label="Mail Form"
                            labelStyle="mb-1 block text-sm font-medium text-gray-700"
                            value={data.mailForm || ''}
                            errorName={errors.mailForm || ''}
                            errorStyle="mt-1 text-sm text-red-600"
                            placeholder="Mail From Address"
                            fieldName="mailForm"
                            setData={setData}
                        />
                    </div>

                    {/* Display any input errors */}
                    <InputError message={errors.email} />
                </div>

                {/* Submit Button */}
                <div className="flex items-center justify-center pt-4">
                    <Button type="submit" disabled={processing} className="w-full cursor-pointer">
                        {processing ? (
                            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
                        ) : (
                            <>{isEdit ? 'Update' : 'Save'}</>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default MailConfigurationForm;
