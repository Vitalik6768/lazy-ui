import { NextResponse } from "next/server";

import { prisma } from "@/utils/prismadb";

export const GET = async() => {
  


        try {
          const category = await prisma.tipi.findMany()
         // console.log(category);
          
          return NextResponse.json(category);
    
        } catch (error) {
          console.error("An error occurred:", error);
    
        } finally {
          await prisma.$disconnect();
        }
    //return new NextResponse("it works", { status: 200 });
  }