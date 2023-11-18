import Link from "next/link";
import UserLinks from "./UserLinks";


export const Navebar = () => {
    return(
        <div className="bg-gray-700 text-white w-full p-4 mr-7 fixed top-0 h-14">
        <div className="grid grid-cols-2 gap-4">
        <h1 className="text-2xl font-semibold">Lazy Ui</h1>
        <UserLinks/>
        <nav>
        </nav>
      </div>
    </div>
    )
}