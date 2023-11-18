"use client"

import { useRef, useState, FC, useEffect } from "react";
import Editor, { Monaco } from "@monaco-editor/react";
import CroudNav from "./CroudNav";
import { Button } from "@/components/ui/button";
import { GptPrompt } from "./GptPrompt";




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

    const changeData = (newData:any) =>{
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


                </div>
                {loading ? <p>Loading...</p> : <p></p>}


                <div className="h-96 grid grid-cols-2 gap-4 content-center mt-10">
                    <div className='border-2'>
                        <div className="text-left flex ">
                            <CroudNav data = {backendData} id={prompts.name} />
                            <GptPrompt data = {backendData} onSubmit={changeData}  />
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

                    <iframe className='border-2 w-full h-full' ref={iframeRef}></iframe>
                </div>
            </>
        );
    }
};

export default CodeEditorFinal;
