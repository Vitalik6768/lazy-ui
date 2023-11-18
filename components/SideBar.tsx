

const { PrismaClient } = require("@prisma/client");
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { type } from 'os';
const db = new PrismaClient();

type IPost  = {
  id: number;
  name: string;
  
}
const getData = async ()=>{
  const res = await fetch("http://localhost:3000/api/categories",{
    cache:"no-store"
  })

  if(!res.ok){
    throw new Error("Failed!");
  }
  return res.json() 
}

export const SideBar =  async () => {

  const menu : IPost[] = await getData()
  return (
    <>
      <div className="w-48 bg-gray-800 text-white h-screen fixed">
        <div className="p-6">
     
        </div>
        <nav className="mt-8">
          <ul>
            {menu.map((category) => (
              <Link href={'/category/' + category.name} key={category.id} className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
                {category.name}
              </Link>

            ))}
          </ul>
        </nav>
      </div>
    </>
  )
}