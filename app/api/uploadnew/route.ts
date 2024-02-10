import { NextApiHandler, NextApiRequest } from "next";
import { NextResponse } from "next/server";
import formidable from 'formidable';
import { error } from "console";
import path, { resolve } from "path";
import fs from "fs/promises";

export const config = {
    api: {
        bodyParser: false,
    },
}

const readfile = (req: NextApiRequest, saveLocally?: boolean)

    : Promise<{ fields: formidable.Fields; files: formidable.Files }> => {

    const options: formidable.Options = {};
   // if (saveLocally) {
        options.uploadDir = path.join(process.cwd(), "/public/images")
        options.filename = (name, ext, path, form) => {
            return Date.now().toString() + "_" + path.originalFilename;

       // }
    }


    const form = formidable(options)
    return new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) reject(err)
            resolve({ fields, files })

        })
    })

}

export const POST: NextApiHandler = async (req, res) => {
    // try {
    //     await fs.readdir(path.join(process.cwd() + "/public", "/images"))

    // } catch (error) {
    //     await fs.readdir(path.join(process.cwd() + "/public", "/images"))

    // }
  
    await readfile(req);
    return NextResponse.json("ok");
    
    // const form = formidable()
    // form.parse(req, (err, fields, files) => { })
}

//export default handler