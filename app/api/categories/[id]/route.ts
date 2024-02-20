import { NextResponse, NextRequest } from "next/server";
// const { PrismaClient } = require("@prisma/client");
// const db = new PrismaClient();
import { prisma } from "@/utils/prismadb";




export const POST = async (request: NextRequest) => {

  const res = await request.json()

  try {
    const userComponent = await prisma.category.create({
      data: {
        name: res.name,
      },
    })


    return NextResponse.json({ message: res.name });
  } catch (error) {
    console.error("An error occurred:", error);

  } finally {
    await prisma.$disconnect();
  }
  return new NextResponse("it works", { status: 200 });
}


export const DELETE = async (request: NextRequest) => {
  const res = await request.json()
  
  try {
    const userComponent = await prisma.category.delete({
      where: {
        name: res.category,
      },
    })


    return NextResponse.json({ message: res.name });
  } catch (error) {
    console.error("An error occurred:", error);

  } finally {
    await prisma.$disconnect();
  }
  return new NextResponse("it works", { status: 200 });
}