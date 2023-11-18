import { NextRequest, NextResponse } from "next/server";
// const { PrismaClient } = require("@prisma/client");
// const db = new PrismaClient();
import { prisma } from "@/utils/prismadb";


export const POST = async(request: NextRequest) => {

    const res = await request.json()

    

          try {
            const userComponent = await prisma.component.create({
              data: {
                name: res.name,
                category: res.category,
                code:`
                <div>
                <script src="https://cdn.tailwindcss.com"></script>
                </div>
                `
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