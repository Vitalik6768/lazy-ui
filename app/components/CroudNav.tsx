"use client"

import { useState, useEffect, ChangeEvent, FC } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Save } from 'lucide-react';

interface ComProps {
    id: string;
    data: string
}


const CroudNav: FC<ComProps> = (prompts) =>{
    const { toast } = useToast();

     const updateData = async() => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                code:prompts.data,
            })
        };
        const response = await fetch(`/api/components/${prompts.id}`, requestOptions);
        const data = await response.json();
       
        console.log(data)

        toast({
            description: data.message,
          })


    }

    
    return(<Save className='text-red-500 hover:text-black m-2 transition duration-200 ease-in-out cursor-pointer' onClick={updateData}/>)
}

export default CroudNav