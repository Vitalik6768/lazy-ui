import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "@/utils/auth";
// const { PrismaClient } = require("@prisma/client");
// const db = new PrismaClient();
import { prisma } from "@/utils/prismadb";


export const POST = async(request: NextRequest) => {
  const session = await getAuthSession();
  if(!session){
    return NextResponse.json({ message:"not coneected"});
  }

    const res = await request.json()

    

          try {
            const userComponent = await prisma.component.create({
              data: {
                name: res.name,
                category: res.category,
                code:`
  <div>

    <script src="https://cdn.tailwindcss.com"></script>
            
    //Write Here
            
            
    </div>
                `,
                views:0,
                likes:0,
                status:"all",
                img:"no img",
                userId:res.userId
              },
            })

            
            return NextResponse.json({ message:res.name});
          } catch (error) {
            console.error("An error occurred:", error);
      
          } finally {
            await prisma.$disconnect();
          }
      return new NextResponse("it works", { status: 200 });
    }