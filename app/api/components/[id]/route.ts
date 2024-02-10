import { NextResponse,  NextRequest} from "next/server";
import { getAuthSession } from "@/utils/auth";
// const { PrismaClient } = require("@prisma/client");
// const db = new PrismaClient();
import { prisma } from "@/utils/prismadb";



export const GET = async(request: NextRequest, { params }: { params: { id: string } } ) => {

  const componentId= params.id
  const session = await getAuthSession();

  
        try {
          const userComponent = await prisma.component.findUnique({
            where: {
              id:componentId,
              
            }

          })
          
          //UPDATE views
          const userViews = await prisma.component.update({
            where: {
              id:componentId
            },
            data: {
              views:{
                increment: 1
              }
            },
          })

          return NextResponse.json({ component:[userComponent]});
        } catch (error) {
          console.error("An error occurred:", error);
    
        } finally {
          await prisma.$disconnect();
        }
    return new NextResponse("it works", { status: 200 });
  }


  export const PUT = async(request: NextRequest, { params }: { params: { id: string } } ) => {

    const componentId = params.id
    const res = await request.json()
    
          try {
            const userComponent = await prisma.component.update({
              where: {
                id:componentId
              },
              data: {
                code: res.code,
                img:componentId
              },
            })
            return NextResponse.json({ message:'Update Completed'});
          } catch (error) {
            console.error("An error occurred:", error);
      
          } finally {
            await prisma.$disconnect();
          }
      return new NextResponse("it works", { status: 200 });
    }


    export const DELETE = async(request: NextRequest, { params }: { params: { id: string } } ) => {

      const componentId= params.id
      
            try {
              const userComponent = await prisma.component.delete({
                where: {
                  id:componentId
                },
              })
              return NextResponse.json({ message:"Component Deleted"});
            } catch (error) {
              console.error("An error occurred:", error);
        
            } finally {
              await prisma.$disconnect();
            }
        return new NextResponse("it works", { status: 200 });
      }







//   export const GET = async() => {

//     try {
//       const userComponent = await prismadb.component.findMany()
      
//       return NextResponse.json({ component:userComponent});

//     } catch (error) {
//       console.error("An error occurred:", error);

//     } finally {
//       await db.$disconnect();
//     }
// return new NextResponse("it works", { status: 200 });
// }