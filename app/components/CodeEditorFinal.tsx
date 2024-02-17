"use client"

import { useRef, useState, FC, useEffect, createRef } from "react";
import Editor, { Monaco } from "@monaco-editor/react";
import CroudNav from "./CroudNav";
import { Heart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { GptPrompt } from "./GptPrompt";
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import { useSession } from 'next-auth/react';
import { Spinner } from '@/app/components/Spinner';
const { routh } = require('@/utils/rouths')







interface IComponent {
    id: number;
    name: string;
    category: string;
    code: string
}

interface ComProps {
    name: string;
}

const CodeEditorFinal: FC<ComProps> = (prompts) => {
    const [backendData, setBackEndData] = useState('');
    const editorRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [gptData, setGptData] = useState<any>();
    const iframeRef = useRef<HTMLIFrameElement | null>(null);;
    const ref = createRef<HTMLDivElement>()
    const session = useSession();
    

    

    const  takeScreenshot = (comeId:any) => {
        const iframeElement = document.getElementById('screenshot');
        const node = iframeElement as HTMLIFrameElement | null;
    
        if (node && node.contentWindow && node.contentWindow.document) {
            const iframeContent = node.contentWindow.document;
    
            htmlToImage.toBlob(iframeContent.body, {
                backgroundColor: '#ffffff'
            })
            .then(function (blob) {
                // Handling the blob object here
                if (blob) {
                    // console.log(comeId);
                     uploadImage(blob, comeId)
                }
            })
            .catch(function (error) {
                console.error('oops, something went wrong!', error);
            });
        }
    };

    const uploadImage = async (blob:any, comeId:String) => {
        //console.log(blob);
        const formData = new FormData();
        formData.append('screenshot', blob);
    
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/upload?id=${comeId}`, {
                method: 'POST',
                body: formData,
            });
            const result = await response.json();
            console.log('Image uploaded successfully:', result);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    

    function handleEditorDidMount(editor: any, monaco: Monaco) {
        let myValue = backendData;
        let timeoutId: any = null;
        handleRunCode(myValue);

        editorRef.current = editor;
        editor.onDidChangeModelContent(() => {

            if (timeoutId) {
                clearTimeout(timeoutId);
            }

            timeoutId = setTimeout(() => {
                myValue = editor.getValue();
                handleRunCode(myValue);
            }, 500);
        })
    }
    function handleRunCode(myValue: any) {

        setBackEndData(myValue);

        const iframeDoc = iframeRef.current?.contentDocument || iframeRef.current?.contentWindow?.document;

        if (iframeDoc) {
            iframeDoc.open();
            iframeDoc.write(`${myValue}`);
            iframeDoc.close();
        }

        setBackEndData(myValue);
    }


    useEffect(() => {

        if(process.env.NEXT_PUBLIC_BASE_API_URL){

        

        fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/components/` + prompts.name)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to fetch');
                }
            })
            .then(data => {
                if (Array.isArray(data.component)) {
                    //console.log(data.component[0].code);
                    setBackEndData(data.component[0].code);

                } else {
                    console.warn("Received data is not an array", data);

                }

            })
            .catch(error => {
                console.log(error);

            });
        }

    }, []);

    const changeData = (newData: any) => {
        console.log(newData.gpt);
        setBackEndData(newData.gpt);
        setGptData(newData.gpt);
    }


    if(!process.env.NEXT_PUBLIC_BASE_API_URL){
        return null
      }

    if (backendData) {
        const options = {
            minimap: { enabled: false, }
        };

        return (
            <>
                <div className="flex justify-end">
                    <Heart/>
                </div>
                {loading ? <p>Loading...</p> : <p></p>}


                <div className="h-96 grid grid-cols-2 gap-4 content-center mt-8">
                    <div className='border-r-2'>
                    {session.status === "authenticated" && (

                        <div className="text-left flex ">
                            <CroudNav data={backendData} onClick={takeScreenshot} id={prompts.name} />
                            <GptPrompt data={backendData} onSubmit={changeData} />
                        </div>
                    )}

                        <Editor
                            key={gptData}
                            options={options}
                            height="65vh"
                            defaultLanguage="javascript"
                            defaultValue={backendData}
                            onMount={handleEditorDidMount}
                        />
                    </div>
                 
                        <iframe id='screenshot' className='w-full h-full' ref={iframeRef}></iframe>

                </div>
            </>
        
        );
    }else{
        return(
            <Spinner />

        )
       

    }
}


export default CodeEditorFinal;