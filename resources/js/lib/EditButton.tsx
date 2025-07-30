import { Button } from '@/components/ui/button';

const EditButton = () => {
    return (
        <Button
            variant="outline"
            className="border- hover:text-blue-600text-white cursor-pointer border-blue-600 bg-blue-600 text-white hover:bg-white hover:text-black"
            onClick={() => handleDelete(civilian.memberId)}
        >
            Edit
        </Button>
    );
};

export default EditButton;
