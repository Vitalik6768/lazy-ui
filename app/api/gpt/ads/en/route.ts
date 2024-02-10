import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prismadb";
import OpenAI from 'openai';


require("dotenv").config();


// export const GET = async () => {


//     return new NextResponse("it works", { status: 200 });

// }
interface OpenAIConfig {
    apiKey: string;
}

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY as string,
} as OpenAIConfig);




export async function GET(req: NextRequest) {

    const ads = 

        [
            {
                "id": 1,
                "title": "Satisfy Your Cravings NOW!",
                "description": "Crunchy, juicy, and irresistibly delicious! Dive into a world of flavor with our mouth-watering burgers and crispy fries. Hurry in and feed your hunger. #TasteTheRush"

            },
            {
                "id": 2,
                "title": "Why Wait? Hot 'n' Fresh Awaits!",
                "description": "Long day? We've got your back! Let our flavorful fried chicken and golden fries be the comfort you need. Indulgence is just a click away."

            },
            {
                "id": 3,
                "title": "Taste Explosion in Every Bite!",
                "description": "Ready for a flavor fiesta? Our spicy wraps and cheesy nachos are calling your name! Life's too short for bland food."

            },
        ]
    
    const latestPost = await prisma.chat.findFirst({
        orderBy: {
            createdAt: 'desc'
        }
    })

    try {
        //const  prompt  = await req.json()
        //gpt-4-0314
        //gpt-3.5-turbo-0613
        const completion = await openai.chat.completions.create({
            model: "gpt-4-0314",
            temperature: 0.2,
            messages: [
                {
                    role: "system",
                    content: "you are expert facebook ads writer you can write ads about any topic Deliver your response in valid json format following keys: 'id' generate unique id string  'title' the title of the ad 'description': the content of the ad  "
                },
                {
                    role: "user",
                    content: `please produce 3 ads about pizza resturant in the following format ${ads} don't include the question in your response don't include any explanations `
                },
            ],
        });

        let code = completion.choices[0].message.content;
        let token = completion.usage?.total_tokens

        // const gptComponent = await prisma.chat.create({
        //     data: {
        //         category: 'buttons',
        //         code: `
        //   ${code}
        //   `,
        //         tokens: 56
        //     },
        // })

        console.log(completion.choices[0].message.content)


        return NextResponse.json({ gpt: completion });
        //return NextResponse.json({ gpt:'completion' });
    } catch (error) {
        console.log(error);

    }

}


