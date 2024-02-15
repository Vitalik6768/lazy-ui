

const { PrismaClient } = require("@prisma/client");
import { useState, useEffect } from 'react';
const db = new PrismaClient();
const { routh } = require('@/utils/rouths')


interface IPost {
  id: number;
  name: string;
}

async function getData(){
  const res = await fetch(`${routh}/api/categories`)
  
  
  return res.json()

}

export const SideBarServer = async () => {
  const data = await getData();
 


  

  return (
    <>
      <div className="w-48 bg-gray-800 text-white h-screen fixed">
        <div className="p-6">
          <h1 className="text-2xl font-semibold">My App</h1>
        </div>
        <nav className="mt-8">
          <ul>
            {/* {backendData.map((category: IPost) => (
              <a href={'/category/' + category.name} key={category.id} className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
                {category.name}
              </a>

            ))} */}
          </ul>
        </nav>
      </div>
    </>
  )
}