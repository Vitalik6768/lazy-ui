"use client"

const { PrismaClient } = require("@prisma/client");
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { type } from 'os';
import { signOut, useSession } from 'next-auth/react';
import { LogOut } from 'lucide-react';
const db = new PrismaClient();



export const UserLinks = () => {
    const session = useSession();
    
    if(!process.env.NEXT_PUBLIC_BASE_API_URL){
        return null
      }

    return (
        <div className="text-right mt-1">
            {session.status === "authenticated" ? (
                <div className='flex justify-end'>
                    <Link  href={`${process.env.NEXT_PUBLIC_BASE_API_URL}`}>{session.data.user.email}</Link>
                    <LogOut onClick={() =>signOut()} className=' ml-3 cursor-pointer'/>

                </div>
            ) : (
                <Link className="text-right mt-1" href={'/login'}>Login</Link>
            )}
        </div>
    );
}

export default UserLinks