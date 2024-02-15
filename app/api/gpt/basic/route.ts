import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prismadb";
import OpenAI from 'openai';


require("dotenv").config();


interface OpenAIConfig {
  apiKey: string;
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY as string,
} as OpenAIConfig);




export async function GET(req: NextRequest) {


  //const  prompt  = await req.json();
  //console.log(prompt.prompt);

  const latestPost = await prisma.chat.findFirst({
    orderBy: {
      createdAt: 'desc'
    }
  })

  console.log(latestPost?.code)

  try {

    const completion = await openai.chat.completions.create({
      model: "gpt-4-0314",
      temperature: 0.2,
      messages: [
        {
          role: "user",
          content: "generate 1 tailwind css button don't include the question in your response don't include any explanations in your response the output must be different each time"
        },
        {
          role: "system",
          content: `${latestPost?.code}`
        },
        {
          role: "user",
          content: "generate 1 tailwind css button don't include the question in your response don't include any explanations in your response the output must be different each time change the text style the shape and the hover and the color"
        },
      ],
    });

    let code = completion.choices[0].message.content;
    let token = completion.usage?.total_tokens

    const gptComponent = await prisma.chat.create({
      data: {
        category: 'buttons',
        code: `
          ${code}
          `,
        tokens: 56
      },
    })


    return NextResponse.json({ gpt: completion });
    //return NextResponse.json({ gpt:'completion' });
  } catch (error) {
    console.log(error);
  }

}

export async function POST(req: NextRequest) {
  const startTime = process.hrtime();

  const prompt = await req.json();
  //console.log(prompt.name);



  try {

    const elapsed = process.hrtime(startTime);

    const completion = await openai.chat.completions.create({
      model: "gpt-4-0314",
      temperature: 0.2,
      messages: [
        {
          role: "system",
          content: "you are providing tailwind css code by user request "
        },
        {
          role: "user",
          content: `this is the code ${prompt.code} ${prompt.name} don't include the question in your response don't include any explanations in your response `
        },
      ],
    });

    //console.log(completion);

    const responseTimeInMs = elapsed[0] * 1000 + elapsed[1] / 1000000;

    console.log('Response Time:', responseTimeInMs, 'ms');

    let code = completion.choices[0].message.content;
    let token = completion.usage?.total_tokens


    return NextResponse.json({ gpt: code });
  } catch (error) {
    console.log(error);

  }

}


// export const GET = async () => {


//     return new NextResponse("it works", { status: 200 });
// }


