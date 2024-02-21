import { empty } from "@prisma/client/runtime/library";
import { NextResponse, NextRequest } from "next/server";
import { getAuthSession } from "@/utils/auth";
import { prisma } from "@/utils/prismadb";


export const dynamic = 'force-dynamic';

export const GET = async(request: NextRequest, { params }: { params: { id: string } } ) => {
      const categoryName= params.id;
      const session = await getAuthSession();
      console.log('ok');
     
      if(categoryName == 'addNew'){
        return NextResponse.json({ category:null});
      }


      //Display By User
        try {
          if(session?.user.email){
            const user = await prisma.component.findMany({
              where:{
                category:categoryName,
                userId:session?.user.email
              }
            })
            
            return NextResponse.json({ category:user});
        
          }
    
        } catch (error) {
          console.error("An error occurred:", error);
    
        } finally {
          await prisma.$disconnect();
        }
    return new NextResponse("it works", { status: 200 });
  }