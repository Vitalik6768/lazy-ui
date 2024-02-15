
import Link from 'next/link';
import { type } from 'os';
import { SettingsNav } from './SettingsNav';
const { routh } = require('@/utils/rouths')



type IPost  = {
  id: number;
  name: string;
  
}
const getData = async ()=>{
  const res = await fetch(`${routh}/api/categories`,{
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
      <div className="w-32 bg-gray-800 text-white h-screen fixed">
        <div className="p-6">
        
        </div>
        <div className='mt-4 ml-3'>
        <SettingsNav/>
        </div>
        
        <nav className="mt-8">
        
          <ul>
            {menu.map((category) => (
              <Link href={`${routh}/category/` + category.name} key={category.id} className=" cursor-pointer block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
                {category.name}
              </Link>

            ))}
          </ul>
        </nav>
      </div>
    </>
  )
}