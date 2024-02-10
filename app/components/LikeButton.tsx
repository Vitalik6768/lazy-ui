import { FC } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Save } from 'lucide-react';
import { Heart } from 'lucide-react';


interface ComProps {
    id: string;
    data: string;
    onClick: (data: any) => void;
}

const LikeButton: FC<ComProps> = ({ id, data, onClick }) => {
    const { toast } = useToast();

    const updateData = async () => {
        try {
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: data })
            };
            const response = await fetch(`/api/components/${id}`, requestOptions);
            const responseData = await response.json();
            console.log(responseData);
            onClick(id);
            toast({ description: responseData.message });
        } catch (error) {
            console.error('Failed to update data:', error);
            // Handle error appropriately
        }
    };

    return (
        <Heart className='text-red-500 hover:text-black m-2 transition duration-200 ease-in-out cursor-pointer' onClick={updateData} />
    );
};

export default LikeButton;