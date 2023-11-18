import { NextResponse } from "next/server";
import { prisma } from "@/utils/prismadb";

export const GET = async() => {

        try {
          const userComponent = await prisma.component.findUnique({
            where: {
              id:'eb5ad7f1-d303-492e-8248-b20171217a15'
             
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

//   export const GET = async() => {

//     try {
//       const userComponent = await db.component.findMany()
      
//       return NextResponse.json({ component:userComponent});

//     } catch (error) {
//       console.error("An error occurred:", error);

//     } finally {
//       await db.$disconnect();
//     }
// return new NextResponse("it works", { status: 200 });
// }