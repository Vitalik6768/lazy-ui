import { empty } from "@prisma/client/runtime/library";
import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/utils/prismadb";


export const GET = async(request: NextRequest, { params }: { params: { id: string } } ) => {
      const categoryName= params.id;

      if(categoryName == 'addNew'){
        return NextResponse.json({ category:null});
      }

    
        try {
          const user = await prisma.component.findMany({
            where:{
              category:categoryName
            }
          })
          
          return NextResponse.json({ category:user});
    
        } catch (error) {
          console.error("An error occurred:", error);
    
        } finally {
          await prisma.$disconnect();
        }
    return new NextResponse("it works", { status: 200 });
  }