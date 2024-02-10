"use client"

import { Button } from "@/components/ui/button";
import { useScreenshot, createFileName } from "use-react-screenshot"
import { useState, createRef } from "react";
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';


const ToImage = () => {
    const takeScreenshot = () => {
        const node = document.getElementById('my-node');

        if (node === null) {
            console.error('Element not found');
            return;
        }

        htmlToImage.toPng(node)
            .then(function (dataUrl) {
                var img = new Image();
                img.src = dataUrl;
                document.body.appendChild(img);
            })
            .catch(function (error) {
                console.error('oops, something went wrong!', error);
            });


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
                    <div id='my-node' >
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

export default ToImage;