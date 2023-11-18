import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prismadb";
import OpenAI from 'openai';


require("dotenv").config();


interface OpenAIConfig {
  apiKey: string;
}

const openai = new OpenAI({
  apiKey: process.env.KEY as string,

} as OpenAIConfig);



function helloWorld(appendString: String) {
  console.log(appendString)

}

export async function POST(req: NextRequest) {
  //const  prompt  = await req.json();
  //console.log(prompt.prompt);
  try {
    const prompt = await req.json()

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0613",
      temperature: 0.2,
      messages: [
        {
          role: "system",
          content: `${prompt.prompt}`,
        },
        {
          role: "user",
          content: `create rundom generated string then call the function hello world and pass the string as argument`,
        }
      ],
      functions: [
        {
          name: "helloWorld",
          description: "Prints hello world with the string passed to it",
          parameters: {
            type: "object",
            properties: {
              appendString: {
                type: "string",
                description: "the string to append the message"
              },
            },
            require: ["appendString"],
          }
        }],
      function_call: "auto",
    });

    let ifFunctionCall = completion.choices[0].finish_reason;
    if (ifFunctionCall) {
      if(completion.choices[0].message.function_call?.name === "helloWorld"){
        let argFunc = JSON.parse(completion.choices[0].message.function_call?.arguments);
        helloWorld(argFunc.appendString);
      }

    }







    return NextResponse.json({ gpt: completion });
    //return NextResponse.json({ gpt:'completion' });
  } catch (error) {
    console.log(error);

  }

}






export const GET = async () => {


  return new NextResponse("it works", { status: 200 });
}