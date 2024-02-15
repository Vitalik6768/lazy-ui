import Link from "next/link";
import UserLinks from "./UserLinks";


export const Navebar = () => {
  
  if(!process.env.NEXT_PUBLIC_BASE_API_URL){
    return null
  }
  
    return(
        <div className="bg-gray-700 text-white w-full p-4 mr-7 fixed top-0 h-14">
        <div className="grid grid-cols-2 gap-4">
        <Link className="text-2xl font-semibold cursor-pointer" href={`${process.env.NEXT_PUBLIC_BASE_API_URL}`}>Lazy Ui</Link>
        <UserLinks/>
        <nav>
        </nav>
      </div>
    </div>
    )
}