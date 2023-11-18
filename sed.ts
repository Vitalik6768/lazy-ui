const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();

//create --create 1 reacord
//findMany -- get all records
//createMany -- create many


async function create() {
    try {
        const user = await db.component.create({
            data:
            {
                name: "dark navebar",
                category: "navebar",
                code: `
                <div>
                <script src="https://cdn.tailwindcss.com"></script>
            
                <div class="bg-blue-500 text-white w-full p-4 mr-7 fixed top-0">
                    <div class="container mx-auto flex justify-between items-center">
                        <h1 class="text-2xl font-semibold">Navbar</h1>
                    </div>
                `
            },

        });
        console.log(user);

    } catch (error) {
        console.error("An error occurred:", error);

    } finally {
        await db.$disconnect();
    }
}

async function createM() {
    try {
        const user = await db.category.createMany({
            data: [
                {
                    name: "buttons",
                },
                {
                    name: "navebar",
                },
                {
                    name: "footers",
                },

            ]
        });
        console.log(user);

    } catch (error) {
        console.error("An error occurred:", error);

    } finally {
        await db.$disconnect();
    }
}

async function read() {
    try {
        //findFirst
        //find many
        const user = await db.user.findUnique({
            where: {
                email: "vital@gmail.com",
            }
        })
        console.log(user);

    } catch (error) {
        console.error("An error occurred:", error);

    } finally {
        await db.$disconnect();
    }
}

create();