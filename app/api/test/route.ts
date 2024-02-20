import { NextResponse } from "next/server";

// const { PrismaClient } = require("@prisma/client");
// const db = new PrismaClient();



import { prisma } from "@/utils/prismadb";

export const GET = async() => {
  
//hjhjghj

        try {
          const category = await prisma.category.findMany()
         // console.log(category);
          
          return NextResponse.json(category);
    
        } catch (error) {
          console.error("An error occurred:", error);
    
        } finally {
          await prisma.$disconnect();
        }
    //return new NextResponse("it works", { status: 200 });
  }