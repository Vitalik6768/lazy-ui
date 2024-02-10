"use client"

import { Button } from "@/components/ui/button";
import { useScreenshot, createFileName } from "use-react-screenshot"
import { useState, createRef } from "react";

const TestPage = () => {
    const ref = createRef<HTMLDivElement>()
    const [image, setScreenshot] = useScreenshot({
        type: 'image/jpeg'
    })


    const takeScreenshot = () => {
        setScreenshot(ref.current).then(

            downloadImage(image)
        )


    }

    const downloadImage = (image: any, { name = 'img', extension = 'jpeg' } = {}) => {


        const a = document.createElement('a');
        a.href = image;
        a.download = createFileName(extension, name);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);




    };




    return (
        <>
            <div className="container mx-auto p-4">
                <div className='text-center'>
                    <br></br>
                    <Button className='mt-10' onClick={takeScreenshot}>Generate Ai Component</Button>
                    <div ref={ref} >
                        <div style={{
                            border: '1px solid #ccc',
                            background: 'yellow',
                            color: 'black',
                            padding: "10px"

                        }}>
                            <Button className='mt-10' onClick={takeScreenshot}>Generate Ai Component</Button>

                            <p>
                                <strong>hook by @vre2h which allows to create screenshots</strong>
                            </p>

                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default TestPage;