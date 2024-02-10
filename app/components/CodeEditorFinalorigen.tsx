"use client"

import { useRef, useState, FC, useEffect, createRef } from "react";
import Editor, { Monaco } from "@monaco-editor/react";
import CroudNav from "./CroudNav";
import { Button } from "@/components/ui/button";
import { GptPrompt } from "./GptPrompt";
import { useScreenshot, createFileName } from "use-react-screenshot";
import html2canvas from 'html2canvas';





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
    const [image, setScreenshot] = useScreenshot({
        type: 'image/jpeg'
    })

    const takeScreenshot = () => {
        const iframeElement = document.getElementById('screenshot');
        const iframe = iframeElement as HTMLIFrameElement | null;
        const options = {
            useCORS: true, // Use this if you need to capture external content with CORS enabled
            // Add other options here as needed
        };
    
        if (iframe && iframe.contentWindow && iframe.contentWindow.document) {
            const iframeContent = iframe.contentWindow.document;
    
            html2canvas(iframeContent.body, options)
                .then((canvas,
                ) => {
                    const base64image = canvas.toDataURL('image/png');
                    downloadImage(base64image); // Use the base64image for downloading
                })
                .catch((error) => {
                    console.error('Error capturing iframe:', error);
                });
        } else {
            console.error('Iframe content not accessible or iframe does not exist');
        }
    };

    const downloadImage = (url:any) => {


        const a = document.createElement('a');
        a.href = url;
        a.download = 'url';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

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


    async function GetData() {

        setLoading(true);


        try {
            const response = await fetch('http://localhost:3000/api/gpt/basic/', {
                method: 'GET',
            });
            // Parsing the JSON response
            const data = await response.json();
            let newData = `
            <div>
            <script src="https://cdn.tailwindcss.com"></script>
            ${data.gpt.choices[0].message.content}
            </div>
            `
            setLoading(false);
            setBackEndData(newData)
            setGptData(newData)
            //setBackEndData(data.gpt.choices[0].message.content);
            console.log(data.gpt.choices[0].message.content);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }

    useEffect(() => {

        fetch('/api/components/' + prompts.name)
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

    }, []);

    const changeData = (newData: any) => {
        console.log(newData.gpt);
        setBackEndData(newData.gpt);
        setGptData(newData.gpt);
    }



    if (backendData) {
        const options = {
            minimap: { enabled: false, }
        };
        return (
            <>
                <div>
                    <Button onClick={GetData} className="text-right">Generate Ai Component</Button>
                    <Button onClick={takeScreenshot} className="text-right">screen</Button>


                </div>
                {loading ? <p>Loading...</p> : <p></p>}


                <div className="h-96 grid grid-cols-2 gap-4 content-center mt-10">
                    <div className='border-2'>
                        <div className="text-left flex ">
                            <CroudNav data={backendData} id={prompts.name} />
                            <GptPrompt data={backendData} onSubmit={changeData} />
                        </div>

                        <Editor
                            key={gptData}
                            options={options}
                            height="65vh"
                            defaultLanguage="javascript"
                            defaultValue={backendData}
                            onMount={handleEditorDidMount}
                        />
                    </div>
                 
                        <iframe id='screenshot' className='border-2 w-full h-full' ref={iframeRef}></iframe>

                </div>
            </>
        );
    }
};

export default CodeEditorFinal;