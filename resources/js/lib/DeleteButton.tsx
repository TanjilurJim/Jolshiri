import { Button } from '@/components/ui/button';

const DeleteButton = () => {
    return (
        <Button
            variant="outline"
            className="border- cursor-pointer border-red-600 bg-red-600 text-white hover:bg-white hover:text-black"
            onClick={() => handleDelete(civilian.memberId)}
        >
            Delete
        </Button>
    );
};

export default DeleteButton;
