"use client"

const { PrismaClient } = require("@prisma/client");
import { useState, useEffect } from 'react';
import Link from 'next/link';
const db = new PrismaClient();
const { routh } = require('@/utils/rouths')


interface IPost {
  id: number;
  name: string;
}

export const SideBar = () => {
  const [backendData, setBackEndData] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/categories`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch');
        }
      })
      .then(data => {
        if (Array.isArray(data.category)) {
          setBackEndData(data.category);
        } else {
          console.warn("Received data is not an array", data);

        }
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if(!process.env.NEXT_PUBLIC_BASE_API_URL){
    return null
  }

  return (
    <>
      <div className="w-48 bg-gray-800 text-white h-screen fixed">
        <div className="p-6">
     
        </div>
        <nav className="mt-8">
          <ul>
            {backendData.map((category: IPost) => (
              <Link href={`${routh}/category/` + category.name} key={category.id} className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
                {category.name}
              </Link>

            ))}
          </ul>
        </nav>
      </div>
    </>
  )
}