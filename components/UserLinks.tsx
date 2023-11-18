"use client"

const { PrismaClient } = require("@prisma/client");
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { type } from 'os';
import { signOut, useSession } from 'next-auth/react';
const db = new PrismaClient();



export const UserLinks = () => {
    const { status } = useSession()

    return (
        <div className="text-right mt-1">
            {status === "authenticated" ? (
                <div>
                    <span onClick={() =>signOut()} className='mr-3 cursor-pointer' >Logout</span>
                    <Link className="text-right mt-1" href={'/login'}>Connected</Link>
                </div>
            ) : (
                <Link className="text-right mt-1" href={'/login'}>Login</Link>
            )}
        </div>
    );
}

export default UserLinks