import { NextResponse, NextRequest } from "next/server";

import { prisma } from "@/utils/prismadb";


// export const GET = async() => {
//  // const categoryName= params.id;

//   console.log('ok');
 
//   // if(categoryName == 'addNew'){
//   //   return NextResponse.json({ category:null});
//   // }


//   //Display By User
//     try {
   
//         const user = await prisma.component.findMany({
//           where:{
//             category:"Buttons",
        
//           }
//         })
        
//         return NextResponse.json({ category:user});
    
      

//     } catch (error) {
//       console.error("An error occurred:", error);

//     } finally {
//       await prisma.$disconnect();
//     }
// return new NextResponse("it works", { status: 200 });
// }





export const GET = async() => {
  


        try {
          const category = await prisma.tipi.findMany()
         // console.log(category);
          
          return NextResponse.json({category});
    
        } catch (error) {
          console.error("An error occurred:", error);
    
        } finally {
          await prisma.$disconnect();
        }
    return new NextResponse("it works", { status: 200 });
  }