"use client"


import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";




const LoginPage = () => {
    const {data, status} = useSession();
    const router = useRouter();

    if(status == "loading"){
        return <p>Loading</p>
    }

    if(status == "authenticated"){
        router.push(`${process.env.NEXT_PUBLIC_BASE_API_URL}`)
    }




 if(!process.env.NEXT_PUBLIC_BASE_API_URL){
        return null
      }

    return (
        <div className="flex">
            <div className="flex-1 ml-48">
                <div className="p-4 h-[calc(200vh-6rem)] md:h-[calc(135vh-9rem)] flex items-center justify-center">
                    {/* BOX */}
                    <div className=" h-full shadow-2xl rounded-md flex flex-col md:flex-row md:h-[70%] md:w-full lg:w-[60%] 2xl:w-1/2">
                        {/* IMAGE CONTAINER */}

                        {/* FORM CONTAINER */}
                        <div className="p-10 flex flex-col gap-8 md:w-full">
                            <h1 className="font-bold text-xl xl:text-3xl">Welcome</h1>
                            <p>Log into your account or create a new one using social buttons</p>
                            <button className="flex gap-4 p-4 ring-1 ring-orange-100 rounded-md" onClick={() =>signIn("google")}
                            >
                                <Image
                                    src="/google.png"
                                    alt=""
                                    width={20}
                                    height={20}
                                    className="object-contain"
                                />
                                <span>Sign in with Google</span>
                            </button>
                            <button className="flex gap-4 p-4 ring-1 ring-blue-100 rounded-md">
                                <Image
                                    src="/facebook.png"
                                    alt=""
                                    width={20}
                                    height={20}
                                    className="object-contain"
                                />
                                <span>Sign in with Facebook</span>
                            </button>
                            <p className="text-sm">
                                Have a problem?<Link className="underline" href="/"> Contact us</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;