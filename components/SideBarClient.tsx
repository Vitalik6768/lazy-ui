"use client"

const { PrismaClient } = require("@prisma/client");
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { SettingsNav } from './SettingsNav';
import { useSession } from 'next-auth/react';



interface IPost {
  id: number;
  name: string;
}

export const SideBarClient = () => {
  const [backendData, setBackEndData] = useState<IPost[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [menuUpdate, setMenuUpdate] = useState();
  const session = useSession();



  useEffect(() => {
    if(process.env.NEXT_PUBLIC_BASE_API_URL){

    
    fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/categories`)
      .then(response => {
        if (response.ok) {
          console.log(response);
          
          return response.json();
        } else {
          throw new Error('Failed to fetch');
        }
      })
      .then(data => {
       // console.log(data);
        setBackEndData(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });

    }
  }, [menuUpdate]);

  const categoryChange = (newData: any) =>{
    setMenuUpdate(newData);
    //console.log(newData);

  }

  if(!process.env.NEXT_PUBLIC_BASE_API_URL){
    return null
  }

  return (
    <>
      <div className="w-32 bg-gray-800 text-white h-screen fixed">
        <div className="p-6">
     
        </div>
        <div className='mt-4 ml-3'>
        {session.status === "authenticated" && (
          <SettingsNav onSubmit={categoryChange} />
        )}
        </div>
        <nav className="mt-8">
          <ul>
            {backendData?.map((category: IPost) => (
              <Link href={`${process.env.NEXT_PUBLIC_BASE_API_URL}/category/` + category.name} key={category.id} className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
                {category.name}
              </Link>

            ))}
          </ul>
        </nav>
      </div>
    </>
  )
}
