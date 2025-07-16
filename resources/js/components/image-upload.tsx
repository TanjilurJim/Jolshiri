import React, { useState } from 'react';
import { toast } from 'sonner';
import { Upload, User, X } from 'lucide-react';

interface Props {
    fieldName: string;
    currentImage: string;
    setData: (fieldName: string, value: string) => void;
    errorImage: string;
}

const ImageUpload = ({ fieldName, currentImage, setData, errorImage }: Props) => {
    const [imagePreview, setImagePreview] = useState(currentImage);
    const [isDragOver, setIsDragOver] = useState(false);

    const handleImageChange = (file: File) => {
        if (file) {
            const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
            if (!validTypes.includes(file.type)) {
                toast.error('Invalid file type. Please upload an image file (jpg, jpeg, png, gif).');
            }

            if (file.size > 5 * 1024 * 1024) {
                toast.error('File size exceeds 5MB. Please upload a smaller image.');
            }

            const imageUrl = URL.createObjectURL(file);
            setImagePreview(imageUrl);
            setData(fieldName, imageUrl);
            toast.success('Image uploaded successfully!');
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = () => {
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
        setData(fieldName, '');
        toast.success('Image removed successfully!');
    };
    return (
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
                                : errorImage
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

            {errorImage && (
                <p className="mt-2 flex items-center text-sm text-red-600">
                    <span className="mr-1">⚠️</span>
                    {errorImage}
                </p>
            )}
        </div>
    );
};

export default ImageUpload;
