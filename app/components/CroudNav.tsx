import { FC } from 'react';
const { routh } = require('@/utils/rouths')
import { useToast } from "@/components/ui/use-toast";
import { Save } from 'lucide-react';


interface ComProps {
    id: string;
    data: string;
    onClick: (data: any) => void;
}

const CrudNav: FC<ComProps> = ({ id, data, onClick }) => {
    const { toast } = useToast();

    const updateData = async () => {
        try {
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: data })
            };
            const response = await fetch(`${routh}/api/components/${id}`, requestOptions);
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
        <Save className='text-red-500 hover:text-black m-2 transition duration-200 ease-in-out cursor-pointer' onClick={updateData} />
    );
};

export default CrudNav;