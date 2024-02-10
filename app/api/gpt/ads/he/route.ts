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

    const ads = {
        "topic": "fast food resturant",
        "number_of_ads": 3,
        "ads": [
            {
                "id":1,
                "title": "תספק את התשוקה שלך עכשיו!",
                "description": "פריך, עסיסי וטעים שאין לעמוד בפניו! צלול לתוך עולם של טעמים עם ההמבורגרים מעוררי הפה והצ'יפס הפריך שלנו. מהרו להיכנס ולהאכיל את הרעב שלכם"

            },
            {
                "id":2,
                "title": "למה לחכות? ממתין לוהט טרי!",
                "description": "Long day? We've got your back! Let our flavorful fried chicken and golden fries be the comfort you need. Indulgence is just a click away."

            },
            {
                "id":3,
                "title": "פיצוץ טעם בכל ביס!",
                "description": "מוכנים לחגיגת טעם? העטיפות החריפות והנאצ'וס הגביני שלנו קוראים בשמך! החיים קצרים מדי לאוכל תפל."

            },
        ]
    }
    const latestPost = await prisma.chat.findFirst({
        orderBy: {
            createdAt: 'desc'
        }
    })

    try {
        //const  prompt  = await req.json()
        //gpt-4-0314
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-0613",
            temperature: 0.2,
            messages: [
                {
                    role: "system",
                    content: "you are expert facebook ads writer you can write ads about any topic Deliver your response in valid json format following keys: 'id' generate unique id for the ad 'title' for the title of the ad 'description':for the content of the ad  "
                },
                {
                    role: "user",
                    content: `נא ליצור 3 מודעות על מסעדת בשרים בפורמט הבא ${ads} נא לכתוב בעברית אל תכלול את השאלה בתגובתך אל תכלול הסברים `
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


